/**
 * Image Domain Management Utility
 * Helps automatically handle new image domains
 */

// List of pre-approved safe image domains
export const SAFE_IMAGE_DOMAINS = [
  // Stock photo services
  'images.unsplash.com',
  'unsplash.com',
  'images.pexels.com',
  'cdn.pixabay.com',
  'images.stockfreeimages.com',
  'picsum.photos',
  'via.placeholder.com',
  'dummyimage.com',
  'placehold.co',
  
  // CDN services
  'amazonaws.com',
  'cloudfront.net',
  'googleapis.com',
  'imgur.com',
  'github.com',
  'githubusercontent.com',
  
  // Social media
  'pbs.twimg.com',
  'scontent.xx.fbcdn.net',
  'media.licdn.com',
  
  // Business services
  'images.ctfassets.net',
  'cdn.sanity.io',
  'res.cloudinary.com',
];

/**
 * Extract domain from URL
 */
export function extractDomain(url: string): string | null {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return null;
  }
}

/**
 * Check if domain is safe/allowed
 */
export function isDomainSafe(domain: string): boolean {
  return SAFE_IMAGE_DOMAINS.some(safeDomain => {
    if (safeDomain.includes('*')) {
      // Handle wildcard domains
      const pattern = safeDomain.replace('*', '.*');
      return new RegExp(pattern).test(domain);
    }
    return domain === safeDomain || domain.endsWith('.' + safeDomain);
  });
}

/**
 * Validate image URL and suggest if domain should be added
 */
export function validateImageUrl(url: string): {
  isValid: boolean;
  domain: string | null;
  isSafe: boolean;
  suggestion?: string;
} {
  const domain = extractDomain(url);
  
  if (!domain) {
    return {
      isValid: false,
      domain: null,
      isSafe: false,
      suggestion: 'Invalid URL format'
    };
  }
  
  const isSafe = isDomainSafe(domain);
  
  return {
    isValid: true,
    domain,
    isSafe,
    suggestion: isSafe 
      ? 'Domain is already allowed' 
      : `Add "${domain}" to next.config.ts remotePatterns`
  };
}

/**
 * Generate Next.js config entry for a domain
 */
export function generateConfigEntry(domain: string): object {
  return {
    protocol: 'https',
    hostname: domain,
    port: '',
    pathname: '/**',
  };
}

/**
 * Auto-detect and log domains that need to be added
 * Use this in development to track new domains
 */
export function logImageDomain(url: string): void {
  if (process.env.NODE_ENV === 'development') {
    const validation = validateImageUrl(url);
    
    if (validation.isValid && !validation.isSafe) {
      console.log('🖼️  New image domain detected:', validation.domain);
      console.log('📝 Add to next.config.ts:', JSON.stringify(generateConfigEntry(validation.domain!), null, 2));
    }
  }
}

/**
 * Enhanced Image component that auto-logs new domains
 */
import Image, { ImageProps } from 'next/image';

interface SmartImageProps extends ImageProps {
  autoLog?: boolean;
}

export function SmartImage({ src, autoLog = true, ...props }: SmartImageProps) {
  if (autoLog && typeof src === 'string') {
    logImageDomain(src);
  }
  
  return <Image src={src} {...props} />;
}

/**
 * Fallback image URLs for different use cases
 */
export const FALLBACK_IMAGES = {
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  hero: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop',
  service: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
  blog: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
  client: 'https://via.placeholder.com/200x100/f0f0f0/666666?text=Client+Logo',
  placeholder: 'https://via.placeholder.com/400x300/f0f0f0/666666?text=Image',
};
