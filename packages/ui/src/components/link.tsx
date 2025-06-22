import React from 'react';

import { cn } from '../utils/cn';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary' | 'muted' | 'underline';
  external?: boolean;
  unstyled?: boolean;
}

const linkVariants = {
  primary:
    'text-terminal-accent hover:text-terminal-accent-hover underline-offset-4 hover:underline',
  secondary:
    'text-terminal-text-primary hover:text-terminal-accent underline-offset-4 hover:underline',
  muted:
    'text-terminal-text-muted hover:text-terminal-text-primary underline-offset-4 hover:underline',
  underline: 'text-terminal-text-primary underline underline-offset-4 hover:text-terminal-accent',
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      className,
      variant = 'primary',
      external = false,
      unstyled = false,
      children,
      href,
      ...props
    },
    ref
  ) => {
    const externalProps = external
      ? {
          target: '_blank',
          rel: 'noopener noreferrer',
        }
      : {};

    return (
      <a
        className={cn(
          !unstyled && [
            'transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary',
            'rounded-sm',
            linkVariants[variant],
          ],
          className
        )}
        ref={ref}
        href={href}
        {...externalProps}
        {...props}
      >
        {children}
        {external && (
          <span className="ml-1 inline-block" aria-label="(外部リンク)">
            <svg
              className="inline h-3 w-3"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </span>
        )}
      </a>
    );
  }
);

Link.displayName = 'Link';
