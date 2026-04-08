// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2021-2026 Magnus
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

import { defineConfig } from 'rollup';
import vue from 'rollup-plugin-vue';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-css-only';
import typescript from 'rollup-plugin-typescript2';

export default defineConfig({
  input: 'src/index.ts',
  external: ['vue'],
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named',
      globals: {
        vue: 'Vue',
      },
    },
    {
      file: 'dist/espframework-ui-components.umd.js',
      format: 'umd',
      name: 'EspFrameworkUiComponents',
      globals: {
        vue: 'Vue',
      },
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
  ],
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
      clean: true,
    }),
    vue({
      css: false,
      compileTemplate: true,
    }),
    css({ output: 'style.css' }),
    nodeResolve({
      preferBuiltins: false,
    }),
    commonjs(),
  ],
});
