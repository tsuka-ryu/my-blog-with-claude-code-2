import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';

import { expectNoA11yViolations } from '../test-utils/accessibility';

import { Container, Section, Grid } from './container';

describe('Container Components', () => {
  describe('Container', () => {
    it('renders children correctly', () => {
      render(
        <Container>
          <div>Test content</div>
        </Container>
      );
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('applies default size and padding', () => {
      render(<Container>Content</Container>);
      const container = screen.getByText('Content');
      expect(container).toHaveClass('max-w-4xl'); // lg size
      expect(container).toHaveClass('px-4'); // md padding
      expect(container).toHaveClass('mx-auto'); // center
    });

    it('applies different sizes', () => {
      const { rerender } = render(<Container size='sm'>Content</Container>);
      expect(screen.getByText('Content')).toHaveClass('max-w-sm');

      rerender(<Container size='md'>Content</Container>);
      expect(screen.getByText('Content')).toHaveClass('max-w-md');

      rerender(<Container size='xl'>Content</Container>);
      expect(screen.getByText('Content')).toHaveClass('max-w-6xl');

      rerender(<Container size='full'>Content</Container>);
      expect(screen.getByText('Content')).toHaveClass('max-w-full');
    });

    it('applies different padding sizes', () => {
      const { rerender } = render(<Container padding='none'>Content</Container>);
      const container = screen.getByText('Content');
      expect(container).not.toHaveClass('px-4');

      rerender(<Container padding='sm'>Content</Container>);
      expect(screen.getByText('Content')).toHaveClass('px-2');

      rerender(<Container padding='lg'>Content</Container>);
      expect(screen.getByText('Content')).toHaveClass('px-6');

      rerender(<Container padding='xl'>Content</Container>);
      expect(screen.getByText('Content')).toHaveClass('px-8');
    });

    it('handles center prop', () => {
      const { rerender } = render(<Container center={false}>Content</Container>);
      expect(screen.getByText('Content')).not.toHaveClass('mx-auto');

      rerender(<Container center={true}>Content</Container>);
      expect(screen.getByText('Content')).toHaveClass('mx-auto');
    });

    it('applies custom className', () => {
      render(<Container className='custom-class'>Content</Container>);
      expect(screen.getByText('Content')).toHaveClass('custom-class');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Container ref={ref}>Content</Container>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards additional props', () => {
      render(<Container data-testid='container'>Content</Container>);
      expect(screen.getByTestId('container')).toBeInTheDocument();
    });

    describe('Accessibility', () => {
      it('should not have accessibility violations', async () => {
        const { container } = render(
          <Container>
            <h1>Main Content</h1>
            <p>Some text content</p>
          </Container>
        );
        await expectNoA11yViolations(container);
      });

      it('should not have accessibility violations with different sizes', async () => {
        const sizes = ['sm', 'md', 'lg', 'xl', 'full'] as const;
        for (const size of sizes) {
          const { container } = render(
            <Container size={size}>
              <h2>Content for {size} size</h2>
            </Container>
          );
          await expectNoA11yViolations(container);
        }
      });
    });
  });

  describe('Section', () => {
    it('renders as section by default', () => {
      render(<Section>Section content</Section>);
      const section = screen.getByText('Section content');
      expect(section.tagName).toBe('SECTION');
    });

    it('renders with different HTML elements', () => {
      const { rerender } = render(<Section as='article'>Content</Section>);
      expect(screen.getByText('Content').tagName).toBe('ARTICLE');

      rerender(<Section as='main'>Content</Section>);
      expect(screen.getByText('Content').tagName).toBe('MAIN');

      rerender(<Section as='header'>Content</Section>);
      expect(screen.getByText('Content').tagName).toBe('HEADER');

      rerender(<Section as='footer'>Content</Section>);
      expect(screen.getByText('Content').tagName).toBe('FOOTER');
    });

    it('applies different spacing', () => {
      const { rerender } = render(<Section spacing='none'>Content</Section>);
      const section = screen.getByText('Content');
      expect(section).not.toHaveClass('py-8');

      rerender(<Section spacing='sm'>Content</Section>);
      expect(screen.getByText('Content')).toHaveClass('py-4');

      rerender(<Section spacing='lg'>Content</Section>);
      expect(screen.getByText('Content')).toHaveClass('py-12');

      rerender(<Section spacing='xl'>Content</Section>);
      expect(screen.getByText('Content')).toHaveClass('py-16');
    });

    it('applies custom className', () => {
      render(<Section className='custom-section'>Content</Section>);
      expect(screen.getByText('Content')).toHaveClass('custom-section');
    });

    describe('Accessibility', () => {
      it('should not have accessibility violations', async () => {
        const { container } = render(
          <Section>
            <h2>Section Title</h2>
            <p>Section content</p>
          </Section>
        );
        await expectNoA11yViolations(container);
      });

      it('should not have accessibility violations with different elements', async () => {
        const elements = ['section', 'article', 'main', 'header', 'footer'] as const;
        for (const element of elements) {
          const { container } = render(
            <Section as={element}>
              <h2>Content for {element}</h2>
            </Section>
          );
          await expectNoA11yViolations(container);
        }
      });
    });
  });

  describe('Grid', () => {
    it('renders children correctly', () => {
      render(
        <Grid>
          <div>Item 1</div>
          <div>Item 2</div>
        </Grid>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('applies default grid classes', () => {
      render(<Grid>Content</Grid>);
      const grid = screen.getByText('Content');
      expect(grid).toHaveClass('grid');
      expect(grid).toHaveClass('grid-cols-[repeat(auto-fit,minmax(280px,1fr))]'); // auto cols
      expect(grid).toHaveClass('gap-4'); // md gap
    });

    it('applies different column counts', () => {
      const { rerender } = render(<Grid cols={1}>Content</Grid>);
      expect(screen.getByText('Content')).toHaveClass('grid-cols-1');

      rerender(<Grid cols={2}>Content</Grid>);
      expect(screen.getByText('Content')).toHaveClass('grid-cols-1', 'md:grid-cols-2');

      rerender(<Grid cols={3}>Content</Grid>);
      expect(screen.getByText('Content')).toHaveClass(
        'grid-cols-1',
        'md:grid-cols-2',
        'lg:grid-cols-3'
      );

      rerender(<Grid cols={4}>Content</Grid>);
      expect(screen.getByText('Content')).toHaveClass(
        'grid-cols-1',
        'sm:grid-cols-2',
        'lg:grid-cols-4'
      );
    });

    it('applies different gaps', () => {
      const { rerender } = render(<Grid gap='none'>Content</Grid>);
      const grid = screen.getByText('Content');
      expect(grid).not.toHaveClass('gap-4');

      rerender(<Grid gap='sm'>Content</Grid>);
      expect(screen.getByText('Content')).toHaveClass('gap-2');

      rerender(<Grid gap='lg'>Content</Grid>);
      expect(screen.getByText('Content')).toHaveClass('gap-6');

      rerender(<Grid gap='xl'>Content</Grid>);
      expect(screen.getByText('Content')).toHaveClass('gap-8');
    });

    it('handles responsive prop', () => {
      const { rerender } = render(
        <Grid cols={2} responsive={false}>
          Content
        </Grid>
      );
      expect(screen.getByText('Content')).toHaveClass('grid-cols-2');
      expect(screen.getByText('Content')).not.toHaveClass('md:grid-cols-2');

      rerender(
        <Grid cols={2} responsive={true}>
          Content
        </Grid>
      );
      expect(screen.getByText('Content')).toHaveClass('grid-cols-1', 'md:grid-cols-2');
    });

    it('applies custom className', () => {
      render(<Grid className='custom-grid'>Content</Grid>);
      expect(screen.getByText('Content')).toHaveClass('custom-grid');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Grid ref={ref}>Content</Grid>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    describe('Accessibility', () => {
      it('should not have accessibility violations', async () => {
        const { container } = render(
          <Grid>
            <div>Grid item 1</div>
            <div>Grid item 2</div>
            <div>Grid item 3</div>
          </Grid>
        );
        await expectNoA11yViolations(container);
      });

      it('should not have accessibility violations with different configurations', async () => {
        const { container } = render(
          <Grid cols={3} gap='lg'>
            <article>
              <h3>Article 1</h3>
              <p>Content 1</p>
            </article>
            <article>
              <h3>Article 2</h3>
              <p>Content 2</p>
            </article>
            <article>
              <h3>Article 3</h3>
              <p>Content 3</p>
            </article>
          </Grid>
        );
        await expectNoA11yViolations(container);
      });
    });
  });

  describe('Combined Usage', () => {
    it('should not have accessibility violations when components are combined', async () => {
      const { container } = render(
        <Container>
          <Section as='main'>
            <h1>Main Content</h1>
            <Grid cols={2} gap='lg'>
              <article>
                <h2>Article 1</h2>
                <p>Content for first article</p>
              </article>
              <article>
                <h2>Article 2</h2>
                <p>Content for second article</p>
              </article>
            </Grid>
          </Section>
        </Container>
      );
      await expectNoA11yViolations(container);
    });
  });
});
