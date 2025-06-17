import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@repo/utils';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  center?: boolean;
  children: React.ReactNode;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'lg', padding = 'md', center = true, children, ...props }, ref) => {
    const baseStyles = 'w-full';

    const sizeStyles = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-4xl',
      xl: 'max-w-6xl',
      full: 'max-w-full',
    };

    const paddingStyles = {
      none: '',
      sm: 'px-2 sm:px-4',
      md: 'px-4 sm:px-6 lg:px-8',
      lg: 'px-6 sm:px-8 lg:px-12',
      xl: 'px-8 sm:px-12 lg:px-16',
    };

    const centerStyles = center ? 'mx-auto' : '';

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          sizeStyles[size],
          paddingStyles[padding],
          centerStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div' | 'article' | 'aside' | 'main' | 'header' | 'footer';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, as: Comp = 'section', spacing = 'md', children, ...props }, ref) => {
    const spacingStyles = {
      none: '',
      sm: 'py-4 sm:py-6',
      md: 'py-8 sm:py-12',
      lg: 'py-12 sm:py-16',
      xl: 'py-16 sm:py-20',
    };

    return (
      <Comp ref={ref} className={cn(spacingStyles[spacing], className)} {...props}>
        {children}
      </Comp>
    );
  }
);

Section.displayName = 'Section';

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 6 | 12 | 'auto';
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
  children: React.ReactNode;
}

const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 'auto', gap = 'md', responsive = true, children, ...props }, ref) => {
    const baseStyles = 'grid';

    const colsStyles = {
      1: 'grid-cols-1',
      2: responsive ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2',
      3: responsive ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-3',
      4: responsive ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-4',
      6: responsive ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6' : 'grid-cols-6',
      12: responsive ? 'grid-cols-4 md:grid-cols-6 lg:grid-cols-12' : 'grid-cols-12',
      auto: 'grid-cols-[repeat(auto-fit,minmax(280px,1fr))]',
    };

    const gapStyles = {
      none: '',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, colsStyles[cols], gapStyles[gap], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

export { Container, Section, Grid };
