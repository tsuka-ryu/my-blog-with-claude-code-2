import { render, type RenderOptions } from '@testing-library/react';
import { run, type AxeResults } from 'axe-core';

import type { ReactElement } from 'react';

/**
 * axe-coreを直接使用してアクセシビリティテストを実行
 */
const runAxe = async (element: HTMLElement, options = {}): Promise<AxeResults> => {
  return new Promise((resolve, reject) => {
    run(element, options, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

/**
 * アクセシビリティテスト用のヘルパー関数
 */
export const renderWithAxe = async (
  ui: ReactElement,
  options?: RenderOptions
): Promise<{ container: HTMLElement; axeResults: AxeResults }> => {
  const { container } = render(ui, options);
  const axeResults = await runAxe(container);

  return { container, axeResults };
};

/**
 * 基本的なアクセシビリティ違反をチェックする
 * JSdom環境で問題のあるルールを除外
 */
export const expectNoA11yViolations = async (element: HTMLElement): Promise<void> => {
  const results = await runAxe(element, {
    rules: {
      // JSdom環境でCanvas APIが利用できないため、color-contrastルールを無効化
      'color-contrast': { enabled: false },
    },
  });

  if (results.violations.length > 0) {
    const violationMessages = results.violations
      .map(
        violation =>
          `${violation.id}: ${violation.description}\n` +
          violation.nodes.map(node => `  - ${node.failureSummary}`).join('\n')
      )
      .join('\n\n');

    throw new Error(`Accessibility violations found:\n\n${violationMessages}`);
  }
};

/**
 * 特定のルールを除外してアクセシビリティテストを実行する
 */
export const runAxeTestWithExclusions = async (
  element: HTMLElement,
  excludeRules: string[] = []
): Promise<AxeResults> => {
  return await runAxe(element, {
    rules: excludeRules.reduce(
      (acc, rule) => {
        acc[rule] = { enabled: false };
        return acc;
      },
      {} as Record<string, { enabled: boolean }>
    ),
  });
};

/**
 * カスタムAxe設定でテストを実行する
 */
export const runAxeTestWithConfig = async (
  element: HTMLElement,
  config = {}
): Promise<AxeResults> => {
  return await runAxe(element, config);
};
