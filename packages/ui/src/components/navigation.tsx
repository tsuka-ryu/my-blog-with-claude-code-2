'use client';

import React from 'react';

import { Button } from './button';
import { ThemeToggle } from './theme-toggle';

interface NavigationItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface NavigationProps {
  /** サイトのタイトル */
  title: string;
  /** ナビゲーションアイテム */
  items?: NavigationItem[];
  /** モバイルメニューの開閉状態 */
  isMobileMenuOpen?: boolean;
  /** モバイルメニューの開閉ハンドラー */
  onMobileMenuToggle?: () => void;
  /** テーマトグルを表示するかどうか */
  showThemeToggle?: boolean;
  /** 追加のコンテンツ（言語切り替えなど） */
  extraContent?: React.ReactNode;
}

export function Navigation({
  title,
  items = [],
  isMobileMenuOpen = false,
  onMobileMenuToggle,
  showThemeToggle = true,
  extraContent,
}: NavigationProps) {
  return (
    <nav
      className='border-b border-accent bg-card'
      role='navigation'
      aria-label='メインナビゲーション'
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          {/* ロゴ・タイトル */}
          <div className='flex items-center'>
            <h1 className='text-xl font-bold text-primary'>
              <a
                href='/'
                className='hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-card'
                aria-label={`${title} - ホームページに移動`}
              >
                {title}
              </a>
            </h1>
          </div>

          {/* デスクトップナビゲーション */}
          <div className='hidden md:block'>
            <div className='ml-10 flex items-baseline space-x-4'>
              {items.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-card ${
                    item.isActive
                      ? 'bg-accent text-card'
                      : 'text-primary hover:bg-accent/10 hover:text-accent'
                  }`}
                  aria-current={item.isActive ? 'page' : undefined}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* 右側のコントロール */}
          <div className='flex items-center space-x-4'>
            {showThemeToggle && <ThemeToggle />}
            {extraContent}

            {/* モバイルメニューボタン */}
            <div className='md:hidden'>
              <Button
                variant='outline'
                size='sm'
                onClick={onMobileMenuToggle}
                aria-expanded={isMobileMenuOpen}
                aria-controls='mobile-menu'
                aria-label='メニューを開く'
                className='p-2'
              >
                <span className='sr-only'>メニューを開く</span>
                <svg
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  ) : (
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  )}
                </svg>
              </Button>
            </div>
          </div>
        </div>

        {/* モバイルメニュー */}
        {isMobileMenuOpen && (
          <div
            className='md:hidden'
            id='mobile-menu'
            role='menu'
            aria-labelledby='mobile-menu-button'
          >
            <div className='space-y-1 px-2 pb-3 pt-2 sm:px-3'>
              {items.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-card ${
                    item.isActive
                      ? 'bg-accent text-card'
                      : 'text-primary hover:bg-accent/10 hover:text-accent'
                  }`}
                  role='menuitem'
                  aria-current={item.isActive ? 'page' : undefined}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

interface HeaderProps {
  /** ページのタイトル */
  title?: string;
  /** ページの説明 */
  description?: string;
  /** パンくずナビゲーション */
  breadcrumbs?: Array<{ label: string; href?: string }>;
  /** 追加のアクション */
  actions?: React.ReactNode;
}

export function Header({ title, description, breadcrumbs, actions }: HeaderProps) {
  return (
    <header className='bg-card border-b border-accent' role='banner'>
      <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
        {/* パンくずナビゲーション */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className='mb-4' aria-label='パンくずナビゲーション'>
            <ol className='flex items-center space-x-2 text-sm'>
              {breadcrumbs.map((breadcrumb, index) => (
                <li key={index} className='flex items-center'>
                  {index > 0 && (
                    <svg
                      className='mr-2 h-4 w-4 text-muted'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      aria-hidden='true'
                    >
                      <path
                        fillRule='evenodd'
                        d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  )}
                  {breadcrumb.href ? (
                    <a
                      href={breadcrumb.href}
                      className='text-muted hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-card'
                    >
                      {breadcrumb.label}
                    </a>
                  ) : (
                    <span className='text-primary font-medium' aria-current='page'>
                      {breadcrumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* タイトルとアクション */}
        <div className='flex items-center justify-between'>
          <div className='min-w-0 flex-1'>
            {title && (
              <h1 className='text-2xl font-bold text-primary sm:text-3xl sm:truncate'>{title}</h1>
            )}
            {description && <p className='mt-1 text-sm text-muted'>{description}</p>}
          </div>
          {actions && <div className='ml-4 flex items-center space-x-3'>{actions}</div>}
        </div>
      </div>
    </header>
  );
}
