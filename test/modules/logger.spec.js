import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { logDebug, logInfo, logError } from '../../src/modules/logger.js';

describe('logger', () => {
  const originalConsole = {
    log: console.log,
  };

  beforeEach(() => {
    // Mock console.log
    console.log = vi.fn();

    // Reset environment variables
    delete process.env.VITE_APP_DEBUG;
  });

  afterEach(() => {
    // Restore console
    console.log = originalConsole.log;

    vi.clearAllMocks();
  });

  describe('logDebug', () => {
    it('does not log when VITE_APP_DEBUG is not set', () => {
      logDebug('TestContext', 'Test message', { test: 'data' });

      expect(console.log).not.toHaveBeenCalled();
    });

    it('logs debug messages when VITE_APP_DEBUG is set to true', () => {
      process.env.VITE_APP_DEBUG = 'true';

      logDebug('TestContext', 'Test message', { test: 'data' });

      expect(console.log).toHaveBeenCalledWith('Debug', 'TestContext', 'Test message', {
        test: 'data',
      });
    });

    it('logs debug messages when VITE_APP_DEBUG is set to a truthy value', () => {
      process.env.VITE_APP_DEBUG = '1';

      logDebug('Context', 'Message');

      expect(console.log).toHaveBeenCalledWith('Debug', 'Context', 'Message');
    });

    it('does not log when VITE_APP_DEBUG is set to empty string', () => {
      process.env.VITE_APP_DEBUG = '';

      logDebug('Context', 'Message');

      expect(console.log).not.toHaveBeenCalled();
    });

    it('logs when VITE_APP_DEBUG is set to "0" (string is truthy)', () => {
      process.env.VITE_APP_DEBUG = '0'; // Note: any non-empty string is truthy

      logDebug('Context', 'Message');

      expect(console.log).toHaveBeenCalledWith('Debug', 'Context', 'Message');
    });

    it('handles multiple arguments without data', () => {
      process.env.VITE_APP_DEBUG = 'true';

      logDebug('Module', 'Action');

      expect(console.log).toHaveBeenCalledWith('Debug', 'Module', 'Action');
    });

    it('logs with object data when enabled', () => {
      process.env.VITE_APP_DEBUG = 'true';

      const data = { key: 'value', nested: { deep: 'data' } };
      logDebug('Context', 'Message', data);

      expect(console.log).toHaveBeenCalledWith('Debug', 'Context', 'Message', data);
    });

    it('logs when VITE_APP_DEBUG is set to any non-empty string', () => {
      process.env.VITE_APP_DEBUG = 'false'; // Note: non-empty string is truthy in JS

      logDebug('Context', 'Message');

      expect(console.log).toHaveBeenCalledWith('Debug', 'Context', 'Message');
    });
  });

  describe('logInfo', () => {
    it('always logs info messages', () => {
      logInfo('TestContext', 'Test message', { test: 'data' });

      expect(console.log).toHaveBeenCalledWith('Info', 'TestContext', 'Test message', {
        test: 'data',
      });
    });

    it('logs info messages without data', () => {
      logInfo('TestContext', 'Test message');

      expect(console.log).toHaveBeenCalledWith('Info', 'TestContext', 'Test message');
    });

    it('logs with multiple strings', () => {
      logInfo('Module', 'Action', 'Additional info');

      expect(console.log).toHaveBeenCalledWith('Info', 'Module', 'Action', 'Additional info');
    });

    it('logs with null data', () => {
      logInfo('Context', 'Message', null);

      expect(console.log).toHaveBeenCalledWith('Info', 'Context', 'Message', null);
    });

    it('logs with object data', () => {
      const data = { id: 123, status: 'active' };
      logInfo('Context', 'Message', data);

      expect(console.log).toHaveBeenCalledWith('Info', 'Context', 'Message', data);
    });

    it('logs error objects', () => {
      const error = new Error('Test error');
      logInfo('Context', 'Message', error);

      expect(console.log).toHaveBeenCalledWith('Info', 'Context', 'Message', error);
    });
  });

  describe('logError', () => {
    it('always logs error messages', () => {
      logError('TestContext', 'Test error message', { error: 'details' });

      expect(console.log).toHaveBeenCalledWith('Error', 'TestContext', 'Test error message', {
        error: 'details',
      });
    });

    it('logs error messages without data', () => {
      logError('TestContext', 'Test error message');

      expect(console.log).toHaveBeenCalledWith('Error', 'TestContext', 'Test error message');
    });

    it('logs with multiple strings', () => {
      logError('Module', 'Action failed', 'Additional context');

      expect(console.log).toHaveBeenCalledWith(
        'Error',
        'Module',
        'Action failed',
        'Additional context'
      );
    });

    it('logs with null data', () => {
      logError('Context', 'Error message', null);

      expect(console.log).toHaveBeenCalledWith('Error', 'Context', 'Error message', null);
    });

    it('logs with Error object', () => {
      const error = new Error('Something went wrong');
      logError('Context', 'Message', error);

      expect(console.log).toHaveBeenCalledWith('Error', 'Context', 'Message', error);
    });

    it('logs error details', () => {
      logError('APIError', 'Request failed', {
        statusCode: 500,
        message: 'Internal Server Error',
      });

      expect(console.log).toHaveBeenCalledWith('Error', 'APIError', 'Request failed', {
        statusCode: 500,
        message: 'Internal Server Error',
      });
    });

    it('logs with empty string data', () => {
      logError('Context', 'Message', '');

      expect(console.log).toHaveBeenCalledWith('Error', 'Context', 'Message', '');
    });
  });

  describe('Logger Consistency', () => {
    it('logInfo and logError always log regardless of environment', () => {
      delete process.env.VITE_APP_DEBUG;

      logInfo('ctx', 'info message');
      logError('ctx', 'error message');

      expect(console.log).toHaveBeenCalledTimes(2);
      expect(console.log).toHaveBeenNthCalledWith(1, 'Info', 'ctx', 'info message');
      expect(console.log).toHaveBeenNthCalledWith(2, 'Error', 'ctx', 'error message');
    });

    it('all log functions accept variable arguments', () => {
      process.env.VITE_APP_DEBUG = 'true';

      expect(() => {
        logDebug('arg1', 'arg2', 'arg3', { data: 'test' });
        logInfo('arg1', 'arg2', 'arg3', { data: 'test' });
        logError('arg1', 'arg2', 'arg3', { data: 'test' });
      }).not.toThrow();
    });

    it('all log functions handle complex nested data', () => {
      process.env.VITE_APP_DEBUG = 'true';

      const complexData = {
        level1: {
          level2: {
            level3: [1, 2, 3],
            value: 'deep',
          },
        },
        array: [{ id: 1 }, { id: 2 }],
      };

      expect(() => {
        logDebug('Context', 'Message', complexData);
        logInfo('Context', 'Message', complexData);
        logError('Context', 'Message', complexData);
      }).not.toThrow();

      expect(console.log).toHaveBeenCalledTimes(3);
    });
  });

  describe('Logger Environment Variable Variations', () => {
    it('treats "yes" as truthy for debug', () => {
      process.env.VITE_APP_DEBUG = 'yes';

      logDebug('ctx', 'msg');

      expect(console.log).toHaveBeenCalledWith('Debug', 'ctx', 'msg');
    });

    it('treats any non-empty string as truthy for debug', () => {
      process.env.VITE_APP_DEBUG = 'enabled';

      logDebug('ctx', 'msg');

      expect(console.log).toHaveBeenCalledWith('Debug', 'ctx', 'msg');
    });

    it('respects debug flag changes between calls', () => {
      logDebug('ctx', 'msg1');
      expect(console.log).not.toHaveBeenCalled();

      process.env.VITE_APP_DEBUG = 'true';
      logDebug('ctx', 'msg2');
      expect(console.log).toHaveBeenCalledWith('Debug', 'ctx', 'msg2');

      vi.clearAllMocks();
      delete process.env.VITE_APP_DEBUG;
      logDebug('ctx', 'msg3');
      expect(console.log).not.toHaveBeenCalled();
    });
  });
});
