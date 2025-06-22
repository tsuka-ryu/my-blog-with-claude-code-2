import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';

import { expectNoA11yViolations } from '../test-utils/accessibility';

import { Code } from './code';

describe('Code', () => {
  it('renders children correctly', () => {
    render(<Code>console.log(&apos;Hello, World!&apos;);</Code>);
    const codeElement = screen.getByText("console.log('Hello, World!');");
    expect(codeElement).toBeInTheDocument();
    expect(codeElement.tagName).toBe('CODE');
  });

  it('applies custom className', () => {
    render(<Code className='custom-code-class'>const x = 5;</Code>);
    const codeElement = screen.getByText('const x = 5;');
    expect(codeElement).toHaveClass('custom-code-class');
  });

  it('renders without className', () => {
    render(<Code>const y = 10;</Code>);
    const codeElement = screen.getByText('const y = 10;');
    expect(codeElement).toBeInTheDocument();
    expect(codeElement.className).toBe('');
  });

  it('renders complex code content', () => {
    const complexCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`;

    render(<Code>{complexCode}</Code>);
    const codeElement = screen.getByText((content, element) => {
      return element?.tagName === 'CODE' && content.includes('function fibonacci');
    });
    expect(codeElement).toBeInTheDocument();
  });

  it('handles JSX children', () => {
    render(
      <Code>
        <span>const</span> x = <span>42</span>;
      </Code>
    );

    const codeElement = screen.getByRole('code');
    expect(codeElement).toBeInTheDocument();
    expect(screen.getByText('const')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<Code>const accessible = true;</Code>);
      await expectNoA11yViolations(container);
    });

    it('should be properly announced by screen readers', () => {
      render(<Code>npm install react</Code>);
      const codeElement = screen.getByText('npm install react');
      expect(codeElement.tagName).toBe('CODE');
      // code elements are naturally announced as "code" by screen readers
    });
  });
});
