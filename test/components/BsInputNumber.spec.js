import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { BsInputNumber } from '../../dist/index.esm.js';

describe('BsInputNumber component', () => {
  it('renders input[type=number] and shows unit when provided', async () => {
    const wrapper = mount(BsInputNumber, {
      props: {
        modelValue: 5,
        unit: 'kg',
      },
      global: {
        stubs: {
          BsInputBase: { template: '<div><slot /></div>' },
        },
      },
    });

    const input = wrapper.find('input[type="number"]');
    expect(input.exists()).toBe(true);
    expect(input.element.value).toBe('5');

    const unit = wrapper.find('.input-group-text');
    expect(unit.exists()).toBe(true);
    expect(unit.text()).toBe('kg');
  });
});
