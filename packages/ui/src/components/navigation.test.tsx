import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';

import { expectNoA11yViolations } from '../test-utils/accessibility';

import { Navigation, Header } from './navigation';
import { ThemeProvider } from './theme-provider';

// Test wrapper that provides theme context
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('Navigation Components', () => {
  describe('Navigation', () => {
    const mockItems = [
      { href: '/', label: 'Home', isActive: true },
      { href: '/blog', label: 'Blog', isActive: false },
      { href: '/about', label: 'About', isActive: false },
    ];

    it('renders navigation items correctly', () => {
      render(<Navigation title='Test Blog' items={mockItems} />, { wrapper: TestWrapper });

      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Blog' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    });

    it('marks active item with aria-current', () => {
      render(<Navigation title='Test Blog' items={mockItems} />, { wrapper: TestWrapper });

      const homeLink = screen.getByRole('link', { name: 'Home' });
      expect(homeLink).toHaveAttribute('aria-current', 'page');

      const blogLink = screen.getByRole('link', { name: 'Blog' });
      expect(blogLink).not.toHaveAttribute('aria-current');
    });

    it('should not have accessibility violations', async () => {
      const { container } = render(<Navigation title='Test Blog' items={mockItems} />, {
        wrapper: TestWrapper,
      });
      await expectNoA11yViolations(container);
    });

    it('should not have accessibility violations with single item', async () => {
      const singleItem = [{ href: '/', label: 'Home', isActive: true }];
      const { container } = render(<Navigation title='Test Blog' items={singleItem} />, {
        wrapper: TestWrapper,
      });
      await expectNoA11yViolations(container);
    });

    it('should not have accessibility violations with external links', async () => {
      const externalItems = [
        { href: 'https://example.com', label: 'External Link', isActive: false },
        { href: 'mailto:test@example.com', label: 'Email', isActive: false },
      ];
      const { container } = render(<Navigation title='Test Blog' items={externalItems} />, {
        wrapper: TestWrapper,
      });
      await expectNoA11yViolations(container);
    });
  });

  describe('Header', () => {
    it('renders header with title', () => {
      render(<Header title='My Blog' />);

      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByText('My Blog')).toBeInTheDocument();
    });

    it('renders header with description', () => {
      render(<Header title='My Blog' description='A technical blog' />);

      expect(screen.getByText('My Blog')).toBeInTheDocument();
      expect(screen.getByText('A technical blog')).toBeInTheDocument();
    });

    it('renders breadcrumbs when provided', () => {
      const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: 'Post Title' },
      ];

      render(<Header title='Post Title' breadcrumbs={breadcrumbs} />);

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Blog')).toBeInTheDocument();
      expect(screen.getAllByText('Post Title')).toHaveLength(2); // breadcrumb + title
    });

    it('should not have accessibility violations', async () => {
      const { container } = render(<Header title='My Blog' />);
      await expectNoA11yViolations(container);
    });

    it('should not have accessibility violations with breadcrumbs', async () => {
      const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Current Page' }];

      const { container } = render(<Header title='My Blog' breadcrumbs={breadcrumbs} />);
      await expectNoA11yViolations(container);
    });

    it('should not have accessibility violations with actions', async () => {
      const actions = <button type='button'>Action</button>;

      const { container } = render(<Header title='My Blog' actions={actions} />);
      await expectNoA11yViolations(container);
    });

    it('should not have accessibility violations with all props', async () => {
      const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Current' }];
      const actions = <button type='button'>Action</button>;

      const { container } = render(
        <Header
          title='My Blog'
          description='A technical blog'
          breadcrumbs={breadcrumbs}
          actions={actions}
        />
      );
      await expectNoA11yViolations(container);
    });

    it('maintains proper landmark structure', () => {
      render(<Header title='My Blog' />);

      const banner = screen.getByRole('banner');
      expect(banner).toBeInTheDocument();
    });
  });
});
