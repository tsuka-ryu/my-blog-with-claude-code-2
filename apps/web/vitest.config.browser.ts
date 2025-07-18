/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    browser: {
      enabled: true,
      provider: 'webdriverio',
      name: 'chrome',
      headless: true,
    },
    include: ['__tests__/**/*.test.{ts,tsx}'],
    exclude: ['__tests__/api/**/*'],
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
});
