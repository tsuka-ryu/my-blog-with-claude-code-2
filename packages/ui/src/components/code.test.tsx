import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';

import { expectNoA11yViolations } from '../test-utils/accessibility';

import { Code } from './code';

describe('Code Component', () => {
  it('renders children correctly', () => {
    render(<Code>console.log(&apos;hello&apos;)</Code>);
    expect(screen.getByText("console.log('hello')")).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Code className="custom-class">const x = 1;</Code>);
    const codeElement = screen.getByText('const x = 1;');
    expect(codeElement).toHaveClass('custom-class');
  });

  it('renders as code element', () => {
    render(<Code>function test() {}</Code>);
    const codeElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'code' && content.includes('function test()');
    });
    expect(codeElement.tagName).toBe('CODE');
  });

  it('handles complex code content', () => {
    const complexCode = `
      function fibonacci(n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
      }
    `;
    render(<Code>{complexCode}</Code>);
    expect(
      screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() === 'code' && content.includes('fibonacci');
      })
    ).toBeInTheDocument();
  });

  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<Code>const example = &apos;code&apos;;</Code>);
      await expectNoA11yViolations(container);
    });

    it('should not have accessibility violations with custom className', async () => {
      const { container } = render(
        <Code className="syntax-highlight">import React from &apos;react&apos;;</Code>
      );
      await expectNoA11yViolations(container);
    });

    it('should not have accessibility violations with complex content', async () => {
      const { container } = render(
        <div>
          <p>
            Here&apos;s an example: <Code>array.map(item =&gt; item.id)</Code>
          </p>
        </div>
      );
      await expectNoA11yViolations(container);
    });

    it('should not have accessibility violations in code block context', async () => {
      const { container } = render(
        <pre>
          <Code>
            {`function greet(name) {
  return \`Hello, \${name}!\`;
}`}
          </Code>
        </pre>
      );
      await expectNoA11yViolations(container);
    });
  });
});
