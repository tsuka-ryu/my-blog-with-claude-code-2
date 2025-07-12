import { ArchiveList } from './archive-list';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Navigation/ArchiveList',
  component: ArchiveList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'セクションのタイトル',
    },
    showPostCount: {
      control: 'boolean',
      description: '記事数を表示するかどうか',
    },
    expandable: {
      control: 'boolean',
      description: '年別の折りたたみ機能を有効にするかどうか',
    },
    defaultExpanded: {
      control: 'object',
      description: '初期状態で展開する年の配列',
    },
    className: {
      control: 'text',
      description: '追加のCSSクラス',
    },
  },
} satisfies Meta<typeof ArchiveList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockArchives = [
  {
    year: 2024,
    totalCount: 42,
    months: [
      {
        year: 2024,
        month: 1,
        count: 8,
        posts: [
          {
            title: 'Next.js 15とTurbopackによる開発体験の向上',
            slug: 'nextjs15-turbopack-dx',
            date: '2024-01-20',
          },
          {
            title: 'TypeScript 5.3の新機能とbreaking changes',
            slug: 'typescript53-new-features',
            date: '2024-01-18',
          },
          {
            title: 'React Server Componentsの実践的な使い方',
            slug: 'react-server-components-practical',
            date: '2024-01-15',
          },
        ],
      },
      {
        year: 2024,
        month: 2,
        count: 12,
        posts: [
          {
            title: 'Tailwind CSS v4のCSS-first設定',
            slug: 'tailwindcss-v4-css-first',
            date: '2024-02-25',
          },
          {
            title: 'Storybook 8の新機能とテスト戦略',
            slug: 'storybook8-testing-strategy',
            date: '2024-02-20',
          },
        ],
      },
      {
        year: 2024,
        month: 3,
        count: 15,
      },
      {
        year: 2024,
        month: 4,
        count: 7,
      },
    ],
  },
  {
    year: 2023,
    totalCount: 38,
    months: [
      {
        year: 2023,
        month: 10,
        count: 9,
      },
      {
        year: 2023,
        month: 11,
        count: 11,
      },
      {
        year: 2023,
        month: 12,
        count: 18,
        posts: [
          {
            title: 'TypeScriptの型システム完全ガイド',
            slug: 'typescript-type-system-guide',
            date: '2023-12-28',
          },
          {
            title: 'React 18の新機能とパフォーマンス最適化',
            slug: 'react18-new-features',
            date: '2023-12-20',
          },
        ],
      },
    ],
  },
  {
    year: 2022,
    totalCount: 24,
    months: [
      {
        year: 2022,
        month: 8,
        count: 6,
      },
      {
        year: 2022,
        month: 9,
        count: 8,
      },
      {
        year: 2022,
        month: 10,
        count: 5,
      },
      {
        year: 2022,
        month: 11,
        count: 3,
      },
      {
        year: 2022,
        month: 12,
        count: 2,
      },
    ],
  },
];

export const Default: Story = {
  args: {
    archives: mockArchives,
  },
};

export const Expandable: Story = {
  args: {
    archives: mockArchives,
    expandable: true,
    defaultExpanded: [2024],
  },
};

export const WithoutPostCount: Story = {
  args: {
    archives: mockArchives,
    showPostCount: false,
  },
};

export const CustomTitle: Story = {
  args: {
    archives: mockArchives,
    title: '過去の記事',
  },
};

export const ExpandableAllClosed: Story = {
  args: {
    archives: mockArchives,
    expandable: true,
    defaultExpanded: [],
  },
};

export const ExpandableMultipleOpen: Story = {
  args: {
    archives: mockArchives,
    expandable: true,
    defaultExpanded: [2024, 2023],
  },
};

export const SingleYear: Story = {
  args: {
    archives: mockArchives.slice(0, 1),
    expandable: true,
    defaultExpanded: [2024],
  },
};

export const WithPostDetails: Story = {
  args: {
    archives: mockArchives.map(year => ({
      ...year,
      months: year.months.map(month => ({
        ...month,
        posts: month.posts || [
          {
            title: `サンプル記事 ${month.month}月`,
            slug: `sample-${year.year}-${month.month}`,
            date: `${year.year}-${month.month.toString().padStart(2, '0')}-01`,
          },
        ],
      })),
    })),
    expandable: true,
    defaultExpanded: [2024],
  },
};
