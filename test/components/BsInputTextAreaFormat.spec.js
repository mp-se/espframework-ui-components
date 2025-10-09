import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { BsInputTextAreaFormat } from '../../dist/index.esm.js';

describe('BsInputTextAreaFormat', () => {
  it('renders textarea', () => {
    const w = mount(BsInputTextAreaFormat, {
      global: {
        stubs: { BsInputBase: { template: '<div><slot/></div>' } },
      },
    });
    const ta = w.find('textarea');
    expect(ta.exists()).toBe(true);
  });
});
