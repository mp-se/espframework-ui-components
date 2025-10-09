import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { BsFooter } from '../../dist/index.esm.js';

describe('BsFooter', () => {
  it('mounts', () => {
    const w = mount(BsFooter);
    expect(w.exists()).toBe(true);
  });
});
