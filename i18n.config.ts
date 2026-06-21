export const locales = ['en', 'ar', 'fr'] as const;
export const defaultLocale = 'en' as const;
export type Locale = (typeof locales)[number];

export const localeMeta: Record<Locale, { name: string; dir: 'ltr' | 'rtl' }> = {
  en: { name: 'English', dir: 'ltr' },
  ar: { name: 'العربية', dir: 'rtl' },
  fr: { name: 'Français', dir: 'ltr' },
};
