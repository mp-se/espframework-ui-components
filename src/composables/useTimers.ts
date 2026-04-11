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

import { ref, onBeforeUnmount, Ref } from 'vue';
import { logDebug } from '../modules/logger';

export interface UseTimersReturn {
  createTimeout: (callback: () => void, delay: number) => ReturnType<typeof setTimeout>;
  createInterval: (callback: () => void, delay: number) => ReturnType<typeof setInterval>;
  clearManagedTimeout: (timeoutId: ReturnType<typeof setTimeout>) => void;
  clearManagedInterval: (intervalId: ReturnType<typeof setInterval>) => void;
  clearAllTimers: () => void;
  activeTimeouts: Ref<Set<ReturnType<typeof setTimeout>>>;
  activeIntervals: Ref<Set<ReturnType<typeof setInterval>>>;
}

export function useTimers(): UseTimersReturn {
  const timeouts: Ref<Set<ReturnType<typeof setTimeout>>> = ref(new Set());
  const intervals: Ref<Set<ReturnType<typeof setInterval>>> = ref(new Set());

  const createTimeout = (callback: () => void, delay: number): ReturnType<typeof setTimeout> => {
    const timeoutId = setTimeout(() => {
      timeouts.value.delete(timeoutId);
      callback();
    }, delay);

    timeouts.value.add(timeoutId);
    return timeoutId;
  };

  const createInterval = (callback: () => void, delay: number): ReturnType<typeof setInterval> => {
    const intervalId = setInterval(callback, delay);
    intervals.value.add(intervalId);
    return intervalId;
  };

  const clearManagedTimeout = (timeoutId: ReturnType<typeof setTimeout>): void => {
    if (timeouts.value.has(timeoutId)) {
      clearTimeout(timeoutId);
      timeouts.value.delete(timeoutId);
    }
  };

  const clearManagedInterval = (intervalId: ReturnType<typeof setInterval>): void => {
    if (intervals.value.has(intervalId)) {
      clearInterval(intervalId);
      intervals.value.delete(intervalId);
    }
  };

  const clearAllTimers = (): void => {
    timeouts.value.forEach(timeoutId => {
      clearTimeout(timeoutId);
    });
    timeouts.value.clear();

    intervals.value.forEach(intervalId => {
      clearInterval(intervalId);
    });
    intervals.value.clear();

    logDebug('useTimers.clearAllTimers()', 'All timers cleared');
  };

  onBeforeUnmount(() => {
    clearAllTimers();
  });

  return {
    createTimeout,
    createInterval,
    clearManagedTimeout,
    clearManagedInterval,
    clearAllTimers,
    activeTimeouts: timeouts,
    activeIntervals: intervals,
  };
}
