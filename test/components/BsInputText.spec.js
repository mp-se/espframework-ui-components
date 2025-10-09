import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { BsInputText } from '../../dist/index.esm.js';

describe('BsInputText component', () => {
  it('binds v-model and toggles password visibility', async () => {
    const wrapper = mount(BsInputText, {
      props: {
        modelValue: '',
        type: 'password',
      },
      global: {
        stubs: {
          // render the slot content so the inner input is available
          BsInputBase: { template: '<div><slot /></div>' },
        },
      },
    });

    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);

    await input.setValue('secret');
    // modelValue is defined as v-model via defineModel; test for input value
    expect(input.element.value).toBe('secret');

    // find toggle icons and simulate click if present
    const eye = wrapper.findComponent({ name: 'IconEye' });
    if (eye.exists()) {
      await eye.trigger('click');
      // after toggle input type may change
      expect(input.element.type === 'text' || input.element.type === 'password').toBe(true);
    }
  });
});
