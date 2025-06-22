import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';

import { expectNoA11yViolations } from '../test-utils/accessibility';

import { Link } from './link';

describe('Link', () => {
  it('renders with default props', () => {
    render(<Link href='/home'>Home</Link>);
    const link = screen.getByRole('link', { name: 'Home' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/home');
    expect(link).toHaveClass('text-terminal-accent'); // primary variant
  });

  it('renders different variants', () => {
    const { rerender } = render(
      <Link href='#' variant='secondary'>
        Secondary
      </Link>
    );
    expect(screen.getByRole('link')).toHaveClass('text-terminal-text-primary');

    rerender(
      <Link href='#' variant='muted'>
        Muted
      </Link>
    );
    expect(screen.getByRole('link')).toHaveClass('text-terminal-text-muted');

    rerender(
      <Link href='#' variant='underline'>
        Underline
      </Link>
    );
    expect(screen.getByRole('link')).toHaveClass('underline');
  });

  it('handles external links', () => {
    render(
      <Link href='https://example.com' external>
        External Link
      </Link>
    );
    const link = screen.getByRole('link', { name: /External Link/ });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');

    // Check for external link icon
    expect(screen.getByLabelText('(外部リンク)')).toBeInTheDocument();
  });

  it('handles unstyled prop', () => {
    render(
      <Link href='#' unstyled>
        Unstyled Link
      </Link>
    );
    const link = screen.getByRole('link');
    expect(link).not.toHaveClass('transition-colors');
    expect(link).not.toHaveClass('text-terminal-accent');
  });

  it('applies custom className', () => {
    render(
      <Link href='#' className='custom-link-class'>
        Custom
      </Link>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveClass('custom-link-class');
    expect(link).toHaveClass('text-terminal-accent'); // Still has variant styles
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLAnchorElement>();
    render(
      <Link href='#' ref={ref}>
        With Ref
      </Link>
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it('handles undefined href', () => {
    render(<Link>No Href</Link>);
    const link = screen.getByText('No Href');
    expect(link.tagName).toBe('A');
    expect(link).not.toHaveAttribute('href');
  });

  it('passes through additional props', () => {
    render(
      <Link href='#' data-testid='test-link' title='Test Link Title'>
        Test Link
      </Link>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('data-testid', 'test-link');
    expect(link).toHaveAttribute('title', 'Test Link Title');
  });

  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<Link href='/accessible'>Accessible Link</Link>);
      await expectNoA11yViolations(container);
    });

    it('should not have accessibility violations with external link', async () => {
      const { container } = render(
        <Link href='https://example.com' external>
          External Link
        </Link>
      );
      await expectNoA11yViolations(container);
    });

    it('has proper focus styles', () => {
      render(<Link href='#'>Focusable Link</Link>);
      const link = screen.getByRole('link');
      expect(link).toHaveClass('focus:outline-none');
      expect(link).toHaveClass('focus:ring-2');
      expect(link).toHaveClass('focus:ring-terminal-ui-border-focus');
    });

    it('external link icon has proper aria attributes', () => {
      render(
        <Link href='https://example.com' external>
          External
        </Link>
      );
      const icon = screen.getByLabelText('(外部リンク)').querySelector('svg');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });
});
