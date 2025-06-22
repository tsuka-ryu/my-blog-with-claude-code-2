import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';

import { expectNoA11yViolations } from '../test-utils/accessibility';

import { Error } from './error';

describe('Error Component', () => {
  it('renders with default title', () => {
    render(<Error />);
    expect(screen.getByText('エラーが発生しました')).toBeInTheDocument();
  });

  it('renders with custom title', () => {
    render(<Error title="カスタムエラー" />);
    expect(screen.getByText('カスタムエラー')).toBeInTheDocument();
  });

  it('renders with message', () => {
    render(<Error message="エラーメッセージが表示されます" />);
    expect(screen.getByText('エラーメッセージが表示されます')).toBeInTheDocument();
  });

  it('renders with children instead of message', () => {
    render(
      <Error>
        <p>カスタムエラー内容</p>
        <ul>
          <li>詳細1</li>
          <li>詳細2</li>
        </ul>
      </Error>
    );
    expect(screen.getByText('カスタムエラー内容')).toBeInTheDocument();
    expect(screen.getByText('詳細1')).toBeInTheDocument();
    expect(screen.getByText('詳細2')).toBeInTheDocument();
  });

  it('prioritizes children over message when both are provided', () => {
    render(
      <Error message="メッセージ">
        <p>子要素</p>
      </Error>
    );
    expect(screen.getByText('子要素')).toBeInTheDocument();
    expect(screen.queryByText('メッセージ')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Error className="custom-error-class" />);
    const errorElement = screen.getByRole('alert');
    expect(errorElement).toHaveClass('custom-error-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Error ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('forwards additional props', () => {
    render(<Error data-testid="error-component" />);
    expect(screen.getByTestId('error-component')).toBeInTheDocument();
  });

  describe('Retry functionality', () => {
    it('renders retry button when onRetry is provided', () => {
      const mockRetry = vi.fn();
      render(<Error onRetry={mockRetry} />);
      expect(screen.getByRole('button', { name: /再試行/ })).toBeInTheDocument();
    });

    it('calls onRetry when retry button is clicked', () => {
      const mockRetry = vi.fn();
      render(<Error onRetry={mockRetry} />);
      fireEvent.click(screen.getByRole('button', { name: /再試行/ }));
      expect(mockRetry).toHaveBeenCalledTimes(1);
    });

    it('uses custom retry text', () => {
      const mockRetry = vi.fn();
      render(<Error onRetry={mockRetry} retryText="もう一度試す" />);
      expect(screen.getByRole('button', { name: /もう一度試す/ })).toBeInTheDocument();
    });

    it('does not render retry button when onRetry is not provided', () => {
      render(<Error />);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders default variant correctly', () => {
      render(<Error variant="default" />);
      const errorElement = screen.getByRole('alert');
      expect(errorElement).toHaveClass('border-red-300');
    });

    it('renders critical variant correctly', () => {
      render(<Error variant="critical" />);
      const errorElement = screen.getByRole('alert');
      expect(errorElement).toHaveClass('border-red-500');
    });

    it('renders warning variant correctly', () => {
      render(<Error variant="warning" />);
      const errorElement = screen.getByRole('alert');
      expect(errorElement).toHaveClass('border-yellow-300');
    });

    it('renders correct icon for default and critical variants', () => {
      const { rerender } = render(<Error variant="default" />);
      const errorIcon = screen.getByRole('alert').querySelector('svg');
      expect(errorIcon).toBeInTheDocument();

      rerender(<Error variant="critical" />);
      const criticalIcon = screen.getByRole('alert').querySelector('svg');
      expect(criticalIcon).toBeInTheDocument();
    });

    it('renders warning icon for warning variant', () => {
      render(<Error variant="warning" />);
      const warningIcon = screen.getByRole('alert').querySelector('svg');
      expect(warningIcon).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<Error />);
      await expectNoA11yViolations(container);
    });

    it('should not have accessibility violations with message', async () => {
      const { container } = render(
        <Error title="アクセシビリティテスト" message="エラーメッセージの内容" />
      );
      await expectNoA11yViolations(container);
    });

    it('should not have accessibility violations with children', async () => {
      const { container } = render(
        <Error title="フォームエラー">
          <p>以下の項目を確認してください：</p>
          <ul>
            <li>メールアドレスの形式</li>
            <li>パスワードの長さ</li>
          </ul>
        </Error>
      );
      await expectNoA11yViolations(container);
    });

    it('should not have accessibility violations with retry button', async () => {
      const mockRetry = vi.fn();
      const { container } = render(
        <Error
          title="接続エラー"
          message="サーバーに接続できませんでした"
          onRetry={mockRetry}
          retryText="再接続"
        />
      );
      await expectNoA11yViolations(container);
    });

    it('should not have accessibility violations for all variants', async () => {
      const variants = ['default', 'critical', 'warning'] as const;
      for (const variant of variants) {
        const { container } = render(
          <Error
            variant={variant}
            title={`${variant} エラー`}
            message={`${variant} variant のテスト`}
          />
        );
        await expectNoA11yViolations(container);
      }
    });

    it('has proper ARIA attributes', () => {
      render(<Error />);
      const errorElement = screen.getByRole('alert');
      expect(errorElement).toHaveAttribute('role', 'alert');
      expect(errorElement).toHaveAttribute('aria-live', 'assertive');
    });

    it('has proper ARIA label for retry button', () => {
      const mockRetry = vi.fn();
      render(<Error onRetry={mockRetry} retryText="再試行" />);
      const retryButton = screen.getByRole('button');
      expect(retryButton).toHaveAttribute('aria-label', 'エラーを解決するために再試行');
    });

    it('icons have proper aria-hidden attribute', () => {
      const { rerender } = render(<Error variant="default" />);
      let icon = screen.getByRole('alert').querySelector('svg');
      expect(icon).toHaveAttribute('aria-hidden', 'true');

      rerender(<Error variant="warning" />);
      icon = screen.getByRole('alert').querySelector('svg');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Complex scenarios', () => {
    it('handles complex error with all props', () => {
      const mockRetry = vi.fn();
      render(
        <Error
          title="データベース接続エラー"
          variant="critical"
          onRetry={mockRetry}
          retryText="データベースに再接続"
          className="custom-critical-error"
          data-error-id="db-connection-001"
        >
          <div>
            <p>
              <strong>原因:</strong> データベースサーバーとの接続が切断されました。
            </p>
            <p>
              <strong>対処方法:</strong>
            </p>
            <ol>
              <li>ネットワーク接続を確認してください</li>
              <li>データベースサーバーの状態を確認してください</li>
              <li>しばらく待ってから再試行してください</li>
            </ol>
          </div>
        </Error>
      );

      expect(screen.getByText('データベース接続エラー')).toBeInTheDocument();
      expect(screen.getByText('原因:')).toBeInTheDocument();
      expect(screen.getByText('ネットワーク接続を確認してください')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /データベースに再接続/ })).toBeInTheDocument();

      const errorElement = screen.getByRole('alert');
      expect(errorElement).toHaveClass('custom-critical-error');
      expect(errorElement).toHaveAttribute('data-error-id', 'db-connection-001');
    });

    it('should not have accessibility violations in complex scenario', async () => {
      const mockRetry = vi.fn();
      const { container } = render(
        <div>
          <h1>アプリケーション</h1>
          <main>
            <section>
              <h2>エラー処理</h2>
              <Error title="フォーム送信エラー" variant="warning" onRetry={mockRetry}>
                <div>
                  <p>フォームの送信中にエラーが発生しました。</p>
                  <details>
                    <summary>詳細情報</summary>
                    <ul>
                      <li>タイムスタンプ: 2024-01-01 12:00:00</li>
                      <li>エラーコード: FORM_SUBMIT_001</li>
                    </ul>
                  </details>
                </div>
              </Error>
            </section>
          </main>
        </div>
      );
      await expectNoA11yViolations(container);
    });
  });
});
