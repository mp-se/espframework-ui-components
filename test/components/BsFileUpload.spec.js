import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { BsFileUpload } from '../../dist/index.esm.js';

describe('BsFileUpload', () => {
  it('has file input', () => {
    const w = mount(BsFileUpload, {
      global: {
        stubs: { BsInputBase: { template: '<div><slot/></div>' } },
      },
    });
    const input = w.find('input[type="file"]');
    expect(input.exists()).toBe(true);
  });
});
