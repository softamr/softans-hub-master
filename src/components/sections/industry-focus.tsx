
import type { Dictionary, Locale } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { getAllIndustries } from '@/lib/industries';
import * as icons from 'lucide-react';
import { ArrowRight, Target } from 'lucide-react';

type IndustryFocusProps = {
  dictionary: Omit<Dictionary['homepage']['industries'], 'restaurants' | 'factories' | 'clinics' | 'corporates'>;
  lang: Locale;
};

export async function IndustryFocus({ dictionary, lang }: IndustryFocusProps) {
  const industries = await getAllIndustries();

  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-white to-gray-50/50">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-secondary text-white text-sm font-medium mb-6 shadow-modern">
            <Target className="w-4 h-4" />
            Industries We Serve
          </div>
          <h2 className="font-headline text-4xl font-bold sm:text-5xl lg:text-6xl mb-6">
            <span className="text-gradient-primary">
              {dictionary.title}
            </span>
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed">
            {dictionary.subtitle}
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {industries.map((industry, index) => {
            const IconComponent = (icons as any)[industry.icon] || icons.Building2;
            return (
              <Link key={industry.id} href={`/${lang}/industries/${industry.slug}`}>
                <Card
                  className="group relative overflow-hidden rounded-3xl shadow-modern hover-lift border-0 h-80 cursor-pointer"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                {/* Background Image */}
                <Image
                  src={industry.image}
                  alt={industry.name}
                  data-ai-hint={industry.hint}
                  width={400}
                  height={500}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  {/* Icon */}
                  <div className="flex justify-end">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Title and Arrow */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <IconComponent className="h-8 w-8 text-white/80 group-hover:text-white transition-colors" />
                      <ArrowRight className="h-5 w-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-white font-headline group-hover:text-gradient-accent transition-all duration-300">
                      {industry.name}
                    </h3>

                    {/* Hover Description */}
                    <p className="text-white/80 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                      Specialized solutions for {industry.name.toLowerCase()}
                    </p>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </Card>
              </Link>
            )}
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Don't see your industry? <span className="font-medium text-primary">We work with all sectors.</span>
          </p>
          <Link href={`/${lang}/industries`}>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-accent text-white font-medium hover:opacity-90 transition-opacity cursor-pointer">
              <Target className="w-4 h-4" />
              Explore All Industries
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
