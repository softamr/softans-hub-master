import Image from 'next/image';
import { Star, Heart, Building2 } from 'lucide-react';
import type { Dictionary } from '@/lib/types';

type ClientShowcaseProps = {
  dictionary: Dictionary['homepage']['clients'];
};

export function ClientShowcase({ dictionary }: ClientShowcaseProps) {
  const clients = [
    { name: 'Innovate Corp', logo: 'https://placehold.co/158x48.png', hint: 'tech company' },
    { name: 'Global Solutions', logo: 'https://placehold.co/158x48.png', hint: 'startup logo' },
    { name: 'Quantum Logistics', logo: 'https://placehold.co/158x48.png', hint: 'finance brand' },
    { name: 'Apex Industries', logo: 'https://placehold.co/158x48.png', hint: 'logistics firm' },
    { name: 'Creative Inc.', logo: 'https://placehold.co/158x48.png', hint: 'creative agency' },
    { name: 'E-commerce World', logo: 'https://placehold.co/158x48.png', hint: 'ecommerce store' },
    { name: 'Healthful Living', logo: 'https://placehold.co/158x48.png', hint: 'health wellness' },
    { name: 'BuildRight Const.', logo: 'https://placehold.co/158x48.png', hint: 'construction company' },
  ];

  const duplicatedClients = [...clients, ...clients, ...clients, ...clients];

  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-white to-gray-50/50">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-secondary text-white text-sm font-medium mb-6 shadow-modern">
            <Heart className="w-4 h-4" />
            Trusted By
          </div>
          <h2 className="font-headline text-4xl font-bold sm:text-5xl lg:text-6xl mb-6">
            <span className="text-gradient-primary">
              {dictionary.title}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of satisfied clients who trust us with their digital transformation
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200/50 hover-lift">
            <Building2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <div className="font-headline text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Happy Clients</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200/50 hover-lift">
            <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <div className="font-headline text-3xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-muted-foreground">Client Rating</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200/50 hover-lift">
            <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <div className="font-headline text-3xl font-bold text-primary mb-2">99%</div>
            <div className="text-muted-foreground">Satisfaction Rate</div>
          </div>
        </div>

        {/* Client Logos Marquee */}
        <div className="relative overflow-hidden rounded-2xl bg-white/40 backdrop-blur-sm border border-gray-200/50 p-8">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="relative overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
            <div className="flex w-max animate-marquee-x hover:[animation-play-state:paused]">
              {duplicatedClients.map((client, index) => (
                <div key={index} className="flex-shrink-0 w-64 flex justify-center px-8">
                  <div className="group relative">
                    <Image
                      className="max-h-12 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
                      src={client.logo}
                      alt={client.name}
                      data-ai-hint={client.hint}
                      width={158}
                      height={48}
                    />
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-primary rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            <span className="font-medium text-primary">Trusted by industry leaders</span> across various sectors
          </p>
        </div>
      </div>
    </section>
  );
}
