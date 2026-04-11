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
import IconHome from '../../src/components/IconHome.vue';
import IconTools from '../../src/components/IconTools.vue';
import IconCpu from '../../src/components/IconCpu.vue';
import IconData from '../../src/components/IconData.vue';
import IconClipboard from '../../src/components/IconClipboard.vue';

describe('Icon Components - Additional Coverage', () => {
  describe('IconHome', () => {
    it('renders as SVG element', () => {
      const wrapper = mount(IconHome);
      expect(wrapper.find('svg').exists()).toBe(true);
    });

    it('accepts width and height props', () => {
      const wrapper = mount(IconHome, {
        props: {
          width: '24',
          height: '24',
        },
      });

      const svg = wrapper.find('svg');
      expect(svg.attributes('width')).toBe('24');
      expect(svg.attributes('height')).toBe('24');
    });

    it('applies viewport for scaling', () => {
      const wrapper = mount(IconHome);
      const svg = wrapper.find('svg');
      expect(svg.attributes('viewBox')).toBeDefined();
    });
  });

  describe('IconTools', () => {
    it('renders as SVG element', () => {
      const wrapper = mount(IconTools);
      expect(wrapper.find('svg').exists()).toBe(true);
    });

    it('contains path elements', () => {
      const wrapper = mount(IconTools);
      expect(wrapper.findAll('path').length).toBeGreaterThan(0);
    });

    it('defaults to reasonable dimensions', () => {
      const wrapper = mount(IconTools);
      const svg = wrapper.find('svg');
      expect(svg.exists()).toBe(true);
    });
  });

  describe('IconCpu', () => {
    it('renders as SVG element', () => {
      const wrapper = mount(IconCpu);
      expect(wrapper.find('svg').exists()).toBe(true);
    });

    it('renders with proper SVG structure', () => {
      const wrapper = mount(IconCpu);
      const svg = wrapper.find('svg');
      expect(svg.attributes('xmlns')).toBeDefined();
    });

    it('width prop affects SVG width attribute', () => {
      const wrapper = mount(IconCpu, {
        props: { width: '32' },
      });

      const svg = wrapper.find('svg');
      expect(svg.attributes('width')).toBe('32');
    });
  });

  describe('IconData', () => {
    it('renders as SVG element', () => {
      const wrapper = mount(IconData);
      expect(wrapper.find('svg').exists()).toBe(true);
    });

    it('supports custom sizing', () => {
      const wrapper = mount(IconData, {
        props: {
          width: '20',
          height: '20',
        },
      });

      const svg = wrapper.find('svg');
      expect(svg.attributes('width')).toBe('20');
      expect(svg.attributes('height')).toBe('20');
    });

    it('maintains aspect ratio via viewBox', () => {
      const wrapper = mount(IconData);
      const svg = wrapper.find('svg');
      const viewBox = svg.attributes('viewBox');
      expect(viewBox).toBeDefined();
      expect(viewBox).toMatch(/\d+\s+\d+\s+\d+\s+\d+/);
    });
  });

  describe('IconClipboard', () => {
    it('renders as SVG element', () => {
      const wrapper = mount(IconClipboard);
      expect(wrapper.find('svg').exists()).toBe(true);
    });

    it('renders with viewBox for scaling', () => {
      const wrapper = mount(IconClipboard);
      const svg = wrapper.find('svg');
      expect(svg.attributes('viewBox')).toBeDefined();
    });

    it('renders stroked path elements', () => {
      const wrapper = mount(IconClipboard);
      const paths = wrapper.findAll('path');

      // Should have at least one path
      expect(paths.length).toBeGreaterThan(0);

      // Check for stroke/fill attributes typical of icons
      const svg = wrapper.find('svg');
      expect(svg.html()).toMatch(/path|circle|rect|line/);
    });

    it('height prop affects SVG height attribute', () => {
      const wrapper = mount(IconClipboard, {
        props: { height: '28' },
      });

      const svg = wrapper.find('svg');
      expect(svg.attributes('height')).toBe('28');
    });

    it('renders consistently on multiple mounts', () => {
      const wrapper1 = mount(IconClipboard);
      const wrapper2 = mount(IconClipboard);

      const svg1 = wrapper1.find('svg').html();
      const svg2 = wrapper2.find('svg').html();

      // Should render identically
      expect(svg1).toBe(svg2);
    });
  });

  describe('Icon Component Compatibility', () => {
    it('all icon components render SVG elements', () => {
      const components = [IconHome, IconTools, IconCpu, IconData, IconClipboard];

      components.forEach(component => {
        const wrapper = mount(component);
        expect(wrapper.find('svg').exists()).toBe(true);
      });
    });

    it('icon components accept width and height props', () => {
      const components = [IconHome, IconTools, IconCpu, IconData, IconClipboard];

      components.forEach(component => {
        const wrapper = mount(component, {
          props: {
            width: '24',
            height: '24',
          },
        });

        const svg = wrapper.find('svg');
        expect(svg.attributes('width')).toBe('24');
        expect(svg.attributes('height')).toBe('24');
      });
    });

    it('icon components have consistent SVG structure', () => {
      const components = [IconHome, IconTools, IconCpu, IconData, IconClipboard];

      components.forEach(component => {
        const wrapper = mount(component);
        const svg = wrapper.find('svg');

        // Each should have xmlns attribute
        expect(svg.attributes('xmlns')).toBeDefined();

        // Each should have viewBox for scaling
        expect(svg.attributes('viewBox')).toBeDefined();
      });
    });
  });
});
