import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BsMenuBar from '../../src/components/BsMenuBar.vue';

describe('BsMenuBar', () => {
  it('mounts', () => {
    const w = mount(BsMenuBar);
    expect(w.exists()).toBe(true);
  });
});
