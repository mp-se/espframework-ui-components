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
import BsInputNumber from '../../src/components/BsInputNumber.vue';

describe('BsInputNumber component', () => {
  it('renders input[type=number] and shows unit when provided', async () => {
    const wrapper = mount(BsInputNumber, {
      props: {
        modelValue: 5,
        unit: 'kg',
      },
      global: {
        stubs: {
          BsInputBase: { template: '<div><slot /></div>' },
        },
      },
    });

    const input = wrapper.find('input[type="number"]');
    expect(input.exists()).toBe(true);
    expect(input.element.value).toBe('5');

    const unit = wrapper.find('.input-group-text');
    expect(unit.exists()).toBe(true);
    expect(unit.text()).toBe('kg');
  });
});
