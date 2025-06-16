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
        <div style={{ fontFamily: "'JetBrains Mono', 'Noto Sans JP', monospace" }}>
          <Story />
        </div>
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
          value: '#1a1a1a',
        },
        {
          name: 'terminal',
          value: '#0c0c0c',
        },
      ],
    },
  },
};

export default preview;
