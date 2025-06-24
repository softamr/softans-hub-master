

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { getDictionary } from '@/lib/dictionaries';
import type { Locale, Dictionary } from '@/lib/types';
import { SetDirection } from '@/components/set-direction';

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <>
      <SetDirection lang={lang} />
      <div className="flex min-h-screen flex-col">
        <Header dictionary={dictionary.header} lang={lang} />
        <main className="flex-grow">{children}</main>
        <Footer dictionary={dictionary} lang={lang} />
      </div>
    </>
  );
}
