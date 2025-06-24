import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Dictionary, Locale } from '@/lib/types';

type HeroProps = {
  dictionary: Dictionary['homepage']['hero'];
  lang: Locale;
};

export function Hero({ dictionary, lang }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-gradient-shift bg-[length:400%_400%]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-gentle"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-gentle" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-gradient-to-r from-pink-400 to-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-gentle" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container relative z-10 flex flex-col items-center justify-center text-center py-24">
        <div className="max-w-5xl animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-primary text-white text-sm font-medium mb-6 shadow-modern">
            <Sparkles className="w-4 h-4" />
            Digital Transformation Experts
          </div>

          {/* Main Heading */}
          <h1 className="font-headline text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6">
            <span className="text-gradient-primary">
              {dictionary.title.split(' ').slice(0, 2).join(' ')}
            </span>
            <br />
            <span className="text-foreground">
              {dictionary.title.split(' ').slice(2).join(' ')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-muted-foreground lg:mx-0 font-medium">
            {dictionary.subtitle}
          </p>

          {/* Feature Points */}
          <div className="flex flex-wrap gap-4 mt-8 justify-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="w-4 h-4 text-blue-600" />
              Fast Delivery
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Target className="w-4 h-4 text-purple-600" />
              Results Driven
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4 text-pink-600" />
              Modern Solutions
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-white border-0 shadow-modern hover-lift group" asChild>
              <Link href={`/${lang}/services`}>
                {dictionary.primaryCta}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-modern" asChild>
              <Link href={`/${lang}/contact`}>{dictionary.secondaryCta}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
