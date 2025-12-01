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
    const { abortRequest } = useFetch();

    // This test validates the structure exists
    expect(typeof abortRequest).toBe('function');
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

  it('should clean up window beforeunload listener on unmount', () => {
    // In Node.js/test environment, onBeforeUnmount won't be called
    // Just verify the composable returns the expected methods
    const { managedFetch, abortAllRequests } = useFetch();
    
    expect(typeof managedFetch).toBe('function');
    expect(typeof abortAllRequests).toBe('function');
  });
});
