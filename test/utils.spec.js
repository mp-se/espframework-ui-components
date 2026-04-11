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

import { describe, it, expect, beforeEach } from 'vitest';
import {
  roundVal,
  gravityToPlato,
  gravityToSG,
  tempToF,
  tempToC,
  psiToBar,
  psiToKPa,
  barToPsi,
  kpaToPsi,
  weightKgToLbs,
  weightLbsToKg,
  volumeCLtoUSOZ,
  volumeUSOZtoCL,
  volumeCLtoUKOZ,
  volumeUKOZtoCL,
  isValidJson,
  isValidFormData,
  isValidMqttData,
  validateCurrentForm,
  formatTime,
} from '../src/modules/utils.js';

describe('utils', () => {
  it('roundVal rounds to specified decimals', () => {
    expect(roundVal(1.2345, 2)).toBeCloseTo(1.23, 2);
  });

  it('temperature conversions', () => {
    expect(tempToF(0)).toBe(32);
    expect(tempToC(32)).toBeCloseTo(0, 6);
  });

  it('pressure conversions', () => {
    const psi = 14.5037738;
    expect(psiToBar(psi)).toBeCloseTo(1, 3);
    expect(barToPsi(1)).toBeCloseTo(psi, 3);

    expect(psiToKPa(1)).toBeCloseTo(6.89475729, 6);
    expect(kpaToPsi(6.89475729)).toBeCloseTo(1, 6);
  });

  it('weight conversions', () => {
    // 1 kg = 2.2046226218 lbs
    expect(weightKgToLbs(1)).toBeCloseTo(2.2046226218, 8);
    expect(weightLbsToKg(2.2046226218)).toBeCloseTo(1, 8);

    // Round-trip conversions
    const kg = 10;
    const lbs = weightKgToLbs(kg);
    expect(weightLbsToKg(lbs)).toBeCloseTo(kg, 8);
  });

  it('weight conversions - edge cases', () => {
    // Zero
    expect(weightKgToLbs(0)).toBeCloseTo(0, 8);
    expect(weightLbsToKg(0)).toBeCloseTo(0, 8);

    // Negative values
    expect(weightKgToLbs(-5)).toBeCloseTo(-11.023113109, 5);
    expect(weightLbsToKg(-10)).toBeCloseTo(-4.535923699, 5);

    // Fractional values
    expect(weightKgToLbs(0.5)).toBeCloseTo(1.1023113109, 5);
    expect(weightLbsToKg(1.1)).toBeCloseTo(0.49895161, 5);

    // Large values
    expect(weightKgToLbs(1000)).toBeCloseTo(2204.6226218, 2);
    expect(weightLbsToKg(1000)).toBeCloseTo(453.59236994, 2);
  });

  it('volume conversions - US fluid ounces', () => {
    // 1 cl = 0.338140225 US fl oz
    expect(volumeCLtoUSOZ(1)).toBeCloseTo(0.338140225, 8);
    expect(volumeUSOZtoCL(0.338140225)).toBeCloseTo(1, 8);

    // Round-trip conversions
    const cl = 100;
    const oz = volumeCLtoUSOZ(cl);
    expect(volumeUSOZtoCL(oz)).toBeCloseTo(cl, 8);
  });

  it('volume conversions - US fluid ounces edge cases', () => {
    // Zero
    expect(volumeCLtoUSOZ(0)).toBeCloseTo(0, 8);
    expect(volumeUSOZtoCL(0)).toBeCloseTo(0, 8);

    // Negative
    expect(volumeCLtoUSOZ(-100)).toBeCloseTo(-33.8140225, 4);
    expect(volumeUSOZtoCL(-10)).toBeCloseTo(-29.57353, 4);

    // Fractional
    expect(volumeCLtoUSOZ(0.5)).toBeCloseTo(0.1690701125, 8);
    expect(volumeUSOZtoCL(0.5)).toBeCloseTo(1.4786765, 4);

    // Large values
    expect(volumeCLtoUSOZ(1000)).toBeCloseTo(338.140225, 3);
    expect(volumeUSOZtoCL(1000)).toBeCloseTo(2957.353, 1);
  });

  it('volume conversions - UK fluid ounces', () => {
    // 1 cl = 0.35119572 UK fl oz
    expect(volumeCLtoUKOZ(1)).toBeCloseTo(0.35119572, 8);
    expect(volumeUKOZtoCL(0.35119572)).toBeCloseTo(1, 8);

    // Round-trip conversions
    const cl = 100;
    const oz = volumeCLtoUKOZ(cl);
    expect(volumeUKOZtoCL(oz)).toBeCloseTo(cl, 8);
  });

  it('volume conversions - UK fluid ounces edge cases', () => {
    // Zero
    expect(volumeCLtoUKOZ(0)).toBeCloseTo(0, 8);
    expect(volumeUKOZtoCL(0)).toBeCloseTo(0, 8);

    // Negative
    expect(volumeCLtoUKOZ(-100)).toBeCloseTo(-35.119572, 4);
    expect(volumeUKOZtoCL(-10)).toBeCloseTo(-28.4742, 3);

    // Fractional
    expect(volumeCLtoUKOZ(0.5)).toBeCloseTo(0.1755979, 7);
    expect(volumeUKOZtoCL(0.5)).toBeCloseTo(1.4237, 3);

    // Large values
    expect(volumeCLtoUKOZ(1000)).toBeCloseTo(351.19572, 3);
    expect(volumeUKOZtoCL(1000)).toBeCloseTo(2847.415, 1);
  });

  it('gravity conversions produce numbers', () => {
    const sg = 1.05;
    const p = gravityToPlato(sg);
    expect(typeof p).toBe('number');
    const sg2 = gravityToSG(p);
    expect(typeof sg2).toBe('number');
  });

  it('validates json/form/mqtt strings', () => {
    expect(isValidJson('{"a":1}')).toBe(true);
    expect(isValidJson('not-json')).toBe(false);

    expect(isValidFormData('?a=1')).toBe(true);
    expect(isValidFormData('a=1')).toBe(false);

    expect(isValidMqttData('topic|payload')).toBe(true);
    expect(isValidMqttData('nopipe')).toBe(false);
  });

  describe('validateCurrentForm (DOM)', () => {
    let form;

    beforeEach(() => {
      // reset document body
      document.body.innerHTML = '';
      form = document.createElement('form');
      form.className = 'needs-validation';
      const input = document.createElement('input');
      input.required = true;
      input.name = 'f';
      form.appendChild(input);
      document.body.appendChild(form);
    });

    it('returns false for invalid form and adds was-validated', () => {
      const ok = validateCurrentForm();
      expect(ok).toBe(false);
      expect(form.classList.contains('was-validated')).toBe(true);
    });

    it('returns true for valid form', () => {
      const input = form.querySelector('input');
      input.value = 'x';
      const ok = validateCurrentForm();
      expect(ok).toBe(true);
      expect(form.classList.contains('was-validated')).toBe(true);
    });
  });

  describe('formatTime', () => {
    it('formats seconds into h/m/s', () => {
      expect(formatTime(3661)).toBe('1h 1m 1s');
    });

    it('supports compact mode', () => {
      expect(formatTime(3661, { compact: true })).toBe('1h');
    });

    it('supports ms input and fractional seconds', () => {
      expect(formatTime(1500, { input: 'ms' })).toBe('1.5s');
    });

    it('handles negative durations', () => {
      expect(formatTime(-61)).toBe('-1m 1s');
    });
  });
});
