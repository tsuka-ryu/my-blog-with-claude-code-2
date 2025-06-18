import { Footer } from './footer';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for styling',
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomClass: Story = {
  args: {
    className: 'bg-zinc-50 dark:bg-zinc-900',
  },
};

export const DarkMode: Story = {
  args: {},
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      theme: 'dark',
    },
  },
  decorators: [
    Story => (
      <div className='dark'>
        <Story />
      </div>
    ),
  ],
};

export const LightMode: Story = {
  args: {},
  parameters: {
    backgrounds: { default: 'light' },
  },
  decorators: [
    Story => (
      <div className=''>
        <Story />
      </div>
    ),
  ],
};
