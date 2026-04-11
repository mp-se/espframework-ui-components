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
import BsCard from '../../src/components/BsCard.vue';

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
