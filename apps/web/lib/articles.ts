import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

import slugify from '@sindresorhus/slugify';
import matter from 'gray-matter';

export interface ArticleFrontMatter {
  title: string;
  description?: string;
  date: string;
  tags?: string[];
  category?: string;
  author?: string;
  published?: boolean;
  featured?: boolean;
  image?: string;
  slug?: string;
  locale?: string;
}

export interface Article {
  slug: string;
  frontMatter: ArticleFrontMatter;
  content: string;
  excerpt?: string;
  readingTime?: number;
}

export interface ArticleMetadata {
  slug: string;
  frontMatter: ArticleFrontMatter;
  excerpt?: string;
  readingTime?: number;
}

const CONTENT_DIR = join(process.cwd(), 'content', 'posts');

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

function generateExcerpt(content: string, maxLength = 150): string {
  const plainText = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/[#*_[\]()]/g, '')
    .replace(/\n+/g, ' ')
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return plainText.slice(0, maxLength).replace(/\s+\S*$/, '...');
}

export function getMarkdownFiles(): string[] {
  try {
    return readdirSync(CONTENT_DIR)
      .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
      .map(file => file.replace(/\.(md|mdx)$/, ''));
  } catch (error) {
    console.error('Error reading content directory:', error);
    return [];
  }
}

export function readMarkdownFile(filename: string, includeUnpublished = false): Article | null {
  try {
    const fullPath = join(CONTENT_DIR, `${filename}.md`);
    let fileContent: string;

    try {
      fileContent = readFileSync(fullPath, 'utf8');
    } catch {
      const mdxPath = join(CONTENT_DIR, `${filename}.mdx`);
      fileContent = readFileSync(mdxPath, 'utf8');
    }

    const { data, content } = matter(fileContent);
    const frontMatter = data as ArticleFrontMatter;

    if (!includeUnpublished && frontMatter.published === false) {
      return null;
    }

    const slug = frontMatter.slug || slugify(frontMatter.title) || filename;
    const excerpt = generateExcerpt(content);
    const readingTime = calculateReadingTime(content);

    return {
      slug,
      frontMatter: {
        ...frontMatter,
        slug,
      },
      content,
      excerpt,
      readingTime,
    };
  } catch (error) {
    console.error(`Error reading file ${filename}:`, error);
    return null;
  }
}

export function getAllArticles(): Article[] {
  const filenames = getMarkdownFiles();
  const articles = filenames
    .map(filename => readMarkdownFile(filename, true))
    .filter((article): article is Article => article !== null)
    .sort((a, b) => {
      const dateA = new Date(a.frontMatter.date);
      const dateB = new Date(b.frontMatter.date);
      return dateB.getTime() - dateA.getTime();
    });

  return articles;
}

export function getPublishedArticles(): Article[] {
  return getAllArticles().filter(article => article.frontMatter.published !== false);
}

export function getArticleBySlug(slug: string): Article | null {
  const filenames = getMarkdownFiles();

  for (const filename of filenames) {
    const article = readMarkdownFile(filename, true);
    if (article && article.slug === slug) {
      return article;
    }
  }

  return null;
}

export function getArticleMetadata(): ArticleMetadata[] {
  return getAllArticles().map(article => ({
    slug: article.slug,
    frontMatter: article.frontMatter,
    excerpt: article.excerpt,
    readingTime: article.readingTime,
  }));
}

export function getPublishedArticleMetadata(): ArticleMetadata[] {
  return getPublishedArticles().map(article => ({
    slug: article.slug,
    frontMatter: article.frontMatter,
    excerpt: article.excerpt,
    readingTime: article.readingTime,
  }));
}

export function getArticlesByTag(tag: string): Article[] {
  return getPublishedArticles().filter(article => article.frontMatter.tags?.includes(tag));
}

export function getArticlesByCategory(category: string): Article[] {
  return getPublishedArticles().filter(article => article.frontMatter.category === category);
}

export function getFeaturedArticles(): Article[] {
  return getPublishedArticles().filter(article => article.frontMatter.featured === true);
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();

  getPublishedArticles().forEach(article => {
    article.frontMatter.tags?.forEach(tag => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}

export function getAllCategories(): string[] {
  const categorySet = new Set<string>();

  getPublishedArticles().forEach(article => {
    if (article.frontMatter.category) {
      categorySet.add(article.frontMatter.category);
    }
  });

  return Array.from(categorySet).sort();
}

export function validateSlug(slug: string): boolean {
  if (!slug || typeof slug !== 'string') return false;

  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugPattern.test(slug);
}

export function generateUniqueSlug(title: string): string {
  if (!title || typeof title !== 'string') {
    return '';
  }

  const baseSlug = slugify(title);
  if (!baseSlug) {
    return '';
  }

  const existingArticles = getAllArticles();
  const existingSlugs = existingArticles.map(article => article.slug);

  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }

  let counter = 1;
  let newSlug = `${baseSlug}-${counter}`;

  while (existingSlugs.includes(newSlug)) {
    counter++;
    newSlug = `${baseSlug}-${counter}`;
  }

  return newSlug;
}

// 多言語対応関数
export function getPublishedArticlesByLocale(locale: string): Article[] {
  return getPublishedArticles().filter(
    article =>
      article.frontMatter.locale === locale || (!article.frontMatter.locale && locale === 'ja')
  );
}

export function getArticlesByLocaleAndTag(locale: string, tag: string): Article[] {
  return getPublishedArticlesByLocale(locale).filter(article =>
    article.frontMatter.tags?.includes(tag)
  );
}

export function getArticlesByLocaleAndCategory(locale: string, category: string): Article[] {
  return getPublishedArticlesByLocale(locale).filter(
    article => article.frontMatter.category === category
  );
}

export function getTagsByLocale(locale: string): string[] {
  const tagSet = new Set<string>();

  getPublishedArticlesByLocale(locale).forEach(article => {
    article.frontMatter.tags?.forEach(tag => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}

export function getCategoriesByLocale(locale: string): string[] {
  const categorySet = new Set<string>();

  getPublishedArticlesByLocale(locale).forEach(article => {
    if (article.frontMatter.category) {
      categorySet.add(article.frontMatter.category);
    }
  });

  return Array.from(categorySet).sort();
}

export function getFeaturedArticlesByLocale(locale: string): Article[] {
  return getPublishedArticlesByLocale(locale).filter(
    article => article.frontMatter.featured === true
  );
}
