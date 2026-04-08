<!--
SPDX-License-Identifier: GPL-3.0-or-later
Copyright (C) 2021-2026 Magnus

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
-->
<template>
  <div class="progress" style="height: 20px" v-bind="$attrs">
    <div class="progress-bar" role="progressbar" :style="progressStyle"></div>
  </div>
</template>

<script setup>
/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 */

import { computed } from 'vue';
/**
 * Purpose: Show a progress bar
 */
defineOptions({
  inheritAttrs: false,
});

/**
 * Ref that contains the value of the progress bar (0-100) (required).
 */
const progress = defineModel('progress', {
  type: [Number, String],
  default: 0,
  validator: value => {
    const num = Number(value);
    return !isNaN(num) && num >= 0 && num <= 100;
  },
});

const progressStyle = computed(() => {
  return 'width: ' + progress.value + '%';
});
</script>
