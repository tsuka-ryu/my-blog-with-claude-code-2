import type { Meta, StoryObj } from '@storybook/react';

const ResponsiveDemo = () => {
  return (
    <div className='space-y-8'>
      {/* 標準ブレークポイントのデモ */}
      <section>
        <h2 className='text-2xl font-bold mb-4 text-terminal-text-bright'>標準ブレークポイント</h2>
        <div className='space-y-4'>
          <div className='p-4 bg-terminal-bg-secondary rounded'>
            <p className='text-terminal-text-secondary mb-2'>現在の画面サイズ:</p>
            <div className='text-terminal-text-bright'>
              <span className='xs:hidden'>xs未満 (&lt; 475px)</span>
              <span className='hidden xs:inline sm:hidden'>xs (475px+)</span>
              <span className='hidden sm:inline md:hidden'>sm (640px+)</span>
              <span className='hidden md:inline lg:hidden'>md (768px+)</span>
              <span className='hidden lg:inline xl:hidden'>lg (1024px+)</span>
              <span className='hidden xl:inline 2xl:hidden'>xl (1280px+)</span>
              <span className='hidden 2xl:inline'>2xl (1536px+)</span>
            </div>
          </div>

          {/* レスポンシブグリッド */}
          <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div
                key={i}
                className='p-4 bg-terminal-bg-elevated border border-terminal-ui-border rounded'
              >
                <span className='text-terminal-accent-green'>Item {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ターミナルブレークポイントのデモ */}
      <section>
        <h2 className='text-2xl font-bold mb-4 text-terminal-text-bright'>
          ターミナルブレークポイント
        </h2>
        <div className='space-y-4'>
          <div className='p-4 bg-terminal-bg-secondary rounded'>
            <p className='text-terminal-text-secondary mb-2'>ターミナル幅:</p>
            <div className='text-terminal-text-bright font-mono'>
              <span className='terminal-sm:hidden'>&lt; 80ch</span>
              <span className='hidden terminal-sm:inline terminal-md:hidden'>80ch+</span>
              <span className='hidden terminal-md:inline terminal-lg:hidden'>100ch+</span>
              <span className='hidden terminal-lg:inline terminal-xl:hidden'>120ch+</span>
              <span className='hidden terminal-xl:inline'>160ch+</span>
            </div>
          </div>

          {/* ターミナル風コンテンツ */}
          <div className='font-mono'>
            <div className='w-full terminal-sm:w-80ch terminal-md:w-100ch terminal-lg:w-120ch mx-auto p-4 bg-terminal-bg-primary border border-terminal-ui-border rounded'>
              <div className='text-terminal-prompt-user'>$ </div>
              <div className='text-terminal-text-primary mt-2'>
                <span className='text-terminal-accent-green'>{`// この要素の幅は画面サイズに応じて変化します`}</span>
                <br />
                <span className='terminal-sm:hidden'>{`// 幅: 100% (80ch未満)`}</span>
                <span className='hidden terminal-sm:inline terminal-md:hidden'>{`// 幅: 80ch`}</span>
                <span className='hidden terminal-md:inline terminal-lg:hidden'>{`// 幅: 100ch`}</span>
                <span className='hidden terminal-lg:inline'>{`// 幅: 120ch`}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* コンテナのデモ */}
      <section>
        <h2 className='text-2xl font-bold mb-4 text-terminal-text-bright'>レスポンシブコンテナ</h2>
        <div className='bg-terminal-bg-secondary'>
          <div className='container'>
            <div className='p-4 bg-terminal-bg-elevated rounded'>
              <p className='text-terminal-text-primary'>
                このコンテナは自動的に中央寄せされ、画面サイズに応じたパディングが適用されます。
              </p>
              <div className='mt-2 text-terminal-text-secondary text-sm'>
                <span className='xs:hidden'>パディング: 1rem</span>
                <span className='hidden xs:inline sm:hidden'>パディング: 1rem (xs)</span>
                <span className='hidden sm:inline md:hidden'>パディング: 2rem (sm)</span>
                <span className='hidden md:inline lg:hidden'>パディング: 3rem (md)</span>
                <span className='hidden lg:inline xl:hidden'>パディング: 4rem (lg)</span>
                <span className='hidden xl:inline 2xl:hidden'>パディング: 5rem (xl)</span>
                <span className='hidden 2xl:inline'>パディング: 6rem (2xl)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* カスタムスペーシングのデモ */}
      <section>
        <h2 className='text-2xl font-bold mb-4 text-terminal-text-bright'>
          文字幅ベースのスペーシング
        </h2>
        <div className='space-y-2 font-mono'>
          <div className='flex items-center gap-4'>
            <span className='text-terminal-text-secondary'>1ch:</span>
            <div className='w-ch h-4 bg-terminal-accent-green'></div>
          </div>
          <div className='flex items-center gap-4'>
            <span className='text-terminal-text-secondary'>2ch:</span>
            <div className='w-2ch h-4 bg-terminal-accent-blue'></div>
          </div>
          <div className='flex items-center gap-4'>
            <span className='text-terminal-text-secondary'>4ch:</span>
            <div className='w-4ch h-4 bg-terminal-accent-yellow'></div>
          </div>
          <div className='flex items-center gap-4'>
            <span className='text-terminal-text-secondary'>8ch:</span>
            <div className='w-8ch h-4 bg-terminal-accent-magenta'></div>
          </div>
        </div>
      </section>
    </div>
  );
};

const meta: Meta<typeof ResponsiveDemo> = {
  title: 'Foundation/Responsive Breakpoints',
  component: ResponsiveDemo,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
