import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Building2, Sparkles } from "lucide-react";
import * as icons from 'lucide-react';
import type { Locale } from "@/lib/types";
import { getAllIndustries } from "@/lib/industries";

export default async function IndustriesPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const industries = await getAllIndustries();

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
              <Target className="w-4 h-4" />
              Industries We Serve
            </div>
            
            <h1 className="font-headline text-4xl font-bold sm:text-6xl lg:text-7xl mb-6">
              <span className="text-gradient-primary">
                Industry
              </span>
              <br />
              <span className="text-foreground">
                Expertise
              </span>
            </h1>
            
            <p className="mt-6 max-w-4xl mx-auto text-xl text-muted-foreground leading-relaxed">
              We deliver specialized solutions across diverse industries, understanding unique challenges and providing tailored technology solutions that drive growth and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium mb-6 shadow-modern">
              <Sparkles className="w-4 h-4" />
              Our Specializations
            </div>
            <h2 className="font-headline text-3xl font-bold sm:text-5xl lg:text-6xl mb-6">
              <span className="text-gradient-primary">Tailored Solutions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our industry-specific expertise and discover how we can transform your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {industries.map((industry, index) => {
              const IconComponent = (icons as any)[industry.icon] || Building2;
              const solutions = Array.isArray(industry.solutions) ? industry.solutions : [];
              const description = industry.description || `Specialized solutions for ${industry.name}`;
              return (
                <Card 
                  key={industry.id} 
                  className="group overflow-hidden border-0 shadow-modern hover-lift bg-white/80 backdrop-blur-sm"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">
                    <div className="relative overflow-hidden">
                      <Image
                        src={industry.image}
                        alt={industry.name}
                        data-ai-hint={industry.hint}
                        width={400}
                        height={300}
                        className="w-full h-64 lg:h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Image Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Icon Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-8 flex flex-col justify-center">
                      <h3 className="font-headline text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                        {industry.name}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {description}
                      </p>

                      {solutions.length > 0 && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-sm text-primary mb-3">Key Solutions:</h4>
                          <div className="flex flex-wrap gap-2">
                            {solutions.slice(0, 3).map((solution, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                              >
                                {solution}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white border-0 shadow-modern hover-lift group/btn" 
                          asChild
                        >
                          <Link href={`/${lang}/industries/${industry.slug}`}>
                            Explore Industry
                            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                        
                        <Button 
                          variant="outline" 
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
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
        <div className="container text-center">
          <h2 className="font-headline text-4xl font-bold mb-6">
            <span className="text-gradient-accent">Don't See Your Industry?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            We work with businesses across all sectors. Let's discuss how we can create a custom solution for your industry.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 shadow-modern hover-lift" asChild>
              <Link href={`/${lang}/contact`}>
                Discuss Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10" asChild>
              <Link href={`/${lang}/services`}>View Our Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
