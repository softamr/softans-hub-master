'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Globe, ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { Dictionary, Locale } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/icons/logo';

type HeaderProps = {
  dictionary: Dictionary['header'];
  lang: Locale;
};

export function Header({ dictionary, lang }: HeaderProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: `/${lang}`, label: dictionary.nav.home },
    { href: `/${lang}/services`, label: dictionary.nav.services },
    { href: `/${lang}/industries`, label: 'Industries' },
    { href: `/${lang}/clients`, label: dictionary.nav.clients },
    { href: `/${lang}/about`, label: dictionary.nav.about },
    { href: `/${lang}/blog`, label: dictionary.nav.blog },
    { href: `/${lang}/contact`, label: dictionary.nav.contact },
  ];

  const currentLangPath = `/${lang}`;
  const otherLang = lang === 'en' ? 'ar' : 'en';
  const otherLangPath = pathname.replace(currentLangPath, `/${otherLang}`);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-500',
        isScrolled
          ? 'glass border-b border-border/20 shadow-modern'
          : 'bg-transparent'
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link href={`/${lang}`} className="group">
          <div className="flex items-center space-x-2">
            <Logo />
            
          </div>
          <span className="sr-only">Softans Home</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative text-sm font-medium transition-all duration-300 hover:text-primary group',
                pathname === link.href ? 'text-primary' : 'text-muted-foreground'
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {link.label}
              <span className={cn(
                'absolute -bottom-1 left-0 h-0.5 bg-gradient-primary transition-all duration-300',
                pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
              )}></span>
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" className="hover:bg-primary/10 transition-modern" asChild>
            <Link href={otherLangPath}>
              <Globe className="w-4 h-4" />
              <span className="ml-2">{dictionary.language}</span>
            </Link>
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90 text-white border-0 shadow-modern hover-lift" asChild>
            <Link href={`/${lang}/contact`}>{dictionary.cta}</Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden hover:bg-primary/10 transition-modern">
              <Menu className="w-5 h-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] glass border-l border-border/20">
            <nav className="flex h-full flex-col justify-between pt-8">
              <div className="flex flex-col gap-6">
                <div className="flex items-center mb-8">
                  <Logo />
                </div>
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-lg font-medium transition-all duration-300 hover:text-primary hover:translate-x-2 group",
                      pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                    )}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="flex items-center">
                      {link.label}
                      <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </span>
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-4">
                 <Button variant="outline" className="border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-modern" asChild>
                    <Link href={otherLangPath}>
                      <Globe className="w-4 h-4" />
                      <span className="ml-2">{dictionary.language}</span>
                    </Link>
                  </Button>
                <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 text-white border-0 shadow-modern">
                  <Link href={`/${lang}/contact`}>{dictionary.cta}</Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
