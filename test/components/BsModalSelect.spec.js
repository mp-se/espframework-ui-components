/*
 * @mp-se/espframework-ui-components
 * Copyright (c) 2021-2026 Magnus
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 */

import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BsModalSelect from '../../src/components/BsModalSelect.vue';
import BsSelect from '../../src/components/BsSelect.vue';

describe('BsModalSelect', () => {
  const defaultProps = {
    id: 'testModal',
    title: 'Select an Option',
    options: [
      { label: 'Option 1', value: 'opt1' },
      { label: 'Option 2', value: 'opt2' },
      { label: 'Option 3', value: 'opt3' },
    ],
  };

  it('renders hidden button with correct id', () => {
    const wrapper = mount(BsModalSelect, {
      props: defaultProps,
      global: {
        components: { BsSelect },
      },
    });

    const button = wrapper.find('button[type="button"][hidden]');
    expect(button.exists()).toBe(true);
    expect(button.attributes('id')).toBe('testModal');
  });

  it('renders modal with title', () => {
    const wrapper = mount(BsModalSelect, {
      props: defaultProps,
      global: {
        components: { BsSelect },
      },
    });

    const title = wrapper.find('.modal-title');
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe('Select an Option');
  });

  it('renders BsSelect component', () => {
    const wrapper = mount(BsModalSelect, {
      props: defaultProps,
      global: {
        components: { BsSelect },
      },
    });

    const select = wrapper.findComponent(BsSelect);
    expect(select.exists()).toBe(true);
  });

  it('displays message when provided', () => {
    const wrapper = mount(BsModalSelect, {
      props: {
        ...defaultProps,
        message: 'Please choose an option',
      },
      global: {
        components: { BsSelect },
      },
    });

    const message = wrapper.find('.modal-body p');
    expect(message.exists()).toBe(true);
    expect(message.text()).toBe('Please choose an option');
  });

  it('does not display message when not provided', () => {
    const wrapper = mount(BsModalSelect, {
      props: defaultProps,
      global: {
        components: { BsSelect },
      },
    });

    const message = wrapper.find('.modal-body p');
    expect(message.exists()).toBe(false);
  });

  it('calls callback with true and selected value on confirm', async () => {
    const callback = vi.fn();
    const wrapper = mount(BsModalSelect, {
      props: {
        ...defaultProps,
        callback,
      },
      global: {
        components: { BsSelect },
      },
    });

    // Set the selected value
    wrapper.vm.result = 'opt2';
    await wrapper.vm.$nextTick();

    // Click confirm button
    const confirmButton = wrapper.find('.btn-primary');
    await confirmButton.trigger('click');

    expect(callback).toHaveBeenCalledWith(true, 'opt2');
  });

  it('calls callback with false and empty value on cancel', async () => {
    const callback = vi.fn();
    const wrapper = mount(BsModalSelect, {
      props: {
        ...defaultProps,
        callback,
      },
      global: {
        components: { BsSelect },
      },
    });

    // Click cancel button
    const cancelButton = wrapper.findAll('.btn-secondary')[1]; // second secondary button
    await cancelButton.trigger('click');

    expect(callback).toHaveBeenCalledWith(false, '');
  });

  it('shows loading state when disabled', () => {
    const wrapper = mount(BsModalSelect, {
      props: {
        ...defaultProps,
        disabled: true,
      },
      global: {
        components: { BsSelect },
      },
    });

    const title = wrapper.find('.modal-title');
    expect(title.text()).toBe('Processing...');
  });

  it('disables confirm button when disabled prop is true', () => {
    const wrapper = mount(BsModalSelect, {
      props: {
        ...defaultProps,
        disabled: true,
      },
      global: {
        components: { BsSelect },
      },
    });

    const confirmButton = wrapper.find('.btn-primary');
    expect(confirmButton.attributes('disabled')).toBeDefined();
  });

  it('disables BsSelect when disabled prop is true', () => {
    const wrapper = mount(BsModalSelect, {
      props: {
        ...defaultProps,
        disabled: true,
      },
      global: {
        components: { BsSelect },
      },
    });

    const select = wrapper.findComponent(BsSelect);
    expect(select.props('disabled')).toBe(true);
  });

  it('does not call callback if not provided', async () => {
    const wrapper = mount(BsModalSelect, {
      props: {
        ...defaultProps,
        callback: undefined,
      },
      global: {
        components: { BsSelect },
      },
    });

    wrapper.vm.result = 'opt1';
    await wrapper.vm.$nextTick();

    const confirmButton = wrapper.find('.btn-primary');
    // Should not throw error
    await confirmButton.trigger('click');

    // Component should still work without callback
    expect(wrapper.vm.result).toBe('opt1');
  });

  it('renders modal with unique id based on component instance', () => {
    const wrapper1 = mount(BsModalSelect, {
      props: defaultProps,
      global: {
        components: { BsSelect },
      },
    });

    const wrapper2 = mount(BsModalSelect, {
      props: defaultProps,
      global: {
        components: { BsSelect },
      },
    });

    const modal1Id = wrapper1.find('.modal').attributes('id');
    const modal2Id = wrapper2.find('.modal').attributes('id');

    // IDs should be different due to $.uid
    expect(modal1Id).not.toBe(modal2Id);
  });

  it('passes options to BsSelect component', () => {
    const options = [
      { label: 'First', value: 'first' },
      { label: 'Second', value: 'second' },
    ];

    const wrapper = mount(BsModalSelect, {
      props: {
        ...defaultProps,
        options,
      },
      global: {
        components: { BsSelect },
      },
    });

    const select = wrapper.findComponent(BsSelect);
    expect(select.props('options')).toEqual(options);
  });

  it('handles empty options array', () => {
    const wrapper = mount(BsModalSelect, {
      props: {
        ...defaultProps,
        options: [],
      },
      global: {
        components: { BsSelect },
      },
    });

    const select = wrapper.findComponent(BsSelect);
    expect(select.props('options')).toEqual([]);
  });

  it('handles numeric select values', async () => {
    const callback = vi.fn();
    const numericOptions = [
      { label: 'One', value: 1 },
      { label: 'Two', value: 2 },
      { label: 'Three', value: 3 },
    ];

    const wrapper = mount(BsModalSelect, {
      props: {
        id: 'numericModal',
        title: 'Select Number',
        options: numericOptions,
        callback,
      },
      global: {
        components: { BsSelect },
      },
    });

    wrapper.vm.result = 2;
    await wrapper.vm.$nextTick();

    const confirmButton = wrapper.find('.btn-primary');
    await confirmButton.trigger('click');

    expect(callback).toHaveBeenCalledWith(true, 2);
  });

  it('handles boolean select values', async () => {
    const callback = vi.fn();
    const boolOptions = [
      { label: 'Enabled', value: true },
      { label: 'Disabled', value: false },
    ];

    const wrapper = mount(BsModalSelect, {
      props: {
        id: 'boolModal',
        title: 'Select Status',
        options: boolOptions,
        callback,
      },
      global: {
        components: { BsSelect },
      },
    });

    wrapper.vm.result = false;
    await wrapper.vm.$nextTick();

    const confirmButton = wrapper.find('.btn-primary');
    await confirmButton.trigger('click');

    expect(callback).toHaveBeenCalledWith(true, false);
  });

  it('updates result ref when selected value changes', async () => {
    const wrapper = mount(BsModalSelect, {
      props: defaultProps,
      global: {
        components: { BsSelect },
      },
    });

    expect(wrapper.vm.result).toBe('');

    wrapper.vm.result = 'opt2';
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.result).toBe('opt2');

    wrapper.vm.result = 'opt3';
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.result).toBe('opt3');
  });

  it('resets result after selection', async () => {
    const callback = vi.fn();
    const wrapper = mount(BsModalSelect, {
      props: {
        ...defaultProps,
        callback,
      },
      global: {
        components: { BsSelect },
      },
    });

    wrapper.vm.result = 'opt1';
    await wrapper.vm.$nextTick();

    const confirmButton = wrapper.find('.btn-primary');
    await confirmButton.trigger('click');

    expect(callback).toHaveBeenCalledWith(true, 'opt1');

    // Result should still contain the selected value (not reset automatically)
    expect(wrapper.vm.result).toBe('opt1');
  });

  it('correctly identifies cancel button among secondary buttons', async () => {
    const callback = vi.fn();
    const wrapper = mount(BsModalSelect, {
      props: {
        ...defaultProps,
        callback,
      },
      global: {
        components: { BsSelect },
      },
    });

    const secondaryButtons = wrapper.findAll('.btn-secondary');
    expect(secondaryButtons.length).toBeGreaterThanOrEqual(2);

    // Click the second secondary button (cancel, not the hidden trigger)
    const cancelButton = secondaryButtons[secondaryButtons.length - 1];
    await cancelButton.trigger('click');

    expect(callback).toHaveBeenCalledWith(false, '');
  });

  it('preserves selected value in result on cancel', async () => {
    const callback = vi.fn();
    const wrapper = mount(BsModalSelect, {
      props: {
        ...defaultProps,
        callback,
      },
      global: {
        components: { BsSelect },
      },
    });

    wrapper.vm.result = 'opt2';
    await wrapper.vm.$nextTick();

    const secondaryButtons = wrapper.findAll('.btn-secondary');
    const cancelButton = secondaryButtons[secondaryButtons.length - 1];
    await cancelButton.trigger('click');

    // Cancel passes empty string to callback but doesn't reset the result ref
    expect(callback).toHaveBeenCalledWith(false, '');
    expect(wrapper.vm.result).toBe('opt2');
  });

  it('handles rapid confirm/cancel button clicks', async () => {
    const callback = vi.fn();
    const wrapper = mount(BsModalSelect, {
      props: {
        ...defaultProps,
        callback,
      },
      global: {
        components: { BsSelect },
      },
    });

    wrapper.vm.result = 'opt1';

    const confirmButton = wrapper.find('.btn-primary');
    await confirmButton.trigger('click');
    await confirmButton.trigger('click'); // Double-click

    // Callback should be called twice (even though button is normally dismissed)
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenNthCalledWith(1, true, 'opt1');
    expect(callback).toHaveBeenNthCalledWith(2, true, 'opt1');
  });

  it('applies correct Bootstrap modal class structure', () => {
    const wrapper = mount(BsModalSelect, {
      props: defaultProps,
      global: {
        components: { BsSelect },
      },
    });

    const modal = wrapper.find('.modal');
    expect(modal.classes()).toContain('fade');

    const dialog = wrapper.find('.modal-dialog');
    expect(dialog.exists()).toBe(true);

    const content = wrapper.find('.modal-content');
    expect(content.exists()).toBe(true);
    expect(content.classes()).toContain('p-4');
  });

  it('sets correct modal attributes for accessibility', () => {
    const wrapper = mount(BsModalSelect, {
      props: defaultProps,
      global: {
        components: { BsSelect },
      },
    });

    const modal = wrapper.find('.modal');
    expect(modal.attributes('tabindex')).toBe('-1');
    expect(modal.attributes('aria-hidden')).toBe('true');
  });
});
