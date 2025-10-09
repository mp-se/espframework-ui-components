import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { BsInputSwitch } from '../../dist/index.esm.js';

describe('BsInputSwitch component', () => {
  it('renders checkbox switch and toggles value', async () => {
    const wrapper = mount(BsInputSwitch, {
      props: {
        modelValue: false,
      },
      global: {
        stubs: {
          BsInputBase: { template: '<div><slot /></div>' },
        },
      },
    });

    const input = wrapper.find('input[type="checkbox"]');
    expect(input.exists()).toBe(true);
    expect(input.element.checked).toBe(false);

    await input.setChecked(true);
    expect(input.element.checked).toBe(true);
  });
});
