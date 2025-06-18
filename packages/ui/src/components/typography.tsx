'use client';

import { cn } from '../utils';

import type { ReactNode } from 'react';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline';

export type TypographyTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';

export interface TypographyProps {
  variant?: TypographyVariant;
  component?: TypographyTag;
  children: ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'muted' | 'accent' | 'success' | 'warning' | 'error';
  truncate?: boolean;
  align?: 'left' | 'center' | 'right' | 'justify';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

const variantClasses: Record<TypographyVariant, string> = {
  h1: 'text-4xl font-bold leading-tight tracking-tight',
  h2: 'text-3xl font-bold leading-tight tracking-tight',
  h3: 'text-2xl font-semibold leading-tight tracking-tight',
  h4: 'text-xl font-semibold leading-tight',
  h5: 'text-lg font-medium leading-tight',
  h6: 'text-base font-medium leading-tight',
  body1: 'text-base leading-relaxed',
  body2: 'text-sm leading-relaxed',
  caption: 'text-xs leading-normal',
  overline: 'text-xs font-medium uppercase tracking-wide leading-normal',
};

const colorClasses: Record<NonNullable<TypographyProps['color']>, string> = {
  primary: 'text-foreground',
  secondary: 'text-muted-foreground',
  muted: 'text-muted-foreground',
  accent: 'text-accent-foreground',
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  error: 'text-red-600 dark:text-red-400',
};

const alignClasses: Record<NonNullable<TypographyProps['align']>, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
};

const weightClasses: Record<NonNullable<TypographyProps['weight']>, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const defaultTags: Record<TypographyVariant, TypographyTag> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span',
};

export const Typography = ({
  variant = 'body1',
  component,
  children,
  className,
  color = 'primary',
  truncate = false,
  align = 'left',
  weight,
}: TypographyProps) => {
  const Component = component || defaultTags[variant];

  const classes = cn(
    variantClasses[variant],
    colorClasses[color],
    alignClasses[align],
    weight && weightClasses[weight],
    truncate && 'truncate',
    className
  );

  return <Component className={classes}>{children}</Component>;
};
