import { ColorPalette } from './color-palette';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Design System/Color Palette',
  component: ColorPalette,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Terminal Color Palette

技術ブログのターミナル風デザインで使用するカラーパレット。各色をクリックするとHEX値がクリップボードにコピーされます。

## カテゴリ

- **Background Colors**: 背景色
- **Text Colors**: テキスト色  
- **Accent Colors**: アクセント色
- **Syntax Highlighting**: シンタックスハイライト色
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
