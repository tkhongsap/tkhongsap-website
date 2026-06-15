import { useParams, Link } from "wouter";
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";
import { getEssayById } from "@/data/essays";
import { getColumnOrDefault } from "@/data/columns";
import SEO from "@/components/seo";
import SchemaMarkup from "@/components/schema-markup";
import NotFound from "@/pages/not-found";
import ArticleContent from "@/components/article-content";
import CoverArt from "@/components/editorial/cover-art";
import ColumnBadge from "@/components/editorial/column-badge";

export default function Essay() {
  const params = useParams();
  const essayId = params.id;

  const essay = essayId ? getEssayById(essayId) : undefined;

  if (!essay) {
    return <NotFound />;
  }

  const accent = essay.coverAccent ?? getColumnOrDefault(essay.column).accent;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: essay.title,
          text: essay.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const essaySchemaData = {
    url: `https://tkhongsap.io/essay/${essay.id}`,
    name: essay.title,
    description: essay.excerpt,
  };

  return (
    <div className="bg-bg min-h-screen">
      <SEO
        title={`${essay.title} | Ta Khongsap`}
        description={essay.excerpt}
        canonicalUrl={`/essay/${essay.id}`}
        keywords="AI, technology, essays, thought leadership"
        pageUrl={`/essay/${essay.id}`}
      />
      <SchemaMarkup type="article" data={essaySchemaData} />

      {/* Back navigation */}
      <div className="pt-28 md:pt-32">
        <div className="container max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            href="/writing"
            className="inline-flex items-center text-ink-muted hover:text-brand-text transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to writing
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <header className="pt-8 pb-8 md:pt-12 md:pb-10">
        <div className="container max-w-3xl mx-auto px-4 sm:px-6">
          {/* Column + meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-ink-faint mb-6">
            <ColumnBadge column={essay.column} size="md" />
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {essay.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {essay.readingTime}
            </span>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 hover:text-brand-text transition-colors ml-auto"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-6">
            {essay.title}
          </h1>

          {/* Subtitle */}
          {essay.subtitle && (
            <p className="text-xl md:text-2xl text-ink-muted italic leading-relaxed">
              {essay.subtitle}
            </p>
          )}

          {essay.updatedDate && (
            <p className="text-sm text-ink-faint mt-4">Updated {essay.updatedDate}</p>
          )}
        </div>
      </header>

      {/* Cover masthead */}
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 mb-12 md:mb-16">
        <CoverArt
          seed={essay.id}
          label={essay.title}
          src={essay.coverImage}
          accent={accent}
          aspect="hero"
          priority
          className="rounded-2xl border border-line"
        />
      </div>

      {/* Article Content */}
      <article className="pb-12 md:pb-16">
        <div className="container max-w-3xl mx-auto px-4 sm:px-6">
          <ArticleContent content={essay.content} />

          {/* Tags */}
          {essay.tags && essay.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-12">
              {essay.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-subtle text-ink-muted border border-line"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      {/* Footer CTA */}
      <section className="pb-20 md:pb-32">
        <div className="container max-w-3xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-line to-transparent mb-12" />

          <div className="text-center">
            <p className="text-ink-muted text-lg mb-6">
              Thanks for reading. Want to explore more?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/writing"
                className="inline-flex items-center px-6 py-3 text-[#0E0E10] font-medium bg-brand rounded-lg hover:bg-brand-hover transition-colors"
              >
                More essays
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center px-6 py-3 text-ink font-medium border border-line rounded-lg hover:border-brand hover:text-brand-text transition-colors"
              >
                About me
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
