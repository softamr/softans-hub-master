import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Users, Award, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Dictionary, Locale } from '@/lib/types';

type AboutSnippetProps = {
  dictionary: Dictionary['homepage']['about'];
  lang: Locale;
};

export function AboutSnippet({ dictionary, lang }: AboutSnippetProps) {
  const stats = [
    { icon: Users, label: "Happy Clients", value: "500+" },
    { icon: Award, label: "Projects Completed", value: "1000+" },
    { icon: Target, label: "Success Rate", value: "99%" },
    { icon: Zap, label: "Years Experience", value: "10+" },
  ];

  return (
    <section className="overflow-hidden py-24 sm:py-32 bg-gradient-to-br from-gray-50 to-white">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-16 gap-y-16 lg:grid-cols-2 items-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-success text-white text-sm font-medium mb-6 shadow-modern">
              <Users className="w-4 h-4" />
              About Us
            </div>

            <h2 className="font-headline text-4xl font-bold sm:text-5xl lg:text-6xl mb-6">
              <span className="text-gradient-primary">
                {dictionary.title.split(' ').slice(0, 2).join(' ')}
              </span>
              <br />
              <span className="text-foreground">
                {dictionary.title.split(' ').slice(2).join(' ')}
              </span>
            </h2>

            <p className="mt-6 text-xl leading-8 text-muted-foreground">
              {dictionary.description}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mt-10">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200/50 hover-lift"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="font-headline text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button
                size="lg"
                className="bg-gradient-primary hover:opacity-90 text-white border-0 shadow-modern hover-lift group"
                asChild
              >
                <Link href={`/${lang}/about`}>
                  {dictionary.cta}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative flex items-center justify-center animate-scale-in">
            <div className="relative">
              {/* Main Image */}
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=600&fit=crop"
                alt="Softans team collaboration and innovation"
                data-ai-hint="diverse team collaboration, modern office, teamwork"
                width={600}
                height={600}
                className="rounded-3xl shadow-modern-lg hover-lift relative z-10 transition-transform duration-700 hover:scale-105"
              />

              {/* Secondary Image - Office Space */}
              <div className="absolute top-8 right-8 w-32 h-24 z-15 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                <Image
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=150&fit=crop"
                  alt="Modern office workspace"
                  data-ai-hint="modern office workspace, professional environment"
                  width={200}
                  height={150}
                  className="rounded-xl shadow-lg hover-lift transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Third Image - Innovation */}
              <div className="absolute bottom-16 left-8 w-28 h-20 z-15 animate-fade-in-up" style={{animationDelay: '1s'}}>
                <Image
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=180&h=120&fit=crop"
                  alt="Innovation and technology"
                  data-ai-hint="innovation, technology, digital transformation"
                  width={180}
                  height={120}
                  className="rounded-lg shadow-lg hover-lift transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Floating Achievement Badge */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-modern z-20 animate-bounce-gentle">
                <div className="text-center">
                  <Award className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
                  <div className="text-xs font-bold text-primary">Award</div>
                  <div className="text-xs text-muted-foreground">Winner</div>
                </div>
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-modern z-20 animate-pulse-glow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-primary">99%</div>
                    <div className="text-xs text-muted-foreground">Success Rate</div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl opacity-80 animate-bounce-gentle"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute top-1/2 -right-12 w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl opacity-70 animate-bounce-gentle" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/4 -left-8 w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-60 animate-pulse" style={{animationDelay: '2s'}}></div>

              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-3xl opacity-20 scale-110"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
