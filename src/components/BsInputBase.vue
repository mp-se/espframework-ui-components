<!--
SPDX-License-Identifier: GPL-3.0-or-later
Copyright (C) 2021-2026 Magnus

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
-->
<template>
  <div class="has-validation pt-2" v-bind="$attrs">
    <label v-if="label !== undefined" class="form-label fw-bold">{{ label }}</label>
    &nbsp;<span v-if="badge" class="badge text-bg-danger rounded-circle">{{ badge }}</span>
    <div :class="[width === undefined ? '' : 'col-' + width]">
      <!-- @slot this is where the main component is located -->
      <slot></slot>
    </div>
    <div class="form-text">{{ help }}</div>
  </div>
</template>

<script setup>
/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 */

/**
 * Purpose: Basic layout of a form component with label on top and help text below.
 *
 * Note! Should not be used directly, this is a base class for form components.
 */
defineOptions({
  inheritAttrs: false,
});
/**
 * This text is shown above the form component (optional).
 */
const label = defineModel('label', {
  type: String,
  default: undefined,
});

/**
 * Help text is shown below the field to provide user help with input (optional).
 */
const help = defineModel('help', {
  type: String,
  default: undefined,
});

/**
 * Specify the width to force a specific size (optional).
 */
const width = defineModel('width', {
  type: [String, Number],
  default: undefined,
  validator: value => {
    if (value === undefined || value === null || value === '') return true;
    if (typeof value === 'number') return value > 0 && value <= 12;
    if (typeof value === 'string')
      return /^(\d|1[0-2])$|^(sm|md|lg|xl|xxl)-(\d|1[0-2])$/.test(value);
    return false;
  },
});

/**
 * Specify the number to show in the badge to guide the user (optional).
 */
const badge = defineModel('badge', {
  type: Number,
  default: 0,
});
</script>
