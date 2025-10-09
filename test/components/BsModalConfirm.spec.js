import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { BsModalConfirm } from '../../dist/index.esm.js';

describe('BsModalConfirm', () => {
  it('mounts', () => {
    const w = mount(BsModalConfirm);
    expect(w.exists()).toBe(true);
  });
});
