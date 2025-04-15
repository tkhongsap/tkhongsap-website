import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string | any; // Allow both string paths and imported image assets
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: "eager" | "lazy";
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  sizes?: string;
  priority?: boolean;
  fetchPriority?: 'high' | 'low' | 'auto';
  decoding?: 'sync' | 'async' | 'auto';
}

/**
 * OptimizedImage component with SEO best practices:
 * - Always includes alt text for accessibility
 * - Uses lazy loading by default for performance
 * - Supports responsive images with srcset
 * - Implements advanced loading optimizations
 * - Prevents layout shifts with explicit dimensions
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  loading = "lazy",
  objectFit = "cover",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
  fetchPriority = 'auto',
  decoding = 'async',
}: OptimizedImageProps) {
  // For placeholder or SVG images
  if (!src || src === "#" || src.startsWith('#')) {
    return (
      <div 
        className={cn(
          "bg-gray-200 flex items-center justify-center", 
          className
        )}
        style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : '100%' }}
        aria-label={alt}
        role="img"
      >
        <svg className="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect width="24" height="24" fill="none"/>
          <path d="M4 5H20V19H4V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 5L12 13L20 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 19L9 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 19L15 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    );
  }

  // Configuration for priority loading
  const loadingConfig = priority ? { loading: 'eager' as const } : { loading };
  
  // For imported Vite images or other assets, they're already processed and optimized
  // No need for srcSet or sizes attributes in that case
  const isViteImport = typeof src === 'object' || (typeof src === 'string' && src.includes('data:') || src.includes('blob:'));
  
  // Only generate srcSet for string URLs that aren't data: or blob: URLs
  const isStringUrl = typeof src === 'string' && !src.includes('data:') && !src.includes('blob:');
  const isExternalUrl = isStringUrl && (src.startsWith('http://') || src.startsWith('https://'));

  // Generate responsive srcset if width is provided and it's a normal string URL path
  const generateSrcSet = () => {
    if (!width || isViteImport || isExternalUrl) return undefined;
    
    // Check if the image is already a WebP format
    const isWebP = isStringUrl && src.toLowerCase().endsWith('.webp');
    
    // For WebP sources, just use them directly
    if (isWebP) {
      return `${src} ${width}w, ${src} ${Math.floor(width / 2)}w, ${src} ${Math.floor(width / 4)}w`;
    }
    
    // Extract the file extension and base path (for string URLs only)
    if (isStringUrl) {
      const extension = src.split('.').pop() || 'jpg';
      const basePath = src.substring(0, src.lastIndexOf('.'));
      
      // For other formats, try to use the naming convention for responsive images
      return `${basePath}-${width}.${extension} ${width}w, ${basePath}-${Math.floor(width / 2)}.${extension} ${Math.floor(width / 2)}w, ${basePath}-${Math.floor(width / 4)}.${extension} ${Math.floor(width / 4)}w`;
    }
    
    return undefined;
  };

  // Use the src directly, Vite will handle imported images properly
  const imgSrc = src;

  return (
    <img
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      {...loadingConfig}
      decoding={decoding}
      sizes={isExternalUrl ? undefined : sizes}
      srcSet={generateSrcSet()}
      className={cn(className)}
      style={{ objectFit }}
      crossOrigin="anonymous" // Allow cross-origin access
      // Prevent layout shift by setting default dimensions
      onError={(e) => {
        console.error(`Failed to load image: ${imgSrc}`);
        const target = e.target as HTMLImageElement;
        target.onerror = null;
        target.src = 'data:image/svg+xml;charset=utf-8,%3Csvg height=\'150\' width=\'150\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'%23f1f1f1\'/%3E%3C/svg%3E';
      }}
    />
  );
}