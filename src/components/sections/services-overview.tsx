
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { Dictionary, Locale } from '@/lib/types';
import { getAllServices } from '@/lib/services';

type ServicesOverviewProps = {
  dictionary: Dictionary['homepage']['services'];
  lang: Locale;
};

export async function ServicesOverview({ dictionary, lang }: ServicesOverviewProps) {
  const services = await getAllServices();

  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-white to-gray-50/50">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-accent text-white text-sm font-medium mb-6 shadow-modern">
            <Sparkles className="w-4 h-4" />
            Our Services
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 3).map((service, index) => (
            <Card
              key={service.id}
              className="group relative overflow-hidden border-0 shadow-modern hover-lift bg-white/80 backdrop-blur-sm"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Image Container */}
              <div className="relative overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  data-ai-hint={service.hint}
                  width={600}
                  height={400}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Floating Icon */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-modern opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>
              </div>

              <CardHeader className="relative z-10">
                <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10 flex-grow pt-0 pb-6">
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Learn More Button */}
                <Button
                  variant="ghost"
                  className="p-0 h-auto font-medium text-blue-600 hover:text-blue-700 group/btn"
                  asChild
                >
                  <Link href={`/${lang}/services`}>
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>

              {/* Bottom Gradient Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </Card>
          ))}
        </div>

        {/* View All Services CTA */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            className="bg-gradient-primary hover:opacity-90 text-white border-0 shadow-modern hover-lift"
            asChild
          >
            <Link href={`/${lang}/services`}>
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
