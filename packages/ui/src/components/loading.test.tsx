import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';

import { expectNoA11yViolations } from '../test-utils/accessibility';

import { Loading } from './loading';

describe('Loading', () => {
  it('renders with default props', () => {
    render(<Loading />);
    const loading = screen.getByRole('status');
    expect(loading).toBeInTheDocument();
    expect(loading).toHaveAttribute('aria-label', '読み込み中');
    expect(loading).toHaveAttribute('aria-live', 'polite');
  });

  it('renders different variants', () => {
    const { rerender } = render(<Loading variant='spinner' />);
    expect(screen.getByRole('status').querySelector('.animate-spin')).toBeInTheDocument();

    rerender(<Loading variant='pulse' />);
    expect(screen.getByRole('status').querySelector('.animate-pulse')).toBeInTheDocument();

    rerender(<Loading variant='skeleton' />);
    const skeleton = screen.getByRole('status');
    expect(skeleton.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0);
    expect(skeleton.querySelectorAll('.h-4').length).toBe(3);
  });

  it('renders different sizes', () => {
    const { rerender } = render(<Loading size='sm' />);
    expect(screen.getByRole('status').querySelector('.w-4')).toBeInTheDocument();

    rerender(<Loading size='md' />);
    expect(screen.getByRole('status').querySelector('.w-8')).toBeInTheDocument();

    rerender(<Loading size='lg' />);
    expect(screen.getByRole('status').querySelector('.w-12')).toBeInTheDocument();
  });

  it('renders with text', () => {
    render(<Loading text='データを読み込んでいます...' />);
    const loading = screen.getByRole('status');
    expect(loading).toHaveAttribute('aria-label', 'データを読み込んでいます...');

    const textElement = screen.getByText('データを読み込んでいます...');
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveAttribute('aria-live', 'polite');
    expect(textElement).toHaveClass('font-mono');
  });

  it('applies different text sizes based on size prop', () => {
    const { rerender } = render(<Loading size='sm' text='Loading...' />);
    expect(screen.getByText('Loading...')).toHaveClass('text-sm');

    rerender(<Loading size='md' text='Loading...' />);
    expect(screen.getByText('Loading...')).toHaveClass('text-base');

    rerender(<Loading size='lg' text='Loading...' />);
    expect(screen.getByText('Loading...')).toHaveClass('text-lg');
  });

  it('applies custom className', () => {
    render(<Loading className='custom-loading' />);
    const innerDiv = screen.getByRole('status').firstElementChild;
    expect(innerDiv).toHaveClass('custom-loading');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Loading ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('passes through additional props', () => {
    render(<Loading data-testid='loading-indicator' />);
    const innerDiv = screen.getByRole('status').firstElementChild;
    expect(innerDiv).toHaveAttribute('data-testid', 'loading-indicator');
  });

  describe('Accessibility', () => {
    it('should not have accessibility violations for spinner', async () => {
      const { container } = render(<Loading variant='spinner' />);
      await expectNoA11yViolations(container);
    });

    it('should not have accessibility violations for pulse', async () => {
      const { container } = render(<Loading variant='pulse' />);
      await expectNoA11yViolations(container);
    });

    it('should not have accessibility violations for skeleton', async () => {
      const { container } = render(<Loading variant='skeleton' />);
      await expectNoA11yViolations(container);
    });

    it('should not have accessibility violations with text', async () => {
      const { container } = render(<Loading text='Processing...' />);
      await expectNoA11yViolations(container);
    });

    it('has proper ARIA attributes', () => {
      render(<Loading />);
      const loading = screen.getByRole('status');
      expect(loading).toHaveAttribute('aria-live', 'polite');
      expect(loading).toHaveAttribute('aria-label');
    });

    it('text element has aria-live attribute', () => {
      render(<Loading text='Please wait...' />);
      const textElement = screen.getByText('Please wait...');
      expect(textElement).toHaveAttribute('aria-live', 'polite');
    });
  });
});
