import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Article } from "@/data/articles";
import OptimizedImage from "./optimized-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ArticleCardProps {
  article: Article;
  className?: string;
  onCategoryClick?: (category: string) => void;
}

export default function ArticleCard({ article, className, onCategoryClick }: ArticleCardProps) {
  // Function to attempt to extract Medium article ID from URL
  const getMediumImageUrl = (url: string): string => {
    try {
      // Try to extract article ID from URL
      const urlPath = new URL(url).pathname;
      const segments = urlPath.split('/');
      const lastSegment = segments[segments.length - 1];
      
      // Check if last segment has a hyphen and at least 12 chars (likely an ID)
      if (lastSegment && lastSegment.includes('-') && lastSegment.length >= 12) {
        return `https://miro.medium.com/v2/resize:fit:1200/1*-IMtZtcUK-QuVa1ypGCJbg.jpeg`;
      }
    } catch (e) {
      // If URL parsing fails, just use the default image
    }
    
    // Fallback based on category
    if (article.categories.includes('AI')) {
      return "https://miro.medium.com/v2/resize:fit:1200/1*wQTLVXmPIJZ1x1oDYqfXYg.jpeg";
    } else if (article.categories.includes('Coding')) {
      return "https://miro.medium.com/v2/resize:fit:1200/1*jfdwtvU6V6g99q3G7gq7dQ.jpeg";
    } else if (article.categories.includes('Well-being')) {
      return "https://miro.medium.com/v2/resize:fit:1200/1*wdB6-KF8GlhGNhMOvH0Kew.jpeg";
    } else if (article.categories.includes('Podcast')) {
      return "https://miro.medium.com/v2/resize:fit:1200/1*vXWVmfL4yGtaOZXzemVfuQ.jpeg";
    } else {
      return "https://miro.medium.com/v2/resize:fit:1200/1*T-w_k1OsJJ14Q-N_iXQpOw.jpeg";
    }
  };

  // Use Medium's default image format or fallback to the category-based one
  const imageUrl = getMediumImageUrl(article.url);

  return (
    <div className={cn(
      "border border-gray-200 rounded-lg overflow-hidden group",
      "hover:shadow-lg transition-all duration-200", 
      "dark:border-gray-700 bg-white dark:bg-gray-800",
      className
    )}>
      {/* Card Layout - Horizontal on desktop, vertical on mobile */}
      <div className="flex flex-col md:flex-row h-full">
        {/* Featured Image - Left side on desktop, top on mobile */}
        <div className="w-full md:w-1/3 h-48 md:h-auto overflow-hidden">
          <OptimizedImage 
            src={imageUrl} 
            alt={`Featured image for article: ${article.title}`}
            height={300}
            width={400}
            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
            loading="lazy"
            objectFit="cover"
          />
        </div>
        
        {/* Content - Right side on desktop, bottom on mobile */}
        <div className="flex flex-col flex-grow p-6">
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <Badge variant="outline" className="text-xs font-medium">
              {article.platform}
            </Badge>
            
            <div className="flex items-center text-gray-500 text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              {article.date}
            </div>
            
            {article.readingTime && (
              <div className="flex items-center text-gray-500 text-xs">
                <Clock className="h-3 w-3 mr-1" />
                {article.readingTime}
              </div>
            )}
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
            <a 
              href={article.url} 
              target="_blank"
              rel="noopener noreferrer"
              className="focus:outline-none focus:underline"
            >
              {article.title}
            </a>
          </h3>
          
          {/* Executive Summary */}
          <div className="mb-4 flex-grow">
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
              {article.summary}
            </p>
          </div>
          
          {/* Categories */}
          {article.categories && article.categories.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 items-center">
                <Tag className="h-3 w-3 text-gray-500" />
                {article.categories.map((category, idx) => (
                  <Badge 
                    key={`${article.id}-category-${idx}`}
                    variant="secondary"
                    className="text-xs cursor-pointer hover:bg-primary hover:text-white transition-colors"
                    onClick={() => onCategoryClick && onCategoryClick(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* CTA */}
          <div className="mt-auto pt-2">
            <Button variant="outline" size="sm" className="w-full md:w-auto group/button" asChild>
              <a 
                href={article.url} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read full article: ${article.title}`}
                className="hover:no-underline"
              >
                Read Full Article on {article.platform}
                <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover/button:translate-x-1" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
