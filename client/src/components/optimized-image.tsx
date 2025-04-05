import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: "eager" | "lazy";
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

/**
 * OptimizedImage component with SEO best practices:
 * - Always includes alt text for accessibility
 * - Uses lazy loading by default for performance
 * - Supports common image attributes
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  loading = "lazy",
  objectFit = "cover",
}: OptimizedImageProps) {
  // For placeholder or SVG images
  if (src.startsWith('#')) {
    return (
      <div 
        className={cn(
          "bg-gray-200 flex items-center justify-center", 
          className
        )}
        style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : '100%' }}
        aria-label={alt}
      >
        <svg className="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" fill="none"/>
          <path d="M4 5H20V19H4V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 5L12 13L20 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 19L9 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 19L15 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      className={cn(className)}
      style={{ objectFit }}
      // Prevent layout shift by setting default dimensions
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null;
        target.src = 'data:image/svg+xml;charset=utf-8,%3Csvg height=\'150\' width=\'150\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'%23f1f1f1\'/%3E%3C/svg%3E';
      }}
    />
  );
}