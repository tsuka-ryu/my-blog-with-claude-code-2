import type { Meta, StoryObj } from '@storybook/react';
import { Code } from './code';

const meta = {
  title: 'Components/Code',
  component: Code,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for styling',
    },
  },
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'const greeting = "Hello, World!";',
  },
};

export const WithCustomClass: Story = {
  args: {
    children: 'npm install storybook',
    className: 'bg-gray-100 px-2 py-1 rounded text-sm font-mono',
  },
};

export const MultiLine: Story = {
  args: {
    children: `function add(a, b) {
  return a + b;
}`,
    className: 'block bg-gray-900 text-green-400 p-4 rounded font-mono',
  },
};

export const TerminalStyle: Story = {
  args: {
    children: '$ pnpm run storybook',
    className: 'bg-black text-green-500 px-3 py-2 rounded font-mono',
  },
};