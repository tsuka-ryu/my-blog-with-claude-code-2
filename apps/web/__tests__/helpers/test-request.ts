import { NextRequest } from 'next/server';

export function createMockRequest({
  url = 'http://localhost:3000',
  method = 'GET',
  headers = {},
}: {
  url?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
} = {}) {
  return new NextRequest(url, {
    method,
    headers: new Headers(headers),
  });
}

export function createMockParams<T = Record<string, string>>(params: T): Promise<T> {
  return Promise.resolve(params);
}
