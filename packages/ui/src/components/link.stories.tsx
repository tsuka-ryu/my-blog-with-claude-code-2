import { expect, userEvent, within } from '@storybook/test';

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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: 'Primary Link' });

    // Test link is visible and has correct href
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '#');
    await expect(link).toHaveTextContent('Primary Link');

    // Test keyboard navigation
    await userEvent.tab();
    await expect(link).toHaveFocus();

    // Test keyboard activation (Enter key)
    await userEvent.keyboard('{Enter}');

    // Test click interaction
    await userEvent.click(link);

    // Verify focus behavior
    await expect(link).toHaveFocus();
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: 'External Link' });

    // Test external link attributes
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'https://example.com');
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');

    // Test external link icon is present
    const icon = link.querySelector('svg');
    await expect(icon).toBeInTheDocument();
    await expect(icon).toHaveAttribute('aria-hidden', 'true');

    // Test keyboard navigation
    await userEvent.tab();
    await expect(link).toHaveFocus();

    // Test screen reader text
    const srText = link.querySelector('.sr-only');
    await expect(srText).toBeInTheDocument();
    await expect(srText).toHaveTextContent('新しいタブで開く');
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
    <div className='max-w-md space-y-4 text-terminal-text-primary'>
      <p>
        これは通常のテキストです。この中に
        <Link href='#' variant='primary'>
          プライマリリンク
        </Link>
        があります。
      </p>
      <p>
        セカンダリリンクの例：
        <Link href='#' variant='secondary'>
          詳細はこちら
        </Link>
        をご覧ください。
      </p>
      <p>
        外部サイトへのリンク：
        <Link href='https://example.com' external>
          Example.com
        </Link>
        で詳細を確認できます。
      </p>
      <p>
        ミュートされたリンク：
        <Link href='#' variant='muted'>
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
    <div className='space-y-4'>
      <div className='space-x-4'>
        <Link href='#' variant='primary'>
          Primary
        </Link>
        <Link href='#' variant='secondary'>
          Secondary
        </Link>
        <Link href='#' variant='muted'>
          Muted
        </Link>
        <Link href='#' variant='underline'>
          Underline
        </Link>
      </div>
      <div className='space-x-4'>
        <Link href='https://example.com' external>
          External Link
        </Link>
        <Link href='#' unstyled>
          Unstyled Link
        </Link>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
