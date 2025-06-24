import Image from "next/image";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, ArrowLeft, Target, Award, Lightbulb, TrendingUp, Sparkles } from "lucide-react";
import * as icons from 'lucide-react';
import Link from "next/link";
import type { Locale } from "@/lib/types";
import { getIndustryBySlug } from "@/lib/industries";

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string, lang: Locale }> }) {
  const { slug, lang } = await params;
  const industry = await getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  const IconComponent = (icons as any)[industry.icon] || icons.Building2;
  const projects = Array.isArray(industry.projects) ? industry.projects : [];
  const challenges = Array.isArray(industry.challenges) ? industry.challenges : [];
  const solutions = Array.isArray(industry.solutions) ? industry.solutions : [];
  const benefits = Array.isArray(industry.benefits) ? industry.benefits : [];
  const overview = industry.overview || industry.description || `Comprehensive solutions for ${industry.name}`;
  const description = industry.description || `Specialized solutions for ${industry.name}`;

  return (
    <div className="bg-gradient-to-b from-white to-gray-50/50">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-gentle"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-gentle" style={{animationDelay: '2s'}}></div>

        <div className="container relative z-10">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="outline" className="border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5" asChild>
              <Link href={`/${lang}/industries`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Industries
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium mb-6 shadow-modern">
                <IconComponent className="w-4 h-4" />
                Industry Focus
              </div>
              
              <h1 className="font-headline text-4xl font-bold sm:text-5xl lg:text-6xl mb-6">
                <span className="text-gradient-primary">{industry.name}</span>
                <br />
                <span className="text-foreground">Solutions</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {overview}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white border-0 shadow-modern hover-lift" asChild>
                  <Link href={`/${lang}/contact`}>
                    Start Your Project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5" asChild>
                  <Link href={`/${lang}/services`}>View Services</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative animate-scale-in">
              <div className="relative">
                <Image
                  src={industry.image}
                  alt={industry.name}
                  data-ai-hint={industry.hint}
                  width={600}
                  height={400}
                  className="rounded-3xl shadow-modern-lg relative z-10"
                />
                
                {/* Decorative Elements */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl opacity-80 animate-pulse-glow"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60 animate-bounce-gentle"></div>
                
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-3xl opacity-20 scale-110"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges & Solutions Section */}
      <section className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Challenges */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 via-orange-600/5 to-yellow-600/5 rounded-3xl"></div>
              <div className="relative p-8 sm:p-12 rounded-3xl border border-border/20 bg-white/50 backdrop-blur-sm">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-orange-600 text-white text-sm font-medium mb-6 shadow-modern">
                  <Target className="w-4 h-4" />
                  Industry Challenges
                </div>
                
                <h3 className="font-headline text-2xl font-bold mb-6">
                  <span className="text-gradient-primary">Common Challenges</span>
                </h3>
                
                <ul className="space-y-4">
                  {challenges.map((challenge, index) => (
                    <li 
                      key={index} 
                      className="flex items-start p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/50 hover-lift group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg flex items-center justify-center mr-3 mt-0.5 group-hover:scale-110 transition-transform">
                        <Target className="h-3 w-3 text-white"/>
                      </div>
                      <span className="text-foreground group-hover:text-primary transition-colors">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Solutions */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 via-emerald-600/5 to-teal-600/5 rounded-3xl"></div>
              <div className="relative p-8 sm:p-12 rounded-3xl border border-border/20 bg-white/50 backdrop-blur-sm">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium mb-6 shadow-modern">
                  <Lightbulb className="w-4 h-4" />
                  Our Solutions
                </div>
                
                <h3 className="font-headline text-2xl font-bold mb-6">
                  <span className="text-gradient-primary">How We Help</span>
                </h3>
                
                <ul className="space-y-4">
                  {solutions.map((solution, index) => (
                    <li 
                      key={index} 
                      className="flex items-start p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/50 hover-lift group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3 mt-0.5 group-hover:scale-110 transition-transform">
                        <CheckCircle className="h-3 w-3 text-white"/>
                      </div>
                      <span className="text-foreground group-hover:text-primary transition-colors">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm font-medium mb-6 shadow-modern">
              <TrendingUp className="w-4 h-4" />
              Business Benefits
            </div>
            <h2 className="font-headline text-3xl font-bold mb-4">
              <span className="text-gradient-primary">Why Choose Our Solutions</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the tangible benefits our {industry.name.toLowerCase()} solutions deliver to your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200/50 hover-lift group text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Award className="h-6 w-6 text-white"/>
                </div>
                <p className="text-foreground font-medium group-hover:text-primary transition-colors">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="py-24">
          <div className="container">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-medium mb-6 shadow-modern">
                <Sparkles className="w-4 h-4" />
                Success Stories
              </div>
              <h2 className="font-headline text-4xl font-bold sm:text-5xl lg:text-6xl mb-6">
                <span className="text-gradient-primary">Featured Projects</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See how we've helped {industry.name.toLowerCase()} businesses transform their operations and achieve remarkable results.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <Card
                  key={project.id}
                  className="group overflow-hidden border-0 shadow-modern hover-lift bg-white/80 backdrop-blur-sm"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <CardHeader className="p-0 relative">
                    <Image
                      src={project.image}
                      alt={project.title}
                      data-ai-hint={project.hint}
                      width={600}
                      height={300}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-primary hover:bg-white">
                        {project.category}
                      </Badge>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-black/20 text-white border-0">
                        {project.duration}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 relative z-10">
                    <CardTitle className="font-headline text-xl leading-tight mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>

                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Client */}
                    <div className="mb-4">
                      <span className="text-sm font-medium text-primary">Client: </span>
                      <span className="text-sm text-muted-foreground">{project.client}</span>
                    </div>

                    {/* Technologies */}
                    <div className="mb-4">
                      <span className="text-sm font-medium text-primary mb-2 block">Technologies:</span>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Results */}
                    <div>
                      <span className="text-sm font-medium text-primary mb-2 block">Key Results:</span>
                      <ul className="space-y-1">
                        {project.results.map((result, resultIndex) => (
                          <li key={resultIndex} className="flex items-start text-sm">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>

                  {/* Bottom Gradient Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
        <div className="container text-center">
          <h2 className="font-headline text-4xl font-bold mb-6">
            <span className="text-gradient-accent">Ready to Transform Your {industry.name} Business?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Let's discuss how our specialized {industry.name.toLowerCase()} solutions can help you overcome challenges and achieve your business goals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 shadow-modern hover-lift" asChild>
              <Link href={`/${lang}/contact`}>
                Start Your Project
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
