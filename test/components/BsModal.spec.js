import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { BsModal } from '../../dist/index.esm.js';

describe('BsModal', () => {
  it('mounts', () => {
    const w = mount(BsModal);
    expect(w.exists()).toBe(true);
  });
});
