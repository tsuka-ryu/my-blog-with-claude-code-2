'use client';

import React from 'react';

export function ThemeToggleFallback() {
  return (
    <div className='inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md border border-terminal-ui-border bg-terminal-bg-primary text-terminal-text-primary opacity-50'>
      <span className='text-base'>🖥️</span>
      <span>システム</span>
    </div>
  );
}
