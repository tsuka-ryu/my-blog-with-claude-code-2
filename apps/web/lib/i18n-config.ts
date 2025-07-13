export const locales = ['ja', 'en'] as const;
export const defaultLocale = 'ja' as const;

export type Locale = (typeof locales)[number];

// ロケールの表示名
export const localeNames: Record<Locale, string> = {
  ja: '日本語',
  en: 'English',
} as const;

// ロケールのメタデータ
export const localeConfig = {
  ja: {
    name: localeNames.ja,
    code: 'ja',
    direction: 'ltr' as const,
  },
  en: {
    name: localeNames.en,
    code: 'en',
    direction: 'ltr' as const,
  },
} as const;
