import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BsProgress from '../../src/components/BsProgress.vue';

describe('BsProgress', () => {
  it('renders progress element', () => {
    const w = mount(BsProgress);
    const p = w.find('.progress');
    expect(p.exists()).toBe(true);
  });
});
