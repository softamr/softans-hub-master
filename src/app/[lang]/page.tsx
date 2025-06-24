
import { getDictionary } from '@/lib/dictionaries';
import type { Locale } from '@/lib/types';
import { Hero } from '@/components/sections/hero';
import { ServicesOverview } from '@/components/sections/services-overview';
import { IndustryFocus } from '@/components/sections/industry-focus';
import { AboutSnippet } from '@/components/sections/about-snippet';
import { ClientShowcase } from '@/components/sections/client-showcase';
import { Cta } from '@/components/sections/cta';
import { getHomePageContent } from '@/lib/page-content';

export default async function HomePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const pageContent = await getHomePageContent();

  // Use pageContent if available, otherwise fallback to dictionary
  const homepageDict = pageContent?.[lang]?.homepage ?? dictionary.homepage;

  return (
    <>
      <Hero dictionary={homepageDict.hero} lang={lang} />
      <AboutSnippet dictionary={homepageDict.about} lang={lang} />
      <IndustryFocus dictionary={homepageDict.industries} lang={lang} />
      <ServicesOverview dictionary={homepageDict.services} lang={lang} />
      <ClientShowcase dictionary={homepageDict.clients} />
      <Cta
        dictionary={homepageDict.cta}
        lang={lang}
      />
    </>
  );
}
