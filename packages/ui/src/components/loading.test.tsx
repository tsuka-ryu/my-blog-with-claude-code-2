import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';

import { expectNoA11yViolations } from '../test-utils/accessibility';

import { Loading } from './loading';

describe('Loading Component', () => {
  it('renders with default spinner variant', () => {
    render(<Loading />);
    const loadingElement = screen.getByRole('status');
    expect(loadingElement).toBeInTheDocument();
  });

  it('has proper ARIA attributes', () => {
    render(<Loading />);
    const loadingElement = screen.getByRole('status');
    expect(loadingElement).toHaveAttribute('aria-live', 'polite');
    expect(loadingElement).toHaveAttribute('aria-label', '読み込み中');
  });

  it('applies custom className', () => {
    render(<Loading className='custom-loading' />);
    const loadingContainer = screen.getByRole('status').querySelector('div');
    expect(loadingContainer).toHaveClass('custom-loading');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Loading ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('forwards additional props', () => {
    render(<Loading data-testid='loading-component' />);
    expect(screen.getByTestId('loading-component')).toBeInTheDocument();
  });

  describe('Variants', () => {
    it('renders spinner variant by default', () => {
      render(<Loading />);
      const spinner = screen.getByRole('status').querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass('rounded-full', 'border-2');
    });

    it('renders spinner variant explicitly', () => {
      render(<Loading variant='spinner' />);
      const spinner = screen.getByRole('status').querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
      // aria-label is on the container, not the spinner itself
      expect(screen.getByRole('status')).toHaveAttribute('aria-label', '読み込み中');
    });

    it('renders pulse variant', () => {
      render(<Loading variant='pulse' />);
      const pulse = screen.getByRole('status').querySelector('.animate-pulse.rounded-full');
      expect(pulse).toBeInTheDocument();
      // aria-label is on the container, not the pulse itself
      expect(screen.getByRole('status')).toHaveAttribute('aria-label', '読み込み中');
    });

    it('renders skeleton variant', () => {
      render(<Loading variant='skeleton' />);
      const skeleton = screen.getByRole('status').querySelector('.animate-pulse.space-y-2');
      expect(skeleton).toBeInTheDocument();

      // Check for skeleton lines
      const skeletonLines = screen.getByRole('status').querySelectorAll('.h-4.bg-gray-300');
      expect(skeletonLines).toHaveLength(3);
    });
  });

  describe('Sizes', () => {
    it('applies default medium size', () => {
      render(<Loading variant='spinner' />);
      const spinner = screen.getByRole('status').querySelector('.animate-spin');
      expect(spinner).toHaveClass('w-8', 'h-8');
    });

    it('applies small size', () => {
      render(<Loading variant='spinner' size='sm' />);
      const spinner = screen.getByRole('status').querySelector('.animate-spin');
      expect(spinner).toHaveClass('w-4', 'h-4');
    });

    it('applies medium size explicitly', () => {
      render(<Loading variant='spinner' size='md' />);
      const spinner = screen.getByRole('status').querySelector('.animate-spin');
      expect(spinner).toHaveClass('w-8', 'h-8');
    });

    it('applies large size', () => {
      render(<Loading variant='spinner' size='lg' />);
      const spinner = screen.getByRole('status').querySelector('.animate-spin');
      expect(spinner).toHaveClass('w-12', 'h-12');
    });

    it('applies size to pulse variant', () => {
      render(<Loading variant='pulse' size='lg' />);
      const pulse = screen.getByRole('status').querySelector('.animate-pulse.rounded-full');
      expect(pulse).toHaveClass('w-12', 'h-12');
    });

    it('skeleton variant ignores size prop for its structure', () => {
      render(<Loading variant='skeleton' size='lg' />);
      const skeleton = screen.getByRole('status').querySelector('.animate-pulse.space-y-2');
      expect(skeleton).toBeInTheDocument();
      // Skeleton has its own fixed structure regardless of size prop
    });
  });

  describe('Text prop', () => {
    it('displays custom loading text', () => {
      render(<Loading text='データを読み込み中...' />);
      expect(screen.getByText('データを読み込み中...')).toBeInTheDocument();
    });

    it('text has proper ARIA attributes', () => {
      render(<Loading text='Processing...' />);
      const textElement = screen.getByText('Processing...');
      expect(textElement).toHaveAttribute('aria-live', 'polite');
    });

    it('applies correct text size for small loading', () => {
      render(<Loading size='sm' text='Small loading' />);
      const textElement = screen.getByText('Small loading');
      expect(textElement).toHaveClass('text-sm');
    });

    it('applies correct text size for medium loading', () => {
      render(<Loading size='md' text='Medium loading' />);
      const textElement = screen.getByText('Medium loading');
      expect(textElement).toHaveClass('text-base');
    });

    it('applies correct text size for large loading', () => {
      render(<Loading size='lg' text='Large loading' />);
      const textElement = screen.getByText('Large loading');
      expect(textElement).toHaveClass('text-lg');
    });

    it('updates aria-label when custom text is provided', () => {
      render(<Loading text='カスタムローディング' />);
      const loadingElement = screen.getByRole('status');
      expect(loadingElement).toHaveAttribute('aria-label', 'カスタムローディング');
    });

    it('does not render text element when text prop is not provided', () => {
      render(<Loading />);
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<Loading />);
      await expectNoA11yViolations(container);
    });

    it('should not have accessibility violations with text', async () => {
      const { container } = render(<Loading text='Loading content...' />);
      await expectNoA11yViolations(container);
    });

    it('should not have accessibility violations for all variants', async () => {
      const variants = ['spinner', 'pulse', 'skeleton'] as const;
      for (const variant of variants) {
        const { container } = render(<Loading variant={variant} text={`Loading ${variant}...`} />);
        await expectNoA11yViolations(container);
      }
    });

    it('should not have accessibility violations for all sizes', async () => {
      const sizes = ['sm', 'md', 'lg'] as const;
      for (const size of sizes) {
        const { container } = render(<Loading size={size} text={`Loading ${size} size...`} />);
        await expectNoA11yViolations(container);
      }
    });

    it('should not have accessibility violations in context', async () => {
      const { container } = render(
        <div>
          <h1>Application</h1>
          <main>
            <p>Content is loading...</p>
            <Loading text='データを読み込み中...' />
          </main>
        </div>
      );
      await expectNoA11yViolations(container);
    });

    it('has proper role attributes for individual elements', () => {
      render(<Loading variant='spinner' />);
      const statusElements = screen.getAllByRole('status');
      expect(statusElements).toHaveLength(1); // Only main container
    });
  });

  describe('Animation classes', () => {
    it('spinner has animate-spin class', () => {
      render(<Loading variant='spinner' />);
      const spinner = screen.getByRole('status').querySelector('.animate-spin');
      expect(spinner).toHaveClass('animate-spin');
    });

    it('pulse has animate-pulse class', () => {
      render(<Loading variant='pulse' />);
      const pulse = screen.getByRole('status').querySelector('.animate-pulse.rounded-full');
      expect(pulse).toHaveClass('animate-pulse');
    });

    it('skeleton has animate-pulse class', () => {
      render(<Loading variant='skeleton' />);
      const skeleton = screen.getByRole('status').querySelector('.animate-pulse.space-y-2');
      expect(skeleton).toHaveClass('animate-pulse');
    });
  });

  describe('Styling', () => {
    it('applies proper spinner styling', () => {
      render(<Loading variant='spinner' />);
      const spinner = screen.getByRole('status').querySelector('.animate-spin');
      expect(spinner).toHaveClass(
        'rounded-full',
        'border-2',
        'border-gray-300',
        'border-t-green-400'
      );
    });

    it('applies proper pulse styling', () => {
      render(<Loading variant='pulse' />);
      const pulse = screen.getByRole('status').querySelector('.animate-pulse.rounded-full');
      expect(pulse).toHaveClass('rounded-full', 'bg-gray-300');
    });

    it('applies proper skeleton styling', () => {
      render(<Loading variant='skeleton' />);
      const skeletonContainer = screen
        .getByRole('status')
        .querySelector('.animate-pulse.space-y-2');
      expect(skeletonContainer).toHaveClass('space-y-2');

      const skeletonLines = screen.getByRole('status').querySelectorAll('.h-4');
      expect(skeletonLines[0]).toHaveClass('w-3/4');
      expect(skeletonLines[1]).toHaveClass('w-1/2');
      expect(skeletonLines[2]).toHaveClass('w-5/6');
    });

    it('text has proper styling', () => {
      render(<Loading text='Loading...' />);
      const textElement = screen.getByText('Loading...');
      expect(textElement).toHaveClass('text-gray-600', 'font-mono');
    });
  });

  describe('Complex scenarios', () => {
    it('handles all props combined', () => {
      render(
        <Loading
          variant='spinner'
          size='lg'
          text='大きなスピナーで読み込み中...'
          className='custom-loading'
          data-testid='complex-loading'
        />
      );

      expect(screen.getByTestId('complex-loading')).toBeInTheDocument();
      expect(screen.getByText('大きなスピナーで読み込み中...')).toBeInTheDocument();

      const spinner = screen.getByRole('status').querySelector('.animate-spin');
      expect(spinner).toHaveClass('w-12', 'h-12');

      const textElement = screen.getByText('大きなスピナーで読み込み中...');
      expect(textElement).toHaveClass('text-lg');
    });

    it('should not have accessibility violations in complex scenario', async () => {
      const { container } = render(
        <section>
          <h2>Data Dashboard</h2>
          <div role='region' aria-label='Charts'>
            <Loading variant='skeleton' />
          </div>
          <div role='region' aria-label='Status'>
            <Loading variant='pulse' size='sm' text='Updating...' />
          </div>
          <div role='region' aria-label='Main content'>
            <Loading variant='spinner' size='lg' text='読み込み中...' />
          </div>
        </section>
      );
      await expectNoA11yViolations(container);
    });

    it('works correctly within forms and buttons', async () => {
      const { container } = render(
        <form>
          <fieldset>
            <legend>User Information</legend>
            <button type='submit' disabled>
              <Loading variant='spinner' size='sm' />
              Save Changes
            </button>
          </fieldset>
        </form>
      );
      await expectNoA11yViolations(container);
    });
  });

  describe('Edge cases', () => {
    it('handles empty text prop', () => {
      render(<Loading text='' />);
      // Empty text should not render a span element
      const container = screen.getByRole('status');
      const textSpan = container.querySelector('span[aria-live="polite"]');
      expect(textSpan).not.toBeInTheDocument();
    });

    it('handles very long text', () => {
      const longText =
        'This is a very long loading message that might wrap across multiple lines and should still be accessible and properly styled';
      render(<Loading text={longText} />);
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('handles special characters in text', () => {
      const specialText = 'Loading... 読み込み中 🔄 100%';
      render(<Loading text={specialText} />);
      expect(screen.getByText(specialText)).toBeInTheDocument();
    });

    it('maintains accessibility with multiple loading components', async () => {
      const { container } = render(
        <div>
          <Loading variant='spinner' text='First loading' />
          <Loading variant='pulse' text='Second loading' />
          <Loading variant='skeleton' />
        </div>
      );
      await expectNoA11yViolations(container);
    });
  });
});
