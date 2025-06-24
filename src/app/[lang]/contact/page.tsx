import { ContactForm } from "@/components/contact-form";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/types";
import { Mail, Phone, MapPin, MessageSquare, Clock, Users, Sparkles, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default async function ContactPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const contactDict = dictionary.contactPage;
  const footerDict = dictionary.footer;

  const contactDetails = [
    {
      icon: MapPin,
      text: footerDict.address || "123 Business Street, City, Country",
      label: "Visit Our Office",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Mail,
      text: footerDict.email || "info@softans.com",
      href: `mailto:${footerDict.email || "info@softans.com"}`,
      label: "Email Us",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Phone,
      text: footerDict.phone || "+1 (234) 567-890",
      href: `tel:${(footerDict.phone || "+1234567890").replace(/\s/g, '')}`,
      label: "Call Us",
      color: "from-purple-500 to-pink-500"
    },
  ];

  const features = [
    { icon: MessageSquare, title: "Quick Response", description: "We respond to all inquiries within 24 hours" },
    { icon: Clock, title: "Flexible Schedule", description: "Available for meetings at your convenience" },
    { icon: Users, title: "Expert Team", description: "Direct access to our experienced professionals" },
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
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium mb-6 shadow-modern">
              <Send className="w-4 h-4" />
              Get In Touch
            </div>

            <h1 className="font-headline text-4xl font-bold sm:text-6xl lg:text-7xl mb-6">
              <span className="text-gradient-primary">
                {contactDict.title || "Contact Us"}
              </span>
            </h1>

            <p className="mt-6 max-w-4xl mx-auto text-xl text-muted-foreground leading-relaxed">
              {contactDict.subtitle || "Ready to start your next project? Get in touch with our team and let's discuss how we can help transform your business."}
            </p>

            {/* Quick Features */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {features.map((feature, index) => (
                <div key={feature.title} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <feature.icon className="w-4 h-4 text-blue-600" />
                  {feature.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Main Content Section */}
      <section className="py-24 sm:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5 rounded-3xl"></div>
              <div className="relative p-8 sm:p-12 rounded-3xl border border-border/20 bg-white/80 backdrop-blur-sm shadow-modern">
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium mb-6 shadow-modern">
                    <MessageSquare className="w-4 h-4" />
                    Send Message
                  </div>
                  <h2 className="font-headline text-3xl font-bold mb-4">
                    <span className="text-gradient-primary">Let's Start a Conversation</span>
                  </h2>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>

                <ContactForm dictionary={contactDict.form} serviceOptions={contactDict.serviceOptions} />
              </div>
            </div>

            {/* Contact Information */}
            <div className="flex flex-col justify-center">
              <div className="mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm font-medium mb-6 shadow-modern">
                  <Sparkles className="w-4 h-4" />
                  Contact Information
                </div>
                <h2 className="font-headline text-3xl font-bold mb-4">
                  <span className="text-gradient-primary">Get In Touch</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Find us at our office or get in touch via email or phone. We look forward to hearing from you and discussing your project.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6 mb-12">
                {contactDetails.map((detail, index) => (
                  <Card
                    key={detail.text}
                    className="group border-0 shadow-modern hover-lift bg-white/60 backdrop-blur-sm"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${detail.color} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shadow-lg`}>
                          <detail.icon className="h-6 w-6 text-white"/>
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-semibold text-primary mb-1">{detail.label}</h3>
                          {detail.href ? (
                            <a
                              href={detail.href}
                              className="text-lg text-foreground hover:text-primary transition-colors group-hover:translate-x-1 transform duration-300"
                            >
                              {detail.text}
                            </a>
                          ) : (
                            <p className="text-lg text-foreground">{detail.text}</p>
                          )}
                        </div>
                        {detail.href && (
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h3 className="font-headline text-xl font-bold text-primary mb-4">Why Choose Us?</h3>
                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className="flex items-start p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/50 hover-lift group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="h-4 w-4 text-white"/>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
        <div className="container text-center">
          <h2 className="font-headline text-4xl font-bold mb-6">
            <span className="text-gradient-accent">Ready to Start Your Project?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Don't wait any longer. Let's discuss your ideas and turn them into reality.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 shadow-modern hover-lift" asChild>
              <Link href={`/${lang}/services`}>
                View Our Services
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
