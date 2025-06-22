import { expect, userEvent, within } from '@storybook/test';

import { Button } from './button';
import { Navigation, Header } from './navigation';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Navigation> = {
  title: 'Components/Navigation',
  component: Navigation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'アクセシビリティを考慮したナビゲーションコンポーネント。ランドマーク、キーボード操作、スクリーンリーダーに対応。',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'サイトのタイトル',
    },
    items: {
      control: 'object',
      description: 'ナビゲーションアイテム',
    },
    isMobileMenuOpen: {
      control: 'boolean',
      description: 'モバイルメニューの開閉状態',
    },
    showThemeToggle: {
      control: 'boolean',
      description: 'テーマトグルの表示',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Navigation>;

const defaultNavigationItems = [
  { label: 'ホーム', href: '/', isActive: true },
  { label: '記事', href: '/posts' },
  { label: 'タグ', href: '/tags' },
  { label: 'について', href: '/about' },
];

export const Default: Story = {
  args: {
    title: 'Tech Blog',
    items: defaultNavigationItems,
    showThemeToggle: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test navigation structure
    const nav = canvas.getByRole('navigation', { name: 'メインナビゲーション' });
    await expect(nav).toBeVisible();

    // Test title/logo link
    const titleLink = canvas.getByRole('link', { name: 'Tech Blog - ホームページに移動' });
    await expect(titleLink).toBeVisible();
    await expect(titleLink).toHaveAttribute('href', '/');

    // Test navigation items
    const homeLink = canvas.getByRole('link', { name: 'ホーム' });
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveAttribute('aria-current', 'page');

    const postsLink = canvas.getByRole('link', { name: '記事' });
    await expect(postsLink).toBeVisible();
    await expect(postsLink).toHaveAttribute('href', '/posts');

    // Test keyboard navigation
    await userEvent.tab();
    await expect(titleLink).toHaveFocus();

    await userEvent.tab();
    await expect(homeLink).toHaveFocus();

    await userEvent.tab();
    await expect(postsLink).toHaveFocus();
  },
};

export const WithoutThemeToggle: Story = {
  args: {
    title: 'Tech Blog',
    items: defaultNavigationItems,
    showThemeToggle: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'テーマトグルを非表示にした状態',
      },
    },
  },
};

export const MinimalNavigation: Story = {
  args: {
    title: 'Tech Blog',
    items: [
      { label: 'ホーム', href: '/', isActive: true },
      { label: '記事', href: '/posts' },
    ],
    showThemeToggle: true,
  },
  parameters: {
    docs: {
      description: {
        story: '最小限のナビゲーションアイテム',
      },
    },
  },
};

export const MobileMenuOpen: Story = {
  args: {
    title: 'Tech Blog',
    items: defaultNavigationItems,
    isMobileMenuOpen: true,
    showThemeToggle: true,
    onMobileMenuToggle: () => console.log('Mobile menu toggled'),
  },
  parameters: {
    docs: {
      description: {
        story: 'モバイルメニューが開いた状態（実際にはJavaScriptで制御）',
      },
    },
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test mobile menu is visible
    const mobileMenu = canvas.getByRole('menu');
    await expect(mobileMenu).toBeVisible();

    // Test mobile menu button
    const menuButton = canvas.getByRole('button', { name: 'メニューを開く' });
    await expect(menuButton).toBeVisible();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    await expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');

    // Test mobile menu items
    const mobileMenuItems = canvas.getAllByRole('menuitem');
    await expect(mobileMenuItems).toHaveLength(4);

    // Test first mobile menu item
    const firstMenuItem = mobileMenuItems[0];
    await expect(firstMenuItem).toHaveTextContent('ホーム');
    await expect(firstMenuItem).toHaveAttribute('aria-current', 'page');

    // Test mobile menu button click
    await userEvent.click(menuButton);
  },
};

export const LongTitle: Story = {
  args: {
    title: 'とても長いタイトルのテックブログサイト',
    items: defaultNavigationItems,
    showThemeToggle: true,
  },
  parameters: {
    docs: {
      description: {
        story: '長いタイトルのレスポンシブ対応',
      },
    },
  },
};

// Header Component Stories
const HeaderMeta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'ページヘッダーコンポーネント。パンくずナビゲーション、タイトル、説明文、アクションボタンを表示。',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'ページのタイトル',
    },
    description: {
      control: 'text',
      description: 'ページの説明',
    },
    breadcrumbs: {
      control: 'object',
      description: 'パンくずナビゲーション',
    },
    actions: {
      control: false,
      description: '追加のアクション',
    },
  },
};

export const HeaderDefault: StoryObj<typeof Header> = {
  ...HeaderMeta,
  args: {
    title: 'ブログ記事',
    description: 'Next.js 15とApp Routerを使った技術記事の書き方について解説します。',
  },
};

export const HeaderWithBreadcrumbs: StoryObj<typeof Header> = {
  ...HeaderMeta,
  args: {
    title: 'Next.js 15入門',
    description: 'App Routerの新機能と使い方を詳しく解説',
    breadcrumbs: [
      { label: 'ホーム', href: '/' },
      { label: '記事', href: '/posts' },
      { label: 'React', href: '/tags/react' },
      { label: 'Next.js 15入門' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'パンくずナビゲーション付きヘッダー',
      },
    },
  },
};

export const HeaderWithActions: StoryObj<typeof Header> = {
  ...HeaderMeta,
  args: {
    title: 'ブログ管理',
    description: 'ブログ記事の作成・編集・削除を行います',
    actions: (
      <div className='flex space-x-2'>
        <Button variant='outline' size='sm'>
          下書き保存
        </Button>
        <Button size='sm'>公開する</Button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'アクションボタン付きヘッダー',
      },
    },
  },
};

export const HeaderMinimal: StoryObj<typeof Header> = {
  ...HeaderMeta,
  args: {
    title: 'シンプルページ',
  },
  parameters: {
    docs: {
      description: {
        story: 'タイトルのみのシンプルなヘッダー',
      },
    },
  },
};

// Combined Navigation + Header Layout Example
export const FullLayoutExample: Story = {
  render: () => (
    <div>
      <Navigation title='Tech Blog' items={defaultNavigationItems} showThemeToggle={true} />
      <Header
        title='Next.js 15 App Router入門'
        description='新しいApp Routerの機能と実装方法について詳しく解説します'
        breadcrumbs={[
          { label: 'ホーム', href: '/' },
          { label: '記事', href: '/posts' },
          { label: 'React', href: '/tags/react' },
          { label: 'Next.js 15 App Router入門' },
        ]}
        actions={
          <Button variant='outline' size='sm'>
            共有
          </Button>
        }
      />
      <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
        <div className='bg-card p-6 rounded-lg border border-accent'>
          <p className='text-muted'>
            ここにメインコンテンツが表示されます。ナビゲーションとヘッダーの組み合わせ例です。
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ナビゲーションとヘッダーを組み合わせた完全なレイアウト例',
      },
    },
  },
};
