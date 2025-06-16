import { ThemeToggle } from './theme-toggle';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCustomClassName: Story = {
  args: {
    className: 'border-2 border-dashed border-gray-400 p-2',
  },
};
