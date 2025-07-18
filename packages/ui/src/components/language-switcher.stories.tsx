import { LanguageSwitcher } from './language-switcher';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/LanguageSwitcher',
  component: LanguageSwitcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  decorators: [
    Story => (
      <div className='p-8'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LanguageSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    locales: ['ja', 'en'] as const,
    localeNames: {
      ja: '日本語',
      en: 'English',
    },
  },
};

export const WithMultipleLanguages: Story = {
  args: {
    locales: ['ja', 'en', 'zh', 'ko'] as const,
    localeNames: {
      ja: '日本語',
      en: 'English',
      zh: '中文',
      ko: '한국어',
    },
  },
};

export const CustomStyling: Story = {
  args: {
    locales: ['ja', 'en'] as const,
    localeNames: {
      ja: '日本語',
      en: 'English',
    },
    className: 'border-2 border-primary rounded-lg p-2',
  },
};
