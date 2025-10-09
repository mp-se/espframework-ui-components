import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { BsCard } from '../../dist/index.esm.js';

describe('BsCard component', () => {
  it('renders header, title and slot content with correct classes', () => {
    const wrapper = mount(BsCard, {
      props: {
        header: 'My Header',
        title: 'My Title',
        color: 'primary',
      },
      slots: {
        default: 'Card body content',
      },
    });

    // header
    const header = wrapper.find('.card-header');
    expect(header.exists()).toBe(true);
    expect(header.text()).toBe('My Header');
    expect(header.classes()).toContain('bg-primary-subtle');

    // title
    const title = wrapper.find('.card-title');
    expect(title.exists()).toBe(true);
    expect(title.text()).toContain('My Title');

    // slot content
    const body = wrapper.find('.card-text');
    expect(body.exists()).toBe(true);
    expect(body.text()).toBe('Card body content');
  });
});
