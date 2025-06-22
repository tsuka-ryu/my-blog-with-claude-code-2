import { Link } from './link';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'muted', 'underline'],
    },
    external: {
      control: { type: 'boolean' },
    },
    unstyled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Link',
    href: '#',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Link',
    href: '#',
    variant: 'secondary',
  },
};

export const Muted: Story = {
  args: {
    children: 'Muted Link',
    href: '#',
    variant: 'muted',
  },
};

export const Underline: Story = {
  args: {
    children: 'Underlined Link',
    href: '#',
    variant: 'underline',
  },
};

export const External: Story = {
  args: {
    children: 'External Link',
    href: 'https://example.com',
    external: true,
  },
};

export const Unstyled: Story = {
  args: {
    children: 'Unstyled Link',
    href: '#',
    unstyled: true,
  },
};

export const InContext: Story = {
  render: () => (
    <div className="max-w-md space-y-4 text-terminal-text-primary">
      <p>
        これは通常のテキストです。この中に
        <Link href="#" variant="primary">
          プライマリリンク
        </Link>
        があります。
      </p>
      <p>
        セカンダリリンクの例：
        <Link href="#" variant="secondary">
          詳細はこちら
        </Link>
        をご覧ください。
      </p>
      <p>
        外部サイトへのリンク：
        <Link href="https://example.com" external>
          Example.com
        </Link>
        で詳細を確認できます。
      </p>
      <p>
        ミュートされたリンク：
        <Link href="#" variant="muted">
          補足情報
        </Link>
      </p>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-x-4">
        <Link href="#" variant="primary">
          Primary
        </Link>
        <Link href="#" variant="secondary">
          Secondary
        </Link>
        <Link href="#" variant="muted">
          Muted
        </Link>
        <Link href="#" variant="underline">
          Underline
        </Link>
      </div>
      <div className="space-x-4">
        <Link href="https://example.com" external>
          External Link
        </Link>
        <Link href="#" unstyled>
          Unstyled Link
        </Link>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
