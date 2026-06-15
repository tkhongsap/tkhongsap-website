import { useState } from "react";
import { publications } from "@/data/publications";
import { getAllArticles, getFeatured } from "@/data/essays";
import { columns, type ColumnSlug } from "@/data/columns";
import SEO from "@/components/seo";
import SchemaMarkup from "@/components/schema-markup";
import { ArrowRight, Linkedin, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";
import FeaturedArticle from "@/components/editorial/featured-article";
import ArticleCard from "@/components/editorial/article-card";
import NewsletterSection from "@/components/editorial/newsletter-section";

// Custom Medium icon (lucide-react doesn't have one)
function MediumIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  );
}

type Filter = ColumnSlug | "all";

export default function Writing() {
  const [filter, setFilter] = useState<Filter>("all");

  const featured = getFeatured();
  const allArticles = getAllArticles();
  const showFeatured = filter === "all" && featured;

  const visible = allArticles.filter((a) => {
    if (filter === "all") return a.id !== featured?.id; // featured shown in hero
    return (a.column ?? "signal") === filter;
  });

  const writingSchemaData = {
    name: "Ta Khongsap | Writing",
    description:
      "Essays and insights on AI developments, agent systems, and the evolving nature of knowledge work.",
    url: "https://tkhongsap.io/writing",
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "Medium":
        return <MediumIcon className="h-5 w-5" />;
      case "LinkedIn":
        return <Linkedin className="h-5 w-5" />;
      default:
        return <Newspaper className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-bg min-h-screen">
      <SEO
        title="Writing | Ta Khongsap"
        description="Essays on AI developments, agent systems, and the future of work. Organized into Frontier, Field Notes, and Signal."
        canonicalUrl="/writing"
        type="website"
        keywords="AI insights, AI developments, agent systems, technology analysis, future of work"
      />
      <SchemaMarkup type="website" data={writingSchemaData} />

      {/* Hero Section */}
      <section className="pt-32 pb-10 md:pt-40 md:pb-12">
        <div className="editorial-container text-center">
          <h1 className="editorial-headline mb-6">Writing</h1>
          <p className="editorial-prose max-w-2xl mx-auto">
            Developments, build logs, and trend analysis from the edge of AI —
            organized into three columns.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="pb-12">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 border-b border-line pb-1">
            <button
              className={cn("filter-btn-maximalist", filter === "all" && "active")}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            {columns.map((col) => (
              <button
                key={col.slug}
                className={cn("filter-btn-maximalist", filter === col.slug && "active")}
                onClick={() => setFilter(col.slug)}
              >
                {col.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured (only on "All") */}
      {showFeatured && (
        <section className="pb-14 md:pb-16">
          <div className="container max-w-5xl mx-auto px-4 sm:px-6">
            <FeaturedArticle essay={featured} />
          </div>
        </section>
      )}

      {/* Article grid */}
      <section className="pb-16 md:pb-20">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          {visible.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map((essay) => (
                <ArticleCard key={essay.id} essay={essay} />
              ))}
            </div>
          ) : (
            <p className="text-center text-ink-muted py-12">
              No pieces in this column yet — more on the way.
            </p>
          )}
        </div>
      </section>

      {/* Divider */}
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        <div className="divider-subtle" />
      </div>

      {/* Publications Section */}
      <section className="py-16 md:py-20">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-ink mb-4">
              Where I Publish
            </h2>
            <p className="text-ink-muted max-w-xl mx-auto">
              Follow along on the platforms where I share insights regularly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {publications.map((pub) => (
              <a
                key={pub.id}
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <article className="relative bg-surface rounded-2xl overflow-hidden border border-line hover:border-line-strong transition-all duration-300 h-full flex flex-col">
                  {/* Cover/Header Area */}
                  <div
                    className="relative h-44 md:h-52 overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${pub.accentColor}33 0%, ${pub.accentColor}0D 100%)`,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="text-6xl md:text-7xl opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500"
                        style={{ color: pub.accentColor }}
                      >
                        {getPlatformIcon(pub.platform)}
                      </div>
                    </div>
                    {/* Platform badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: pub.accentColor }}
                      >
                        {getPlatformIcon(pub.platform)}
                        {pub.platform}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <h3 className="font-serif text-xl md:text-2xl font-semibold text-ink mb-3 group-hover:text-brand-text transition-colors duration-300">
                      {pub.title}
                    </h3>
                    <p className="text-ink-muted leading-relaxed mb-6 flex-1">{pub.synopsis}</p>

                    {/* Topic Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {pub.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-subtle text-ink-muted border border-line"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <span
                      className="inline-flex items-center gap-2 font-medium group-hover:gap-3 transition-all duration-300"
                      style={{ color: pub.accentColor }}
                    >
                      {pub.platform === "LinkedIn" ? "Subscribe on LinkedIn" : "Read on Medium"}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </article>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="pb-20 md:pb-28">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <NewsletterSection />
        </div>
      </section>
    </div>
  );
}
