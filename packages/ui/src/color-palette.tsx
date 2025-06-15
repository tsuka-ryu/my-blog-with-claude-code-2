import type { ComponentProps } from 'react';

interface ColorSwatchProps {
  name: string;
  value: string;
}

function ColorSwatch({ name, value }: ColorSwatchProps) {
  const handleClick = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className='group relative flex flex-col items-center p-4 m-2 rounded-lg transition-colors'>
      <div
        className='w-16 h-16 rounded-lg border-2 border-gray-200 shadow-sm transition-all'
        style={{ backgroundColor: value, minHeight: '4rem', minWidth: '4rem' }}
      />
      <div className='mt-2 text-center'>
        <div className='font-mono text-xs font-medium text-gray-800 truncate max-w-[80px]'>
          {name.replace('terminal-', '').replace('-', ' ')}
        </div>
        <div className='font-mono text-xs text-gray-500 mt-1'>{value}</div>
      </div>
      <button
        onClick={handleClick}
        className='mt-1 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
        title={`${value}をクリップボードにコピー`}
      >
        Copy
      </button>
    </div>
  );
}

interface ColorPaletteSectionProps {
  title: string;
  colors: ColorSwatchProps[];
}

function ColorPaletteSection({ title, colors }: ColorPaletteSectionProps) {
  return (
    <div className='mb-8'>
      <h3 className='text-lg font-semibold mb-4 font-mono text-gray-700'>{title}</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: '24px',
        }}
      >
        {colors.map((color, index) => (
          <ColorSwatch key={index} {...color} />
        ))}
      </div>
    </div>
  );
}

export interface ColorPaletteProps extends ComponentProps<'div'> {
  className?: string;
}

export function ColorPalette({ className, ...props }: ColorPaletteProps) {
  const backgroundColors: ColorSwatchProps[] = [
    { name: 'terminal-bg-primary', value: '#0c0c0c' },
    { name: 'terminal-bg-secondary', value: '#1a1a1a' },
    { name: 'terminal-bg-elevated', value: '#252525' },
    { name: 'terminal-bg-hover', value: '#2a2a2a' },
  ];

  const textColors: ColorSwatchProps[] = [
    { name: 'terminal-text-primary', value: '#f4f4f4' },
    { name: 'terminal-text-secondary', value: '#a8a8a8' },
    { name: 'terminal-text-muted', value: '#6b6b6b' },
    { name: 'terminal-text-bright', value: '#ffffff' },
  ];

  const accentColors: ColorSwatchProps[] = [
    { name: 'terminal-accent-red', value: '#ff5f56' },
    { name: 'terminal-accent-green', value: '#5af78e' },
    { name: 'terminal-accent-yellow', value: '#f3f99d' },
    { name: 'terminal-accent-blue', value: '#57c7ff' },
    { name: 'terminal-accent-magenta', value: '#ff6ac1' },
    { name: 'terminal-accent-cyan', value: '#9aedfe' },
    { name: 'terminal-accent-orange', value: '#ffb86c' },
  ];

  const syntaxColors: ColorSwatchProps[] = [
    { name: 'terminal-syntax-keyword', value: '#ff6ac1' },
    { name: 'terminal-syntax-string', value: '#f3f99d' },
    { name: 'terminal-syntax-comment', value: '#6b6b6b' },
    { name: 'terminal-syntax-function', value: '#57c7ff' },
    { name: 'terminal-syntax-variable', value: '#9aedfe' },
    { name: 'terminal-syntax-constant', value: '#ff6ac1' },
    { name: 'terminal-syntax-operator', value: '#ff5f56' },
    { name: 'terminal-syntax-punctuation', value: '#a8a8a8' },
  ];

  return (
    <div className={`max-w-4xl mx-auto p-6 ${className}`} {...props}>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-900 mb-2'>Terminal Color Palette</h1>
        <p className='text-gray-600 text-sm'>
          技術ブログのターミナル風デザインで使用するカラーシステム
        </p>
      </div>

      <div className='space-y-8'>
        <ColorPaletteSection title='Background Colors' colors={backgroundColors} />
        <ColorPaletteSection title='Text Colors' colors={textColors} />
        <ColorPaletteSection title='Accent Colors' colors={accentColors} />
        <ColorPaletteSection title='Syntax Highlighting' colors={syntaxColors} />
      </div>
    </div>
  );
}
