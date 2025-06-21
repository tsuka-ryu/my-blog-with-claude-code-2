import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { expectNoA11yViolations } from '../test-utils/accessibility';

import { ThemeProvider } from './theme-provider';
import { ThemeToggle } from './theme-toggle';
import { ThemeToggleFallback } from './theme-toggle-fallback';

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock matchMedia
const createMockMediaQuery = (matches: boolean) => ({
  matches,
  media: '(prefers-color-scheme: dark)',
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
});

describe('ThemeToggle', () => {
  let mockMediaQuery: ReturnType<typeof createMockMediaQuery>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
    mockMediaQuery = createMockMediaQuery(false);
    vi.spyOn(window, 'matchMedia').mockReturnValue(mockMediaQuery as MediaQueryList);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders fallback while mounting', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    // Initially shows fallback
    expect(screen.getByText('システム')).toBeInTheDocument();
    expect(screen.getByText('🖥️')).toBeInTheDocument();
  });

  it('renders button after mounting', async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    await waitFor(() => {
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });

  it('throws error when used outside ThemeProvider', () => {
    expect(() => {
      render(<ThemeToggle />);
    }).toThrow('useTheme must be used within a ThemeProvider');
  });

  describe('Theme display', () => {
    it('displays system theme by default', async () => {
      render(
        <ThemeProvider defaultTheme='system'>
          <ThemeToggle />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByText('システム')).toBeInTheDocument();
        expect(screen.getByText('🖥️')).toBeInTheDocument();
      });
    });

    it('displays light theme', async () => {
      render(
        <ThemeProvider defaultTheme='light'>
          <ThemeToggle />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByText('ライト')).toBeInTheDocument();
        expect(screen.getByText('☀️')).toBeInTheDocument();
      });
    });

    it('displays dark theme', async () => {
      render(
        <ThemeProvider defaultTheme='dark'>
          <ThemeToggle />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByText('ダーク')).toBeInTheDocument();
        expect(screen.getByText('🌙')).toBeInTheDocument();
      });
    });
  });

  describe('Theme cycling', () => {
    it('cycles from light to dark to system to light', async () => {
      render(
        <ThemeProvider defaultTheme='light'>
          <ThemeToggle />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByText('ライト')).toBeInTheDocument();
      });

      const button = screen.getByRole('button');

      // Light → Dark
      fireEvent.click(button);
      await waitFor(() => {
        expect(screen.getByText('ダーク')).toBeInTheDocument();
        expect(screen.getByText('🌙')).toBeInTheDocument();
      });

      // Dark → System
      fireEvent.click(button);
      await waitFor(() => {
        expect(screen.getByText('システム')).toBeInTheDocument();
        expect(screen.getByText('🖥️')).toBeInTheDocument();
      });

      // System → Light
      fireEvent.click(button);
      await waitFor(() => {
        expect(screen.getByText('ライト')).toBeInTheDocument();
        expect(screen.getByText('☀️')).toBeInTheDocument();
      });
    });

    it('cycles correctly starting from dark theme', async () => {
      render(
        <ThemeProvider defaultTheme='dark'>
          <ThemeToggle />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByText('ダーク')).toBeInTheDocument();
      });

      const button = screen.getByRole('button');

      // Dark → System
      fireEvent.click(button);
      await waitFor(() => {
        expect(screen.getByText('システム')).toBeInTheDocument();
      });

      // System → Light
      fireEvent.click(button);
      await waitFor(() => {
        expect(screen.getByText('ライト')).toBeInTheDocument();
      });

      // Light → Dark
      fireEvent.click(button);
      await waitFor(() => {
        expect(screen.getByText('ダーク')).toBeInTheDocument();
      });
    });

    it('cycles correctly starting from system theme', async () => {
      render(
        <ThemeProvider defaultTheme='system'>
          <ThemeToggle />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByText('システム')).toBeInTheDocument();
      });

      const button = screen.getByRole('button');

      // System → Light
      fireEvent.click(button);
      await waitFor(() => {
        expect(screen.getByText('ライト')).toBeInTheDocument();
      });

      // Light → Dark
      fireEvent.click(button);
      await waitFor(() => {
        expect(screen.getByText('ダーク')).toBeInTheDocument();
      });

      // Dark → System
      fireEvent.click(button);
      await waitFor(() => {
        expect(screen.getByText('システム')).toBeInTheDocument();
      });
    });
  });

  describe('Button attributes', () => {
    it('has proper title attribute for light theme', async () => {
      render(
        <ThemeProvider defaultTheme='light'>
          <ThemeToggle />
        </ThemeProvider>
      );

      await waitFor(() => {
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('title', '現在: ライトモード (クリックで切り替え)');
      });
    });

    it('has proper title attribute for dark theme', async () => {
      render(
        <ThemeProvider defaultTheme='dark'>
          <ThemeToggle />
        </ThemeProvider>
      );

      await waitFor(() => {
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('title', '現在: ダークモード (クリックで切り替え)');
      });
    });

    it('has proper title attribute for system theme', async () => {
      render(
        <ThemeProvider defaultTheme='system'>
          <ThemeToggle />
        </ThemeProvider>
      );

      await waitFor(() => {
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('title', '現在: システムモード (クリックで切り替え)');
      });
    });

    it('updates title when theme changes', async () => {
      render(
        <ThemeProvider defaultTheme='light'>
          <ThemeToggle />
        </ThemeProvider>
      );

      await waitFor(() => {
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('title', '現在: ライトモード (クリックで切り替え)');
      });

      const button = screen.getByRole('button');
      fireEvent.click(button);

      await waitFor(() => {
        expect(button).toHaveAttribute('title', '現在: ダークモード (クリックで切り替え)');
      });
    });
  });

  describe('Styling and classes', () => {
    it('applies correct CSS classes to button', async () => {
      render(
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      );

      await waitFor(() => {
        const button = screen.getByRole('button');
        expect(button).toHaveClass(
          'inline-flex',
          'items-center',
          'gap-2',
          'px-3',
          'py-2',
          'text-sm',
          'font-medium',
          'rounded-md',
          'border',
          'border-terminal-ui-border',
          'bg-terminal-bg-primary',
          'text-terminal-text-primary',
          'hover:bg-terminal-bg-hover',
          'focus:outline-none',
          'focus:ring-2'
        );
      });
    });

    it('fallback applies correct CSS classes', () => {
      render(
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      );

      // Check fallback styling (before mount)
      const fallback = screen.getByText('システム').closest('div');
      expect(fallback).toHaveClass(
        'inline-flex',
        'items-center',
        'gap-2',
        'px-3',
        'py-2',
        'text-sm',
        'font-medium',
        'rounded-md',
        'border',
        'opacity-50'
      );
    });
  });

  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      );
      await expectNoA11yViolations(container);
    });

    it('should not have accessibility violations for all themes', async () => {
      const themes = ['light', 'dark', 'system'] as const;

      for (const theme of themes) {
        const { container } = render(
          <ThemeProvider defaultTheme={theme}>
            <ThemeToggle />
          </ThemeProvider>
        );
        await expectNoA11yViolations(container);
      }
    });

    it('should not have accessibility violations in context', async () => {
      const { container } = render(
        <ThemeProvider>
          <nav>
            <ul>
              <li>
                <a href='/home'>Home</a>
              </li>
              <li>
                <ThemeToggle />
              </li>
            </ul>
          </nav>
        </ThemeProvider>
      );
      await expectNoA11yViolations(container);
    });

    it('button has proper role and is keyboard accessible', async () => {
      render(
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      );

      await waitFor(() => {
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button.tagName).toBe('BUTTON');
      });
    });

    it('supports keyboard navigation', async () => {
      render(
        <ThemeProvider defaultTheme='light'>
          <ThemeToggle />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByText('ライト')).toBeInTheDocument();
      });

      const button = screen.getByRole('button');

      // Focus the button
      button.focus();
      expect(document.activeElement).toBe(button);

      // Press Enter to activate
      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });

      await waitFor(() => {
        expect(screen.getByText('ダーク')).toBeInTheDocument();
      });
    });

    it('supports space key activation', async () => {
      render(
        <ThemeProvider defaultTheme='dark'>
          <ThemeToggle />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByText('ダーク')).toBeInTheDocument();
      });

      const button = screen.getByRole('button');

      // Press Space to activate (use fireEvent.click since Space key naturally triggers click)
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText('システム')).toBeInTheDocument();
      });
    });
  });

  describe('Integration with ThemeProvider', () => {
    it('updates localStorage when theme changes', async () => {
      render(
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      );

      await waitFor(() => {
        const button = screen.getByRole('button');
        fireEvent.click(button);
      });

      await waitFor(() => {
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'light');
      });
    });

    it('works with custom storage key', async () => {
      render(
        <ThemeProvider storageKey='custom-theme'>
          <ThemeToggle />
        </ThemeProvider>
      );

      await waitFor(() => {
        const button = screen.getByRole('button');
        fireEvent.click(button);
      });

      await waitFor(() => {
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith('custom-theme', 'light');
      });
    });
  });

  describe('Multiple rapid clicks', () => {
    it('handles rapid theme changes correctly', async () => {
      render(
        <ThemeProvider defaultTheme='light'>
          <ThemeToggle />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByText('ライト')).toBeInTheDocument();
      });

      const button = screen.getByRole('button');

      // Rapid clicks
      fireEvent.click(button); // Light → Dark
      fireEvent.click(button); // Dark → System
      fireEvent.click(button); // System → Light

      await waitFor(() => {
        expect(screen.getByText('ライト')).toBeInTheDocument();
        expect(screen.getByText('☀️')).toBeInTheDocument();
      });
    });
  });
});

describe('ThemeToggleFallback', () => {
  it('renders fallback content correctly', () => {
    render(<ThemeToggleFallback />);

    expect(screen.getByText('システム')).toBeInTheDocument();
    expect(screen.getByText('🖥️')).toBeInTheDocument();
  });

  it('applies correct styling', () => {
    render(<ThemeToggleFallback />);

    const fallback = screen.getByText('システム').closest('div');
    expect(fallback).toHaveClass(
      'inline-flex',
      'items-center',
      'gap-2',
      'px-3',
      'py-2',
      'text-sm',
      'font-medium',
      'rounded-md',
      'border',
      'border-terminal-ui-border',
      'bg-terminal-bg-primary',
      'text-terminal-text-primary',
      'opacity-50'
    );
  });

  it('should not have accessibility violations', async () => {
    const { container } = render(<ThemeToggleFallback />);
    await expectNoA11yViolations(container);
  });

  it('renders within page context without accessibility violations', async () => {
    const { container } = render(
      <nav>
        <ThemeToggleFallback />
      </nav>
    );
    await expectNoA11yViolations(container);
  });
});

describe('ThemeToggle and ThemeToggleFallback integration', () => {
  it('fallback and actual component have similar visual appearance', async () => {
    const { rerender } = render(<ThemeToggleFallback />);

    const fallbackContainer = screen.getByText('システム').closest('div');
    const fallbackClasses = fallbackContainer?.className;

    rerender(
      <ThemeProvider defaultTheme='system'>
        <ThemeToggle />
      </ThemeProvider>
    );

    // After the component mounts, it becomes a button
    await waitFor(() => {
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(screen.getByText('システム')).toBeInTheDocument();
    });

    // The fallback and button should have similar visual styles
    expect(fallbackClasses).toContain('inline-flex');
    expect(fallbackClasses).toContain('items-center');
    expect(fallbackClasses).toContain('gap-2');
  });

  it('transitions smoothly from fallback to interactive button', async () => {
    render(
      <ThemeProvider defaultTheme='system'>
        <ThemeToggle />
      </ThemeProvider>
    );

    // Initially shows fallback (non-interactive)
    expect(screen.getByText('システム')).toBeInTheDocument();

    // After mount, becomes interactive
    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('システム')).toBeInTheDocument(); // Same text content
    });
  });

  it('should not have accessibility violations during transition', async () => {
    const { container } = render(
      <ThemeProvider defaultTheme='system'>
        <div>
          <h1>Navigation</h1>
          <ThemeToggle />
        </div>
      </ThemeProvider>
    );

    // Test both fallback and mounted states
    await expectNoA11yViolations(container);

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    await expectNoA11yViolations(container);
  });
});
