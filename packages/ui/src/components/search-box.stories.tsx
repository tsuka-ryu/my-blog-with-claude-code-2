import * as React from 'react';

import { SearchBox } from './search-box';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/SearchBox',
  component: SearchBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: '検索ボックスのプレースホルダーテキスト',
    },
    value: {
      control: 'text',
      description: '検索ボックスの値',
    },
    autoFocus: {
      control: 'boolean',
      description: '自動フォーカスを有効にするか',
    },
    disabled: {
      control: 'boolean',
      description: '検索ボックスを無効化するか',
    },
  },
} satisfies Meta<typeof SearchBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '記事を検索...',
  },
  decorators: [
    Story => (
      <div className='w-96'>
        <Story />
      </div>
    ),
  ],
};

export const WithValue: Story = {
  args: {
    value: 'TypeScript',
    placeholder: '記事を検索...',
  },
  decorators: [
    Story => (
      <div className='w-96'>
        <Story />
      </div>
    ),
  ],
};

export const AutoFocus: Story = {
  args: {
    autoFocus: true,
    placeholder: '記事を検索...',
  },
  decorators: [
    Story => (
      <div className='w-96'>
        <Story />
      </div>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: '検索中...',
    placeholder: '記事を検索...',
  },
  decorators: [
    Story => (
      <div className='w-96'>
        <Story />
      </div>
    ),
  ],
};

export const Interactive: Story = {
  render: function InteractiveSearchBox() {
    const [value, setValue] = React.useState('');
    const [history, setHistory] = React.useState<string[]>([]);

    const handleChange = (newValue: string) => {
      setValue(newValue);
    };

    const handleClear = () => {
      if (value) {
        setHistory([...history, value]);
      }
    };

    return (
      <div className='w-96 space-y-4'>
        <SearchBox
          value={value}
          onChange={handleChange}
          onClear={handleClear}
          placeholder='記事を検索...'
        />
        <div className='text-sm text-terminal-muted'>
          <p>現在の検索: {value || '(なし)'}</p>
          {history.length > 0 && (
            <div className='mt-2'>
              <p className='font-medium'>検索履歴:</p>
              <ul className='mt-1 space-y-1'>
                {history.map((item, index) => (
                  <li key={index} className='text-terminal-foreground'>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  },
};

export const Responsive: Story = {
  args: {
    placeholder: '記事を検索...',
  },
  decorators: [
    Story => (
      <div className='space-y-4'>
        <div className='w-64'>
          <p className='mb-2 text-sm text-terminal-muted'>Small (w-64)</p>
          <Story />
        </div>
        <div className='w-96'>
          <p className='mb-2 text-sm text-terminal-muted'>Medium (w-96)</p>
          <Story />
        </div>
        <div className='w-full max-w-2xl'>
          <p className='mb-2 text-sm text-terminal-muted'>Large (max-w-2xl)</p>
          <Story />
        </div>
      </div>
    ),
  ],
};
