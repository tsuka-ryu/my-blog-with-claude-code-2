import { Card, CardHeader, CardTitle, CardContent } from './card';

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
      options: ['default', 'outlined'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the card padding',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the card content. It can contain any kind of content.</p>
        </CardContent>
      </>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    size: 'md',
    children: (
      <>
        <CardHeader>
          <CardTitle>Outlined Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This card has an outline border instead of a background.</p>
        </CardContent>
      </>
    ),
  },
};

export const Sizes: Story = {
  args: {
    children: <div />,
  },
  render: () => (
    <div className="space-y-4">
      {(['sm', 'md', 'lg'] as const).map(size => (
        <Card key={size} size={size} variant="outlined">
          <CardHeader>
            <CardTitle>Size: {size}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This card has size=&quot;{size}&quot;</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};

export const SimpleCard: Story = {
  args: {
    variant: 'default',
    size: 'md',
    children: <p>Simple card with just text content</p>,
  },
};

export const ComplexExample: Story = {
  args: {
    children: <div />,
  },
  render: () => (
    <div className="grid gap-4 max-w-2xl">
      <Card variant="default">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-muted-foreground">Name: John Doe</p>
            <p className="text-muted-foreground">Email: john@example.com</p>
            <p className="text-muted-foreground">Role: Developer</p>
          </div>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">42</p>
              <p className="text-sm text-muted-foreground">Projects</p>
            </div>
            <div>
              <p className="text-2xl font-bold">128</p>
              <p className="text-sm text-muted-foreground">Commits</p>
            </div>
            <div>
              <p className="text-2xl font-bold">7</p>
              <p className="text-sm text-muted-foreground">Reviews</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};
