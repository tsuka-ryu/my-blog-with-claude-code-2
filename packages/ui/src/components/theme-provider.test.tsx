import { render, screen, act, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { expectNoA11yViolations } from '../test-utils/accessibility';

import { ThemeProvider, useTheme, type Theme } from './theme-provider';

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

describe('ThemeProvider', () => {
  let mockMediaQuery: ReturnType<typeof createMockMediaQuery>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
    mockMediaQuery = createMockMediaQuery(false);
    vi.spyOn(window, 'matchMedia').mockReturnValue(mockMediaQuery as MediaQueryList);

    // Reset document classes
    document.documentElement.className = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Test component to access theme context
  function TestComponent() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    return (
      <div>
        <div data-testid='current-theme'>{theme}</div>
        <div data-testid='resolved-theme'>{resolvedTheme}</div>
        <button onClick={() => setTheme('dark')} data-testid='set-dark'>
          Set Dark
        </button>
        <button onClick={() => setTheme('light')} data-testid='set-light'>
          Set Light
        </button>
        <button onClick={() => setTheme('system')} data-testid='set-system'>
          Set System
        </button>
      </div>
    );
  }

  it('renders children correctly', () => {
    render(
      <ThemeProvider>
        <div>Test Content</div>
      </ThemeProvider>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('provides default theme values', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('current-theme')).toHaveTextContent('system');
      expect(screen.getByTestId('resolved-theme')).toHaveTextContent('light');
    });
  });

  it('accepts custom default theme', async () => {
    render(
      <ThemeProvider defaultTheme='dark'>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
      expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
    });
  });

  it('loads theme from localStorage', async () => {
    mockLocalStorage.getItem.mockReturnValue('dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    });
  });

  it('uses custom storage key', async () => {
    const customKey = 'custom-theme-key';
    render(
      <ThemeProvider storageKey={customKey}>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(customKey);
    });
  });

  describe('Theme switching', () => {
    it('updates theme when setTheme is called', async () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('system');
      });

      act(() => {
        screen.getByTestId('set-dark').click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
        expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
      });
    });

    it('saves theme to localStorage when changed', async () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('system');
      });

      act(() => {
        screen.getByTestId('set-light').click();
      });

      await waitFor(() => {
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'light');
      });
    });

    it('uses custom storage key when saving', async () => {
      const customKey = 'my-theme';
      render(
        <ThemeProvider storageKey={customKey}>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        screen.getByTestId('set-dark').click();
      });

      await waitFor(() => {
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(customKey, 'dark');
      });
    });
  });

  describe('DOM class manipulation', () => {
    it('adds dark class to document when theme is dark', async () => {
      render(
        <ThemeProvider defaultTheme='dark'>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(document.documentElement.classList.contains('dark')).toBe(true);
      });
    });

    it('removes dark class when theme is light', async () => {
      // Start with dark class
      document.documentElement.classList.add('dark');

      render(
        <ThemeProvider defaultTheme='light'>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(document.documentElement.classList.contains('dark')).toBe(false);
      });
    });

    it('updates DOM class when theme changes', async () => {
      render(
        <ThemeProvider defaultTheme='light'>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(document.documentElement.classList.contains('dark')).toBe(false);
      });

      act(() => {
        screen.getByTestId('set-dark').click();
      });

      await waitFor(() => {
        expect(document.documentElement.classList.contains('dark')).toBe(true);
      });
    });
  });

  describe('System theme detection', () => {
    it('follows system preference when theme is system', async () => {
      mockMediaQuery = createMockMediaQuery(true); // Dark preference
      vi.spyOn(window, 'matchMedia').mockReturnValue(mockMediaQuery as MediaQueryList);

      render(
        <ThemeProvider defaultTheme='system'>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
        expect(document.documentElement.classList.contains('dark')).toBe(true);
      });
    });

    it('listens to system theme changes', async () => {
      mockMediaQuery = createMockMediaQuery(false);
      vi.spyOn(window, 'matchMedia').mockReturnValue(mockMediaQuery as MediaQueryList);

      render(
        <ThemeProvider defaultTheme='system'>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('resolved-theme')).toHaveTextContent('light');
      });

      // Simulate system theme change
      act(() => {
        const changeHandler = mockMediaQuery.addEventListener.mock.calls.find(
          call => call[0] === 'change'
        )?.[1] as (e: MediaQueryListEvent) => void;

        if (changeHandler) {
          changeHandler({ matches: true } as MediaQueryListEvent);
        }
      });

      await waitFor(() => {
        expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
      });
    });

    it('cleans up media query listener', () => {
      const { unmount } = render(
        <ThemeProvider defaultTheme='system'>
          <TestComponent />
        </ThemeProvider>
      );

      unmount();

      expect(mockMediaQuery.removeEventListener).toHaveBeenCalled();
    });

    it('switches from system to explicit theme', async () => {
      mockMediaQuery = createMockMediaQuery(true); // System is dark
      vi.spyOn(window, 'matchMedia').mockReturnValue(mockMediaQuery as MediaQueryList);

      render(
        <ThemeProvider defaultTheme='system'>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
      });

      act(() => {
        screen.getByTestId('set-light').click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
        expect(screen.getByTestId('resolved-theme')).toHaveTextContent('light');
        expect(document.documentElement.classList.contains('dark')).toBe(false);
      });
    });
  });

  describe('useTheme hook', () => {
    it('throws error when used outside ThemeProvider', () => {
      function TestComponentWithoutProvider() {
        useTheme();
        return <div>Test</div>;
      }

      expect(() => {
        render(<TestComponentWithoutProvider />);
      }).toThrow('useTheme must be used within a ThemeProvider');
    });

    it('provides theme context values', async () => {
      render(
        <ThemeProvider defaultTheme='dark'>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
        expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
      });
    });
  });

  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(
        <ThemeProvider>
          <div>
            <h1>Theme Test</h1>
            <TestComponent />
          </div>
        </ThemeProvider>
      );
      await expectNoA11yViolations(container);
    });

    it('should not have accessibility violations with different themes', async () => {
      const themes: Theme[] = ['light', 'dark', 'system'];

      for (const theme of themes) {
        const { container, unmount } = render(
          <ThemeProvider defaultTheme={theme}>
            <div>
              <h1>Application</h1>
              <TestComponent />
            </div>
          </ThemeProvider>
        );
        await expectNoA11yViolations(container);
        unmount(); // Clean up between iterations
      }
    });
  });

  describe('Edge cases and error handling', () => {
    it('handles invalid localStorage value gracefully', async () => {
      mockLocalStorage.getItem.mockReturnValue('invalid-theme');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        // Should fallback to default theme
        expect(screen.getByTestId('current-theme')).toHaveTextContent('invalid-theme');
      });
    });

    it('handles localStorage errors gracefully', async () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error('LocalStorage error');
      });

      expect(() => {
        render(
          <ThemeProvider>
            <TestComponent />
          </ThemeProvider>
        );
      }).not.toThrow();
    });

    it('handles setItem localStorage errors gracefully', async () => {
      // Mock console.error to suppress expected error logs
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error('LocalStorage setItem error');
      });

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      // The component should handle the error internally
      // and still update the theme state even if localStorage fails
      await waitFor(() => {
        act(() => {
          screen.getByTestId('set-dark').click();
        });
      });

      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
      });

      consoleSpy.mockRestore();
    });

    it('handles matchMedia not being available', async () => {
      vi.spyOn(window, 'matchMedia').mockReturnValue(undefined as unknown as MediaQueryList);

      expect(() => {
        render(
          <ThemeProvider defaultTheme='system'>
            <TestComponent />
          </ThemeProvider>
        );
      }).not.toThrow();
    });
  });

  describe('Multiple theme changes', () => {
    it('handles rapid theme changes correctly', async () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('system');
      });

      act(() => {
        screen.getByTestId('set-dark').click();
      });

      act(() => {
        screen.getByTestId('set-light').click();
      });

      act(() => {
        screen.getByTestId('set-system').click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('system');
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'system');
      });
    });
  });

  describe('Complex scenarios', () => {
    it('works correctly in nested component structure', async () => {
      function NestedComponent() {
        const { resolvedTheme } = useTheme();
        return <div data-testid='nested-theme'>{resolvedTheme}</div>;
      }

      const { container } = render(
        <ThemeProvider defaultTheme='dark'>
          <header>
            <nav>
              <NestedComponent />
            </nav>
          </header>
          <main>
            <section>
              <TestComponent />
            </section>
          </main>
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('nested-theme')).toHaveTextContent('dark');
        expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
      });

      await expectNoA11yViolations(container);
    });

    it('maintains theme consistency across multiple components', async () => {
      function ThemeDisplay({ id }: { id: string }) {
        const { theme, resolvedTheme } = useTheme();
        return (
          <div>
            <span data-testid={`theme-${id}`}>{theme}</span>
            <span data-testid={`resolved-${id}`}>{resolvedTheme}</span>
          </div>
        );
      }

      render(
        <ThemeProvider defaultTheme='light'>
          <ThemeDisplay id='1' />
          <ThemeDisplay id='2' />
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('theme-1')).toHaveTextContent('light');
        expect(screen.getByTestId('theme-2')).toHaveTextContent('light');
        expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
      });

      act(() => {
        screen.getByTestId('set-dark').click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('theme-1')).toHaveTextContent('dark');
        expect(screen.getByTestId('theme-2')).toHaveTextContent('dark');
        expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
        expect(screen.getByTestId('resolved-1')).toHaveTextContent('dark');
        expect(screen.getByTestId('resolved-2')).toHaveTextContent('dark');
        expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
      });
    });
  });
});
