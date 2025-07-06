import fs from 'fs';
import path from 'path';

import { TableOfContents } from '@/components/mdx/table-of-contents';
import SamplePost from '@/content/posts/sample-post.mdx';
import { extractToc } from '@/lib/mdx/toc';

export default function MDXDemoPage() {
  // MDXファイルの内容を読み込んで目次を生成
  const mdxPath = path.join(process.cwd(), 'content/posts/sample-post.mdx');
  const mdxContent = fs.readFileSync(mdxPath, 'utf-8');
  const toc = extractToc(mdxContent);

  return (
    <div className='min-h-screen bg-terminal-black'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* メインコンテンツ */}
          <div className='lg:col-span-3'>
            <article className='prose prose-terminal max-w-none'>
              <SamplePost />
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
