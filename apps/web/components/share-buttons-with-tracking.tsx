'use client';

import { ShareButtons, type ShareButtonsProps } from '@repo/ui';

import { trackShare } from '../lib/gtag';

interface ShareButtonsWithTrackingProps extends ShareButtonsProps {
  articleSlug?: string;
}

export function ShareButtonsWithTracking({ articleSlug, ...props }: ShareButtonsWithTrackingProps) {
  const handleShare = (platform: string) => {
    if (articleSlug) {
      trackShare(platform, articleSlug);
    }
  };

  // ShareButtonsコンポーネントのonClickをラップ
  const ShareButtonsWithHandler = ({ ...shareProps }: ShareButtonsProps) => {
    const OriginalShareButtons = ShareButtons;

    // カスタムコンポーネントを返す
    return (
      <div
        onClick={e => {
          const button = (e.target as HTMLElement).closest('button');
          if (button) {
            const ariaLabel = button.getAttribute('aria-label');
            if (ariaLabel?.includes('Twitter')) {
              handleShare('twitter');
            } else if (ariaLabel?.includes('Facebook')) {
              handleShare('facebook');
            } else if (ariaLabel?.includes('LinkedIn')) {
              handleShare('linkedin');
            }
          }
        }}
      >
        <OriginalShareButtons {...shareProps} />
      </div>
    );
  };

  return <ShareButtonsWithHandler {...props} />;
}
