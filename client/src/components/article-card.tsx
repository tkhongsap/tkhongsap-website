import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Article } from "@/data/articles";
import OptimizedImage from "./optimized-image";

interface ArticleCardProps {
  article: Article;
  className?: string;
}

export default function ArticleCard({ article, className }: ArticleCardProps) {
  return (
    <div className={cn("border-b border-gray-200 pb-12 last:border-0", className)}>
      {article.imageUrl && (
        <div className="mb-4 overflow-hidden rounded-lg">
          <OptimizedImage 
            src={article.imageUrl || '#'} 
            alt={`Image for article: ${article.title}`}
            height={240}
            className="w-full h-60 object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
      )}
      
      <h3 className="text-2xl font-bold mb-3">
        <a 
          href={article.url} 
          className="hover:text-primary transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {article.title}
        </a>
      </h3>
      
      <p className="text-gray-600 mb-4">{article.date}</p>
      
      <p className="text-lg text-gray-700 mb-4">
        {article.excerpt}
      </p>
      
      <a 
        href={article.url} 
        className="text-primary font-medium inline-flex items-center hover:underline"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Read more about ${article.title}`}
      >
        Read more
        <ArrowRight className="h-5 w-5 ml-1" aria-hidden="true" />
      </a>
    </div>
  );
}
