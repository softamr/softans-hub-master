import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Calendar, User, Clock, Share2, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string; lang: string }> }) {
  const { slug, lang } = await params;
  // In a real app, you would fetch post data based on the slug
  const post = {
    slug: "digital-transformation-trends",
    title: "Top 5 Digital Transformation Trends to Watch in 2024",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop",
    hint: "futuristic interface, digital transformation",
    category: "Technology",
    date: "July 15, 2024",
    author: "Sarah Johnson",
    authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    readTime: "5 min read",
    tags: ["Digital Transformation", "AI", "Automation", "Technology"],
    content: `
      <p>The business world is in a constant state of flux, driven by rapid technological advancements. To remain competitive, organizations must not only adapt but proactively embrace digital transformation. This article delves into the five most significant trends shaping the industry in 2024 and beyond.</p>
      
      <h3 class="font-headline text-2xl font-bold mt-8 mb-4 text-primary">1. Artificial Intelligence and Machine Learning</h3>
      <p>AI is no longer a futuristic concept; it's a present-day reality revolutionizing everything from customer service with intelligent chatbots to data analysis with predictive modeling. Machine learning algorithms are becoming increasingly sophisticated, enabling businesses to automate complex processes, personalize customer experiences, and uncover insights that were previously hidden in vast datasets.</p>

      <h3 class="font-headline text-2xl font-bold mt-8 mb-4 text-primary">2. Hyper-automation</h3>
      <p>Hyper-automation takes automation to the next level by combining AI, machine learning, and robotic process automation (RPA) to automate as many business processes as possible. This approach aims to create a highly efficient, agile, and data-driven organization. By automating repetitive tasks, employees can focus on more strategic, high-value work, driving innovation and productivity.</p>
      
      <h3 class="font-headline text-2xl font-bold mt-8 mb-4 text-primary">3. The Rise of the Composable Enterprise</h3>
      <p>Monolithic, one-size-fits-all software systems are becoming a thing of the past. The composable enterprise is a business built from interchangeable building blocks. This modular approach allows organizations to be more agile, adaptable, and resilient. By leveraging APIs and microservices, businesses can assemble and reassemble capabilities to respond quickly to market changes and customer demands.</p>

      <h3 class="font-headline text-2xl font-bold mt-8 mb-4 text-primary">4. Total Experience (TX)</h3>
      <p>Total Experience is a strategy that connects customer experience (CX), employee experience (EX), user experience (UX), and multiexperience (MX). The goal is to create a shared, holistic experience that improves satisfaction, loyalty, and advocacy across all stakeholders. By breaking down silos and focusing on the entire journey, businesses can create seamless and consistent interactions that build lasting relationships.</p>

      <h3 class="font-headline text-2xl font-bold mt-8 mb-4 text-primary">5. Cybersecurity Mesh</h3>
      <p>As businesses become more distributed, with employees and data located everywhere, traditional security perimeters are no longer effective. A cybersecurity mesh is a flexible, composable architecture that integrates widely distributed and disparate security services. It enables a more modular, responsive security approach by centralizing policy orchestration and distributing policy enforcement, ensuring that every device and user has a secure access point to the network.</p>
      
      <p class="mt-8">Embracing these trends is not just about adopting new technology; it's about fostering a culture of continuous innovation and adaptability. The organizations that successfully navigate this digital transformation will be the leaders of tomorrow.</p>
    `,
  };

  const relatedPosts = [
    {
      title: "How to Choose the Right ERP System",
      slug: "choosing-the-right-erp",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
      category: "ERP"
    },
    {
      title: "Effective Web Design Principles",
      slug: "effective-web-design",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=300&h=200&fit=crop",
      category: "Web Design"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-50/50">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-gentle"></div>

        <div className="container relative z-10">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="outline" className="border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5" asChild>
              <Link href={`/${lang}/blog`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>

          <article className="max-w-4xl mx-auto">
            <header className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium mb-6 shadow-modern">
                <BookOpen className="w-4 h-4" />
                {post.category}
              </div>

              <h1 className="font-headline text-4xl font-bold sm:text-5xl lg:text-6xl mb-8">
                <span className="text-gradient-primary">{post.title}</span>
              </h1>

              {/* Author Info */}
              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 border-2 border-primary/20">
                    <AvatarImage src={post.authorImage} alt={post.author} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">
                      {post.author.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="font-semibold text-primary">{post.author}</p>
                    <p className="text-sm text-muted-foreground">Author</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-white/60 text-primary">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Share Button */}
              <Button variant="outline" size="sm" className="border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5">
                <Share2 className="w-4 h-4 mr-2" />
                Share Article
              </Button>
            </header>

            {/* Featured Image */}
            <div className="relative mb-16">
              <div className="relative">
                <Image
                  src={post.image}
                  alt={post.title}
                  data-ai-hint={post.hint}
                  width={1200}
                  height={600}
                  className="w-full rounded-3xl shadow-modern-lg relative z-10"
                />

                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl opacity-60 animate-pulse-glow"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-40 animate-bounce-gentle"></div>

                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-3xl opacity-20 scale-110"></div>
              </div>
            </div>

            {/* Article Content */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5 rounded-3xl"></div>
              <div className="relative p-8 sm:p-12 rounded-3xl border border-border/20 bg-white/80 backdrop-blur-sm">
                <div
                  className="prose prose-xl max-w-none prose-p:text-muted-foreground prose-headings:text-primary prose-headings:font-headline prose-h3:text-2xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-4 prose-p:leading-relaxed prose-p:mb-6"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-24 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium mb-6 shadow-modern">
              <Sparkles className="w-4 h-4" />
              More Articles
            </div>
            <h2 className="font-headline text-3xl font-bold mb-4">
              <span className="text-gradient-primary">Related Posts</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Continue reading with these related articles from our blog.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {relatedPosts.map((relatedPost, index) => (
              <div
                key={relatedPost.slug}
                className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-border/20 shadow-modern hover-lift"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative">
                  <Image
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-primary">
                      {relatedPost.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-headline text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                    <Link href={`/${lang}/blog/${relatedPost.slug}`}>
                      {relatedPost.title}
                    </Link>
                  </h3>

                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 p-0 h-auto" asChild>
                    <Link href={`/${lang}/blog/${relatedPost.slug}`}>
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {/* Bottom Gradient Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
        <div className="container text-center">
          <h2 className="font-headline text-4xl font-bold mb-6">
            <span className="text-gradient-accent">Ready to Transform Your Business?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Let's discuss how we can help implement these digital transformation strategies in your organization.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 shadow-modern hover-lift" asChild>
              <Link href={`/${lang}/contact`}>
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10" asChild>
              <Link href={`/${lang}/services`}>Our Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
