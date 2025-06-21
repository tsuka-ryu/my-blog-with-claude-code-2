import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { expectNoA11yViolations } from '../test-utils/accessibility';

import { ColorPalette } from './color-palette';

// Mock navigator.clipboard
const mockClipboard = {
  writeText: vi.fn(),
};

Object.assign(navigator, {
  clipboard: mockClipboard,
});

// Mock console.error to avoid noise in tests
const originalError = console.error;

describe('ColorPalette Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = originalError;
  });

  it('renders the main title', () => {
    render(<ColorPalette />);
    expect(screen.getByText('Terminal Color Palette')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<ColorPalette />);
    expect(
      screen.getByText('技術ブログのターミナル風デザインで使用するカラーシステム')
    ).toBeInTheDocument();
  });

  it('renders all color sections', () => {
    render(<ColorPalette />);
    expect(screen.getByText('Background Colors')).toBeInTheDocument();
    expect(screen.getByText('Text Colors')).toBeInTheDocument();
    expect(screen.getByText('Accent Colors')).toBeInTheDocument();
    expect(screen.getByText('Syntax Highlighting')).toBeInTheDocument();
    expect(screen.getByText('UI Elements')).toBeInTheDocument();
  });

  it('renders color swatches with copy buttons', () => {
    render(<ColorPalette />);
    const copyButtons = screen.getAllByText('Copy');
    expect(copyButtons.length).toBeGreaterThan(0);
  });

  it('handles copy functionality', async () => {
    mockClipboard.writeText.mockResolvedValue(undefined);
    render(<ColorPalette />);

    const firstCopyButton = screen.getAllByText('Copy')[0];
    if (firstCopyButton) {
      fireEvent.click(firstCopyButton);
    }

    await waitFor(() => {
      expect(mockClipboard.writeText).toHaveBeenCalled();
    });
  });

  it('shows copied state after successful copy', async () => {
    mockClipboard.writeText.mockResolvedValue(undefined);
    render(<ColorPalette />);

    const firstCopyButton = screen.getAllByText('Copy')[0];
    if (firstCopyButton) {
      fireEvent.click(firstCopyButton);
    }

    await waitFor(() => {
      expect(screen.getByText('✓ Copied!')).toBeInTheDocument();
    });
  });

  it('handles copy failure gracefully', async () => {
    mockClipboard.writeText.mockRejectedValue(new Error('Copy failed'));
    render(<ColorPalette />);

    const firstCopyButton = screen.getAllByText('Copy')[0];
    if (firstCopyButton) {
      fireEvent.click(firstCopyButton);
    }

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Copy failed:', expect.any(Error));
    });
  });

  it('applies custom className', () => {
    render(<ColorPalette className='custom-class' />);
    const container = screen.getByText('Terminal Color Palette').closest('[class*="custom-class"]');
    expect(container).toHaveClass('custom-class');
  });

  it('forwards additional props', () => {
    render(<ColorPalette data-testid='color-palette' />);
    expect(screen.getByTestId('color-palette')).toBeInTheDocument();
  });

  it('displays color names correctly', () => {
    render(<ColorPalette />);
    // Check that color names are properly formatted (removing prefixes and formatting)
    expect(screen.getByText('bg primary')).toBeInTheDocument();
    expect(screen.getByText('text primary')).toBeInTheDocument();
    expect(screen.getByText('accent red')).toBeInTheDocument();
  });

  it('displays CSS variable names', () => {
    render(<ColorPalette />);
    expect(screen.getByText('--terminal-bg-primary')).toBeInTheDocument();
    expect(screen.getByText('--terminal-text-primary')).toBeInTheDocument();
    expect(screen.getByText('--terminal-accent-red')).toBeInTheDocument();
  });

  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<ColorPalette />);
      await expectNoA11yViolations(container);
    });

    it('should not have accessibility violations with custom className', async () => {
      const { container } = render(<ColorPalette className='test-class' />);
      await expectNoA11yViolations(container);
    });

    it('copy buttons should have proper titles', () => {
      render(<ColorPalette />);
      const copyButtons = screen.getAllByRole('button');

      copyButtons.forEach(button => {
        expect(button).toHaveAttribute('title');
        expect(button.getAttribute('title')).toMatch(/クリップボードにコピー|コピーしました！/);
      });
    });

    it('should have proper heading hierarchy', () => {
      render(<ColorPalette />);

      // Main title should be h2
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Terminal Color Palette');

      // Section titles should be h3
      const h3Headings = screen.getAllByRole('heading', { level: 3 });
      expect(h3Headings).toHaveLength(5); // 5 color sections
    });
  });

  describe('Color Swatch Interaction', () => {
    it('shows hover effects on color swatches', () => {
      render(<ColorPalette />);
      const colorSwatches = document.querySelectorAll('.w-16.h-16');
      expect(colorSwatches.length).toBeGreaterThan(0);
    });

    it('resets copied state after timeout', async () => {
      // This test verifies the timeout functionality exists
      mockClipboard.writeText.mockResolvedValue(undefined);

      render(<ColorPalette />);
      const firstCopyButton = screen.getAllByText('Copy')[0];

      if (firstCopyButton) {
        fireEvent.click(firstCopyButton);
      }

      await waitFor(() => {
        expect(screen.getByText('✓ Copied!')).toBeInTheDocument();
      });

      // Wait for the timeout to naturally complete (2 seconds + buffer)
      await new Promise(resolve => setTimeout(resolve, 2200));

      expect(screen.queryByText('✓ Copied!')).not.toBeInTheDocument();
    });
  });
});
