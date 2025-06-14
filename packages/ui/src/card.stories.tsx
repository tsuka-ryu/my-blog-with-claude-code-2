import { Card } from './card';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the card',
    },
    href: {
      control: 'text',
      description: 'The URL the card links to',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for styling',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Documentation',
    children: 'Find in-depth information about Next.js features and API.',
    href: 'https://nextjs.org/docs',
  },
};

export const WithCustomClass: Story = {
  args: {
    title: 'Learn',
    children: 'Learn about Next.js in an interactive course with quizzes!',
    href: 'https://nextjs.org/learn',
    className: 'border-2 border-gray-300 p-4 rounded-lg hover:border-blue-500',
  },
};

export const LongContent: Story = {
  args: {
    title: 'Deploy',
    children:
      'Instantly deploy your Next.js site to a shareable URL with Vercel. Get started with our free tier and scale as you grow.',
    href: 'https://vercel.com/new',
  },
};
