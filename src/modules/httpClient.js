// Minimal centralized HTTP client to standardize fetch usage across the app.
// Provides timeout, automatic Authorization header injection (from a getter),
// convenience helpers returning Promises (json/text), and built-in logging.
import { logInfo, logError } from './logger.js';
class HttpClient {
  constructor() {
    // autodetect base URL from env or window location
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_APP_HOST) {
      this.baseURL = import.meta.env.VITE_APP_HOST;
    } else if (typeof window !== 'undefined' && window.location) {
      this.baseURL = window.location.href;
    } else {
      this.baseURL = '';
    }

    // default timeout (ms)
    this.timeout =
      typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FETCH_TIMEOUT
        ? Number(import.meta.env.VITE_FETCH_TIMEOUT)
        : 8000;

    this.token = '';
  }

  // Normalize an auth token into an Authorization header value.
  // Do not modify the token itself; simply prefix it with 'bearer '.
  _formatAuth(token) {
    if (!token) return token;
    const t = String(token).trim();
    return 'bearer ' + t;
  }

  buildUrl(path) {
    if (!path) return this.baseURL;
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    return this.baseURL.endsWith('/') || path.startsWith('/')
      ? this.baseURL + path.replace(/^\//, '')
      : this.baseURL + path;
  }

  async request(path, { method = 'GET', headers = {}, body, timeout } = {}) {
    const url = this.buildUrl(path);
    const controller = new AbortController();
    const t = timeout === undefined ? this.timeout : timeout;

    const finalHeaders = Object.assign({}, headers);
    if (this.token && !Object.keys(finalHeaders).some(k => k.toLowerCase() === 'authorization')) {
      finalHeaders['Authorization'] = this._formatAuth(this.token);
    }

    const timer = setTimeout(() => controller.abort(), t);

    const res = await fetch(url, {
      method,
      headers: finalHeaders,
      body,
      signal: controller.signal,
    });
    clearTimeout(timer);
    return res;
  }

  async getJson(path, opts = {}) {
    const res = await this.request(path, Object.assign({ method: 'GET' }, opts));
    if (!res) return null;
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    return res.json();
  }

  async postJson(path, data, opts = {}) {
    const headers = Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {});
    const body = JSON.stringify(data);
    const res = await this.request(path, Object.assign({ method: 'POST', headers, body }, opts));
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    return res;
  }

  async postText(path, data, opts = {}) {
    const headers = Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {});
    const body = JSON.stringify(data);
    const res = await this.request(path, Object.assign({ method: 'POST', headers, body }, opts));
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    return res.text();
  }

  // Convenience helper to interact with the device filesystem API.
  // Accepts a data object, posts to 'api/filesystem' and returns an object
  // { success: boolean, text: string } to match previous callers' expectations.
  async filesystemRequest(data) {
    try {
      logInfo('httpClient.filesystemRequest()', 'Sending /api/filesystem');
      const text = await this.postText('api/filesystem', data);
      return { success: true, text };
    } catch (err) {
      logError('httpClient.filesystemRequest()', err);
      return { success: false, text: '' };
    }
  }

  // Ping the device to check connectivity. Returns boolean success/failure.
  async ping() {
    try {
      await this.getJson('api/ping');
      return true;
    } catch (err) {
      logError('httpClient.ping()', err);
      return false;
    }
  }

  // Map device push error codes to human readable messages
  getErrorString(code) {
    switch (code) {
      case -100:
        return 'Skipped since SSL is used';
      case 200:
        return 'Success (200)';
      case 401:
        return 'Access denied (401)';
      case 404:
        return 'Endpoint not found (404)';
      case 422:
        return 'Paylod cannot be parsed, check format and http headers';
      default:
        return '';
    }
  }

  // Perform Basic auth against device and store token on success.
  // optional `basicBase` should be the base64 encoded "user:pass" string (without the 'Basic ' prefix)
  // Performs auth, logs errors internally and returns boolean success/failure.
  async auth(basicBase) {
    try {
      const base = basicBase;
      logInfo('httpClient.auth()', 'Requesting /api/auth');
      const response = await this.request('api/auth', {
        method: 'GET',
        headers: { Authorization: 'Basic ' + base },
      });
      if (!response.ok) {
        const err = new Error(`HTTP ${response.status}: ${response.statusText}`);
        logError('httpClient.auth()', err);
        return false;
      }
      const json = await response.json();
      if (json && json.token) {
        this.token = json.token;
        logInfo('httpClient.auth()', 'Authentication succeeded, token set');
        return true;
      }
      const noTokenErr = new Error('Authentication response did not contain token');
      logError('httpClient.auth()', noTokenErr);
      return false;
    } catch (err) {
      logError('httpClient.auth()', err);
      return false;
    }
  }

  // Upload a file or FormData using XMLHttpRequest to support progress events.
  // path: endpoint path (e.g. 'api/firmware/upload')
  // data: File or FormData
  // opts: { fieldName = 'file', timeoutMs, onProgress }
  uploadFile(path, data, opts = {}) {
    const { fieldName = 'file', timeoutMs = 120000, onProgress } = opts;

    return new Promise(resolve => {
      try {
        const url = this.buildUrl(path);
        const xhr = new XMLHttpRequest();
        xhr.timeout = timeoutMs;

        xhr.onerror = e => {
          logError('httpClient.uploadFile()', e);
          resolve({ success: false, status: xhr.status, text: xhr.responseText || '' });
        };

        xhr.ontimeout = e => {
          logError('httpClient.uploadFile()', 'timeout', e);
          resolve({ success: false, status: xhr.status, text: xhr.responseText || '' });
        };

        xhr.onloadend = () => {
          const ok = xhr.status >= 200 && xhr.status < 300;
          if (ok) {
            resolve({ success: true, status: xhr.status, text: xhr.responseText });
          } else {
            logError('httpClient.uploadFile()', `HTTP ${xhr.status}`);
            resolve({ success: false, status: xhr.status, text: xhr.responseText || '' });
          }
        };

        if (xhr.upload && typeof onProgress === 'function') {
          xhr.upload.addEventListener('progress', ev => {
            if (ev.lengthComputable) {
              const percent = (ev.loaded / ev.total) * 100;
              try {
                onProgress(percent);
              } catch (e) {
                logError('httpClient.uploadFile.onProgress()', e);
              }
            }
          });
        }

        // Prepare form data
        let payload;
        if (data instanceof FormData) {
          payload = data;
        } else {
          payload = new FormData();
          payload.append(fieldName, data);
        }

        xhr.open('POST', url, true);
        // Set Authorization header if token present
        if (this.token) {
          try {
            xhr.setRequestHeader('Authorization', this._formatAuth(this.token));
          } catch (e) {
            // Some browsers may throw when setting forbidden headers; safest to ignore
            logError('httpClient.uploadFile.setRequestHeader()', e);
          }
        }

        xhr.send(payload);
      } catch (err) {
        logError('httpClient.uploadFile()', err);
        resolve({ success: false, status: 0, text: '' });
      }
    });
  }

  // Build a websocket URL from the client's baseURL and a path.
  buildWsUrl(path) {
    const base = this.baseURL || '';
    let wsBase = base;
    try {
      if (base.startsWith('https://')) wsBase = base.replace(/^https:\/\//i, 'wss://');
      else if (base.startsWith('http://')) wsBase = base.replace(/^http:\/\//i, 'ws://');
      else wsBase = base;
    } catch (e) {
      wsBase = base;
    }

    if (!path) return wsBase;
    if (path.startsWith('ws://') || path.startsWith('wss://')) return path;
    return wsBase.endsWith('/') || path.startsWith('/')
      ? wsBase + path.replace(/^\//, '')
      : wsBase + path;
  }

  // Create a WebSocket for a given path. Returns the raw WebSocket and a small helper to close.
  // opts: { protocols?, onOpen?, onMessage?, onClose?, onError?, autoReconnect?: boolean, reconnectIntervalMs?: number }
  createWebSocket(path, opts = {}) {
    const {
      protocols,
      onOpen,
      onMessage,
      onClose,
      onError,
      autoReconnect = false,
      reconnectIntervalMs = 3000,
    } = opts;

    let socket = null;
    let shouldReconnect = autoReconnect;
    let reconnectTimer = null;

    const open = () => {
      const url = this.buildWsUrl(path);
      socket = protocols ? new WebSocket(url, protocols) : new WebSocket(url);

      socket.onopen = ev => {
        if (typeof onOpen === 'function') onOpen(ev);
      };
      socket.onmessage = ev => {
        if (typeof onMessage === 'function') onMessage(ev);
      };
      socket.onclose = ev => {
        if (typeof onClose === 'function') onClose(ev);
        if (shouldReconnect) {
          reconnectTimer = setTimeout(() => open(), reconnectIntervalMs);
        }
      };
      socket.onerror = ev => {
        if (typeof onError === 'function') onError(ev);
      };
    };

    open();

    const close = () => {
      shouldReconnect = false;
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }
      if (socket) {
        try {
          socket.close();
        } catch (e) {
          logError('httpClient.createWebSocket.close()', e);
        }
        socket = null;
      }
    };

    return { socketGetter: () => socket, close };
  }

  // Perform a device restart via /api/restart and optionally schedule a client redirect
  // mdns: optional mDNS name (without .local) used to redirect to the device after restart
  // opts: { redirectDelayMs = 8000 }
  async restart(mdns, opts = {}) {
    const { redirectDelayMs = 8000 } = opts;
    try {
      const json = await this.getJson('api/restart');

      // If caller provided an mdns name and restart succeeded, schedule a redirect
      if (json && json.status === true && typeof window !== 'undefined' && mdns) {
        const redirectUrl = 'http://' + mdns + '.local';
        const redirectTimeout = setTimeout(() => {
          try {
            location.href = redirectUrl;
          } catch (error) {
            logError('httpClient.restart.redirect()', error);
            // Fallback to reload
            try {
              window.location.reload();
            } catch (_e) {
              // ignore
            }
          }
        }, redirectDelayMs);

        // Clean up on page unload to avoid dangling timeout
        if (typeof window !== 'undefined') {
          window.addEventListener(
            'beforeunload',
            () => {
              clearTimeout(redirectTimeout);
            },
            { once: true }
          );
        }

        return { success: true, json, redirectScheduled: true };
      }

      return { success: true, json, redirectScheduled: false };
    } catch (err) {
      logError('httpClient.restart()', err);
      return { success: false, error: err };
    }
  }

  // token is stored only in-memory; no explicit clearToken API
}

// Backwards-compatible factory wrapper
export { HttpClient };

// Shared singleton client (will be initialized lazily; consumers should set baseURL/token/timeout)
const sharedHttpClient = new HttpClient();
export { sharedHttpClient };
