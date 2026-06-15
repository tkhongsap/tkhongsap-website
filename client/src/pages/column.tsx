import { useParams, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { getColumn } from "@/data/columns";
import { getArticlesByColumn } from "@/data/essays";
import SEO from "@/components/seo";
import SchemaMarkup from "@/components/schema-markup";
import NotFound from "@/pages/not-found";
import ArticleCard from "@/components/editorial/article-card";

export default function Column() {
  const params = useParams();
  const column = getColumn(params.slug);

  if (!column) {
    return <NotFound />;
  }

  const articles = getArticlesByColumn(column.slug);

  const schemaData = {
    name: `${column.name} | Ta Khongsap`,
    description: column.description,
    url: `https://tkhongsap.io/column/${column.slug}`,
  };

  return (
    <div className="bg-bg min-h-screen">
      <SEO
        title={`${column.name} — ${column.tagline} | Ta Khongsap`}
        description={column.description}
        canonicalUrl={`/column/${column.slug}`}
        type="website"
        keywords={`${column.name}, AI, ${column.tagline}`}
      />
      <SchemaMarkup type="website" data={schemaData} />

      {/* Accent-tinted header */}
      <section
        className="pt-32 pb-12 md:pt-40 md:pb-16 border-b border-line"
        style={{
          background: `linear-gradient(180deg, ${column.accent}1A 0%, transparent 100%)`,
        }}
      >
        <div className="container max-w-4xl mx-auto px-4 sm:px-6">
          <Link
            href="/writing"
            className="inline-flex items-center text-ink-muted hover:text-brand-text transition-colors text-sm mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            All writing
          </Link>
          <p
            className="text-xs font-medium uppercase tracking-[0.2em] mb-4"
            style={{ color: column.accent }}
          >
            {column.tagline}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-ink mb-4">
            {column.name}
          </h1>
          <p className="editorial-prose max-w-2xl">{column.description}</p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16 md:py-20">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((essay) => (
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
    </div>
  );
}
