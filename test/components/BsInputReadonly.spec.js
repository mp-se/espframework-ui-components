import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { BsInputReadonly } from '../../dist/index.esm.js';

describe('BsInputReadonly', () => {
  it('renders input', () => {
    const w = mount(BsInputReadonly, {
      global: {
        stubs: { BsInputBase: { template: '<div><slot/></div>' } },
      },
    });
    const input = w.find('input');
    expect(input.exists()).toBe(true);
  });
});
