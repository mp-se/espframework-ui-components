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

import { defineConfig } from 'rollup';
import vue from 'rollup-plugin-vue';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-css-only';
import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default defineConfig({
  input: 'src/index.ts',
  plugins: [
    peerDepsExternal(),
    typescript({
      useTsconfigDeclarationDir: true,
      clean: true,
      check: false,
    }),
    vue({
      css: false,
      compileTemplate: true,
    }),
    css({ output: 'style.css' }),
    nodeResolve({
      preferBuiltins: false,
      extensions: ['.js', '.ts', '.vue'],
    }),
    commonjs(),
  ],
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
});
