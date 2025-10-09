import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { BsDropdown } from '../../dist/index.esm.js';

describe('BsDropdown', () => {
  it('mounts', () => {
    const w = mount(BsDropdown);
    expect(w.exists()).toBe(true);
  });
});
