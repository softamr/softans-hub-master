import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, Award, Lightbulb, Heart, Shield, Sparkles } from "lucide-react";
import Link from "next/link";

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const stats = [
    { label: "Years of Experience", value: "10+", icon: Award },
    { label: "Happy Clients", value: "500+", icon: Users },
    { label: "Projects Completed", value: "1000+", icon: Target },
    { label: "Team Members", value: "50+", icon: Heart },
  ];

  const values = [
    {
      title: "Innovation",
      description: "We constantly explore new technologies to deliver cutting-edge solutions.",
      icon: Lightbulb,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Integrity",
      description: "We build trust through transparent and ethical practices.",
      icon: Shield,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Excellence",
      description: "We are committed to the highest standards of quality in everything we do.",
      icon: Award,
      color: "from-purple-500 to-pink-500"
    }
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      description: "Visionary leader with 15+ years in tech innovation."
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      description: "Technical expert driving our development excellence."
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      description: "Creative mind behind our user-centered designs."
    },
    {
      name: "David Thompson",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      description: "Full-stack expert with passion for clean code."
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-50/50">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-gentle"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-gentle" style={{animationDelay: '2s'}}></div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium mb-6 shadow-modern">
                <Sparkles className="w-4 h-4" />
                About Our Company
              </div>

              <h1 className="font-headline text-4xl font-bold sm:text-6xl lg:text-7xl mb-6">
                <span className="text-gradient-primary">
                  About Softans
                </span>
              </h1>

              <p className="mt-6 text-xl leading-8 text-muted-foreground">
                Softans was founded with a vision to bridge the gap between business needs and technological capabilities. Our journey began over a decade ago, driven by a passion for innovation and a commitment to excellence.
              </p>

              <p className="mt-4 text-lg text-muted-foreground">
                We believe in building long-term partnerships with our clients, understanding their unique challenges, and delivering tailor-made solutions that drive growth and success.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white border-0 shadow-modern hover-lift" asChild>
                  <Link href={`/${lang}/contact`}>
                    Get In Touch
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5" asChild>
                  <Link href={`/${lang}/services`}>Our Services</Link>
                </Button>
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Modern office team collaboration"
                  data-ai-hint="modern office team collaboration, professional workspace"
                  width={600}
                  height={450}
                  className="rounded-3xl shadow-modern-lg hover-lift relative z-10"
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

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
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

      {/* Values Section */}
      <section className="py-24 sm:py-32">
        <div className="container">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium mb-6 shadow-modern">
              <Heart className="w-4 h-4" />
              Our Core Values
            </div>
            <h2 className="font-headline text-4xl font-bold sm:text-5xl lg:text-6xl mb-6">
              <span className="text-gradient-primary">
                What Drives Us
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our values are the foundation of everything we do, guiding our decisions and shaping our culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className="group relative overflow-hidden border-0 shadow-modern hover-lift bg-white/80 backdrop-blur-sm"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>

                <CardContent className="pt-8 pb-8 relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="font-headline text-2xl font-bold text-center mb-4 group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>

                  <p className="text-muted-foreground text-center leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${value.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture Section */}
      <section className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative animate-scale-in">
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop"
                  alt="Modern office workspace"
                  data-ai-hint="modern office workspace, collaborative environment"
                  width={600}
                  height={400}
                  className="rounded-3xl shadow-modern-lg relative z-10"
                />

                {/* Decorative Elements */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl opacity-80 animate-pulse-glow"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-60 animate-bounce-gentle"></div>

                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-3xl blur-3xl opacity-20 scale-110"></div>
              </div>
            </div>

            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium mb-6 shadow-modern">
                <Heart className="w-4 h-4" />
                Our Culture
              </div>

              <h2 className="font-headline text-4xl font-bold mb-6">
                <span className="text-gradient-primary">Where Innovation</span>
                <br />
                <span className="text-foreground">Meets Collaboration</span>
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Our modern workspace is designed to foster creativity, collaboration, and innovation. We believe that great ideas emerge when talented people work together in an inspiring environment.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                From open collaboration spaces to quiet focus areas, our office reflects our commitment to both teamwork and individual excellence.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/50">
                  <div className="font-headline text-2xl font-bold text-primary mb-1">24/7</div>
                  <div className="text-sm text-muted-foreground">Support Available</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/50">
                  <div className="font-headline text-2xl font-bold text-primary mb-1">100%</div>
                  <div className="text-sm text-muted-foreground">Remote Friendly</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-medium mb-6 shadow-modern">
              <Users className="w-4 h-4" />
              Meet Our Team
            </div>
            <h2 className="font-headline text-4xl font-bold sm:text-5xl lg:text-6xl mb-6">
              <span className="text-gradient-primary">
                The People Behind
              </span>
              <br />
              <span className="text-foreground">
                Our Success
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our diverse team of experts brings together years of experience, creativity, and passion to deliver exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={member.name}
                className="group relative overflow-hidden border-0 shadow-modern hover-lift bg-white/80 backdrop-blur-sm text-center"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <CardContent className="pt-8 pb-8 relative z-10">
                  <div className="relative mb-6">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={120}
                      height={120}
                      className="rounded-full mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300"
                    />

                    {/* Decorative ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110"></div>
                  </div>

                  <h3 className="font-headline text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>

                  <p className="text-primary font-medium mb-3">
                    {member.role}
                  </p>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Gallery Section */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm font-medium mb-6 shadow-modern">
              <Sparkles className="w-4 h-4" />
              Our Workspace
            </div>
            <h2 className="font-headline text-3xl font-bold mb-4">
              <span className="text-gradient-primary">A Glimpse Into Our World</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Take a look at our modern workspace where innovation happens every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative group overflow-hidden rounded-2xl shadow-modern hover-lift">
              <Image
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop"
                alt="Modern office space"
                data-ai-hint="modern office space, open workspace"
                width={400}
                height={300}
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-semibold">Open Workspace</h3>
                <p className="text-sm">Collaborative environment</p>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-2xl shadow-modern hover-lift">
              <Image
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop"
                alt="Meeting room"
                data-ai-hint="modern meeting room, conference space"
                width={400}
                height={300}
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-semibold">Meeting Rooms</h3>
                <p className="text-sm">Strategic planning spaces</p>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-2xl shadow-modern hover-lift">
              <Image
                src="https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=400&h=300&fit=crop"
                alt="Creative workspace"
                data-ai-hint="creative workspace, design area"
                width={400}
                height={300}
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-semibold">Creative Zone</h3>
                <p className="text-sm">Innovation hub</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-headline text-4xl font-bold mb-8">
                <span className="text-gradient-accent">Our Mission & Vision</span>
              </h2>

              <div className="space-y-8">
                <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <h3 className="font-headline text-2xl font-bold mb-4 flex items-center">
                    <Target className="w-6 h-6 mr-3 text-blue-300" />
                    Mission
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    To empower businesses through transformative digital solutions that drive growth, efficiency, and innovation in an ever-evolving technological landscape.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <h3 className="font-headline text-2xl font-bold mb-4 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-3 text-purple-300" />
                    Vision
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    To be a global leader in software development, recognized for our quality, reliability, and customer-centric approach to solving complex business challenges.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Team collaboration and innovation"
                  data-ai-hint="team collaboration, innovation, modern workspace"
                  width={600}
                  height={400}
                  className="rounded-3xl shadow-modern-lg"
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl opacity-60 animate-bounce-gentle"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-40 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-white to-gray-50/50">
        <div className="container text-center">
          <h2 className="font-headline text-4xl font-bold mb-6">
            <span className="text-gradient-primary">Ready to Work Together?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Let's discuss how we can help transform your business with innovative digital solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white border-0 shadow-modern hover-lift" asChild>
              <Link href={`/${lang}/contact`}>
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5" asChild>
              <Link href={`/${lang}/services`}>View Our Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
