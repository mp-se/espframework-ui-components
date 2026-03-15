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
