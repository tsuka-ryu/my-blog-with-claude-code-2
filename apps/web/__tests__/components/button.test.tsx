import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '@repo/ui';

describe('Button Component', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button', { name: 'Click me' });
    await button.click();

    expect(handleClick).toHaveBeenCalledOnce();
  });
});
