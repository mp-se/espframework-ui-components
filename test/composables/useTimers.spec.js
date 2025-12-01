import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useTimers } from '../../src/composables/useTimers.js';

describe('useTimers', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should return timer management functions and refs', () => {
    const {
      createTimeout,
      createInterval,
      clearManagedTimeout,
      clearManagedInterval,
      clearAllTimers,
      activeTimeouts,
      activeIntervals,
    } = useTimers();

    expect(typeof createTimeout).toBe('function');
    expect(typeof createInterval).toBe('function');
    expect(typeof clearManagedTimeout).toBe('function');
    expect(typeof clearManagedInterval).toBe('function');
    expect(typeof clearAllTimers).toBe('function');
    expect(activeTimeouts).toBeDefined();
    expect(activeIntervals).toBeDefined();
  });

  it('should create and track a timeout', () => {
    const { createTimeout, activeTimeouts } = useTimers();
    const callback = vi.fn();

    const timeoutId = createTimeout(callback, 1000);

    expect(activeTimeouts.value.has(timeoutId)).toBe(true);
    expect(activeTimeouts.value.size).toBe(1);
  });

  it('should create and track an interval', () => {
    const { createInterval, activeIntervals } = useTimers();
    const callback = vi.fn();

    const intervalId = createInterval(callback, 1000);

    expect(activeIntervals.value.has(intervalId)).toBe(true);
    expect(activeIntervals.value.size).toBe(1);
  });

  it('should execute timeout callback after delay', () => {
    const { createTimeout } = useTimers();
    const callback = vi.fn();

    createTimeout(callback, 1000);

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalledOnce();
  });

  it('should execute interval callback repeatedly', () => {
    const { createInterval } = useTimers();
    const callback = vi.fn();

    createInterval(callback, 500);

    vi.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(2);

    vi.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it('should remove timeout from tracking after execution', () => {
    const { createTimeout, activeTimeouts } = useTimers();
    const callback = vi.fn();

    createTimeout(callback, 1000);
    expect(activeTimeouts.value.size).toBe(1);

    vi.advanceTimersByTime(1000);
    expect(activeTimeouts.value.size).toBe(0);
  });

  it('should clear a specific managed timeout', () => {
    const { createTimeout, clearManagedTimeout, activeTimeouts } = useTimers();
    const callback = vi.fn();

    const timeoutId = createTimeout(callback, 1000);
    expect(activeTimeouts.value.size).toBe(1);

    clearManagedTimeout(timeoutId);
    expect(activeTimeouts.value.size).toBe(0);

    vi.advanceTimersByTime(1000);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should clear a specific managed interval', () => {
    const { createInterval, clearManagedInterval, activeIntervals } = useTimers();
    const callback = vi.fn();

    const intervalId = createInterval(callback, 500);
    expect(activeIntervals.value.size).toBe(1);

    vi.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(1);

    clearManagedInterval(intervalId);
    expect(activeIntervals.value.size).toBe(0);

    vi.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(1); // No additional calls
  });

  it('should ignore clearing non-existent timeout', () => {
    const { clearManagedTimeout } = useTimers();

    expect(() => {
      clearManagedTimeout(999);
    }).not.toThrow();
  });

  it('should ignore clearing non-existent interval', () => {
    const { clearManagedInterval } = useTimers();

    expect(() => {
      clearManagedInterval(999);
    }).not.toThrow();
  });

  it('should clear all timeouts and intervals', () => {
    const { createTimeout, createInterval, clearAllTimers, activeTimeouts, activeIntervals } =
      useTimers();
    const timeoutCallback = vi.fn();
    const intervalCallback = vi.fn();

    createTimeout(timeoutCallback, 1000);
    createTimeout(timeoutCallback, 2000);
    createInterval(intervalCallback, 500);
    createInterval(intervalCallback, 1000);

    expect(activeTimeouts.value.size).toBe(2);
    expect(activeIntervals.value.size).toBe(2);

    clearAllTimers();

    expect(activeTimeouts.value.size).toBe(0);
    expect(activeIntervals.value.size).toBe(0);

    vi.advanceTimersByTime(2000);
    expect(timeoutCallback).not.toHaveBeenCalled();
    expect(intervalCallback).not.toHaveBeenCalled();
  });

  it('should manage mixed timeouts and intervals', () => {
    const { createTimeout, createInterval, activeTimeouts, activeIntervals } = useTimers();
    const callback = vi.fn();

    createTimeout(callback, 500);
    createInterval(callback, 1000);
    createTimeout(callback, 1500);
    createInterval(callback, 2000);

    expect(activeTimeouts.value.size).toBe(2);
    expect(activeIntervals.value.size).toBe(2);

    vi.advanceTimersByTime(500);
    expect(activeTimeouts.value.size).toBe(1); // timeoutId1 executed and removed

    vi.advanceTimersByTime(1000);
    expect(activeTimeouts.value.size).toBe(0); // timeoutId2 executed and removed
    expect(activeIntervals.value.size).toBe(2); // intervals still active
  });

  it('should handle nested timeouts', () => {
    const { createTimeout } = useTimers();
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    createTimeout(() => {
      callback1();
      createTimeout(callback2, 500);
    }, 1000);

    vi.advanceTimersByTime(1000);
    expect(callback1).toHaveBeenCalledOnce();
    expect(callback2).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    expect(callback2).toHaveBeenCalledOnce();
  });

  it('should handle multiple clearAllTimers calls', () => {
    const { createTimeout, createInterval, clearAllTimers, activeTimeouts, activeIntervals } =
      useTimers();

    createTimeout(() => {}, 1000);
    createInterval(() => {}, 500);

    clearAllTimers();
    expect(activeTimeouts.value.size).toBe(0);
    expect(activeIntervals.value.size).toBe(0);

    // Should not throw when clearing empty sets
    expect(() => {
      clearAllTimers();
    }).not.toThrow();

    expect(activeTimeouts.value.size).toBe(0);
    expect(activeIntervals.value.size).toBe(0);
  });

  it('should track multiple timeouts independently', () => {
    const { createTimeout, activeTimeouts } = useTimers();
    const callback = vi.fn();

    const id1 = createTimeout(callback, 1000);
    const id2 = createTimeout(callback, 2000);
    const id3 = createTimeout(callback, 3000);

    expect(activeTimeouts.value.size).toBe(3);
    expect(activeTimeouts.value.has(id1)).toBe(true);
    expect(activeTimeouts.value.has(id2)).toBe(true);
    expect(activeTimeouts.value.has(id3)).toBe(true);
  });

  it('should track multiple intervals independently', () => {
    const { createInterval, activeIntervals } = useTimers();
    const callback = vi.fn();

    const id1 = createInterval(callback, 500);
    const id2 = createInterval(callback, 1000);
    const id3 = createInterval(callback, 2000);

    expect(activeIntervals.value.size).toBe(3);
    expect(activeIntervals.value.has(id1)).toBe(true);
    expect(activeIntervals.value.has(id2)).toBe(true);
    expect(activeIntervals.value.has(id3)).toBe(true);
  });
});
