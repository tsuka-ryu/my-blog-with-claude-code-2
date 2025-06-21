'use client';

import { useState, useEffect } from 'react';

import type { ComponentProps } from 'react';

interface ColorSwatchProps {
  name: string;
  value: string;
  cssVar?: string; // CSS変数名
}

function ColorSwatch({ name, value, cssVar }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);
  const [computedValue, setComputedValue] = useState(value);

  useEffect(() => {
    if (cssVar && typeof window !== 'undefined') {
      // CSS変数の実際の値を取得
      const element = document.documentElement;
      const computedStyle = getComputedStyle(element);
      const cssValue = computedStyle.getPropertyValue(cssVar).trim();
      if (cssValue) {
        setComputedValue(cssValue);
      }
    }
  }, [cssVar]);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(computedValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <div className='group relative flex flex-col items-center p-4 m-2 rounded-lg transition-colors bg-white dark:bg-terminal-bg-secondary border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg'>
      <div
        className='w-16 h-16 rounded-lg border-2 border-gray-200 dark:border-gray-600 shadow-sm transition-all'
        style={{
          backgroundColor: cssVar ? `var(${cssVar})` : computedValue,
          minHeight: '4rem',
          minWidth: '4rem',
        }}
      />
      <div className='mt-2 text-center'>
        <div className='font-mono text-xs font-medium text-gray-800 dark:text-terminal-text-primary truncate max-w-[80px]'>
          {name.replace('terminal-', '').replace('light-', '').replace(/-/g, ' ')}
        </div>
        <div className='font-mono text-xs text-gray-500 dark:text-terminal-text-secondary mt-1'>
          {cssVar ? cssVar : computedValue}
        </div>
        <div className='font-mono text-xs text-gray-400 dark:text-terminal-text-muted mt-1'>
          {computedValue}
        </div>
      </div>
      <button
        onClick={handleClick}
        className={`mt-1 px-2 py-1 text-xs font-medium rounded transition-all duration-200 ${
          copied
            ? 'bg-green-500 hover:bg-green-600 text-white'
            : 'bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700'
        }`}
        title={copied ? 'コピーしました！' : `${computedValue}をクリップボードにコピー`}
      >
        {copied ? '✓ Copied!' : 'Copy'}
      </button>
    </div>
  );
}

interface ColorPaletteSectionProps {
  title: string;
  colors: ColorSwatchProps[];
}

function ColorPaletteSection({ title, colors }: ColorPaletteSectionProps) {
  return (
    <div className='mb-8'>
      <h3 className='text-lg font-semibold mb-4 font-mono text-gray-700 dark:text-terminal-text-primary'>
        {title}
      </h3>
      <div className='grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-6'>
        {colors.map((color, index) => (
          <ColorSwatch key={index} {...color} />
        ))}
      </div>
    </div>
  );
}

export interface ColorPaletteProps extends ComponentProps<'div'> {
  className?: string;
}

export function ColorPalette({ className, ...props }: ColorPaletteProps) {
  const backgroundColors: ColorSwatchProps[] = [
    { name: 'terminal-bg-primary', value: '#0c0c0c', cssVar: '--terminal-bg-primary' },
    { name: 'terminal-bg-secondary', value: '#1a1a1a', cssVar: '--terminal-bg-secondary' },
    { name: 'terminal-bg-elevated', value: '#252525', cssVar: '--terminal-bg-elevated' },
    { name: 'terminal-bg-hover', value: '#2a2a2a', cssVar: '--terminal-bg-hover' },
  ];

  const textColors: ColorSwatchProps[] = [
    { name: 'terminal-text-primary', value: '#f4f4f4', cssVar: '--terminal-text-primary' },
    { name: 'terminal-text-secondary', value: '#a8a8a8', cssVar: '--terminal-text-secondary' },
    { name: 'terminal-text-muted', value: '#6b6b6b', cssVar: '--terminal-text-muted' },
    { name: 'terminal-text-bright', value: '#ffffff', cssVar: '--terminal-text-bright' },
  ];

  const accentColors: ColorSwatchProps[] = [
    { name: 'terminal-accent-red', value: '#ff5f56', cssVar: '--terminal-accent-red' },
    { name: 'terminal-accent-green', value: '#5af78e', cssVar: '--terminal-accent-green' },
    { name: 'terminal-accent-yellow', value: '#f3f99d', cssVar: '--terminal-accent-yellow' },
    { name: 'terminal-accent-blue', value: '#57c7ff', cssVar: '--terminal-accent-blue' },
    { name: 'terminal-accent-magenta', value: '#ff6ac1', cssVar: '--terminal-accent-magenta' },
    { name: 'terminal-accent-cyan', value: '#9aedfe', cssVar: '--terminal-accent-cyan' },
    { name: 'terminal-accent-orange', value: '#ffb86c', cssVar: '--terminal-accent-orange' },
  ];

  const syntaxColors: ColorSwatchProps[] = [
    { name: 'terminal-syntax-keyword', value: '#ff6ac1', cssVar: '--terminal-syntax-keyword' },
    { name: 'terminal-syntax-string', value: '#f3f99d', cssVar: '--terminal-syntax-string' },
    { name: 'terminal-syntax-comment', value: '#6b6b6b', cssVar: '--terminal-syntax-comment' },
    { name: 'terminal-syntax-function', value: '#57c7ff', cssVar: '--terminal-syntax-function' },
    { name: 'terminal-syntax-variable', value: '#9aedfe', cssVar: '--terminal-syntax-variable' },
    { name: 'terminal-syntax-constant', value: '#ff6ac1', cssVar: '--terminal-syntax-constant' },
    { name: 'terminal-syntax-operator', value: '#ff5f56', cssVar: '--terminal-syntax-operator' },
    {
      name: 'terminal-syntax-punctuation',
      value: '#a8a8a8',
      cssVar: '--terminal-syntax-punctuation',
    },
  ];

  const uiColors: ColorSwatchProps[] = [
    { name: 'terminal-ui-border', value: '#333333', cssVar: '--terminal-ui-border' },
    { name: 'terminal-ui-border-hover', value: '#444444', cssVar: '--terminal-ui-border-hover' },
    { name: 'terminal-ui-border-focus', value: '#57c7ff', cssVar: '--terminal-ui-border-focus' },
    { name: 'terminal-ui-divider', value: '#2a2a2a', cssVar: '--terminal-ui-divider' },
  ];

  return (
    <div
      className={`max-w-4xl mx-auto p-6 bg-white dark:bg-terminal-bg-primary transition-colors ${className}`}
      {...props}
    >
      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-terminal-text-bright mb-2'>
          Terminal Color Palette
        </h2>
        <p className='text-gray-600 dark:text-terminal-text-secondary text-sm'>
          技術ブログのターミナル風デザインで使用するカラーシステム
        </p>
      </div>

      <div className='space-y-8'>
        <ColorPaletteSection title='Background Colors' colors={backgroundColors} />
        <ColorPaletteSection title='Text Colors' colors={textColors} />
        <ColorPaletteSection title='Accent Colors' colors={accentColors} />
        <ColorPaletteSection title='Syntax Highlighting' colors={syntaxColors} />
        <ColorPaletteSection title='UI Elements' colors={uiColors} />
      </div>
    </div>
  );
}
