import { describe, it, expect } from 'vitest';
import { GET } from '../../app/api/tags/route';
import { GET as getPostsByTag } from '../../app/api/tags/[tag]/route';
import { createMockRequest, createMockParams } from '../helpers/test-request';

describe('/api/tags', () => {
  describe('GET', () => {
    it('すべてのタグと記事数を取得できる', async () => {
      const response = await GET();

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
      const response = await GET();
      const data = await response.json();

      const tagNames = data.map((tag: { name: string }) => tag.name);
      const uniqueTagNames = [...new Set(tagNames)];

      expect(tagNames.length).toBe(uniqueTagNames.length);
    });

    it('特定のタグの記事数が正しい', async () => {
      const response = await GET();
      const data = await response.json();

      // Reactタグの記事数をチェック（モックデータから予想される数）
      const reactTag = data.find((tag: { name: string }) => tag.name === 'React');
      expect(reactTag).toBeDefined();
      expect(reactTag.count).toBe(2); // モックデータでReactタグを持つ記事数
    });
  });
});

describe('/api/tags/[tag]', () => {
  describe('GET', () => {
    it('存在するタグで記事を取得できる', async () => {
      const request = createMockRequest({
        url: 'http://localhost:3000/api/tags/React',
      });
      const params = createMockParams({ tag: 'React' });

      const response = await getPostsByTag(request, { params });

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      // すべての記事がReactタグを含んでいることをチェック
      data.forEach((post: { tags: string[] }) => {
        expect(post.tags).toContain('React');
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
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(0);
    });

    it('大文字小文字を区別しないでタグ検索ができる', async () => {
      const testCases = ['react', 'REACT', 'React', 'rEaCt'];

      for (const tagCase of testCases) {
        const request = createMockRequest({
          url: `http://localhost:3000/api/tags/${tagCase}`,
        });
        const params = createMockParams({ tag: tagCase });

        const response = await getPostsByTag(request, { params });
        expect(response.status).toBe(200);

        const data = await response.json();
        expect(data.length).toBeGreaterThan(0);

        // すべての記事がReactタグを含んでいることをチェック
        data.forEach((post: { tags: string[] }) => {
          expect(post.tags.some(tag => tag.toLowerCase() === 'react')).toBe(true);
        });
      }
    });

    it('URLエンコードされたタグで検索ができる', async () => {
      const request = createMockRequest({
        url: 'http://localhost:3000/api/tags/Next.js',
      });
      const params = createMockParams({ tag: 'Next.js' });

      const response = await getPostsByTag(request, { params });

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.length).toBeGreaterThan(0);

      // すべての記事がNext.jsタグを含んでいることをチェック
      data.forEach((post: { tags: string[] }) => {
        expect(post.tags).toContain('Next.js');
      });
    });

    it('複数のタグでフィルタリングが正しく動作する', async () => {
      const testTags = ['JavaScript', 'TypeScript', 'Vim'];

      for (const tag of testTags) {
        const request = createMockRequest({
          url: `http://localhost:3000/api/tags/${tag}`,
        });
        const params = createMockParams({ tag });

        const response = await getPostsByTag(request, { params });
        expect(response.status).toBe(200);

        const data = await response.json();

        // 結果の各記事が指定されたタグを含んでいることをチェック
        data.forEach((post: { tags: string[] }) => {
          expect(post.tags).toContain(tag);
        });
      }
    });
  });
});
