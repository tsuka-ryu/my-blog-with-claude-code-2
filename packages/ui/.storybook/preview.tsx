import { ThemeProvider } from '../src/components/theme-provider';

import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';

const preview: Preview = {
  decorators: [
    Story => (
      <>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link
          href='https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&display=swap'
          rel='stylesheet'
        />
        <ThemeProvider>
          <div style={{ fontFamily: "'JetBrains Mono', 'Noto Sans JP', monospace" }}>
            <Story />
          </div>
        </ThemeProvider>
      </>
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
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
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
    darkMode: {
      // Override the default dark theme
      dark: { ...{}, appBg: '#0c0c0c' },
      // Override the default light theme
      light: { ...{}, appBg: '#ffffff' },
    },
  },
};

export default preview;
