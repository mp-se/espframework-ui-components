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
