'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(storageKey) as Theme;
      if (stored) {
        setTheme(stored);
      }
    } catch (error) {
      // Silently handle localStorage errors (e.g., in private browsing mode)
      console.error('Failed to load theme from localStorage:', error);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    const updateResolvedTheme = (isDark: boolean) => {
      const newResolvedTheme = isDark ? 'dark' : 'light';
      setResolvedTheme(newResolvedTheme);

      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    if (theme === 'dark') {
      updateResolvedTheme(true);
    } else if (theme === 'light') {
      updateResolvedTheme(false);
    } else {
      // system
      try {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        updateResolvedTheme(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
          updateResolvedTheme(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      } catch {
        // Fallback to light theme if matchMedia is not available
        updateResolvedTheme(false);
      }
    }
  }, [theme, mounted]);

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    try {
      localStorage.setItem(storageKey, newTheme);
    } catch (error) {
      // Silently handle localStorage errors (e.g., in private browsing mode)
      console.error('Failed to save theme to localStorage:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
