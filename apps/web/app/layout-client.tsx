'use client';

import { Footer, Navigation } from '@repo/ui';
import { useState } from 'react';

interface LayoutClientProps {
  children: React.ReactNode;
}

export function LayoutClient({ children }: LayoutClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'ホーム', href: '/' },
    { label: '記事一覧', href: '/posts' },
    { label: 'タグ', href: '/tags' },
    { label: '検索', href: '/search' },
  ];

  return (
    <div className='min-h-screen flex flex-col bg-background text-primary'>
      <Navigation
        title='技術ブログ'
        items={navigationItems}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        showThemeToggle={true}
      />
      <main className='flex-1 container mx-auto px-4 py-8'>{children}</main>
      <Footer />
    </div>
  );
}
