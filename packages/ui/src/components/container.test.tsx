import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';

import { expectNoA11yViolations } from '../test-utils/accessibility';

import { Container, Section, Grid } from './container';

describe('Container', () => {
  it('renders with default props', () => {
    render(<Container>Container content</Container>);
    const container = screen.getByText('Container content');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('max-w-4xl'); // default size 'lg'
    expect(container).toHaveClass('px-4'); // default padding 'md'
    expect(container).toHaveClass('mx-auto'); // default center true
  });

  it('renders different sizes', () => {
    const { rerender } = render(<Container size='sm'>Small</Container>);
    expect(screen.getByText('Small')).toHaveClass('max-w-sm');

    rerender(<Container size='md'>Medium</Container>);
    expect(screen.getByText('Medium')).toHaveClass('max-w-md');

    rerender(<Container size='xl'>Extra Large</Container>);
    expect(screen.getByText('Extra Large')).toHaveClass('max-w-6xl');

    rerender(<Container size='full'>Full</Container>);
    expect(screen.getByText('Full')).toHaveClass('max-w-full');
  });

  it('renders different padding', () => {
    const { rerender } = render(<Container padding='none'>No padding</Container>);
    const container = screen.getByText('No padding');
    expect(container).not.toHaveClass('px-4');

    rerender(<Container padding='sm'>Small padding</Container>);
    expect(screen.getByText('Small padding')).toHaveClass('px-2');

    rerender(<Container padding='lg'>Large padding</Container>);
    expect(screen.getByText('Large padding')).toHaveClass('px-6');
  });

  it('handles center prop', () => {
    const { rerender } = render(<Container center={false}>Not centered</Container>);
    expect(screen.getByText('Not centered')).not.toHaveClass('mx-auto');

    rerender(<Container center>Centered</Container>);
    expect(screen.getByText('Centered')).toHaveClass('mx-auto');
  });

  it('applies custom className', () => {
    render(<Container className='custom-container'>Custom</Container>);
    expect(screen.getByText('Custom')).toHaveClass('custom-container');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Container ref={ref}>With Ref</Container>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<Container>Accessible Container</Container>);
      await expectNoA11yViolations(container);
    });
  });
});

describe('Section', () => {
  it('renders with default props', () => {
    render(<Section>Section content</Section>);
    const section = screen.getByText('Section content');
    expect(section).toBeInTheDocument();
    expect(section.tagName).toBe('SECTION');
    expect(section).toHaveClass('py-8'); // default spacing 'md'
  });

  it('renders as different elements', () => {
    const { rerender } = render(<Section as='div'>As div</Section>);
    expect(screen.getByText('As div').tagName).toBe('DIV');

    rerender(<Section as='article'>As article</Section>);
    expect(screen.getByText('As article').tagName).toBe('ARTICLE');

    rerender(<Section as='main'>As main</Section>);
    expect(screen.getByText('As main').tagName).toBe('MAIN');
  });

  it('renders different spacing', () => {
    const { rerender } = render(<Section spacing='none'>No spacing</Section>);
    expect(screen.getByText('No spacing')).not.toHaveClass('py-8');

    rerender(<Section spacing='sm'>Small spacing</Section>);
    expect(screen.getByText('Small spacing')).toHaveClass('py-4');

    rerender(<Section spacing='xl'>Extra large spacing</Section>);
    expect(screen.getByText('Extra large spacing')).toHaveClass('py-16');
  });

  it('applies custom className', () => {
    render(<Section className='custom-section'>Custom</Section>);
    expect(screen.getByText('Custom')).toHaveClass('custom-section');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Section ref={ref}>With Ref</Section>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<Section>Accessible Section</Section>);
      await expectNoA11yViolations(container);
    });

    it('uses semantic HTML elements', () => {
      render(
        <>
          <Section as='main'>Main content</Section>
          <Section as='aside'>Sidebar content</Section>
          <Section as='article'>Article content</Section>
        </>
      );

      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('complementary')).toBeInTheDocument();
      expect(screen.getByRole('article')).toBeInTheDocument();
    });
  });
});

describe('Grid', () => {
  it('renders with default props', () => {
    render(
      <Grid>
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );
    const grid = screen.getByText('Item 1').parentElement;
    expect(grid).toHaveClass('grid');
    expect(grid).toHaveClass('grid-cols-[repeat(auto-fit,minmax(280px,1fr))]'); // default cols 'auto'
    expect(grid).toHaveClass('gap-4'); // default gap 'md'
  });

  it('renders different column layouts', () => {
    const { rerender } = render(
      <Grid cols={1}>
        <div>Single column</div>
      </Grid>
    );
    expect(screen.getByText('Single column').parentElement).toHaveClass('grid-cols-1');

    rerender(
      <Grid cols={4} responsive={false}>
        <div>Four columns</div>
      </Grid>
    );
    expect(screen.getByText('Four columns').parentElement).toHaveClass('grid-cols-4');
  });

  it('handles responsive prop', () => {
    const { rerender } = render(
      <Grid cols={3} responsive>
        <div>Responsive grid</div>
      </Grid>
    );
    const responsiveGrid = screen.getByText('Responsive grid').parentElement;
    expect(responsiveGrid).toHaveClass('grid-cols-1');
    expect(responsiveGrid).toHaveClass('md:grid-cols-2');
    expect(responsiveGrid).toHaveClass('lg:grid-cols-3');

    rerender(
      <Grid cols={3} responsive={false}>
        <div>Non-responsive grid</div>
      </Grid>
    );
    const nonResponsiveGrid = screen.getByText('Non-responsive grid').parentElement;
    expect(nonResponsiveGrid).toHaveClass('grid-cols-3');
    expect(nonResponsiveGrid).not.toHaveClass('md:grid-cols-2');
  });

  it('renders different gap sizes', () => {
    const { rerender } = render(
      <Grid gap='none'>
        <div>No gap</div>
      </Grid>
    );
    expect(screen.getByText('No gap').parentElement).not.toHaveClass('gap-4');

    rerender(
      <Grid gap='xl'>
        <div>Extra large gap</div>
      </Grid>
    );
    expect(screen.getByText('Extra large gap').parentElement).toHaveClass('gap-8');
  });

  it('applies custom className', () => {
    render(
      <Grid className='custom-grid'>
        <div>Custom</div>
      </Grid>
    );
    expect(screen.getByText('Custom').parentElement).toHaveClass('custom-grid');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Grid ref={ref}>
        <div>With Ref</div>
      </Grid>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(
        <Grid>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </Grid>
      );
      await expectNoA11yViolations(container);
    });
  });
});
