import React from 'react';

import { cn } from '../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
}

const buttonVariants = {
  primary:
    'bg-terminal-accent text-terminal-accent-foreground hover:bg-terminal-accent-hover border-terminal-accent',
  secondary:
    'bg-terminal-bg-secondary text-terminal-text-primary hover:bg-terminal-bg-hover border-terminal-ui-border',
  outline:
    'bg-transparent text-terminal-text-primary hover:bg-terminal-bg-hover border-terminal-ui-border hover:border-terminal-ui-border-hover',
  ghost: 'bg-transparent text-terminal-text-primary hover:bg-terminal-bg-hover border-transparent',
  danger:
    'bg-terminal-error text-terminal-error-foreground hover:bg-terminal-error-hover border-terminal-error',
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-md border transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
          buttonVariants[variant],
          buttonSizes[size],
          fullWidth && 'w-full',
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span
            className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-label="Loading"
            role="status"
          />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
