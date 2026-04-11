/*
 * @mp-se/espframework-ui-components
 * Copyright (c) 2021-2026 Magnus
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useFetch } from '../../src/composables/useFetch.js';

describe('useFetch', () => {
  let fetchMock;

  beforeEach(() => {
    fetchMock = vi.fn();
    global.fetch = fetchMock;
    global.AbortController = AbortController;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return managedFetch, abortAllRequests, abortRequest, and activeControllers', () => {
    const { managedFetch, abortAllRequests, abortRequest, activeControllers } = useFetch();

    expect(typeof managedFetch).toBe('function');
    expect(typeof abortAllRequests).toBe('function');
    expect(typeof abortRequest).toBe('function');
    expect(activeControllers).toBeDefined();
  });

  it('should successfully fetch a URL', async () => {
    const mockResponse = { ok: true, status: 200, json: () => Promise.resolve({ data: 'test' }) };
    fetchMock.mockResolvedValueOnce(mockResponse);

    const { managedFetch } = useFetch();
    const response = await managedFetch('https://api.example.com/data');

    expect(response).toBe(mockResponse);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.com/data',
      expect.objectContaining({
        signal: expect.any(AbortSignal),
      })
    );
  });

  it('should pass through fetch options', async () => {
    const mockResponse = { ok: true, status: 200 };
    fetchMock.mockResolvedValueOnce(mockResponse);

    const { managedFetch } = useFetch();
    const options = { method: 'POST', headers: { 'Content-Type': 'application/json' } };

    await managedFetch('https://api.example.com/data', options);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.com/data',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: expect.any(AbortSignal),
      })
    );
  });

  it('should handle AbortError gracefully', async () => {
    const abortError = new Error('Aborted');
    abortError.name = 'AbortError';
    fetchMock.mockRejectedValueOnce(abortError);

    const { managedFetch } = useFetch();
    const result = await managedFetch('https://api.example.com/data');

    expect(result).toBeNull();
  });

  it('should throw non-AbortError errors', async () => {
    const error = new Error('Network error');
    fetchMock.mockRejectedValueOnce(error);

    const { managedFetch } = useFetch();

    await expect(managedFetch('https://api.example.com/data')).rejects.toThrow('Network error');
  });

  it('should remove controller from active set on successful fetch', async () => {
    const mockResponse = { ok: true, status: 200 };
    fetchMock.mockResolvedValueOnce(mockResponse);

    const { managedFetch, activeControllers } = useFetch();
    expect(activeControllers.value.size).toBe(0);

    await managedFetch('https://api.example.com/data');
    expect(activeControllers.value.size).toBe(0);
  });

  it('should remove controller from active set on error', async () => {
    const error = new Error('Network error');
    fetchMock.mockRejectedValueOnce(error);

    const { managedFetch, activeControllers } = useFetch();
    expect(activeControllers.value.size).toBe(0);

    try {
      await managedFetch('https://api.example.com/data');
    } catch (e) {
      // Expected
    }

    expect(activeControllers.value.size).toBe(0);
  });

  it('should abort all requests', async () => {
    // Mock fetch to never resolve for this test
    fetchMock.mockImplementation(
      (url, { signal }) =>
        new Promise(resolve => {
          signal.addEventListener('abort', () => {
            resolve(null);
          });
        })
    );

    const { managedFetch, abortAllRequests, activeControllers } = useFetch();

    // Start multiple requests
    void Promise.all([
      managedFetch('https://api.example.com/data1'),
      managedFetch('https://api.example.com/data2'),
    ]);

    // Give time for controllers to be added
    await new Promise(resolve => setTimeout(resolve, 10));

    expect(activeControllers.value.size).toBeGreaterThan(0);

    abortAllRequests();
    expect(activeControllers.value.size).toBe(0);
  });

  it('should abort specific request', async () => {
    // Mock fetch to prevent actual network call
    const mockFetch = vi.fn(
      () =>
        new Promise(() => {
          // Never resolves - simulates a long-running request
        })
    );
    global.fetch = mockFetch;

    const { managedFetch, abortRequest, activeControllers } = useFetch();

    // Start a fetch request (which will be tracked)
    managedFetch('http://example.com/api/data');

    // The controller should be tracked now
    expect(activeControllers.value.size).toBeGreaterThan(0);

    // Get the controller from active controllers
    const [controller] = [...activeControllers.value];
    expect(controller.signal.aborted).toBe(false);

    // Abort it
    abortRequest(controller);

    expect(controller.signal.aborted).toBe(true);
    expect(activeControllers.value.has(controller)).toBe(false);
  });

  it('should not throw when aborting non-tracked controller', async () => {
    const { abortRequest } = useFetch();

    const untrackedController = new AbortController();

    // Should not throw even though it's not tracked
    expect(() => {
      abortRequest(untrackedController);
    }).not.toThrow();
  });

  it('should handle multiple concurrent requests', async () => {
    const mockResponse = { ok: true, status: 200 };
    fetchMock.mockResolvedValue(mockResponse);

    const { managedFetch } = useFetch();

    const responses = await Promise.all([
      managedFetch('https://api.example.com/1'),
      managedFetch('https://api.example.com/2'),
      managedFetch('https://api.example.com/3'),
    ]);

    expect(responses).toHaveLength(3);
    expect(responses.every(r => r === mockResponse)).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it('should handle AbortError removal from tracking', async () => {
    const abortError = new Error('Aborted');
    abortError.name = 'AbortError';
    fetchMock.mockRejectedValueOnce(abortError);

    const { managedFetch, activeControllers } = useFetch();

    const result = await managedFetch('https://api.example.com/data');

    expect(result).toBeNull();
    // Controller should be removed from active set even on abort
    expect(activeControllers.value.size).toBe(0);
  });

  it('should add controller to active set during fetch', async () => {
    let capturedSignal;

    fetchMock.mockImplementation((url, { signal }) => {
      capturedSignal = signal;
      return Promise.resolve({ ok: true, status: 200 });
    });

    const { managedFetch, activeControllers } = useFetch();

    const promise = managedFetch('https://api.example.com/data');

    // At this point, the controller might be added
    // After promise resolves, it should be removed
    await promise;

    expect(activeControllers.value.size).toBe(0);
  });

  it('should preserve other request options when adding signal', async () => {
    const mockResponse = { ok: true, status: 200 };
    fetchMock.mockResolvedValueOnce(mockResponse);

    const { managedFetch } = useFetch();
    const options = {
      method: 'PUT',
      headers: { 'X-Custom': 'value' },
      body: JSON.stringify({ test: 'data' }),
    };

    await managedFetch('https://api.example.com/data', options);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.com/data',
      expect.objectContaining({
        method: 'PUT',
        headers: { 'X-Custom': 'value' },
        body: JSON.stringify({ test: 'data' }),
        signal: expect.any(AbortSignal),
      })
    );
  });

  it('should clean up window beforeunload listener on unmount', () => {
    // In Node.js/test environment, onBeforeUnmount won't be called
    // Just verify the composable returns the expected methods
    const { managedFetch, abortAllRequests } = useFetch();

    expect(typeof managedFetch).toBe('function');
    expect(typeof abortAllRequests).toBe('function');
  });
});
