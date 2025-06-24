import Link from 'next/link';
import { Twitter, Linkedin, Facebook, Phone, Mail, MapPin, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import type { Dictionary, Locale } from '@/lib/types';
import { Button } from '../ui/button';
import { getFooterContent } from '@/lib/page-content';

type FooterProps = {
  dictionary: Dictionary;
  lang: Locale;
};

type SocialLink = {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color: string;
};

export async function Footer({ dictionary, lang }: FooterProps) {
  const footerContent = await getFooterContent();
  const footerDict = footerContent?.[lang] ?? dictionary.footer;

  const navLinks = [
    { href: `/${lang}/services`, label: dictionary.header?.nav?.services || 'Services' },
    { href: `/${lang}/clients`, label: dictionary.header?.nav?.clients || 'Clients' },
    { href: `/${lang}/about`, label: dictionary.header?.nav?.about || 'About' },
    { href: `/${lang}/blog`, label: dictionary.header?.nav?.blog || 'Blog' },
    { href: `/${lang}/contact`, label: dictionary.header?.nav?.contact || 'Contact' },
  ];

  const socialLinks: SocialLink[] = [
    { href: '#', icon: Twitter, label: 'Twitter', color: 'hover:text-blue-400' },
    { href: '#', icon: Facebook, label: 'Facebook', color: 'hover:text-blue-600' },
    { href: '#', icon: Linkedin, label: 'LinkedIn', color: 'hover:text-blue-700' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
      <div 
        className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"
      ></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-10 animate-bounce-gentle"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl opacity-10 animate-pulse"></div>

      <div className="container relative z-10 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              
              <span className="font-headline font-bold text-2xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Softans
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              {footerDict?.description || 'Your trusted partner in digital transformation and software solutions.'}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <Button 
                  key={social.label} 
                  variant="ghost" 
                  size="icon" 
                  className={`bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover-lift ${social.color}`}
                  asChild
                >
                  <Link href={social.href} target="_blank" rel="noopener noreferrer">
                    <social.icon className="h-5 w-5" />
                    <span className="sr-only">{social.label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="font-headline font-semibold text-xl text-white mb-6 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-blue-400" />
              {footerDict?.quickLinks || 'Quick Links'}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 group flex items-center"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h3 className="font-headline font-semibold text-xl text-white mb-6 flex items-center">
              <Phone className="w-5 h-5 mr-2 text-green-400" />
              {footerDict?.contactInfo || 'Contact Info'}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start group">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">{'Address'}</div>
                  <div className="text-gray-300 text-sm">{footerDict?.address || '123 Business Street, City, Country'}</div>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">{'Email'}</div>
                  <Link 
                    href={`mailto:${footerDict?.email || 'info@softans.com'}`} 
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {footerDict?.email || 'info@softans.com'}
                  </Link>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">{'Phone'}</div>
                  <Link 
                    href={`tel:${(footerDict?.phone || '+1234567890').replace(/\s/g, '')}`} 
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {footerDict?.phone || '+1 (234) 567-890'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm flex items-center">
              &copy; {new Date().getFullYear()} Softans. {footerDict?.rights || 'All rights reserved.'}
            </p>
            <p className="text-gray-400 text-sm flex items-center mt-4 md:mt-0">
              {'Made with'} <Heart className="w-4 h-4 mx-1 text-red-400" /> {'by Softans Team'}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" fill="url(#footer-gradient)"/>
          <defs>
            <linearGradient id="footer-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="50%" stopColor="#764ba2" />
              <stop offset="100%" stopColor="#f093fb" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </footer>
  );
}