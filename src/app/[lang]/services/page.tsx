import { Card, CardFooter } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Sparkles, Zap, Target } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/types";
import { getAllServices } from "@/lib/services";

export default async function ServicesPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const services = await getAllServices();

  return (
    <div className="bg-gradient-to-b from-white to-gray-50/50">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-gentle"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-gentle" style={{animationDelay: '2s'}}></div>

        <div className="container relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium mb-6 shadow-modern">
              <Sparkles className="w-4 h-4" />
              Our Services
            </div>

            <h1 className="font-headline text-4xl font-bold sm:text-6xl lg:text-7xl mb-6">
              <span className="text-gradient-primary">
                Digital Solutions
              </span>
              <br />
              <span className="text-foreground">
                That Drive Success
              </span>
            </h1>

            <p className="mt-6 max-w-4xl mx-auto text-xl text-muted-foreground leading-relaxed">
              We offer a comprehensive suite of digital services to empower your business. Each service is delivered with a commitment to quality, innovation, and your success.
            </p>

            {/* Feature Points */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="w-4 h-4 text-blue-600" />
                Fast Delivery
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Target className="w-4 h-4 text-purple-600" />
                Custom Solutions
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Quality Assured
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 sm:py-32">
        <div className="container">
          <div className="space-y-24">
            {services.map((service, index) => (
              <Card
                key={service.id}
                className="group overflow-hidden border-0 shadow-modern hover-lift bg-white/80 backdrop-blur-sm"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">
                  <div className={`relative min-h-[400px] lg:min-h-[500px] overflow-hidden ${index % 2 !== 0 ? 'lg:order-last' : ''}`}>
                    <Image
                      src={service.image}
                      alt={service.title}
                      data-ai-hint={service.hint}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Floating Badge */}
                    <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-primary shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      Service #{index + 1}
                    </div>
                  </div>

                  <div className="p-8 sm:p-12 flex flex-col justify-center">
                    <h2 className="font-headline text-4xl font-bold mb-6 group-hover:text-primary transition-colors duration-300">
                      <span className="text-gradient-primary">{service.title}</span>
                    </h2>

                    <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                      {service.description}
                    </p>

                    <div className="mb-8">
                      <h3 className="font-semibold text-lg mb-4 flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        Key Features
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.features.map((feature, featureIndex) => (
                          <li
                            key={feature}
                            className="flex items-start group/feature"
                            style={{ animationDelay: `${(index * 200) + (featureIndex * 100)}ms` }}
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-3 mt-2 group-hover/feature:scale-125 transition-transform"></div>
                            <span className="text-foreground group-hover/feature:text-primary transition-colors">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        asChild
                        size="lg"
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white border-0 shadow-modern hover-lift group/btn"
                      >
                        <Link href={`/${lang}/services/${service.slug}`}>
                          Explore Service
                          <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>

                      <Button
                        variant="outline"
                        size="lg"
                        className="border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                        asChild
                      >
                        <Link href={`/${lang}/contact`}>
                          Get Quote
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Bottom Gradient Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
        <div className="container text-center">
          <h2 className="font-headline text-4xl font-bold mb-6">
            <span className="text-gradient-accent">Ready to Get Started?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Let's discuss your project requirements and find the perfect solution for your business needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 shadow-modern hover-lift" asChild>
              <Link href={`/${lang}/contact`}>
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10" asChild>
              <Link href={`/${lang}/about`}>Learn About Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
