import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Quote, Heart, Users, Award, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const clients = [
  {
    name: 'Innovate Corp',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=60&fit=crop',
    hint: 'tech company logo',
    testimonial: 'Softans delivered a game-changing ERP system that revolutionized our workflow. Their team is professional, responsive, and truly understood our needs.',
    author: 'Jane Doe, CEO',
    authorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    industry: 'Technology'
  },
  {
    name: 'Global Solutions',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=60&fit=crop',
    hint: 'startup logo',
    testimonial: 'The website Softans built for us is not only beautiful but also incredibly functional. Our online engagement has skyrocketed since launch.',
    author: 'John Smith, Marketing Director',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    industry: 'Marketing'
  },
  {
    name: 'Quantum Logistics',
    logo: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=200&h=60&fit=crop',
    hint: 'logistics company logo',
    testimonial: "Working with Softans was a seamless experience. They are experts in their field and delivered results that exceeded our expectations.",
    author: 'Emily White, COO',
    authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    industry: 'Logistics'
  },
  {
    name: 'Apex Industries',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=60&fit=crop',
    hint: 'industrial company logo',
    testimonial: "Their attention to detail and commitment to quality is unparalleled. We highly recommend Softans for any software development project.",
    author: 'Michael Brown, CTO',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    industry: 'Manufacturing'
  },
];

const stats = [
  { label: "Happy Clients", value: "500+", icon: Users },
  { label: "Success Rate", value: "99%", icon: Award },
  { label: "Average Rating", value: "4.9/5", icon: Star },
  { label: "Years Experience", value: "10+", icon: Heart },
];

export default async function ClientsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
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
              <Heart className="w-4 h-4" />
              Client Success Stories
            </div>

            <h1 className="font-headline text-4xl font-bold sm:text-6xl lg:text-7xl mb-6">
              <span className="text-gradient-primary">
                Our Valued
              </span>
              <br />
              <span className="text-foreground">
                Clients
              </span>
            </h1>

            <p className="mt-6 max-w-4xl mx-auto text-xl text-muted-foreground leading-relaxed">
              We are proud to have partnered with a diverse range of businesses, from innovative startups to established industry leaders. Here's what some of them have to say.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200/50 hover-lift"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <div className="font-headline text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 sm:py-32">
        <div className="container">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium mb-6 shadow-modern">
              <Quote className="w-4 h-4" />
              Client Testimonials
            </div>
            <h2 className="font-headline text-4xl font-bold sm:text-5xl lg:text-6xl mb-6">
              <span className="text-gradient-primary">What Our Clients Say</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say about working with us.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {clients.map((client, index) => (
              <Card
                key={client.name}
                className="group relative overflow-hidden border-0 shadow-modern hover-lift bg-white/80 backdrop-blur-sm"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <Image
                      className="max-h-12 w-40 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      src={client.logo}
                      alt={client.name}
                      data-ai-hint={client.hint}
                      width={200}
                      height={60}
                    />
                    <div className="flex items-center gap-1">
                      {[...Array(client.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-primary text-xs font-medium">
                    <Sparkles className="w-3 h-3" />
                    {client.industry}
                  </div>
                </CardHeader>

                <CardContent className="flex-grow relative z-10">
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
                    <blockquote className="text-lg text-foreground leading-relaxed pl-6">
                      "{client.testimonial}"
                    </blockquote>
                  </div>
                </CardContent>

                <CardFooter className="relative z-10">
                  <div className="flex items-center w-full">
                    <Avatar className="w-12 h-12 border-2 border-primary/20">
                      <AvatarImage src={client.authorImage} alt={client.author} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">
                        {client.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4 flex-grow">
                      <p className="font-semibold text-primary">{client.author.split(',')[0]}</p>
                      <p className="text-sm text-muted-foreground">{client.author.split(', ')[1]}</p>
                      <p className="text-xs text-muted-foreground">{client.name}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{client.rating}.0</div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                  </div>
                </CardFooter>

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
            <span className="text-gradient-accent">Join Our Success Stories</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Ready to become our next success story? Let's discuss how we can help transform your business.
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
