import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';

import { expectNoA11yViolations } from '../test-utils/accessibility';

import { Link } from './link';

describe('Link Component', () => {
  it('renders children correctly', () => {
    render(<Link href='/test'>Test Link</Link>);
    expect(screen.getByText('Test Link')).toBeInTheDocument();
  });

  it('renders as anchor element', () => {
    render(<Link href='/test'>Link Text</Link>);
    const linkElement = screen.getByRole('link');
    expect(linkElement.tagName).toBe('A');
  });

  it('applies href attribute', () => {
    render(<Link href='/test-page'>Test</Link>);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/test-page');
  });

  it('applies custom className', () => {
    render(
      <Link href='/test' className='custom-link'>
        Test
      </Link>
    );
    expect(screen.getByRole('link')).toHaveClass('custom-link');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLAnchorElement>();
    render(
      <Link ref={ref} href='/test'>
        Test
      </Link>
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it('forwards additional props', () => {
    render(
      <Link href='/test' data-testid='test-link' title='Test Title'>
        Test
      </Link>
    );
    const link = screen.getByTestId('test-link');
    expect(link).toHaveAttribute('title', 'Test Title');
  });

  describe('Variants', () => {
    it('applies default primary variant', () => {
      render(<Link href='/test'>Primary Link</Link>);
      const link = screen.getByRole('link');
      expect(link).toHaveClass('text-terminal-accent');
    });

    it('applies secondary variant', () => {
      render(
        <Link href='/test' variant='secondary'>
          Secondary Link
        </Link>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveClass('text-terminal-text-primary');
    });

    it('applies muted variant', () => {
      render(
        <Link href='/test' variant='muted'>
          Muted Link
        </Link>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveClass('text-terminal-text-muted');
    });

    it('applies underline variant', () => {
      render(
        <Link href='/test' variant='underline'>
          Underlined Link
        </Link>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveClass('underline');
    });
  });

  describe('External links', () => {
    it('applies external link attributes when external prop is true', () => {
      render(
        <Link href='https://example.com' external>
          External Link
        </Link>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('does not apply external attributes when external prop is false', () => {
      render(
        <Link href='/internal' external={false}>
          Internal Link
        </Link>
      );
      const link = screen.getByRole('link');
      expect(link).not.toHaveAttribute('target');
      expect(link).not.toHaveAttribute('rel');
    });

    it('renders external link icon when external prop is true', () => {
      render(
        <Link href='https://example.com' external>
          External Link
        </Link>
      );
      const icon = screen.getByLabelText('(外部リンク)');
      expect(icon).toBeInTheDocument();
      expect(icon.querySelector('svg')).toBeInTheDocument();
    });

    it('does not render external link icon when external prop is false', () => {
      render(<Link href='/internal'>Internal Link</Link>);
      expect(screen.queryByLabelText('(外部リンク)')).not.toBeInTheDocument();
    });

    it('external link icon has proper attributes', () => {
      render(
        <Link href='https://example.com' external>
          External Link
        </Link>
      );
      const iconContainer = screen.getByLabelText('(外部リンク)');
      const svg = iconContainer.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
      expect(svg).toHaveClass('inline', 'h-3', 'w-3');
    });
  });

  describe('Unstyled variant', () => {
    it('applies minimal styling when unstyled is true', () => {
      render(
        <Link href='/test' unstyled>
          Unstyled Link
        </Link>
      );
      const link = screen.getByRole('link');
      expect(link).not.toHaveClass('transition-colors');
      expect(link).not.toHaveClass('text-terminal-accent');
    });

    it('applies full styling when unstyled is false', () => {
      render(
        <Link href='/test' unstyled={false}>
          Styled Link
        </Link>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveClass('transition-colors');
      expect(link).toHaveClass('text-terminal-accent');
    });

    it('can combine unstyled with custom className', () => {
      render(
        <Link href='/test' unstyled className='custom-unstyled'>
          Custom Link
        </Link>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveClass('custom-unstyled');
      expect(link).not.toHaveClass('transition-colors');
    });
  });

  describe('Focus and accessibility', () => {
    it('has proper focus styles', () => {
      render(<Link href='/test'>Focusable Link</Link>);
      const link = screen.getByRole('link');
      expect(link).toHaveClass('focus:outline-none');
      expect(link).toHaveClass('focus:ring-2');
      expect(link).toHaveClass('focus:ring-terminal-ui-border-focus');
    });

    it('does not have focus styles when unstyled', () => {
      render(
        <Link href='/test' unstyled>
          Unstyled Link
        </Link>
      );
      const link = screen.getByRole('link');
      expect(link).not.toHaveClass('focus:outline-none');
      expect(link).not.toHaveClass('focus:ring-2');
    });
  });

  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<Link href='/test'>Test Link</Link>);
      await expectNoA11yViolations(container);
    });

    it('should not have accessibility violations with all variants', async () => {
      const variants = ['primary', 'secondary', 'muted', 'underline'] as const;
      for (const variant of variants) {
        const { container } = render(
          <Link href='/test' variant={variant}>
            {variant} Link
          </Link>
        );
        await expectNoA11yViolations(container);
      }
    });

    it('should not have accessibility violations for external links', async () => {
      const { container } = render(
        <Link href='https://example.com' external>
          External Link
        </Link>
      );
      await expectNoA11yViolations(container);
    });

    it('should not have accessibility violations when unstyled', async () => {
      const { container } = render(
        <Link href='/test' unstyled>
          Unstyled Link
        </Link>
      );
      await expectNoA11yViolations(container);
    });

    it('should not have accessibility violations in context', async () => {
      const { container } = render(
        <div>
          <p>
            This is a paragraph with a{' '}
            <Link href='/test' variant='underline'>
              link inside
            </Link>{' '}
            the text.
          </p>
          <nav>
            <Link href='/home'>Home</Link>
            <Link href='/about'>About</Link>
            <Link href='https://example.com' external>
              External Site
            </Link>
          </nav>
        </div>
      );
      await expectNoA11yViolations(container);
    });
  });

  describe('Complex scenarios', () => {
    it('handles complex content with multiple elements', () => {
      render(
        <Link href='/complex' variant='secondary'>
          <span>Complex Link</span>
          <em>with emphasis</em>
        </Link>
      );
      expect(screen.getByText('Complex Link')).toBeInTheDocument();
      expect(screen.getByText('with emphasis')).toBeInTheDocument();
    });

    it('external link with custom variant', () => {
      render(
        <Link href='https://example.com' external variant='muted'>
          External Muted Link
        </Link>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveClass('text-terminal-text-muted');
      expect(screen.getByLabelText('(外部リンク)')).toBeInTheDocument();
    });

    it('unstyled external link', () => {
      render(
        <Link href='https://example.com' external unstyled className='custom-external'>
          Unstyled External Link
        </Link>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveClass('custom-external');
      expect(link).not.toHaveClass('transition-colors');
      expect(screen.getByLabelText('(外部リンク)')).toBeInTheDocument();
    });

    it('handles all props combined', () => {
      const handleClick = () => {};
      render(
        <Link
          href='https://example.com'
          external
          variant='secondary'
          className='custom-class'
          onClick={handleClick}
          title='Custom Title'
          id='custom-id'
          data-testid='full-link'
        >
          Full Featured Link
        </Link>
      );

      const link = screen.getByTestId('full-link');
      expect(link).toHaveAttribute('href', 'https://example.com');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveAttribute('title', 'Custom Title');
      expect(link).toHaveAttribute('id', 'custom-id');
      expect(link).toHaveClass('custom-class');
      expect(link).toHaveClass('text-terminal-text-primary');
      expect(screen.getByLabelText('(外部リンク)')).toBeInTheDocument();
    });

    it('should not have accessibility violations in complex scenario', async () => {
      const { container } = render(
        <article>
          <h2>Article Title</h2>
          <p>
            This article discusses various topics. You can read more about this on{' '}
            <Link href='https://example.com' external variant='underline'>
              the official documentation
            </Link>
            .
          </p>
          <nav aria-label='Related links'>
            <ul>
              <li>
                <Link href='/related-1' variant='primary'>
                  Related Article 1
                </Link>
              </li>
              <li>
                <Link href='/related-2' variant='secondary'>
                  Related Article 2
                </Link>
              </li>
              <li>
                <Link href='https://external.com' external variant='muted'>
                  External Resource
                </Link>
              </li>
            </ul>
          </nav>
        </article>
      );
      await expectNoA11yViolations(container);
    });
  });

  describe('Edge cases', () => {
    it('handles empty href', () => {
      render(<Link href=''>Empty Link</Link>);
      const link = screen.getByText('Empty Link');
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', '');
    });

    it('handles undefined href', () => {
      render(<Link href={undefined}>Undefined Link</Link>);
      const link = screen.getByText('Undefined Link');
      expect(link.tagName).toBe('A');
      expect(link).not.toHaveAttribute('href');
    });

    it('handles very long text content', () => {
      const longText =
        'This is a very long link text that might wrap across multiple lines and should still work correctly with all the styling and functionality intact';
      render(<Link href='/long'>{longText}</Link>);
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('handles special characters in href', () => {
      const specialHref = '/path/with spaces/and&special?chars=123#anchor';
      render(<Link href={specialHref}>Special Link</Link>);
      expect(screen.getByRole('link')).toHaveAttribute('href', specialHref);
    });
  });
});
