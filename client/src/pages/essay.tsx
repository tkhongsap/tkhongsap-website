import { useParams, Link } from "wouter";
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostById } from "@/lib/markdown";
import SEO from "@/components/seo";
import SchemaMarkup from "@/components/schema-markup";
import NotFound from "@/pages/not-found";

export default function Essay() {
  const params = useParams();
  const essayId = params.id;

  const post = essayId ? getPostById(essayId) : undefined;

  if (!post) {
    return <NotFound />;
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const essaySchemaData = {
    url: `https://tkhongsap.io/essay/${post.id}`,
    name: post.title,
    description: post.excerpt,
  };

  // Format date for display
  const displayDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <SEO
        title={`${post.title} | Ta Khongsap`}
        description={post.excerpt}
        canonicalUrl={`/essay/${post.id}`}
        keywords="AI, technology, essays, thought leadership"
        pageUrl={`/essay/${post.id}`}
      />
      <SchemaMarkup type="article" data={essaySchemaData} />

      {/* Back navigation */}
      <div className="pt-28 md:pt-32">
        <div className="container max-w-3xl mx-auto px-4 sm:px-6">
          <Link href="/writing">
            <a className="inline-flex items-center text-[#5C5C5C] hover:text-[#C45B3E] transition-colors text-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to writing
            </a>
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <header className="pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="container max-w-3xl mx-auto px-4 sm:px-6">
          {/* Category badge */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-[#C45B3E]/10 text-[#C45B3E]">
              {post.category}
            </span>
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#5C5C5C] mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {displayDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readingTime}
            </span>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 hover:text-[#C45B3E] transition-colors ml-auto"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1A1A1A] leading-tight mb-6">
            {post.title}
          </h1>

          {/* Subtitle */}
          {post.subtitle && (
            <p className="text-xl md:text-2xl text-[#5C5C5C] italic leading-relaxed">
              {post.subtitle}
            </p>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#FAF9F6] text-[#5C5C5C] border border-[#E8E4DF]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Divider */}
      <div className="container max-w-3xl mx-auto px-4 sm:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E4DF] to-transparent" />
      </div>

      {/* Article Content */}
      <article className="py-12 md:py-16">
        <div className="container max-w-3xl mx-auto px-4 sm:px-6">
          <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#1A1A1A] prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-[#5C5C5C] prose-p:text-lg prose-p:md:text-xl prose-p:leading-relaxed prose-p:mb-6 prose-strong:text-[#1A1A1A] prose-em:italic prose-a:text-[#C45B3E] prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-[#C45B3E] prose-blockquote:text-[#5C5C5C] prose-code:bg-[#F0EFEC] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>

      {/* Footer CTA */}
      <section className="pb-20 md:pb-32">
        <div className="container max-w-3xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#E8E4DF] to-transparent mb-12" />

          <div className="text-center">
            <p className="text-[#5C5C5C] text-lg mb-6">
              Thanks for reading. Want to explore more?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/writing">
                <a className="inline-flex items-center px-6 py-3 text-white font-medium bg-[#C45B3E] rounded-lg hover:bg-[#A84832] transition-colors">
                  More essays
                </a>
              </Link>
              <Link href="/about">
                <a className="inline-flex items-center px-6 py-3 text-[#1A1A1A] font-medium border border-[#E8E4DF] rounded-lg hover:border-[#C45B3E] hover:text-[#C45B3E] transition-colors">
                  About me
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
