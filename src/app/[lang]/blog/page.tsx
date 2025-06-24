import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, BookOpen, Sparkles, TrendingUp } from "lucide-react";
import type { Locale } from "@/lib/types";

const blogPosts = [
  {
    slug: "digital-transformation-trends",
    title: "Top 5 Digital Transformation Trends to Watch in 2024",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
    hint: "business meeting, digital transformation",
    category: "Technology",
    date: "July 15, 2024",
    author: "Sarah Johnson",
    readTime: "5 min read",
    excerpt: "The digital landscape is constantly evolving. Stay ahead of the curve by understanding the key trends shaping the future of business, from AI integration to hyper-automation.",
    featured: true
  },
  {
    slug: "choosing-the-right-erp",
    title: "How to Choose the Right ERP System for Your Business",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    hint: "data analytics, business software",
    category: "ERP",
    date: "June 28, 2024",
    author: "Michael Chen",
    readTime: "8 min read",
    excerpt: "Selecting an ERP is a critical decision. This guide breaks down the essential factors to consider, ensuring you invest in a system that aligns with your goals and scales with your growth.",
    featured: false
  },
  {
    slug: "effective-web-design",
    title: "The Principles of Effective Web Design for User Engagement",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
    hint: "website design, user interface",
    category: "Web Design",
    date: "June 10, 2024",
    author: "Emily Rodriguez",
    readTime: "6 min read",
    excerpt: "A great website goes beyond aesthetics. Discover the core principles of UI/UX design that create intuitive, engaging, and high-converting online experiences for your visitors.",
    featured: false
  },
];

const categories = ["All", "Technology", "ERP", "Web Design", "Business"];

export default async function BlogPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

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
              <BookOpen className="w-4 h-4" />
              Latest Insights
            </div>

            <h1 className="font-headline text-4xl font-bold sm:text-6xl lg:text-7xl mb-6">
              <span className="text-gradient-primary">
                Our Blog
              </span>
            </h1>

            <p className="mt-6 max-w-4xl mx-auto text-xl text-muted-foreground leading-relaxed">
              Insights, news, and articles on technology, business, and innovation from the Softans team. Stay updated with the latest trends and best practices.
            </p>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {categories.map((category, index) => (
                <Button
                  key={category}
                  variant={index === 0 ? "default" : "outline"}
                  size="sm"
                  className={index === 0 ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white border-0" : "border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-medium mb-6 shadow-modern">
                <TrendingUp className="w-4 h-4" />
                Featured Article
              </div>
              <h2 className="font-headline text-3xl font-bold mb-4">
                <span className="text-gradient-primary">Editor's Pick</span>
              </h2>
            </div>

            <Card className="group overflow-hidden border-0 shadow-modern-lg hover-lift bg-white/80 backdrop-blur-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative overflow-hidden">
                  <Link href={`/${lang}/blog/${featuredPost.slug}`}>
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      data-ai-hint={featuredPost.hint}
                      width={600}
                      height={400}
                      className="w-full h-64 lg:h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </Link>

                  {/* Featured Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0">
                      Featured
                    </Badge>
                  </div>
                </div>

                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <Badge variant="secondary" className="mb-4 w-fit">{featuredPost.category}</Badge>

                  <h3 className="font-headline text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                    <Link href={`/${lang}/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h3>

                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {featuredPost.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                  </div>

                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white border-0 shadow-modern hover-lift w-fit" asChild>
                    <Link href={`/${lang}/blog/${featuredPost.slug}`}>
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-headline text-3xl font-bold mb-4">
              <span className="text-gradient-primary">Latest Articles</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our latest insights and stay updated with industry trends.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <Card
                key={post.slug}
                className="group flex flex-col overflow-hidden border-0 shadow-modern hover-lift bg-white/80 backdrop-blur-sm"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader className="p-0 relative">
                  <Link href={`/${lang}/blog/${post.slug}`}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      data-ai-hint={post.hint}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </Link>

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-primary hover:bg-white">
                      {post.category}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-6 flex-grow">
                  <CardTitle className="font-headline text-xl leading-tight mb-3 group-hover:text-primary transition-colors">
                    <Link href={`/${lang}/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>

                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0 flex justify-between items-center">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 p-0 h-auto" asChild>
                    <Link href={`/${lang}/blog/${post.slug}`}>
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>

                {/* Bottom Gradient Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
        <div className="container text-center">
          <h2 className="font-headline text-4xl font-bold mb-6">
            <span className="text-gradient-accent">Stay Updated</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss our latest articles and insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <Button className="bg-white text-gray-900 hover:bg-gray-100 shadow-modern">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
