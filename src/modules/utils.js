import { logDebug } from './logger.js';

/**
 * Round a numeric value to specified decimal places
 * @param {number} val - Value to round
 * @param {number} decimals - Number of decimal places
 * @returns {number} Rounded value
 */
export function roundVal(val, decimals) {
  return parseFloat(Number(val).toFixed(decimals));
}

/**
 * Convert specific gravity to Plato degrees
 * @param {number} sg - Specific gravity value
 * @returns {number} Plato degrees
 */
export function gravityToPlato(sg) {
  return 135.997 * sg * sg * sg - 630.272 * sg * sg + 1111.14 * sg - 616.868;
}

/**
 * Convert Plato degrees to specific gravity
 * @param {number} p - Plato degrees
 * @returns {number} Specific gravity
 */
export function gravityToSG(p) {
  return 1 + p / (258.6 - 227.1 * (p / 258.2));
}

/**
 * Convert Celsius to Fahrenheit
 * @param {number} c - Temperature in Celsius
 * @returns {number} Temperature in Fahrenheit
 */
export function tempToF(c) {
  return c * 1.8 + 32.0;
}

/**
 * Convert Fahrenheit to Celsius
 * @param {number} f - Temperature in Fahrenheit
 * @returns {number} Temperature in Celsius
 */
export function tempToC(f) {
  return (f - 32.0) / 1.8;
}

/**
 * Convert PSI (Pounds per Square Inch) to Bar
 * @param {number} p - Pressure in PSI
 * @returns {number} Pressure in Bar
 */
export function psiToBar(p) {
  return p * 0.0689475729;
}

/**
 * Convert PSI (Pounds per Square Inch) to kPa (Kilopascals)
 * @param {number} p - Pressure in PSI
 * @returns {number} Pressure in kPa
 */
export function psiToKPa(p) {
  return p * 6.89475729;
}

/**
 * Convert Bar to PSI (Pounds per Square Inch)
 * @param {number} p - Pressure in Bar
 * @returns {number} Pressure in PSI
 */
export function barToPsi(p) {
  return p / 0.0689475729;
}

/**
 * Convert kPa (Kilopascals) to PSI (Pounds per Square Inch)
 * @param {number} p - Pressure in kPa
 * @returns {number} Pressure in PSI
 */
export function kpaToPsi(p) {
  return p / 6.89475729;
}

/**
 * Validate if string is valid JSON
 * @param {string} s - String to validate
 * @returns {boolean} True if valid JSON
 */
export function isValidJson(s) {
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
 * @param {string} s - String to validate
 * @returns {boolean} True if valid form data
 */
export function isValidFormData(s) {
  if (s.startsWith('?')) return true;
  return false;
}

/**
 * Validate if string is valid MQTT data (contains |)
 * @param {string} s - String to validate
 * @returns {boolean} True if valid MQTT data
 */
export function isValidMqttData(s) {
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
 * @returns {boolean} true if all matching forms are valid
 */
export function validateCurrentForm() {
  // If there's no DOM (e.g. running in Node), short-circuit and return true
  if (typeof document === 'undefined' || !document.querySelectorAll) {
    try {
      logDebug('validateCurrentForm: document not available, skipping validation');
    } catch (e) {
      // ignore logging failures
    }
    return true;
  }

  let valid = true;
  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach(form => {
    if (!form.checkValidity()) valid = false;

    form.classList.add('was-validated');
  });

  return valid;
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
 * @param {number} t - duration (seconds by default, milliseconds if options.input === 'ms')
 * @param {Object} [options]
 * @param {'s'|'ms'} [options.input='s']
 * @param {boolean} [options.compact=false]
 * @param {number} [options.decimals=0]
 * @returns {string} Human readable duration
 */
export function formatTime(t, options = {}) {
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

  const parts = [];
  if (days > 0) parts.push(days + 'd');
  if (hours > 0) parts.push(hours + 'h');
  if (minutes > 0) parts.push(minutes + 'm');

  // Format seconds with decimals when appropriate
  const formatSeconds = s => {
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
