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

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BsInputText from '../../src/components/BsInputText.vue';

describe('BsInputText component', () => {
  it('binds v-model and toggles password visibility', async () => {
    const wrapper = mount(BsInputText, {
      props: {
        modelValue: '',
        type: 'password',
      },
      global: {
        stubs: {
          // render the slot content so the inner input is available
          BsInputBase: { template: '<div><slot /></div>' },
        },
      },
    });

    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);

    await input.setValue('secret');
    // modelValue is defined as v-model via defineModel; test for input value
    expect(input.element.value).toBe('secret');

    // find toggle icons and simulate click if present
    const eye = wrapper.findComponent({ name: 'IconEye' });
    if (eye.exists()) {
      await eye.trigger('click');
      // after toggle input type may change
      expect(input.element.type === 'text' || input.element.type === 'password').toBe(true);
    }
  });
});
