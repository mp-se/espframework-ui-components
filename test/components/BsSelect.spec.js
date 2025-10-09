import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { BsSelect } from '../../dist/index.esm.js';

describe('BsSelect', () => {
  it('renders select element', () => {
    const w = mount(BsSelect);
    const s = w.find('select');
    expect(s.exists()).toBe(true);
  });
});
