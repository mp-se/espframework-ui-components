import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { BsProgress } from '../../dist/index.esm.js';

describe('BsProgress', () => {
  it('renders progress element', () => {
    const w = mount(BsProgress);
    const p = w.find('.progress');
    expect(p.exists()).toBe(true);
  });
});
