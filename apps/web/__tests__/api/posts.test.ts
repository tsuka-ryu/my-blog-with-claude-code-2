import { describe, it, expect } from 'vitest';
import { GET } from '../../app/api/posts/route';
import { GET as getPostBySlug } from '../../app/api/posts/[slug]/route';
import { createMockRequest, createMockParams } from '../helpers/test-request';

describe('/api/posts', () => {
  describe('GET', () => {
    it('すべての記事を取得できる', async () => {
      const request = createMockRequest();
      const response = await GET();

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      // 記事データの構造をチェック
      const post = data[0];
      expect(post).toHaveProperty('slug');
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('description');
      expect(post).toHaveProperty('publishedAt');
      expect(post).toHaveProperty('tags');
      expect(post).toHaveProperty('category');
      expect(post).toHaveProperty('readingTime');
    });

    it('記事が公開日順（降順）でソートされている', async () => {
      const response = await GET();
      const data = await response.json();

      for (let i = 0; i < data.length - 1; i++) {
        const currentDate = new Date(data[i].publishedAt);
        const nextDate = new Date(data[i + 1].publishedAt);
        expect(currentDate.getTime()).toBeGreaterThanOrEqual(nextDate.getTime());
      }
    });
  });
});

describe('/api/posts/[slug]', () => {
  describe('GET', () => {
    it('存在するslugで記事を取得できる', async () => {
      const request = createMockRequest({
        url: 'http://localhost:3000/api/posts/react-hooks-best-practices',
      });
      const params = createMockParams({ slug: 'react-hooks-best-practices' });

      const response = await getPostBySlug(request, { params });

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.slug).toBe('react-hooks-best-practices');
      expect(data.title).toBe('React Hooksのベストプラクティス');
    });

    it('存在しないslugで404エラーが返される', async () => {
      const request = createMockRequest({
        url: 'http://localhost:3000/api/posts/non-existent-post',
      });
      const params = createMockParams({ slug: 'non-existent-post' });

      const response = await getPostBySlug(request, { params });

      expect(response.status).toBe(404);

      const data = await response.json();
      expect(data.error).toBe('Post not found');
    });

    it('複数の記事slugで正しい記事が取得できる', async () => {
      const testCases = [
        { slug: 'typescript-generics-guide', title: 'TypeScript Genericsの基礎から応用まで' },
        { slug: 'nextjs-app-router-migration', title: 'Next.js App Routerへの移行体験記' },
      ];

      for (const testCase of testCases) {
        const request = createMockRequest({
          url: `http://localhost:3000/api/posts/${testCase.slug}`,
        });
        const params = createMockParams({ slug: testCase.slug });

        const response = await getPostBySlug(request, { params });
        expect(response.status).toBe(200);

        const data = await response.json();
        expect(data.slug).toBe(testCase.slug);
        expect(data.title).toBe(testCase.title);
      }
    });
  });
});
