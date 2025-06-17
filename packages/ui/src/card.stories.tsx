import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';
import { Button } from './button';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated', 'terminal'],
      description: 'Card visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Card padding size',
    },
    hoverable: {
      control: 'boolean',
      description: 'Enable hover effects',
    },
    clickable: {
      control: 'boolean',
      description: 'Make card clickable with focus states',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
  },
  render: args => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a description of the card content.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Here's some example content for the card body.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  args: {
    variant: 'outlined',
    size: 'md',
  },
  render: args => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Task Management</CardTitle>
        <CardDescription>Organize your work efficiently</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Keep track of your daily tasks and boost productivity.</p>
      </CardContent>
      <CardFooter>
        <Button>Get Started</Button>
      </CardFooter>
    </Card>
  ),
};

export const Terminal: Story = {
  args: {
    variant: 'terminal',
    size: 'lg',
  },
  render: args => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>$ console.log('Hello World')</CardTitle>
        <CardDescription>Terminal-styled card for code examples</CardDescription>
      </CardHeader>
      <CardContent>
        <pre className='text-green-400'>
          <code>
            {`> npm install @repo/ui
> Building components...
✓ Card component ready
✓ Container component ready`}
          </code>
        </pre>
      </CardContent>
    </Card>
  ),
};

export const Hoverable: Story = {
  args: {
    variant: 'elevated',
    size: 'md',
    hoverable: true,
  },
  render: args => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Hover Me</CardTitle>
        <CardDescription>This card has hover effects enabled</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Move your cursor over this card to see the hover effect.</p>
      </CardContent>
    </Card>
  ),
};

export const Clickable: Story = {
  args: {
    variant: 'default',
    size: 'md',
    clickable: true,
    onClick: () => alert('Card clicked!'),
  },
  render: args => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Click Me</CardTitle>
        <CardDescription>This card is clickable and focusable</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Click anywhere on this card or use Tab to focus and Enter to activate.</p>
      </CardContent>
    </Card>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <Card size='sm'>
        <CardHeader>
          <CardTitle>Small Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Compact size for tight spaces.</p>
        </CardContent>
      </Card>
      <Card size='md'>
        <CardHeader>
          <CardTitle>Medium Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Default size for most use cases.</p>
        </CardContent>
      </Card>
      <Card size='lg'>
        <CardHeader>
          <CardTitle>Large Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Spacious size for content-heavy cards.</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className='grid grid-cols-2 gap-4'>
      <Card variant='default'>
        <CardHeader>
          <CardTitle>Default</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Standard card with subtle shadow.</p>
        </CardContent>
      </Card>
      <Card variant='outlined'>
        <CardHeader>
          <CardTitle>Outlined</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card with prominent border.</p>
        </CardContent>
      </Card>
      <Card variant='elevated'>
        <CardHeader>
          <CardTitle>Elevated</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card with elevated shadow.</p>
        </CardContent>
      </Card>
      <Card variant='terminal'>
        <CardHeader>
          <CardTitle>Terminal</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Monospace font with terminal styling.</p>
        </CardContent>
      </Card>
    </div>
  ),
};
