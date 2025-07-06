'use client';

import { cn } from '@repo/utils';
import { Search, X } from 'lucide-react';
import { type ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

export interface SearchBoxProps {
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  disabled?: boolean;
}

export function SearchBox({
  value = '',
  onChange,
  onClear,
  placeholder = '記事を検索...',
  className,
  autoFocus = false,
  disabled = false,
}: SearchBoxProps) {
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setLocalValue(newValue);
      onChange?.(newValue);
    },
    [onChange]
  );

  const handleClear = useCallback(() => {
    setLocalValue('');
    onChange?.('');
    onClear?.();
    inputRef.current?.focus();
  }, [onChange, onClear]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape' && localValue) {
        e.preventDefault();
        handleClear();
      }
    },
    [localValue, handleClear]
  );

  return (
    <div
      className={cn(
        'relative flex items-center rounded-lg border border-terminal-border bg-terminal-background transition-colors',
        'focus-within:border-terminal-primary focus-within:ring-1 focus-within:ring-terminal-primary/50',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <Search
        className='absolute left-3 h-4 w-4 text-terminal-muted pointer-events-none'
        aria-hidden='true'
      />
      <input
        ref={inputRef}
        type='search'
        value={localValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          'w-full bg-transparent py-2 pl-10 pr-10 text-terminal-foreground placeholder-terminal-muted',
          'focus:outline-none disabled:cursor-not-allowed',
          'search-cancel:appearance-none'
        )}
        aria-label='検索'
      />
      {localValue && (
        <button
          type='button'
          onClick={handleClear}
          className={cn(
            'absolute right-3 p-0.5 rounded-md text-terminal-muted hover:text-terminal-foreground',
            'hover:bg-terminal-border/50 transition-colors focus:outline-none',
            'focus:ring-2 focus:ring-terminal-primary focus:ring-offset-2 focus:ring-offset-terminal-background'
          )}
          aria-label='検索をクリア'
          disabled={disabled}
        >
          <X className='h-4 w-4' />
        </button>
      )}
    </div>
  );
}
