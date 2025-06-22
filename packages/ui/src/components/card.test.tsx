import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';

import { expectNoA11yViolations } from '../test-utils/accessibility';

import { Card } from './card';

describe('Card Component', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <h2>Card Title</h2>
        <p>Card content</p>
      </Card>
    );

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Card className='custom-class'>Content</Card>);
    const card = screen.getByText('Content').closest('div');
    expect(card).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Card ref={ref}>Content</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(
        <Card>
          <h2>Accessible Card Title</h2>
          <p>Accessible card content</p>
        </Card>
      );
      await expectNoA11yViolations(container);
    });

    it('should not have accessibility violations with complex content', async () => {
      const { container } = render(
        <Card>
          <header>
            <h2>Card Header</h2>
            <time dateTime='2023-01-01'>January 1, 2023</time>
          </header>
          <main>
            <p>
              Main card content with <a href='#link'>a link</a>.
            </p>
            <ul>
              <li>List item 1</li>
              <li>List item 2</li>
            </ul>
          </main>
          <footer>
            <button type='button'>Action</button>
          </footer>
        </Card>
      );
      await expectNoA11yViolations(container);
    });

    it('should not have accessibility violations with custom className', async () => {
      const { container } = render(
        <Card className='custom-styling'>
          <h2>Custom Styled Card</h2>
          <p>Content with custom styling</p>
        </Card>
      );
      await expectNoA11yViolations(container);
    });

    it('should not have accessibility violations with interactive content', async () => {
      const { container } = render(
        <Card>
          <h2>Interactive Card</h2>
          <form>
            <label htmlFor='email'>Email:</label>
            <input type='email' id='email' name='email' />
            <button type='submit'>Submit</button>
          </form>
        </Card>
      );
      await expectNoA11yViolations(container);
    });

    it('should not have accessibility violations when used as article wrapper', async () => {
      const { container } = render(
        <article>
          <Card>
            <h2>Article Title</h2>
            <p>Article content</p>
            <time dateTime='2023-01-01'>Published: January 1, 2023</time>
          </Card>
        </article>
      );
      await expectNoA11yViolations(container);
    });

    it('should not have accessibility violations with nested cards', async () => {
      const { container } = render(
        <Card>
          <h2>Parent Card</h2>
          <Card>
            <h3>Nested Card</h3>
            <p>Nested content</p>
          </Card>
        </Card>
      );
      await expectNoA11yViolations(container);
    });
  });
});
