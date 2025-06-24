

'use client';

import { useEffect } from 'react';
import type { Locale } from '@/lib/types';

export function SetDirection({ lang }: { lang: Locale }) {
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  return null;
}

