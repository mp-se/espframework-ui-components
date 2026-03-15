import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BsInputTextArea from '../../src/components/BsInputTextArea.vue';

describe('BsInputTextArea', () => {
  it('renders textarea', () => {
    const w = mount(BsInputTextArea, {
      global: {
        stubs: { BsInputBase: { template: '<div><slot/></div>' } },
      },
    });
    const ta = w.find('textarea');
    expect(ta.exists()).toBe(true);
  });
});
