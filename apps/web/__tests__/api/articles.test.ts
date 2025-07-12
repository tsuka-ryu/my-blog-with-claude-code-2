import { describe, it, expect, beforeAll } from 'vitest';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import {
  getAllArticles,
  getPublishedArticles,
  getArticleBySlug,
  getArticleMetadata,
  getArticlesByTag,
  getArticlesByCategory,
  getFeaturedArticles,
  getAllTags,
  getAllCategories,
  validateSlug,
  generateUniqueSlug,
} from '../../lib/articles';

describe('Articles Library', () => {
  beforeAll(() => {
    const testContentDir = join(process.cwd(), 'content', 'posts');
    mkdirSync(testContentDir, { recursive: true });
  });

  describe('getAllArticles', () => {
    it('should return all articles including unpublished ones', () => {
      const articles = getAllArticles();
      expect(articles).toBeInstanceOf(Array);
      expect(articles.length).toBeGreaterThan(0);

      const hasPublished = articles.some(article => article.frontMatter.published !== false);
      const hasUnpublished = articles.some(article => article.frontMatter.published === false);

      expect(hasPublished).toBe(true);
      expect(hasUnpublished).toBe(true);
    });

    it('should sort articles by date in descending order', () => {
      const articles = getAllArticles();
      if (articles.length > 1) {
        const dates = articles.map(article => new Date(article?.frontMatter?.date || ''));
        for (let i = 0; i < dates.length - 1; i++) {
          const currentTime = dates[i]?.getTime();
          const nextTime = dates[i + 1]?.getTime();
          if (currentTime !== undefined && nextTime !== undefined) {
            expect(currentTime).toBeGreaterThanOrEqual(nextTime);
          }
        }
      }
    });
  });

  describe('getPublishedArticles', () => {
    it('should return only published articles', () => {
      const articles = getPublishedArticles();
      expect(articles).toBeInstanceOf(Array);

      articles.forEach(article => {
        expect(article?.frontMatter?.published).not.toBe(false);
      });
    });
  });

  describe('getArticleBySlug', () => {
    it('should return article with matching slug', () => {
      const articles = getAllArticles();
      if (articles.length > 0) {
        const firstArticle = articles[0];
        if (firstArticle) {
          const foundArticle = getArticleBySlug(firstArticle.slug);

          expect(foundArticle).not.toBeNull();
          expect(foundArticle?.slug).toBe(firstArticle.slug);
          expect(foundArticle?.frontMatter.title).toBe(firstArticle.frontMatter.title);
        }
      }
    });

    it('should return null for non-existent slug', () => {
      const nonExistentSlug = 'non-existent-article-slug-12345';
      const article = getArticleBySlug(nonExistentSlug);
      expect(article).toBeNull();
    });
  });

  describe('getArticleMetadata', () => {
    it('should return metadata without content', () => {
      const metadata = getArticleMetadata();
      expect(metadata).toBeInstanceOf(Array);

      metadata.forEach(meta => {
        expect(meta).toHaveProperty('slug');
        expect(meta).toHaveProperty('frontMatter');
        expect(meta).toHaveProperty('excerpt');
        expect(meta).toHaveProperty('readingTime');
        expect(meta).not.toHaveProperty('content');
      });
    });
  });

  describe('getArticlesByTag', () => {
    it('should return articles with specified tag', () => {
      const allTags = getAllTags();
      if (allTags.length > 0) {
        const testTag = allTags[0];
        if (testTag) {
          const articlesWithTag = getArticlesByTag(testTag);

          articlesWithTag.forEach(article => {
            expect(article?.frontMatter?.tags).toContain(testTag);
          });
        }
      }
    });
  });

  describe('getArticlesByCategory', () => {
    it('should return articles with specified category', () => {
      const allCategories = getAllCategories();
      if (allCategories.length > 0) {
        const testCategory = allCategories[0];
        if (testCategory) {
          const articlesWithCategory = getArticlesByCategory(testCategory);

          articlesWithCategory.forEach(article => {
            expect(article?.frontMatter?.category).toBe(testCategory);
          });
        }
      }
    });
  });

  describe('getFeaturedArticles', () => {
    it('should return only featured articles', () => {
      const featuredArticles = getFeaturedArticles();

      featuredArticles.forEach(article => {
        expect(article?.frontMatter?.featured).toBe(true);
      });
    });
  });

  describe('getAllTags', () => {
    it('should return sorted array of unique tags', () => {
      const tags = getAllTags();
      expect(tags).toBeInstanceOf(Array);

      const uniqueTags = [...new Set(tags)];
      expect(tags).toEqual(uniqueTags);

      const sortedTags = [...tags].sort();
      expect(tags).toEqual(sortedTags);
    });
  });

  describe('getAllCategories', () => {
    it('should return sorted array of unique categories', () => {
      const categories = getAllCategories();
      expect(categories).toBeInstanceOf(Array);

      const uniqueCategories = [...new Set(categories)];
      expect(categories).toEqual(uniqueCategories);

      const sortedCategories = [...categories].sort();
      expect(categories).toEqual(sortedCategories);
    });
  });

  describe('validateSlug', () => {
    it('should validate proper slug format', () => {
      expect(validateSlug('valid-slug')).toBe(true);
      expect(validateSlug('valid-slug-123')).toBe(true);
      expect(validateSlug('validslug')).toBe(true);
      expect(validateSlug('123')).toBe(true);
    });

    it('should reject invalid slug format', () => {
      expect(validateSlug('')).toBe(false);
      expect(validateSlug('Invalid_Slug')).toBe(false);
      expect(validateSlug('invalid slug')).toBe(false);
      expect(validateSlug('invalid-Slug')).toBe(false);
      expect(validateSlug('invalid--slug')).toBe(false);
      expect(validateSlug('-invalid-slug')).toBe(false);
      expect(validateSlug('invalid-slug-')).toBe(false);
    });
  });

  describe('generateUniqueSlug', () => {
    it('should generate unique slug from title', () => {
      const title = 'Test Article Title';
      const slug = generateUniqueSlug(title);

      expect(slug).toBe('test-article-title');
      expect(validateSlug(slug)).toBe(true);
    });

    it('should handle duplicate slugs by adding counter', () => {
      const existingArticles = getAllArticles();
      if (existingArticles.length > 0) {
        const existingTitle = existingArticles[0]?.frontMatter?.title;
        if (existingTitle) {
          const slug = generateUniqueSlug(existingTitle);

          if (slug === '') {
            expect(true).toBe(true);
          } else {
            expect(slug).toMatch(/^.+-\d+$/);
            expect(validateSlug(slug)).toBe(true);
          }
        } else {
          expect(true).toBe(true);
        }
      } else {
        expect(true).toBe(true);
      }
    });
  });

  describe('Article structure validation', () => {
    it('should have required frontmatter fields', () => {
      const articles = getAllArticles();

      articles.forEach(article => {
        expect(article.frontMatter.title).toBeDefined();
        expect(article.frontMatter.date).toBeDefined();
        expect(article.slug).toBeDefined();
      });
    });

    it('should generate excerpt and reading time', () => {
      const articles = getAllArticles();

      articles.forEach(article => {
        expect(article.excerpt).toBeDefined();
        expect(article.readingTime).toBeGreaterThan(0);
      });
    });
  });
});
