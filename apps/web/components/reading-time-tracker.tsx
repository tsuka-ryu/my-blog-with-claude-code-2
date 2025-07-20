'use client';

import { useEffect, useRef } from 'react';

import { trackReadingTime } from '../lib/gtag';

interface ReadingTimeTrackerProps {
  articleSlug: string;
}

export function ReadingTimeTracker({ articleSlug }: ReadingTimeTrackerProps) {
  const startTimeRef = useRef<number>(Date.now());
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    const handleTrackTime = () => {
      if (hasTrackedRef.current) return;

      const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);

      // 最低5秒以上滞在した場合のみトラッキング
      if (timeSpent >= 5) {
        trackReadingTime(articleSlug, timeSpent);
        hasTrackedRef.current = true;
      }
    };

    // ページ離脱時に計測
    const handleBeforeUnload = () => {
      handleTrackTime();
    };

    // タブが非表示になった時に計測
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleTrackTime();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      // クリーンアップ時にも計測
      handleTrackTime();
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [articleSlug]);

  return null;
}
