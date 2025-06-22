'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

export interface ErrorProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  message?: string;
  children?: ReactNode;
  onRetry?: () => void;
  retryText?: string;
  variant?: 'default' | 'critical' | 'warning';
  className?: string;
}

const Error = forwardRef<HTMLDivElement, ErrorProps>(
  (
    {
      title = 'エラーが発生しました',
      message,
      children,
      onRetry,
      retryText = '再試行',
      variant = 'default',
      className = '',
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      default: {
        container: 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20',
        icon: 'text-red-500 dark:text-red-400',
        title: 'text-red-800 dark:text-red-200',
        message: 'text-red-700 dark:text-red-300',
      },
      critical: {
        container: 'border-red-500 dark:border-red-500 bg-red-100 dark:bg-red-950/40',
        icon: 'text-red-600 dark:text-red-400',
        title: 'text-red-900 dark:text-red-100',
        message: 'text-red-800 dark:text-red-200',
      },
      warning: {
        container: 'border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-950/20',
        icon: 'text-yellow-500 dark:text-yellow-400',
        title: 'text-yellow-800 dark:text-yellow-200',
        message: 'text-yellow-700 dark:text-yellow-300',
      },
    };

    const styles = variantClasses[variant];

    const ErrorIcon = () => (
      <svg
        className={`w-5 h-5 ${styles.icon}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    );

    const WarningIcon = () => (
      <svg
        className={`w-5 h-5 ${styles.icon}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    );

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="assertive"
        className={`rounded-lg border p-4 font-mono ${styles.container} ${className}`}
        {...props}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {variant === 'warning' ? <WarningIcon /> : <ErrorIcon />}
          </div>
          <div className="ml-3 flex-1">
            <h3 className={`text-sm font-medium ${styles.title}`}>{title}</h3>
            {(message || children) && (
              <div className={`mt-2 text-sm ${styles.message}`}>{children || <p>{message}</p>}</div>
            )}
            {onRetry && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={onRetry}
                  className={`
                    inline-flex items-center rounded-md px-3 py-2 text-sm font-medium
                    transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
                    ${
                      variant === 'warning'
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-200 dark:hover:bg-yellow-900/70 focus:ring-yellow-500'
                        : 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-200 dark:hover:bg-red-900/70 focus:ring-red-500'
                    }
                  `}
                  aria-label={`エラーを解決するために${retryText}`}
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  {retryText}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Error.displayName = 'Error';

export { Error };
