import { TableOfContents } from '@/components/mdx/table-of-contents';

const toc = [
  { id: 'mdx機能デモ', text: 'MDX機能デモ', level: 1 },
  { id: '目次機能', text: '目次機能', level: 2 },
  { id: 'シンタックスハイライト', text: 'シンタックスハイライト', level: 2 },
  { id: 'その他の機能', text: 'その他の機能', level: 2 },
];

export default function SimpleDemoPage() {
  return (
    <div className='min-h-screen bg-terminal-black'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* メインコンテンツ */}
          <div className='lg:col-span-3'>
            <article className='prose prose-terminal max-w-none text-terminal-white'>
              <h1 id='mdx機能デモ' className='text-3xl font-bold text-terminal-green mb-4'>
                MDX機能デモ
              </h1>

              <h2 id='目次機能' className='text-2xl font-semibold text-terminal-green mt-8 mb-4'>
                目次機能
              </h2>
              <p className='mb-4'>
                この見出しは目次に表示されます。右側の目次をクリックすると該当セクションにジャンプします。
              </p>

              <h2
                id='シンタックスハイライト'
                className='text-2xl font-semibold text-terminal-green mt-8 mb-4'
              >
                シンタックスハイライト
              </h2>
              <p className='mb-4'>コードブロックの例：</p>
              <pre className='bg-terminal-black/50 p-4 rounded-lg overflow-x-auto mb-4'>
                <code className='text-terminal-green font-mono text-sm'>
                  {`interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
}`}
                </code>
              </pre>

              <h2
                id='その他の機能'
                className='text-2xl font-semibold text-terminal-green mt-8 mb-4'
              >
                その他の機能
              </h2>
              <ul className='list-disc ml-6 mb-4'>
                <li>画像最適化（Next.js Image統合）</li>
                <li>ターミナルテーマ対応</li>
                <li>アクセシビリティ配慮</li>
                <li>レスポンシブデザイン</li>
              </ul>

              <div className='mt-8 p-4 border-l-4 border-terminal-green/50 bg-terminal-black/30 rounded'>
                <p className='text-terminal-white/80 italic'>
                  これらの機能により、より豊かなコンテンツ作成が可能になりました。
                  目次機能とシンタックスハイライトが正常に動作していることを確認できます。
                </p>
              </div>
            </article>
          </div>

          {/* サイドバー（目次） */}
          <aside className='lg:col-span-1'>
            <div className='sticky top-8'>
              <TableOfContents items={toc} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
