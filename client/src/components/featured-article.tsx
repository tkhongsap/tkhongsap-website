import { ArrowRight } from "lucide-react";
import type { Article } from "@/data/articles";

interface FeaturedArticleProps {
  article: Article;
  variant: "hero" | "secondary";
}

export function FeaturedArticle({ article, variant }: FeaturedArticleProps) {
  if (variant === "hero") {
    return (
      <article className="group">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {/* Hero article with large image */}
          <div className="relative overflow-hidden rounded-xl">
            {article.imageUrl ? (
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="metadata text-white/70 mb-3">
                    <span>{article.date}</span>
                    {article.readingTime && (
                      <>
                        <span className="mx-2">·</span>
                        <span>{article.readingTime}</span>
                      </>
                    )}
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-tight mb-3">
                    {article.title}
                  </h2>
                  <p className="text-white/80 text-base md:text-lg line-clamp-2 max-w-2xl">
                    {article.summary}
                  </p>
                </div>

                {/* Accent bottom border on hover */}
                <div className="absolute bottom-0 left-0 h-1 bg-[#C45B3E] transition-all duration-300 w-0 group-hover:w-full" />
              </div>
            ) : (
              /* Fallback for articles without images */
              <div className="bg-[#F5F0EB] p-8 md:p-12 rounded-xl">
                <div className="metadata mb-4">
                  <span>{article.date}</span>
                  {article.readingTime && (
                    <>
                      <span className="mx-2">·</span>
                      <span>{article.readingTime}</span>
                    </>
                  )}
                </div>
                <h2 className="editorial-subhead mb-4">{article.title}</h2>
                <p className="editorial-prose line-clamp-3 max-w-2xl">
                  {article.summary}
                </p>
                <div className="mt-6 flex items-center text-[#C45B3E] font-medium">
                  <span>Read article</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            )}
          </div>
        </a>
      </article>
    );
  }

  // Secondary variant
  return (
    <article className="group editorial-card">
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {/* Image */}
        {article.imageUrl && (
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            {/* Accent top border on hover */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#C45B3E] transition-all duration-300 scale-x-0 origin-left group-hover:scale-x-100" />
          </div>
        )}

        {/* Content */}
        <div className="p-5 md:p-6">
          <div className="metadata mb-3">
            <span>{article.date}</span>
            {article.readingTime && (
              <>
                <span className="mx-2">·</span>
                <span>{article.readingTime}</span>
              </>
            )}
          </div>

          <h3 className="font-serif text-xl md:text-2xl font-semibold text-[#1A1A1A] leading-tight mb-3 group-hover:text-[#C45B3E] transition-colors">
            {article.title}
          </h3>

          <p className="text-[#5C5C5C] text-base line-clamp-2 mb-4">
            {article.summary}
          </p>

          {/* Read more */}
          <div className="flex items-center text-[#C45B3E] font-medium text-sm">
            <span>Read article</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </a>
    </article>
  );
}

export default FeaturedArticle;
