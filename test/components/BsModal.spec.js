import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { BsModal } from '../../dist/index.esm.js';
import { isValidJson, isValidFormData } from '../../src/modules/utils.js';

describe('BsModal', () => {
  it('mounts', () => {
    const w = mount(BsModal);
    expect(w.exists()).toBe(true);
  });

  it('detects valid JSON using isValidJson utility', () => {
    const validJson = '{"name":"test","value":123}';
    expect(isValidJson(validJson)).toBe(true);
  });

  it('detects invalid JSON using isValidJson utility', () => {
    const invalidJson = '{"name":"test","value":123,}'; // trailing comma
    expect(isValidJson(invalidJson)).toBe(false);
  });

  it('detects FormData format using isValidFormData utility', () => {
    const formData = '?username=john&password=secret&age=30';
    expect(isValidFormData(formData)).toBe(true);
  });

  it('rejects non-FormData strings with isValidFormData', () => {
    const notFormData = 'just some plain text';
    expect(isValidFormData(notFormData)).toBe(false);

    const queryParams = 'username=john&password=secret&age=30'; // missing leading ?
    expect(isValidFormData(queryParams)).toBe(false);
  });

  it('JSON.parse throws error on invalid JSON', () => {
    const invalidJson = '{"broken":true,}';
    expect(() => JSON.parse(invalidJson)).toThrow();
  });

  it('JSON.parse succeeds on valid JSON', () => {
    const validJson = '{"name":"test","value":123}';
    const parsed = JSON.parse(validJson);
    expect(parsed).toEqual({ name: 'test', value: 123 });
  });

  it('JSON.stringify with indentation formats properly', () => {
    const json = '{"a":1,"b":{"c":2}}';
    const parsed = JSON.parse(json);
    const formatted = JSON.stringify(parsed, null, 2);
    expect(formatted).toContain('\n');
    expect(formatted).toMatch(/\s{2}/); // contains 2-space indentation
  });

  it('mounts with valid JSON model', () => {
    const validJson = '{"test":"data"}';
    const w = mount(BsModal, {
      props: {
        modelValue: validJson,
        button: 'Test',
        title: 'Test Modal',
        json: true,
      },
    });
    expect(w.exists()).toBe(true);
    expect(w.vm.modelValue).toBe(validJson);
  });

  it('mounts with FormData model', () => {
    const formData = 'key1=value1&key2=value2';
    const w = mount(BsModal, {
      props: {
        modelValue: formData,
        button: 'Test',
        title: 'Test Modal',
      },
    });
    expect(w.exists()).toBe(true);
    expect(w.vm.modelValue).toBe(formData);
  });

  it('mounts with MQTT format enabled', () => {
    const mqttData = 'topic1:{"key":"value"}|topic2:{"key2":"value2"}';
    const w = mount(BsModal, {
      props: {
        modelValue: mqttData,
        button: 'Test',
        title: 'Test Modal',
        mqtt: true,
      },
    });
    expect(w.exists()).toBe(true);
    expect(w.vm.mqtt).toBe(true);
  });

  it('component renders modal template correctly', () => {
    const w = mount(BsModal, {
      props: {
        modelValue: 'test content',
        button: 'Click Me',
        title: 'My Title',
      },
    });
    expect(w.text()).toContain('Click Me');
    expect(w.text()).toContain('My Title');
    expect(w.text()).toContain('test content');
  });

  it('component uses json prop to control validation', () => {
    const w = mount(BsModal, {
      props: {
        modelValue: '{"valid":"json"}',
        json: true,
      },
    });
    expect(w.vm.json).toBe(true);

    const w2 = mount(BsModal, {
      props: {
        modelValue: '{"valid":"json"}',
        json: false,
      },
    });
    expect(w2.vm.json).toBe(false);
  });
});
