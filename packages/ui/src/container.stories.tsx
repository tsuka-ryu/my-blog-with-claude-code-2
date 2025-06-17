import { Container, Section, Grid } from './container';
import { Card, CardHeader, CardTitle, CardContent } from './card';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Maximum width of the container',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Horizontal padding',
    },
    center: {
      control: 'boolean',
      description: 'Center the container horizontally',
    },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'lg',
    padding: 'md',
    center: true,
  },
  render: args => (
    <div className='bg-muted min-h-screen'>
      <Container {...args}>
        <div className='bg-background border rounded-lg p-6'>
          <h2 className='text-2xl font-bold mb-4'>Container Content</h2>
          <p>This content is inside a container with responsive padding and maximum width.</p>
        </div>
      </Container>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='bg-muted min-h-screen space-y-8 py-8'>
      {(['sm', 'md', 'lg', 'xl', 'full'] as const).map(size => (
        <Container key={size} size={size} padding='md'>
          <div className='bg-background border rounded-lg p-4'>
            <h3 className='font-semibold mb-2'>Size: {size}</h3>
            <p>This container has size=&quot;{size}&quot;</p>
          </div>
        </Container>
      ))}
    </div>
  ),
};

export const Padding: Story = {
  render: () => (
    <div className='bg-muted min-h-screen space-y-8 py-8'>
      {(['none', 'sm', 'md', 'lg', 'xl'] as const).map(padding => (
        <Container key={padding} size='lg' padding={padding}>
          <div className='bg-background border rounded-lg p-4'>
            <h3 className='font-semibold mb-2'>Padding: {padding}</h3>
            <p>This container has padding=&quot;{padding}&quot;</p>
          </div>
        </Container>
      ))}
    </div>
  ),
};

export const NotCentered: Story = {
  args: {
    size: 'lg',
    padding: 'md',
    center: false,
  },
  render: args => (
    <div className='bg-muted min-h-screen'>
      <Container {...args}>
        <div className='bg-background border rounded-lg p-6'>
          <h2 className='text-2xl font-bold mb-4'>Left-aligned Container</h2>
          <p>This container is not centered (center=false).</p>
        </div>
      </Container>
    </div>
  ),
};

const SectionMeta = {
  title: 'Layout/Section',
  component: Section,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['section', 'div', 'article', 'aside', 'main', 'header', 'footer'],
      description: 'HTML element to render as',
    },
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Vertical spacing (padding)',
    },
  },
} satisfies Meta<typeof Section>;

type SectionStory = StoryObj<typeof SectionMeta>;

export const SectionDefault: SectionStory = {
  args: {
    as: 'section',
    spacing: 'md',
  },
  render: args => (
    <div className='bg-muted min-h-screen'>
      <Section {...args}>
        <Container>
          <div className='bg-background border rounded-lg p-6'>
            <h2 className='text-2xl font-bold mb-4'>Section Content</h2>
            <p>This content is inside a section with vertical spacing.</p>
          </div>
        </Container>
      </Section>
    </div>
  ),
};

export const SectionSpacing: SectionStory = {
  render: () => (
    <div className='bg-muted min-h-screen'>
      {(['none', 'sm', 'md', 'lg', 'xl'] as const).map(spacing => (
        <Section key={spacing} spacing={spacing}>
          <Container>
            <div className='bg-background border rounded-lg p-4'>
              <h3 className='font-semibold mb-2'>Spacing: {spacing}</h3>
              <p>This section has spacing=&quot;{spacing}&quot;</p>
            </div>
          </Container>
        </Section>
      ))}
    </div>
  ),
};

const GridMeta = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    cols: {
      control: 'select',
      options: [1, 2, 3, 4, 6, 12, 'auto'],
      description: 'Number of columns',
    },
    gap: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Gap between grid items',
    },
    responsive: {
      control: 'boolean',
      description: 'Enable responsive breakpoints',
    },
  },
} satisfies Meta<typeof Grid>;

type GridStory = StoryObj<typeof GridMeta>;

export const GridDefault: GridStory = {
  args: {
    cols: 3,
    gap: 'md',
    responsive: true,
  },
  render: args => (
    <Container>
      <Grid {...args}>
        {Array.from({ length: 6 }, (_, i) => (
          <Card key={i} variant='outlined'>
            <CardHeader>
              <CardTitle>Item {i + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Grid item content</p>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Container>
  ),
};

export const GridAuto: GridStory = {
  args: {
    cols: 'auto',
    gap: 'lg',
    responsive: true,
  },
  render: args => (
    <Container>
      <Grid {...args}>
        {Array.from({ length: 8 }, (_, i) => (
          <Card key={i} variant='default'>
            <CardHeader>
              <CardTitle>Auto Item {i + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Auto-fit grid with minimum 280px width</p>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Container>
  ),
};

export const GridColumns: GridStory = {
  render: () => (
    <Container>
      <div className='space-y-8'>
        {([1, 2, 3, 4] as const).map(cols => (
          <div key={cols}>
            <h3 className='text-lg font-semibold mb-4'>
              {cols} Column{cols > 1 ? 's' : ''}
            </h3>
            <Grid cols={cols} gap='md'>
              {Array.from({ length: cols * 2 }, (_, i) => (
                <Card key={i} variant='outlined' size='sm'>
                  <CardContent>
                    <p>Item {i + 1}</p>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </div>
        ))}
      </div>
    </Container>
  ),
};

export const GridGaps: GridStory = {
  render: () => (
    <Container>
      <div className='space-y-8'>
        {(['none', 'sm', 'md', 'lg', 'xl'] as const).map(gap => (
          <div key={gap}>
            <h3 className='text-lg font-semibold mb-4'>Gap: {gap}</h3>
            <Grid cols={3} gap={gap}>
              {Array.from({ length: 3 }, (_, i) => (
                <Card key={i} variant='outlined' size='sm'>
                  <CardContent>
                    <p>Item {i + 1}</p>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </div>
        ))}
      </div>
    </Container>
  ),
};

export const LayoutExample: Story = {
  render: () => (
    <div className='bg-muted min-h-screen'>
      <Section as='header' spacing='md'>
        <Container>
          <div className='bg-background border rounded-lg p-6'>
            <h1 className='text-3xl font-bold'>Page Header</h1>
          </div>
        </Container>
      </Section>

      <Section as='main' spacing='lg'>
        <Container>
          <div className='space-y-8'>
            <div className='bg-background border rounded-lg p-6'>
              <h2 className='text-2xl font-bold mb-4'>Main Content</h2>
              <p>
                This is an example of a complete layout using Section, Container, and Grid
                components.
              </p>
            </div>

            <Grid cols={3} gap='lg'>
              {Array.from({ length: 6 }, (_, i) => (
                <Card key={i} variant='outlined'>
                  <CardHeader>
                    <CardTitle>Feature {i + 1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Description of feature {i + 1}</p>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </div>
        </Container>
      </Section>

      <Section as='footer' spacing='sm'>
        <Container>
          <div className='bg-background border rounded-lg p-4 text-center'>
            <p className='text-sm text-muted-foreground'>Page Footer</p>
          </div>
        </Container>
      </Section>
    </div>
  ),
};

export { SectionMeta, GridMeta };
