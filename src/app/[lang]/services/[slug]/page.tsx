import Image from "next/image";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Sparkles, Target, Award, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/lib/types";
import { getServiceBySlug } from "@/lib/services";


export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string, lang: Locale }> }) {
  const { slug, lang } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Ensure projects is an array, even if undefined in Firestore
  const projects = service.projects || [];

  return (
    <div className="bg-gradient-to-b from-white to-gray-50/50">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-gentle"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-gentle" style={{animationDelay: '2s'}}></div>

        <div className="container relative z-10">
          <header className="text-center mb-20">
            {/* Back Button */}
            <div className="flex justify-center mb-8">
              <Button variant="outline" className="border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5" asChild>
                <Link href={`/${lang}/services`}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Services
                </Link>
              </Button>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium mb-6 shadow-modern">
              <Sparkles className="w-4 h-4" />
              Service Details
            </div>

            <h1 className="font-headline text-4xl font-bold sm:text-6xl lg:text-7xl mb-6">
              <span className="text-gradient-primary">{service.title}</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {service.description}
            </p>
          </header>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-24 sm:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="relative animate-scale-in">
              <div className="relative">
                <Image
                  src={service.image}
                  alt={service.title}
                  data-ai-hint={service.hint}
                  width={1200}
                  height={675}
                  className="rounded-3xl shadow-modern-lg hover-lift relative z-10"
                />

                {/* Decorative Elements */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl opacity-80 animate-pulse-glow"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60 animate-bounce-gentle"></div>

                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-3xl opacity-20 scale-110"></div>
              </div>
            </div>

            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium mb-6 shadow-modern">
                <Target className="w-4 h-4" />
                Service Overview
              </div>

              <h2 className="font-headline text-3xl font-bold mb-6">
                <span className="text-gradient-primary">Why Choose This Service?</span>
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Our {service.title.toLowerCase()} service is designed to deliver exceptional results through proven methodologies, cutting-edge technology, and expert implementation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white border-0 shadow-modern hover-lift" asChild>
                  <Link href={`/${lang}/contact`}>
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5" asChild>
                  <Link href={`/${lang}/contact`}>Request Quote</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5 rounded-3xl"></div>
            <div className="relative p-8 sm:p-12 rounded-3xl border border-border/20 bg-white/50 backdrop-blur-sm">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm font-medium mb-6 shadow-modern">
                  <Award className="w-4 h-4" />
                  Key Features
                </div>
                <h3 className="font-headline text-3xl font-bold mb-4">
                  <span className="text-gradient-primary">What's Included</span>
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our comprehensive approach ensures you get the most value from our {service.title.toLowerCase()} service.
                </p>
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.features.map((feature, index) => (
                  <li
                    key={feature}
                    className="flex items-start p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/50 hover-lift group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <CheckCircle className="h-4 w-4 text-white"/>
                    </div>
                    <span className="text-foreground font-medium group-hover:text-primary transition-colors">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects Section */}
      {projects.length > 0 && (
        <section className="py-24 bg-gradient-to-b from-gray-50/50 to-white">
          <div className="container">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-medium mb-6 shadow-modern">
                <Award className="w-4 h-4" />
                Success Stories
              </div>
              <h2 className="font-headline text-4xl font-bold sm:text-5xl lg:text-6xl mb-6">
                <span className="text-gradient-primary">Related Projects</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See our expertise in action. Here are some projects we've delivered in this area.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <Card
                  key={project.title}
                  className="group overflow-hidden border-0 shadow-modern hover-lift bg-white/80 backdrop-blur-sm"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardHeader className="p-0 relative">
                    <Image
                      src={project.image}
                      alt={project.title}
                      data-ai-hint={project.hint}
                      width={600}
                      height={400}
                      className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-primary hover:bg-white">
                        {project.category}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 flex-grow">
                    <CardTitle className="font-headline text-2xl leading-tight mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>
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
            <span className="text-gradient-accent">Ready to Get Started?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Let's discuss how our {service.title.toLowerCase()} service can help transform your business.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 shadow-modern hover-lift" asChild>
              <Link href={`/${lang}/contact`}>
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10" asChild>
              <Link href={`/${lang}/services`}>View All Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
