import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Rocket } from 'lucide-react';
import type { Dictionary, Locale } from '@/lib/types';

type CtaProps = {
  dictionary: Dictionary['homepage']['cta'];
  lang: Locale;
};

export function Cta({ dictionary, lang }: CtaProps) {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-gray-50/50 to-white">
      <div className="container">
        <div className="relative isolate overflow-hidden bg-gradient-dark px-8 py-24 text-center shadow-modern-lg rounded-3xl sm:px-16">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
          <div 
            className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>

          {/* Floating Elements */}
          <div className="absolute top-8 left-8 w-16 h-16 bg-gradient-accent rounded-full opacity-60 animate-bounce-gentle"></div>
          <div className="absolute top-12 right-12 w-12 h-12 bg-gradient-secondary rounded-xl opacity-70 animate-pulse"></div>
          <div className="absolute bottom-8 left-16 w-20 h-20 bg-gradient-success rounded-2xl opacity-50 animate-bounce-gentle" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-12 right-8 w-14 h-14 bg-gradient-primary rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>

          {/* Content */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6">
              <Rocket className="w-4 h-4" />
              Ready to Start?
            </div>

            <h2 className="font-headline mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
              <span className="text-gradient-accent">
                {dictionary.title.split(' ').slice(0, 2).join(' ')}
              </span>
              <br />
              <span className="text-white">
                {dictionary.title.split(' ').slice(2).join(' ')}
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-white/90">
              {dictionary.subtitle}
            </p>

            {/* Feature Points */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 mb-10">
              <div className="flex items-center gap-2 text-white/80">
                <Sparkles className="w-4 h-4 text-blue-300" />
                Free Consultation
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Rocket className="w-4 h-4 text-purple-300" />
                Quick Response
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <ArrowRight className="w-4 h-4 text-pink-300" />
                Custom Solutions
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 shadow-modern hover-lift group font-semibold"
                asChild
              >
                <Link href={`/${lang}/contact`}>
                  {dictionary.button}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                asChild
              >
                <Link href={`/${lang}/services`}>
                  View Services
                </Link>
              </Button>
            </div>
          </div>

          {/* Enhanced Background SVG */}
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] animate-pulse-glow"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(#modern-gradient)" fillOpacity="0.3" />
            <defs>
              <radialGradient id="modern-gradient">
                <stop stopColor="#667eea" />
                <stop offset={0.5} stopColor="#764ba2" />
                <stop offset={1} stopColor="#f093fb" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}