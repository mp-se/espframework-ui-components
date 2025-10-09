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
