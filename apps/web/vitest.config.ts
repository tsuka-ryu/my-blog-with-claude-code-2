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
    include: ['__tests__/components/**/*.test.{ts,tsx}'],
    exclude: ['__tests__/api/**/*', 'e2e/**/*'],
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
});
