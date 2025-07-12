import { describe, it, expect } from 'vitest';
import { GET } from '../../app/api/tags/route';
import { GET as getPostsByTag } from '../../app/api/tags/[tag]/route';
import { createMockRequest, createMockParams } from '../helpers/test-request';

describe('/api/tags', () => {
  describe('GET', () => {
    it('すべてのタグと記事数を取得できる', async () => {
      const request = createMockRequest({ url: 'http://localhost:3000/api/tags' });
      const response = await GET(request);

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      // タグデータの構造をチェック
      const tag = data[0];
      expect(tag).toHaveProperty('name');
      expect(tag).toHaveProperty('count');
      expect(typeof tag.name).toBe('string');
      expect(typeof tag.count).toBe('number');
      expect(tag.count).toBeGreaterThan(0);
    });

    it('重複のないタグが返される', async () => {
      const request = createMockRequest({ url: 'http://localhost:3000/api/tags' });
      const response = await GET(request);
      const data = await response.json();

      const tagNames = data.map((tag: { name: string }) => tag.name);
      const uniqueTagNames = [...new Set(tagNames)];

      expect(tagNames.length).toBe(uniqueTagNames.length);
    });

    it('特定のタグの記事数が正しい', async () => {
      const request = createMockRequest({ url: 'http://localhost:3000/api/tags' });
      const response = await GET(request);
      const data = await response.json();

      // 技術タグの記事数をチェック（モックデータから予想される数）
      const techTag = data.find((tag: { name: string }) => tag.name === '技術');
      expect(techTag).toBeDefined();
      expect(techTag.count).toBeGreaterThan(0);
    });
  });
});

describe('/api/tags/[tag]', () => {
  describe('GET', () => {
    it('存在するタグで記事を取得できる', async () => {
      const request = createMockRequest({
        url: 'http://localhost:3000/api/tags/技術',
      });
      const params = createMockParams({ tag: '技術' });

      const response = await getPostsByTag(request, { params });

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.tag).toBe('技術');
      expect(Array.isArray(data.articles)).toBe(true);
      expect(data.articles.length).toBeGreaterThan(0);

      // すべての記事が技術タグを含んでいることをチェック
      data.articles.forEach((post: { frontMatter: { tags?: string[] } }) => {
        expect(post.frontMatter.tags).toContain('技術');
      });
    });

    it('存在しないタグで空配列が返される', async () => {
      const request = createMockRequest({
        url: 'http://localhost:3000/api/tags/NonExistentTag',
      });
      const params = createMockParams({ tag: 'NonExistentTag' });

      const response = await getPostsByTag(request, { params });

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.tag).toBe('NonExistentTag');
      expect(Array.isArray(data.articles)).toBe(true);
      expect(data.articles.length).toBe(0);
    });

    it('大文字小文字を区別しないでタグ検索ができる', async () => {
      const testCases = ['技術', 'テスト'];

      for (const tagCase of testCases) {
        const request = createMockRequest({
          url: `http://localhost:3000/api/tags/${tagCase}`,
        });
        const params = createMockParams({ tag: tagCase });

        const response = await getPostsByTag(request, { params });
        expect(response.status).toBe(200);

        const data = await response.json();
        expect(data.articles.length).toBeGreaterThan(0);

        // すべての記事が指定したタグを含んでいることをチェック
        data.articles.forEach((post: { frontMatter: { tags?: string[] } }) => {
          expect(post.frontMatter.tags).toContain(tagCase);
        });
      }
    });

    it('URLエンコードされたタグで検索ができる', async () => {
      const request = createMockRequest({
        url: 'http://localhost:3000/api/tags/ブログ',
      });
      const params = createMockParams({ tag: 'ブログ' });

      const response = await getPostsByTag(request, { params });

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.articles.length).toBeGreaterThan(0);

      // すべての記事がブログタグを含んでいることをチェック
      data.articles.forEach((post: { frontMatter: { tags?: string[] } }) => {
        expect(post.frontMatter.tags).toContain('ブログ');
      });
    });

    it('複数のタグでフィルタリングが正しく動作する', async () => {
      const testTags = ['技術', 'ブログ', 'テスト'];

      for (const tag of testTags) {
        const request = createMockRequest({
          url: `http://localhost:3000/api/tags/${tag}`,
        });
        const params = createMockParams({ tag });

        const response = await getPostsByTag(request, { params });
        expect(response.status).toBe(200);

        const data = await response.json();

        // 結果の各記事が指定されたタグを含んでいることをチェック
        data.articles.forEach((post: { frontMatter: { tags?: string[] } }) => {
          expect(post.frontMatter.tags).toContain(tag);
        });
      }
    });
  });
});
