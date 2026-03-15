import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BsFooter from '../../src/components/BsFooter.vue';

describe('BsFooter', () => {
  it('mounts', () => {
    const w = mount(BsFooter);
    expect(w.exists()).toBe(true);
  });
});
