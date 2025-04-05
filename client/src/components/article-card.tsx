import { ArrowRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Article } from "@/data/articles";
import OptimizedImage from "./optimized-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ArticleCardProps {
  article: Article;
  className?: string;
}

export default function ArticleCard({ article, className }: ArticleCardProps) {
  // Determine the platform (Medium or LinkedIn) for displaying badge
  const platform = article.url.includes('medium.com') ? 'Medium' : 
                  article.url.includes('linkedin.com') ? 'LinkedIn' : 'External';
  
  return (
    <div className={cn(
      "border-b border-gray-200 pb-12 last:border-0 group",
      "hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-900 p-6 -mx-6 rounded-lg transition-all duration-300", 
      className
    )}>
      <div className="md:flex md:gap-6">
        {/* Featured Image */}
        {article.imageUrl && (
          <div className="mb-6 md:mb-0 md:w-1/3 overflow-hidden rounded-lg">
            <OptimizedImage 
              src={article.imageUrl} 
              alt={`Image for article: ${article.title}`}
              height={240}
              width={400}
              className="w-full h-48 md:h-full object-cover transition-transform group-hover:scale-105 duration-500"
              loading="lazy"
              objectFit="cover"
            />
          </div>
        )}
        
        {/* Content */}
        <div className={cn(
          "flex flex-col",
          article.imageUrl ? "md:w-2/3" : "w-full"
        )}>
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="outline" className="text-xs">
              {platform}
            </Badge>
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              {article.date}
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
            <a 
              href={article.url} 
              target="_blank"
              rel="noopener noreferrer"
              className="focus:outline-none focus:underline"
            >
              {article.title}
            </a>
          </h3>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 flex-grow">
            {article.excerpt}
          </p>
          
          <div className="mt-auto pt-2">
            <Button variant="ghost" size="sm" className="group/button" asChild>
              <a 
                href={article.url} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read more about ${article.title}`}
                className="hover:no-underline"
              >
                Read full article
                <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover/button:translate-x-1" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
