import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BsDropdown from '../../src/components/BsDropdown.vue';

describe('BsDropdown', () => {
  it('mounts', () => {
    const w = mount(BsDropdown);
    expect(w.exists()).toBe(true);
  });
});
