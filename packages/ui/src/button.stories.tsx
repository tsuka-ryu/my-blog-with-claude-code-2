import { Button } from './button';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    appName: {
      control: 'text',
      description: 'The name of the app that will be displayed in the alert',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for styling',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Click me',
    appName: 'MyApp',
  },
};

export const WithCustomClass: Story = {
  args: {
    children: 'Styled Button',
    appName: 'StyledApp',
    className: 'bg-blue-500 text-white px-4 py-2 rounded',
  },
};

export const LongText: Story = {
  args: {
    children: 'This is a button with very long text content',
    appName: 'LongTextApp',
  },
};
