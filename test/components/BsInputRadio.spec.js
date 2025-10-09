import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { BsInputRadio } from '../../dist/index.esm.js';

describe('BsInputRadio', () => {
  it('renders radio inputs for provided options', () => {
    const w = mount(BsInputRadio, {
      props: { options: [{ label: 'One', value: 'one' }] },
      global: { stubs: { BsInputBase: { template: '<div><slot/></div>' } } },
    });
    const input = w.find('input[type="radio"]');
    expect(input.exists()).toBe(true);
  });
});
