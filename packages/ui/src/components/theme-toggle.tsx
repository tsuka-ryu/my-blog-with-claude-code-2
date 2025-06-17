'use client';

import React from 'react';

import { useTheme } from './theme-provider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className='inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md border border-terminal-ui-border bg-terminal-bg-primary text-terminal-text-primary opacity-50'>
        <span className='text-base'>🖥️</span>
        <span>システム</span>
      </div>
    );
  }

  const getNextTheme = () => {
    switch (theme) {
      case 'light':
        return 'dark';
      case 'dark':
        return 'system';
      case 'system':
      default:
        return 'light';
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return '☀️';
      case 'dark':
        return '🌙';
      case 'system':
      default:
        return '🖥️';
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'ライト';
      case 'dark':
        return 'ダーク';
      case 'system':
      default:
        return 'システム';
    }
  };

  return (
    <button
      onClick={() => setTheme(getNextTheme())}
      className='inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md border border-terminal-ui-border bg-terminal-bg-primary text-terminal-text-primary hover:bg-terminal-bg-hover hover:border-terminal-ui-border-hover focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary transition-colors'
      title={`現在: ${getThemeLabel()}モード (クリックで切り替え)`}
    >
      <span className='text-base'>{getThemeIcon()}</span>
      <span>{getThemeLabel()}</span>
    </button>
  );
}
