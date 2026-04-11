<!--
  @mp-se/espframework-ui-components
  Copyright (c) 2021-2026 Magnus

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->
<template>
  <div class="card" v-bind="$attrs">
    <div :class="headerStyle()">{{ header }}</div>
    <div class="card-body">
      <h5 class="card-title">
        <component :is="icon" v-if="icon !== undefined" width="16" height="16"></component>
        {{ title }}
      </h5>
      <p class="card-text">
        <!-- @slot Content of the card is placed via the slot -->
        <slot></slot>
      </p>
    </div>
  </div>
</template>

<script setup>
/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 */
/**
 * Purpose: Show a card with header, title and content.
 */
defineOptions({
  inheritAttrs: false,
});
/**
 * Text to be displayed in the header of the Card (required).
 */
const header = defineModel('header', {
  type: String,
  default: 'Card Header',
});

/**
 * Title shown in the top of the card body (required).
 */
const title = defineModel('title', {
  type: String,
  default: 'Card Title',
});

/**
 * If defined an icon will be shown left of the title (optional).
 */
const icon = defineModel('icon', {
  type: [Object, String],
  default: undefined,
});

/**
 * If set the header will be in red.
 */
const iserr = defineModel('iserr', {
  type: Boolean,
  default: false,
});

/**
 * Color for the header (if not error).
 */
const headerColor = defineModel('color', {
  type: String,
  default: 'primary',
  validator: value => {
    const validColors = [
      'primary',
      'secondary',
      'success',
      'danger',
      'warning',
      'info',
      'light',
      'dark',
    ];
    return validColors.includes(value);
  },
});

const headerStyle = () => {
  if (iserr.value !== undefined && iserr.value) return 'card-header bg-danger-subtle';

  if (headerColor.value === undefined) return 'card-header bg-primary-subtle';

  return 'card-header bg-' + headerColor.value + '-subtle';
};
</script>
