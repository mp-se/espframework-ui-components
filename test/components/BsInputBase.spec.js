import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BsInputBase from '../../src/components/BsInputBase.vue';

describe('BsInputBase', () => {
  it('renders label when provided', () => {
    const wrapper = mount(BsInputBase, {
      props: {
        label: 'Username',
      },
      slots: {
        default: '<input type="text" />',
      },
    });
    expect(wrapper.find('.form-label').text()).toBe('Username');
  });

  it('does not render label when undefined', () => {
    const wrapper = mount(BsInputBase, {
      props: {
        label: undefined,
      },
      slots: {
        default: '<input type="text" />',
      },
    });
    expect(wrapper.find('.form-label').exists()).toBe(false);
  });

  it('renders help text below the field', () => {
    const wrapper = mount(BsInputBase, {
      props: {
        help: 'Enter your username here',
      },
      slots: {
        default: '<input type="text" />',
      },
    });
    expect(wrapper.find('.form-text').text()).toBe('Enter your username here');
  });

  it('renders badge with count', () => {
    const wrapper = mount(BsInputBase, {
      props: {
        label: 'Items',
        badge: 5,
      },
      slots: {
        default: '<input type="text" />',
      },
    });
    const badge = wrapper.find('.badge');
    expect(badge.exists()).toBe(true);
    expect(badge.text()).toBe('5');
  });

  it('does not render badge when count is 0', () => {
    const wrapper = mount(BsInputBase, {
      props: {
        badge: 0,
      },
      slots: {
        default: '<input type="text" />',
      },
    });
    expect(wrapper.find('.badge').exists()).toBe(false);
  });

  it('applies width class when width prop is provided', () => {
    const wrapper = mount(BsInputBase, {
      props: {
        width: 6,
      },
      slots: {
        default: '<input type="text" />',
      },
    });
    expect(wrapper.find('.col-6').exists()).toBe(true);
  });

  it('does not apply width class when width is undefined', () => {
    const wrapper = mount(BsInputBase, {
      props: {
        width: undefined,
      },
      slots: {
        default: '<input type="text" />',
      },
    });
    expect(wrapper.find('[class*="col-"]').exists()).toBe(false);
  });

  it('validates width prop - accepts numbers 1-12', () => {
    const wrapper = mount(BsInputBase, {
      props: {
        width: 12,
      },
      slots: {
        default: '<input type="text" />',
      },
    });
    expect(wrapper.find('.col-12').exists()).toBe(true);
  });

  it('validates width prop - accepts responsive format strings', () => {
    const wrapper = mount(BsInputBase, {
      props: {
        width: 'md-6',
      },
      slots: {
        default: '<input type="text" />',
      },
    });
    expect(wrapper.find('.col-md-6').exists()).toBe(true);
  });

  it('renders slot content properly', () => {
    const wrapper = mount(BsInputBase, {
      slots: {
        default: '<input type="text" class="test-input" />',
      },
    });
    expect(wrapper.find('.test-input').exists()).toBe(true);
  });
});
