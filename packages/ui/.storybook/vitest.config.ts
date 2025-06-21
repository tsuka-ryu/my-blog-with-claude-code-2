/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { storybookTest } from '@storybook/experimental-addon-vitest/plugin';

export default defineConfig({
  plugins: [
    storybookTest({
      storybookScript: 'storybook dev -p 6006 --ci',
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
    setupFiles: ['../../../vitest.setup.ts'],
    browser: {
      enabled: false,
      name: 'chromium',
    },
  },
});
