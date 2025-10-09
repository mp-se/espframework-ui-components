import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { BsMessage } from '../../dist/index.esm.js';

describe('BsMessage', () => {
  it('mounts', () => {
    const w = mount(BsMessage);
    expect(w.exists()).toBe(true);
  });
});
