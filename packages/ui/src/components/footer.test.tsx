import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { expectNoA11yViolations } from '../test-utils/accessibility';

import { Footer } from './footer';

// Mock Date to ensure consistent year testing
const mockDate = new Date('2024-06-21T00:00:00Z');

describe('Footer Component', () => {
  beforeEach(() => {
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the footer element', () => {
    render(<Footer />);
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  });

  it('has proper ARIA attributes', () => {
    render(<Footer />);
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toHaveAttribute('aria-label', 'サイトフッター');
  });

  it('applies custom className', () => {
    render(<Footer className="custom-footer-class" />);
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toHaveClass('custom-footer-class');
  });

  it('displays the current year in copyright', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2024 tsuka-ryu\. All rights reserved\./)).toBeInTheDocument();
  });

  it('displays site information section', () => {
    render(<Footer />);
    expect(screen.getByText('技術ブログ')).toBeInTheDocument();
    expect(screen.getByText('技術共有・解説記事・Podcast感想を発信しています')).toBeInTheDocument();
  });

  describe('Navigation links', () => {
    it('renders navigation section', () => {
      render(<Footer />);
      expect(screen.getByText('ナビゲーション')).toBeInTheDocument();
    });

    it('renders all navigation links', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: '記事一覧' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'タグ' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: '検索' })).toBeInTheDocument();
    });

    it('navigation links have correct href attributes', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: '記事一覧' })).toHaveAttribute('href', '/posts');
      expect(screen.getByRole('link', { name: 'タグ' })).toHaveAttribute('href', '/tags');
      expect(screen.getByRole('link', { name: '検索' })).toHaveAttribute('href', '/search');
    });

    it('navigation has proper ARIA label', () => {
      render(<Footer />);
      const navElement = screen.getByLabelText('フッターナビゲーション');
      expect(navElement).toBeInTheDocument();
      expect(navElement.tagName).toBe('NAV');
    });
  });

  describe('Social links', () => {
    it('renders social links section', () => {
      render(<Footer />);
      expect(screen.getByText('リンク')).toBeInTheDocument();
    });

    it('renders all social links', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Twitter' })).toBeInTheDocument();
    });

    it('social links have correct href attributes', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
        'href',
        'https://github.com/tsukaryu'
      );
      expect(screen.getByRole('link', { name: 'Twitter' })).toHaveAttribute(
        'href',
        'https://twitter.com/tsukaryu'
      );
    });

    it('external links have proper security attributes', () => {
      render(<Footer />);
      const githubLink = screen.getByRole('link', { name: 'GitHub' });
      const twitterLink = screen.getByRole('link', { name: 'Twitter' });

      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
      expect(twitterLink).toHaveAttribute('target', '_blank');
      expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('social links navigation has proper ARIA label', () => {
      render(<Footer />);
      const socialNavElement = screen.getByLabelText('ソーシャルリンク');
      expect(socialNavElement).toBeInTheDocument();
      expect(socialNavElement.tagName).toBe('NAV');
    });
  });

  describe('Layout and structure', () => {
    it('renders all section headings', () => {
      render(<Footer />);
      expect(screen.getByText('技術ブログ')).toBeInTheDocument();
      expect(screen.getByText('ナビゲーション')).toBeInTheDocument();
      expect(screen.getByText('リンク')).toBeInTheDocument();
    });

    it('section headings are properly structured', () => {
      render(<Footer />);
      const headings = screen.getAllByRole('heading', { level: 3 });
      expect(headings).toHaveLength(3);
      expect(headings[0]).toHaveTextContent('技術ブログ');
      expect(headings[1]).toHaveTextContent('ナビゲーション');
      expect(headings[2]).toHaveTextContent('リンク');
    });
  });

  describe('Dynamic year functionality', () => {
    it('updates year dynamically', () => {
      const futureDate = new Date('2025-12-31T00:00:00Z');
      vi.setSystemTime(futureDate);

      render(<Footer />);
      expect(screen.getByText(/© 2025 tsuka-ryu\. All rights reserved\./)).toBeInTheDocument();
    });

    it('handles different years correctly', () => {
      const pastDate = new Date('2023-01-01T00:00:00Z');
      vi.setSystemTime(pastDate);

      render(<Footer />);
      expect(screen.getByText(/© 2023 tsuka-ryu\. All rights reserved\./)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<Footer />);
      await expectNoA11yViolations(container);
    });

    it('should not have accessibility violations with custom className', async () => {
      const { container } = render(<Footer className="test-footer" />);
      await expectNoA11yViolations(container);
    });

    it('has proper landmark structure', () => {
      render(<Footer />);

      // Footer should be a contentinfo landmark
      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();

      // Should have navigation landmarks
      const navElements = screen.getAllByRole('navigation');
      expect(navElements).toHaveLength(2);
    });

    it('all interactive elements are keyboard accessible', () => {
      render(<Footer />);
      const links = screen.getAllByRole('link');

      links.forEach(link => {
        expect(link).toBeVisible();
        expect(link).not.toHaveAttribute('tabindex', '-1');
      });
    });

    it('has proper heading hierarchy', () => {
      render(<Footer />);

      // All section headings should be h3
      const h3Headings = screen.getAllByRole('heading', { level: 3 });
      expect(h3Headings).toHaveLength(3);

      // No other heading levels should be present
      expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
      expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
      expect(screen.queryByRole('heading', { level: 4 })).not.toBeInTheDocument();
    });
  });

  describe('Content validation', () => {
    it('renders complete footer content', () => {
      render(<Footer />);

      // Site info
      expect(screen.getByText('技術ブログ')).toBeInTheDocument();
      expect(
        screen.getByText('技術共有・解説記事・Podcast感想を発信しています')
      ).toBeInTheDocument();

      // Navigation
      expect(screen.getByText('ナビゲーション')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: '記事一覧' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'タグ' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: '検索' })).toBeInTheDocument();

      // Social links
      expect(screen.getByText('リンク')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Twitter' })).toBeInTheDocument();

      // Copyright
      expect(screen.getByText(/© 2024 tsuka-ryu\. All rights reserved\./)).toBeInTheDocument();
    });

    it('all links are properly formed', () => {
      render(<Footer />);
      const links = screen.getAllByRole('link');

      links.forEach(link => {
        expect(link).toHaveAttribute('href');
        expect(link.getAttribute('href')).toBeTruthy();
        expect(link.textContent).toBeTruthy();
      });
    });
  });

  describe('Complex scenarios', () => {
    it('renders correctly within a page layout', async () => {
      const { container } = render(
        <div>
          <header>
            <h1>サイトヘッダー</h1>
          </header>
          <main>
            <h2>メインコンテンツ</h2>
            <p>ページの内容</p>
          </main>
          <Footer className="site-footer" />
        </div>
      );

      expect(screen.getByText('サイトヘッダー')).toBeInTheDocument();
      expect(screen.getByText('メインコンテンツ')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();

      await expectNoA11yViolations(container);
    });
  });
});
