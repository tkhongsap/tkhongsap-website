import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { articles } from "@/data/articles";
import { FeaturedArticle } from "@/components/featured-article";
import SEO from "@/components/seo";
import SchemaMarkup from "@/components/schema-markup";

export default function Home() {
  // Get featured articles (newest 3)
  const featuredArticles = articles.slice(0, 3);
  const heroArticle = featuredArticles[0];
  const secondaryArticles = featuredArticles.slice(1, 3);

  // SEO data for Home page
  const homeSchemaData = {
    url: "https://tkhongsap.io/",
    name: "Ta Khongsap | Math • Data Science • Code • AI • Supply Chain",
    description:
      "Essays and insights on AI, software craftsmanship, and the evolving nature of knowledge work.",
  };

  return (
    <div className="bg-[#FAF9F6]">
      <SEO
        title="Ta Khongsap | Math • Data Science • Code • AI • Supply Chain"
        description="Essays and insights on AI, software craftsmanship, and the evolving nature of knowledge work. Domain expertise in Mathematics, Data Science, and Supply Chain."
        canonicalUrl="/"
        keywords="AI, software development, data science, machine learning, tech thought leadership, essays, supply chain, mathematics"
        pageUrl="/"
      />
      <SchemaMarkup type="website" data={homeSchemaData} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="editorial-container text-center">
          <h1 className="editorial-headline mb-6">
            The Questions That
            <br />
            Shape Our Thinking
          </h1>
          <p className="editorial-prose max-w-xl mx-auto">
            Essays on AI, software craftsmanship, and the evolving nature of
            knowledge work.
          </p>
        </div>
      </section>

      {/* Subtle Divider */}
      <div className="container max-w-5xl mx-auto px-4">
        <div className="divider-subtle" style={{ margin: "0 0 4rem 0" }} />
      </div>

      {/* Featured Writing Section */}
      <section className="pb-16 md:pb-24">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="mb-10">
            <h2 className="font-serif text-sm uppercase tracking-widest text-[#5C5C5C] mb-2">
              Featured Writing
            </h2>
          </div>

          {/* Hero Article */}
          {heroArticle && (
            <div className="mb-10">
              <FeaturedArticle article={heroArticle} variant="hero" />
            </div>
          )}

          {/* Secondary Articles Grid */}
          {secondaryArticles.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {secondaryArticles.map((article) => (
                <FeaturedArticle
                  key={article.id}
                  article={article}
                  variant="secondary"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Explore More Section */}
      <section className="pb-20 md:pb-32">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="divider-subtle" style={{ margin: "0 0 4rem 0" }} />
          <Link href="/writing">
            <a className="inline-flex items-center text-[#C45B3E] font-medium text-lg hover:underline group">
              <span>Explore all essays</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
