import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BsMessage from '../../src/components/BsMessage.vue';

describe('BsMessage', () => {
  it('mounts', () => {
    const w = mount(BsMessage);
    expect(w.exists()).toBe(true);
  });
});
