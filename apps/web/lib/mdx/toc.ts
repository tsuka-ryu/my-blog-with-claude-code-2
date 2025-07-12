import GithubSlugger from 'github-slugger';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';

import type { Root } from 'mdast';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function extractToc(mdxContent: string): TocItem[] {
  const toc: TocItem[] = [];
  const slugger = new GithubSlugger();

  // MDXコンテンツから見出しを抽出
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(mdxContent)) !== null) {
    const level = match[1]?.length ?? 0;
    const text = match[2]?.trim() ?? '';
    const id = slugger.slug(text);

    toc.push({
      id,
      text,
      level,
    });
  }

  return toc;
}

// remarkプラグインとして使用する場合
export function remarkToc() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: Root, file: any) => {
    const toc: TocItem[] = [];
    const slugger = new GithubSlugger();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visit(tree, 'heading', (node: any) => {
      const text = toString(node);
      const id = slugger.slug(text);

      toc.push({
        id,
        text,
        level: node.depth,
      });
    });

    // ファイルのデータに目次を追加
    file.data.toc = toc;
  };
}
