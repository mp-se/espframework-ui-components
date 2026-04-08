<!--
SPDX-License-Identifier: GPL-3.0-or-later
Copyright (C) 2021-2026 Magnus

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
-->
<template>
  <div class="container-fluid" v-bind="$attrs">
    <div style="height: 20px"></div>
    <div class="text-light text-center rounded-pill bg-primary" style="height: 30px">
      {{ text }}
    </div>
  </div>
</template>

<script setup>
/**
 * 2024-05-28 Bootstrap VueJS wrapper, Magnus Persson
 */

/**
 * Purpose: Provide a generic footer
 */
defineOptions({
  inheritAttrs: false,
});

/**
 * Text to show in the footer (required).
 */
const text = defineModel('text', {
  type: String,
  default: 'Footer Text',
});
</script>
