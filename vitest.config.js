// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2021-2026 Magnus
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'clover'],
      include: ['src/**/*.{js,ts,vue}'],
      exclude: ['node_modules/', 'test/', 'dist/', '**/*.spec.{js,ts}'],
      all: true,
      lines: 80,
      functions: 80,
      branches: 70,
      statements: 80,
    },
  },
});
