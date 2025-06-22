import { expect, userEvent, within } from '@storybook/test';

import { Button } from './button';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    loading: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
};

export const Danger: Story = {
  args: {
    children: 'Danger Button',
    variant: 'danger',
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading Button',
    loading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Loading Button' });

    // Test loading button is disabled
    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute('aria-disabled', 'true');

    // Test loading spinner is present
    const spinner = button.querySelector('[aria-hidden="true"]');
    await expect(spinner).toBeInTheDocument();

    // Test button is not clickable when loading
    await userEvent.click(button);
    // Button should remain disabled after click attempt
    await expect(button).toBeDisabled();
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Disabled Button' });

    // Test disabled button state
    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute('aria-disabled', 'true');

    // Test disabled button styling
    await expect(button).toHaveClass('disabled:opacity-50');
    await expect(button).toHaveClass('disabled:cursor-not-allowed');

    // Test button is not focusable when disabled
    await userEvent.tab();
    await expect(button).not.toHaveFocus();

    // Test button is not clickable when disabled
    await userEvent.click(button);
    // Button should remain disabled after click attempt
    await expect(button).toBeDisabled();
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const Clickable: Story = {
  args: {
    children: 'Click me',
    onClick: () => alert('Button clicked!'),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Click me' });

    // Test button is visible and has correct text
    await expect(button).toBeVisible();
    await expect(button).toHaveTextContent('Click me');

    // Test button is clickable (not disabled)
    await expect(button).toBeEnabled();

    // Test focus behavior
    await userEvent.tab();
    await expect(button).toHaveFocus();

    // Test keyboard activation
    await userEvent.keyboard('{Enter}');

    // Test click interaction
    await userEvent.click(button);

    // Verify button maintains focus after click
    await expect(button).toHaveFocus();
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='space-x-2'>
        <Button variant='primary'>Primary</Button>
        <Button variant='secondary'>Secondary</Button>
        <Button variant='outline'>Outline</Button>
        <Button variant='ghost'>Ghost</Button>
        <Button variant='danger'>Danger</Button>
      </div>
      <div className='space-x-2'>
        <Button size='sm'>Small</Button>
        <Button size='md'>Medium</Button>
        <Button size='lg'>Large</Button>
      </div>
      <div className='space-x-2'>
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
