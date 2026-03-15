function readEnvVar(name: string): string | undefined {
  // 1) Check a runtime-injected global shim (useful for demos or non-Vite runtimes)
  try {
    if (
      globalThis &&
      (globalThis as any).__ENV__ &&
      typeof (globalThis as any).__ENV__[name] !== 'undefined'
    ) {
      return (globalThis as any).__ENV__[name];
    }
  } catch (e) {
    // ignore
  }

  // 2) Check Node-style process.env when running in Node
  try {
    if (typeof process !== 'undefined' && process.env && typeof process.env[name] !== 'undefined') {
      return process.env[name];
    }
  } catch (e) {
    // ignore
  }

  // 3) Try import.meta.env (works when bundlers inject it). Access inside try/catch to avoid
  // syntax/runtime errors in environments where import.meta is not present.
  try {
    if (import.meta && import.meta.env && typeof import.meta.env[name] !== 'undefined') {
      return import.meta.env[name] as string | undefined;
    }
  } catch (e) {
    // import.meta may not be available in some runtimes; ignore errors
  }

  return undefined;
}

export function logDebug(...args: any[]): void {
  const debugVal = readEnvVar('VITE_APP_DEBUG');
  // Treat '0', 'false', '', undefined as falsy; anything else truthy
  if (!debugVal) return;
  console.log('Debug', ...args);
}

export function logInfo(...args: any[]): void {
  console.log('Info', ...args);
}

export function logError(...args: any[]): void {
  console.log('Error', ...args);
}
