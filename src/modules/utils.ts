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

import { logDebug } from './logger';

/**
 * Round a numeric value to specified decimal places
 * @param val - Value to round
 * @param decimals - Number of decimal places
 * @returns Rounded value
 */
export function roundVal(val: number, decimals: number): number {
  return parseFloat(Number(val).toFixed(decimals));
}

/**
 * Convert specific gravity to Plato degrees
 * @param sg - Specific gravity value
 * @returns Plato degrees
 */
export function gravityToPlato(sg: number): number {
  return 135.997 * sg * sg * sg - 630.272 * sg * sg + 1111.14 * sg - 616.868;
}

/**
 * Convert Plato degrees to specific gravity
 * @param p - Plato degrees
 * @returns Specific gravity
 */
export function gravityToSG(p: number): number {
  return 1 + p / (258.6 - 227.1 * (p / 258.2));
}

/**
 * Convert Celsius to Fahrenheit
 * @param c - Temperature in Celsius
 * @returns Temperature in Fahrenheit
 */
export function tempToF(c: number): number {
  return c * 1.8 + 32.0;
}

/**
 * Convert Fahrenheit to Celsius
 * @param f - Temperature in Fahrenheit
 * @returns Temperature in Celsius
 */
export function tempToC(f: number): number {
  return (f - 32.0) / 1.8;
}

/**
 * Convert PSI (Pounds per Square Inch) to Bar
 * @param p - Pressure in PSI
 * @returns Pressure in Bar
 */
export function psiToBar(p: number): number {
  return p * 0.0689475729;
}

/**
 * Convert PSI (Pounds per Square Inch) to kPa (Kilopascals)
 * @param p - Pressure in PSI
 * @returns Pressure in kPa
 */
export function psiToKPa(p: number): number {
  return p * 6.89475729;
}

/**
 * Convert Bar to PSI (Pounds per Square Inch)
 * @param p - Pressure in Bar
 * @returns Pressure in PSI
 */
export function barToPsi(p: number): number {
  return p / 0.0689475729;
}

/**
 * Convert kPa (Kilopascals) to PSI (Pounds per Square Inch)
 * @param p - Pressure in kPa
 * @returns Pressure in PSI
 */
export function kpaToPsi(p: number): number {
  return p / 6.89475729;
}

/**
 * Convert kilograms to pounds
 * @param w - Weight in kilograms
 * @returns Weight in pounds
 */
export function weightKgToLbs(w: number): number {
  return w * 2.2046226218;
}

/**
 * Convert pounds to kilograms
 * @param w - Weight in pounds
 * @returns Weight in kilograms
 */
export function weightLbsToKg(w: number): number {
  return w / 2.2046226218;
}

/**
 * Convert centiliters to US fluid ounces
 * 1 cl = 0.338140225 US fl oz
 * @param cl - Volume in centiliters
 * @returns Volume in US fluid ounces
 */
export function volumeCLtoUSOZ(cl: number): number {
  return cl * 0.338140225;
}

/**
 * Convert US fluid ounces to centiliters
 * @param oz - Volume in US fluid ounces
 * @returns Volume in centiliters
 */
export function volumeUSOZtoCL(oz: number): number {
  return oz / 0.338140225;
}

/**
 * Convert centiliters to UK (imperial) fluid ounces
 * 1 cl = 0.351195720 UK fl oz
 * @param cl - Volume in centiliters
 * @returns Volume in UK fluid ounces
 */
export function volumeCLtoUKOZ(cl: number): number {
  return cl * 0.35119572;
}

/**
 * Convert UK (imperial) fluid ounces to centiliters
 * @param oz - Volume in UK fluid ounces
 * @returns Volume in centiliters
 */
export function volumeUKOZtoCL(oz: number): number {
  return oz / 0.35119572;
}

/**
 * Validate if string is valid JSON
 * @param s - String to validate
 * @returns True if valid JSON
 */
export function isValidJson(s: string): boolean {
  try {
    JSON.stringify(JSON.parse(s));
    return true;
  } catch (e) {
    logDebug('utils.isValidJson()', e);
  }
  return false;
}

/**
 * Validate if string is valid form data (starts with ?)
 * @param s - String to validate
 * @returns True if valid form data
 */
export function isValidFormData(s: string): boolean {
  if (s.startsWith('?')) return true;
  return false;
}

/**
 * Validate if string is valid MQTT data (contains |)
 * @param s - String to validate
 * @returns True if valid MQTT data
 */
export function isValidMqttData(s: string): boolean {
  if (s.indexOf('|') >= 0) return true;
  return false;
}

/**
 * Validate all forms with the `.needs-validation` class and apply Bootstrap styles.
 *
 * Behavior:
 * - Finds all forms matching `.needs-validation` in the document.
 * - Calls the native HTML5 `checkValidity()` on each form.
 * - Adds the `was-validated` class to show Bootstrap validation UI.
 * - Returns true if all forms are valid, false otherwise.
 *
 * Note: This function is safe to call in non-browser contexts (Node) — it will
 * short-circuit and return true if `document` is not available.
 *
 * @returns true if all matching forms are valid
 */
export function validateCurrentForm(): boolean {
  // If there's no DOM (e.g. running in Node), short-circuit and return true
  if (typeof document === 'undefined' || !document.querySelectorAll) {
    try {
      logDebug('validateCurrentForm: document not available, skipping validation');
    } catch {
      // ignore logging failures
    }
    return true;
  }

  let valid = true;
  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach((element: Element) => {
    const form = element as HTMLFormElement;
    if (!form.checkValidity()) valid = false;

    form.classList.add('was-validated');
  });

  return valid;
}

export interface FormatTimeOptions {
  input?: 's' | 'ms';
  compact?: boolean;
  decimals?: number;
}

/**
 * Format a time duration into a human-readable string.
 *
 * By default the input value `t` is treated as seconds. Set options.input = 'ms'
 * to treat the value as milliseconds.
 *
 * Options:
 * - input: 's' | 'ms' (default 's') - unit of the provided value
 * - compact: boolean (default false) - if true, return only the largest non-zero unit (e.g. "2h")
 * - decimals: number (default 0) - decimal places for seconds when needed
 *
 * Examples:
 * formatTime(3661) -> "1h 1m 1s"
 * formatTime(3661, { compact: true }) -> "1h"
 * formatTime(1500, { input: 'ms' }) -> "1s 500ms" (milliseconds are converted to seconds fraction)
 *
 * @param t - duration (seconds by default, milliseconds if options.input === 'ms')
 * @param options - Options object
 * @returns Human readable duration
 */
export function formatTime(t: number, options: FormatTimeOptions = {}): string {
  const { input = 's', compact = false, decimals = 0 } = options || {};

  if (t == null || Number.isNaN(Number(t))) return '';

  // Convert to seconds (may be fractional)
  let totalSeconds = Number(t);
  if (input === 'ms') totalSeconds = totalSeconds / 1000;

  const sign = totalSeconds < 0 ? '-' : '';
  totalSeconds = Math.abs(totalSeconds);

  const days = Math.floor(totalSeconds / 86400);
  totalSeconds -= days * 86400;

  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds -= hours * 3600;

  const minutes = Math.floor(totalSeconds / 60);
  totalSeconds -= minutes * 60;

  // seconds may be fractional
  const seconds = totalSeconds;

  const parts: string[] = [];
  if (days > 0) parts.push(days + 'd');
  if (hours > 0) parts.push(hours + 'h');
  if (minutes > 0) parts.push(minutes + 'm');

  // Format seconds with decimals when appropriate
  const formatSeconds = (s: number): string => {
    if (decimals > 0) return s.toFixed(decimals) + 's';
    // show integer seconds when fractional is effectively zero
    const intSec = Math.floor(s);
    if (Math.abs(s - intSec) < 1e-9) return intSec + 's';
    return s + 's';
  };

  // When there are no day/hour/minute parts, always include seconds (even 0s)
  if (parts.length === 0) {
    parts.push(formatSeconds(seconds));
  } else if (seconds >= 1) {
    // include seconds when >= 1s
    parts.push(formatSeconds(seconds));
  }

  // If compact requested, return only the largest non-zero unit
  if (compact) {
    const first = parts.find(p => !p.startsWith('0'));
    return sign + (first || '0s');
  }

  // Trim trailing zero-value parts (e.g., omit "0s" unless it's the only part)
  const trimmed = parts.filter(p => {
    if (p.startsWith('0') && parts.length > 1) return false;
    return true;
  });

  return sign + trimmed.join(' ');
}
