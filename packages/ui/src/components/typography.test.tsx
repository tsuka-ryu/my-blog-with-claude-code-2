import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';

import { expectNoA11yViolations } from '../test-utils/accessibility';

import { Typography } from './typography';

describe('Typography Component', () => {
  describe('Heading variants', () => {
    it('renders h1 correctly', () => {
      render(
        <Typography variant='h1' component='h1'>
          Heading 1
        </Typography>
      );
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Heading 1');
    });

    it('renders h2 correctly', () => {
      render(
        <Typography variant='h2' component='h2'>
          Heading 2
        </Typography>
      );
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
    });

    it('renders h3 correctly', () => {
      render(
        <Typography variant='h3' component='h3'>
          Heading 3
        </Typography>
      );
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
    });

    it('should not have accessibility violations for headings', async () => {
      const { container } = render(
        <div>
          <Typography variant='h1' component='h1'>
            Heading 1
          </Typography>
          <Typography variant='h2' component='h2'>
            Heading 2
          </Typography>
          <Typography variant='h3' component='h3'>
            Heading 3
          </Typography>
          <Typography variant='h4' component='h4'>
            Heading 4
          </Typography>
          <Typography variant='h5' component='h5'>
            Heading 5
          </Typography>
          <Typography variant='h6' component='h6'>
            Heading 6
          </Typography>
        </div>
      );
      await expectNoA11yViolations(container);
    });
  });

  describe('Body text variants', () => {
    it('renders body text correctly', () => {
      render(
        <Typography variant='body1' component='p'>
          Body text
        </Typography>
      );
      expect(screen.getByText('Body text')).toBeInTheDocument();
    });

    it('renders caption text correctly', () => {
      render(
        <Typography variant='caption' component='span'>
          Caption text
        </Typography>
      );
      expect(screen.getByText('Caption text')).toBeInTheDocument();
    });

    it('should not have accessibility violations for body text', async () => {
      const { container } = render(
        <div>
          <Typography variant='body1' component='p'>
            Body text
          </Typography>
          <Typography variant='body2' component='p'>
            Smaller body text
          </Typography>
          <Typography variant='caption' component='span'>
            Caption text
          </Typography>
          <Typography variant='overline' component='span'>
            Overline text
          </Typography>
        </div>
      );
      await expectNoA11yViolations(container);
    });
  });

  describe('Complex structure', () => {
    it('should not have accessibility violations with proper heading hierarchy', async () => {
      const { container } = render(
        <article>
          <Typography variant='h1' component='h1'>
            Main Title
          </Typography>
          <Typography variant='body1' component='p'>
            Introduction paragraph
          </Typography>
          <Typography variant='h2' component='h2'>
            Section Title
          </Typography>
          <Typography variant='body1' component='p'>
            Section content
          </Typography>
          <Typography variant='h3' component='h3'>
            Subsection Title
          </Typography>
          <Typography variant='body2' component='p'>
            Subsection content
          </Typography>
          <Typography variant='caption' component='p'>
            Additional note
          </Typography>
        </article>
      );
      await expectNoA11yViolations(container);
    });
  });
});
