import { themes } from '@storybook/theming';

import { ThemeProvider } from '../src/components/theme-provider';

import customTheme from './theme';

import type { Preview } from '@storybook/react';

import '../src/styles/globals.css';

const preview: Preview = {
  decorators: [
    Story => (
      <ThemeProvider defaultTheme='dark' storageKey='storybook-theme'>
        <div
          style={{ fontFamily: "'JetBrains Mono', 'Noto Sans JP', monospace" }}
          className='min-h-screen'
        >
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'light',
          value: '#fafafa',
        },
        {
          name: 'dark',
          value: '#0c0c0c',
        },
        {
          name: 'terminal',
          value: '#000000',
        },
      ],
    },
    docs: {
      theme: customTheme,
    },
    darkMode: {
      // Override the default dark theme
      dark: { ...customTheme, appBg: '#0c0c0c' },
      // Override the default light theme
      light: { ...themes.light, appBg: '#fafafa' },
      current: 'dark',
      stylePreview: true,
    },
  },
};

export default preview;
