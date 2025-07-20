declare namespace NodeJS {
  interface ProcessEnv {
    // Google Analytics
    NEXT_PUBLIC_GA_MEASUREMENT_ID?: string;

    // Google Analytics Data API
    GA_PROPERTY_ID?: string;
    GOOGLE_APPLICATION_CREDENTIALS?: string;

    // サイト設定
    NEXT_PUBLIC_SITE_URL?: string;
  }
}
