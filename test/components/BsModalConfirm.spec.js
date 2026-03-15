import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BsModalConfirm from '../../src/components/BsModalConfirm.vue';

describe('BsModalConfirm', () => {
  it('mounts', () => {
    const w = mount(BsModalConfirm);
    expect(w.exists()).toBe(true);
  });
});
