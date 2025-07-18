import { ImageResponse } from '@vercel/og';

import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || '技術ブログ';
  const description =
    searchParams.get('description') || 'プログラミング・開発ツール・技術トレンドについて';
  const author = searchParams.get('author') || 'tsuka-ryu';
  const tags = searchParams.get('tags') || '';

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(45deg, #0a0a0a 0%, #1a1a1a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
          color: '#e5e5e5',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Terminal Window Frame */}
        <div
          style={{
            width: '90%',
            height: '80%',
            background: '#0a0a0a',
            border: '2px solid #333',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            padding: '0',
            overflow: 'hidden',
          }}
        >
          {/* Terminal Header */}
          <div
            style={{
              background: '#1a1a1a',
              padding: '12px 20px',
              borderBottom: '1px solid #333',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', gap: '6px' }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#ff5f56',
                }}
              />
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#ffbd2e',
                }}
              />
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#27ca3f',
                }}
              />
            </div>
            <div
              style={{
                marginLeft: '16px',
                fontSize: '14px',
                color: '#666',
              }}
            >
              blog.terminal — ~/posts
            </div>
          </div>

          {/* Terminal Content */}
          <div
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              justifyContent: 'center',
            }}
          >
            {/* Command Prompt */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
                fontSize: '16px',
                color: '#666',
              }}
            >
              <span style={{ color: '#27ca3f' }}>$ </span>
              <span style={{ marginLeft: '8px' }}>cat article.md</span>
            </div>

            {/* Article Title */}
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#e5e5e5',
                marginBottom: '16px',
                lineHeight: '1.1',
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {title}
            </div>

            {/* Description */}
            <div
              style={{
                fontSize: '24px',
                color: '#999',
                marginBottom: '24px',
                lineHeight: '1.3',
                maxWidth: '100%',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {description}
            </div>

            {/* Author and Tags */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '18px',
              }}
            >
              <div style={{ color: '#666' }}>
                <span style={{ color: '#27ca3f' }}>author:</span> {author}
              </div>
              {tags && (
                <div style={{ color: '#666' }}>
                  <span style={{ color: '#27ca3f' }}>tags:</span> {tags}
                </div>
              )}
            </div>

            {/* Terminal Cursor */}
            <div
              style={{
                marginTop: '32px',
                display: 'flex',
                alignItems: 'center',
                fontSize: '16px',
                color: '#666',
              }}
            >
              <span style={{ color: '#27ca3f' }}>$ </span>
              <div
                style={{
                  width: '12px',
                  height: '20px',
                  background: '#e5e5e5',
                  marginLeft: '8px',
                  animation: 'blink 1s infinite',
                }}
              />
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05,
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              #333 2px,
              #333 4px
            )`,
            zIndex: -1,
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
