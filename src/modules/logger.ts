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

function readEnvVar(name: string): string | undefined {
  // 1) Check a runtime-injected global shim (useful for demos or non-Vite runtimes)
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- runtime-injected global
    const env = (globalThis as any).__ENV__;
    if (env && typeof env[name] !== 'undefined') {
      return env[name];
    }
  } catch {
    // ignore
  }

  // 2) Check Node-style process.env when running in Node
  try {
    if (typeof process !== 'undefined' && process.env && typeof process.env[name] !== 'undefined') {
      return process.env[name];
    }
  } catch {
    // ignore
  }

  // 3) Try import.meta.env (works when bundlers inject it). Access inside try/catch to avoid
  // syntax/runtime errors in environments where import.meta is not present.
  try {
    if (import.meta && import.meta.env && typeof import.meta.env[name] !== 'undefined') {
      return import.meta.env[name] as string | undefined;
    }
  } catch {
    // import.meta may not be available in some runtimes; ignore errors
  }

  return undefined;
}

export function logDebug(...args: unknown[]): void {
  const debugVal = readEnvVar('VITE_APP_DEBUG');
  // Treat '0', 'false', '', undefined as falsy; anything else truthy
  if (!debugVal) return;
  console.log('Debug', ...args);
}

export function logInfo(...args: unknown[]): void {
  console.log('Info', ...args);
}

export function logError(...args: unknown[]): void {
  console.log('Error', ...args);
}
