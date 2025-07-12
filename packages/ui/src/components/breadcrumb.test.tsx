import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';

import { expectNoA11yViolations } from '../test-utils/accessibility';

import { Breadcrumb } from './breadcrumb';
import { ThemeProvider } from './theme-provider';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('Breadcrumb', () => {
  it('renders breadcrumb items correctly', () => {
    const items = [
      { label: 'ホーム', href: '/' },
      { label: '記事一覧', href: '/posts' },
      { label: '記事タイトル' },
    ];

    render(<Breadcrumb items={items} />, { wrapper: TestWrapper });

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByLabelText('パンくずナビゲーション')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'ホーム' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '記事一覧' })).toBeInTheDocument();
    expect(screen.getByText('記事タイトル')).toBeInTheDocument();
  });

  it('marks current page item with aria-current', () => {
    const items = [{ label: 'ホーム', href: '/' }, { label: '現在のページ' }];

    render(<Breadcrumb items={items} />, { wrapper: TestWrapper });

    const homeLink = screen.getByRole('link', { name: 'ホーム' });
    expect(homeLink).not.toHaveAttribute('aria-current');

    const currentItem = screen.getByText('現在のページ');
    expect(currentItem).toHaveAttribute('aria-current', 'page');
  });

  it('renders separator between items', () => {
    const items = [{ label: 'ホーム', href: '/' }, { label: '記事' }];

    render(<Breadcrumb items={items} />, { wrapper: TestWrapper });

    // ChevronRightアイコンがaria-hiddenで区切り文字として存在することを確認
    const { container } = render(<Breadcrumb items={items} />, { wrapper: TestWrapper });
    const separators = container.querySelectorAll('[aria-hidden="true"]');
    expect(separators.length).toBeGreaterThan(0);
  });

  it('handles single item', () => {
    const items = [{ label: 'ホーム' }];

    const { container } = render(<Breadcrumb items={items} />, { wrapper: TestWrapper });

    expect(screen.getByText('ホーム')).toBeInTheDocument();
    // 区切り文字（ChevronRight）が存在しないことを確認
    const separators = container.querySelectorAll('[aria-hidden="true"]');
    expect(separators.length).toBe(0);
  });

  it('handles empty items array', () => {
    render(<Breadcrumb items={[]} />, { wrapper: TestWrapper });

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.queryByText('ホーム')).not.toBeInTheDocument();
  });

  it('should not have accessibility violations', async () => {
    const items = [
      { label: 'ホーム', href: '/' },
      { label: '記事一覧', href: '/posts' },
      { label: '記事タイトル' },
    ];

    const { container } = render(<Breadcrumb items={items} />, {
      wrapper: TestWrapper,
    });
    await expectNoA11yViolations(container);
  });

  it('should not have accessibility violations with single item', async () => {
    const items = [{ label: 'ホーム' }];

    const { container } = render(<Breadcrumb items={items} />, {
      wrapper: TestWrapper,
    });
    await expectNoA11yViolations(container);
  });
});
