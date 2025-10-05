import { defineConfig } from 'rollup';
import vue from 'rollup-plugin-vue';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-css-only';

export default defineConfig({
  input: 'src/index.js',
  external: [
    'vue'
  ],
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named',
      globals: {
        'vue': 'Vue'
      }
    },
    {
      file: 'dist/espframework-ui-components.umd.js',
      format: 'umd',
      name: 'EspFrameworkUiComponents',
      globals: {
        'vue': 'Vue'
      }
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm'
    }
  ],
  plugins: [
    vue({
      css: false,
      compileTemplate: true
    }),
    css({ output: 'style.css' }),
    nodeResolve({
      preferBuiltins: false
    }),
    commonjs()
  ]
})
