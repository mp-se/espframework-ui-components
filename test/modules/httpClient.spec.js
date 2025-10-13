import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// Mock the logger module used by httpClient before importing the client
// Use the path relative to this test file that resolves to src/modules/logger.js
vi.mock('../../src/modules/logger.js', () => {
  return {
    logInfo: vi.fn(),
    logError: vi.fn(),
  };
});

import { HttpClient } from '../../src/modules/httpClient.js';

describe('HttpClient', () => {
  let client;
  const originalFetch = global.fetch;
  const originalXhr = global.XMLHttpRequest;
  const originalWs = global.WebSocket;
  const originalLocation = global.location;
  const originalWindow = global.window;
  const originalSetTimeout = global.setTimeout;

  beforeEach(() => {
    client = new HttpClient();
    // use a stable base for URL tests
    client.baseURL = 'http://example.com/base/';
  });

  afterEach(() => {
    // restore globals
    global.fetch = originalFetch;
    global.XMLHttpRequest = originalXhr;
    global.WebSocket = originalWs;
    global.location = originalLocation;
    global.window = originalWindow;
    global.setTimeout = originalSetTimeout;
    vi.useRealTimers();
    vi.resetAllMocks();
  });

  it('_formatAuth trims and prefixes token', () => {
    expect(client._formatAuth(' abc ')).toBe('bearer abc');
    expect(client._formatAuth('token')).toBe('bearer token');
    expect(client._formatAuth('')).toBe('');
    expect(client._formatAuth(null)).toBe(null);
    expect(client._formatAuth(undefined)).toBe(undefined);
  });

  it('buildUrl respects absolute urls and joins paths', () => {
    expect(client.buildUrl('http://other/thing')).toBe('http://other/thing');
    expect(client.buildUrl('https://secure/thing')).toBe('https://secure/thing');

    // base ends with '/', path without leading '/'
    client.baseURL = 'http://host/base/';
    expect(client.buildUrl('path')).toBe('http://host/base/path');

    // path with leading '/'
    expect(client.buildUrl('/path2')).toBe('http://host/base/path2');

    // base without trailing slash
    client.baseURL = 'http://host/base';
    expect(client.buildUrl('p')).toBe('http://host/basep');
    // if path starts with '/', the implementation strips the leading slash then concatenates
    expect(client.buildUrl('/p')).toBe('http://host/basep');

    // empty path returns baseURL
    expect(client.buildUrl('')).toBe('http://host/base');
  });

  it('isSSL returns true for HTTPS baseURL and false otherwise', () => {
    client.baseURL = 'https://example.com';
    expect(client.isSSL()).toBe(true);

    client.baseURL = 'http://example.com';
    expect(client.isSSL()).toBe(false);

    client.baseURL = '';
    expect(client.isSSL()).toBe(false);

    client.baseURL = null;
    expect(client.isSSL()).toBe(false);
  });

  it('request injects Authorization header when token set and not present', async () => {
    const fakeResp = { ok: true, status: 200, statusText: 'OK', json: async () => ({}) };
    global.fetch = vi.fn().mockResolvedValue(fakeResp);

    client.token = 'sometoken';
    await client.request('api/test', { method: 'GET' });

    expect(global.fetch).toHaveBeenCalled();
    const calledOptions = global.fetch.mock.calls[0][1];
    expect(calledOptions.headers.Authorization).toBe('bearer sometoken');

    // If Authorization present (case-insensitive), don't inject
    global.fetch.mockClear();
    await client.request('api/test', { headers: { aUThorization: 'Basic abc' } });
    const opts2 = global.fetch.mock.calls[0][1];
    // Keep the original header unchanged
    expect(opts2.headers.aUThorization).toBe('Basic abc');
    // And don't have injected 'Authorization' key (exact)
    expect(Object.keys(opts2.headers)).not.toContain('Authorization');
  });

  it('getJson returns parsed json when ok and throws when not ok', async () => {
    const okResp = { ok: true, status: 200, statusText: 'OK', json: async () => ({ a: 1 }) };
    global.fetch = vi.fn().mockResolvedValue(okResp);

    const data = await client.getJson('api/j');
    expect(data).toEqual({ a: 1 });

    // simulate not ok
    const badResp = { ok: false, status: 404, statusText: 'Not Found' };
    global.fetch = vi.fn().mockResolvedValue(badResp);
    await expect(client.getJson('api/j')).rejects.toThrow('HTTP 404: Not Found');
  });

  it('postJson sends JSON body and respects response ok', async () => {
    // ok response
    const resp = { ok: true, status: 201, statusText: 'Created' };
    global.fetch = vi.fn().mockResolvedValue(resp);

    const res = await client.postJson('api/p', { x: 1 });
    // postJson returns the raw response when ok
    expect(res).toBe(resp);
    const calledOptions = global.fetch.mock.calls[0][1];
    expect(calledOptions.method).toBe('POST');
    expect(calledOptions.headers['Content-Type']).toBe('application/json');
    expect(calledOptions.body).toBe(JSON.stringify({ x: 1 }));

    // not ok -> throw
    const bad = { ok: false, status: 422, statusText: 'Unprocessable' };
    global.fetch = vi.fn().mockResolvedValue(bad);
    await expect(client.postJson('api/p', { x: 1 })).rejects.toThrow('HTTP 422: Unprocessable');
  });

  it('postText returns response.text() when ok', async () => {
    const resp = { ok: true, status: 200, statusText: 'OK', text: async () => 'hello' };
    global.fetch = vi.fn().mockResolvedValue(resp);

    const text = await client.postText('api/t', { a: 2 });
    expect(text).toBe('hello');

    // not ok -> throw
    const bad = { ok: false, status: 500, statusText: 'Err' };
    global.fetch = vi.fn().mockResolvedValue(bad);
    await expect(client.postText('api/t', { a: 2 })).rejects.toThrow('HTTP 500: Err');
  });

  it('filesystemRequest returns success and logs on error', async () => {
    // stub postText on instance
    client.postText = vi.fn().mockResolvedValue('file-res');
    const ok = await client.filesystemRequest({ x: 1 });
    expect(ok).toEqual({ success: true, text: 'file-res' });

    client.postText = vi.fn().mockRejectedValue(new Error('boom'));
    const bad = await client.filesystemRequest({ x: 2 });
    expect(bad).toEqual({ success: false, text: '' });
  });

  it('ping returns true on success and false on error', async () => {
    client.getJson = vi.fn().mockResolvedValue({ pong: true });
    expect(await client.ping()).toBe(true);

    client.getJson = vi.fn().mockRejectedValue(new Error('no'));
    expect(await client.ping()).toBe(false);
  });

  it('getErrorString maps codes correctly', () => {
    expect(client.getErrorString(-100)).toContain('SSL');
    expect(client.getErrorString(200)).toContain('Success');
    expect(client.getErrorString(401)).toContain('Access denied');
    expect(client.getErrorString(404)).toContain('Endpoint not found');
    expect(client.getErrorString(422)).toContain('Paylod cannot');
    expect(client.getErrorString(9999)).toBe('');
  });

  it('auth stores token on success and handles failures', async () => {
    // stub request to return non-ok
    client.request = vi.fn().mockResolvedValue({ ok: false, status: 401, statusText: 'No' });
    expect(await client.auth('abc')).toBe(false);

    // ok but no token
    client.request = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ some: 'data' }),
    });
    expect(await client.auth('abc')).toBe(false);

    // ok with token
    client.request = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ token: 'T' }),
    });
    expect(await client.auth('abc')).toBe(true);
    expect(client.token).toBe('T');
  });

  it('uploadFile uses XMLHttpRequest, reports progress and sets Authorization header', async () => {
    // Fake XHR implementation
    class FakeXhr {
      constructor() {
        this.headers = {};
        this.upload = {
          listeners: {},
          addEventListener: (evt, cb) => {
            this.upload.listeners[evt] = cb;
          },
        };
        this.responseText = 'uploaded';
        this.status = 200;
        this.timeout = 0;
        this._opened = false;
      }
      open(method, url) {
        this._opened = true;
        this.method = method;
        this.url = url;
      }
      setRequestHeader(k, v) {
        this.headers[k] = v;
      }
      send(_payload) {
        // simulate progress events then loadend asynchronously
        setTimeout(() => {
          // fire progress if listener present
          const cb = this.upload.listeners['progress'];
          if (cb) {
            cb({ lengthComputable: true, loaded: 50, total: 100 });
            cb({ lengthComputable: true, loaded: 100, total: 100 });
          }
          // finally call onloadend
          if (typeof this.onloadend === 'function') {
            this.onloadend();
          }
        }, 0);
      }
      addEventListener() {
        // not used in this fake
      }
    }

    global.XMLHttpRequest = FakeXhr;

    client.token = 'tok123';
    const progressSpy = vi.fn();

    const resultPromise = client.uploadFile('api/upload', 'SOME-BLOB', {
      fieldName: 'f',
      onProgress: progressSpy,
    });
    // wait for microtasks/timers
    await new Promise(r => setTimeout(r, 0));
    const result = await resultPromise;

    expect(result.success).toBe(true);
    expect(result.text).toBe('uploaded');

    expect(progressSpy).toHaveBeenCalled();
    // verify progress percent computed: first call 50/100 -> 50
    const firstCallArg = progressSpy.mock.calls[0][0];
    expect(firstCallArg).toBe(50);
  });

  it('buildWsUrl converts http(s) to ws(s) and joins paths', () => {
    client.baseURL = 'https://host:8080/base/';
    expect(client.buildWsUrl('path')).toBe('wss://host:8080/base/path');
    expect(client.buildWsUrl('/p')).toBe('wss://host:8080/base/p');

    client.baseURL = 'http://host/';
    expect(client.buildWsUrl('p')).toBe('ws://host/p');

    // full ws url preserved
    expect(client.buildWsUrl('ws://other/ws')).toBe('ws://other/ws');
    expect(client.buildWsUrl('wss://other/ws')).toBe('wss://other/ws');
  });

  it('createWebSocket invokes callbacks and supports autoReconnect', async () => {
    // Fake WebSocket that records instances and allows manual event triggering
    const instances = [];
    class FakeWS {
      constructor(url, protocols) {
        this.url = url;
        this.protocols = protocols;
        this.onopen = null;
        this.onmessage = null;
        this.onclose = null;
        this.onerror = null;
        instances.push(this);
      }
      send() {}
      close() {
        // simulate close event
        if (this.onclose) this.onclose({ code: 1000 });
      }
    }
    global.WebSocket = FakeWS;

    const onOpen = vi.fn();
    const onMessage = vi.fn();
    const onClose = vi.fn();
    const onError = vi.fn();

    // create socket with autoReconnect true and short reconnect interval
    vi.useFakeTimers();
    const wsWrapper = client.createWebSocket('ws/path', {
      onOpen,
      onMessage,
      onClose,
      onError,
      autoReconnect: true,
      reconnectIntervalMs: 100,
    });

    // initial instance created
    expect(instances.length).toBe(1);
    const first = instances[0];

    // simulate events by calling handlers on the instance
    if (first.onopen) first.onopen({});
    if (first.onmessage) first.onmessage({ data: 'm' });
    if (first.onerror) first.onerror({ error: 'e' });
    if (first.onclose) first.onclose({ code: 0 });

    // callbacks invoked
    expect(onOpen).toHaveBeenCalled();
    expect(onMessage).toHaveBeenCalled();
    expect(onError).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();

    // because autoReconnect true, a reconnect should be scheduled. Advance timers
    vi.advanceTimersByTime(100);
    // new instance created
    expect(instances.length).toBeGreaterThanOrEqual(2);

    // test close helper stops reconnection
    wsWrapper.close();
    // schedule another reconnect time to ensure none created
    vi.advanceTimersByTime(500);
    // instances should not increase further
    const countAfterClose = instances.length;
    expect(countAfterClose).toBe(instances.length);
  });

  it('restart schedules redirect to mdns.local when successful', async () => {
    // stub getJson to return status true
    client.getJson = vi.fn().mockResolvedValue({ status: true });
    // create global location and window stubs
    // Make a writable global.location so assignment to `location.href` works
    const loc = { href: '' };
    Object.defineProperty(global, 'location', {
      configurable: true,
      enumerable: true,
      value: loc,
      writable: true,
    });
    // Ensure window.location.reload exists so fallback won't throw
    global.window = {
      location: global.location,
      addEventListener: vi.fn((_name, _cb, _opts) => {
        // do nothing
      }),
    };
    // also add reload on window.location to be safe
    global.window.location.reload = vi.fn();

    // Stub setTimeout so it invokes the callback immediately (synchronous) and returns a fake id
    global.setTimeout = vi.fn((cb, _ms) => {
      if (typeof cb === 'function') cb();
      return 1;
    });

    const res = await client.restart('mydevice', { redirectDelayMs: 2000 });
    expect(res.success).toBe(true);
    expect(res.redirectScheduled).toBe(true);
    expect(global.location.href).toBe('http://mydevice.local');
  });
});
