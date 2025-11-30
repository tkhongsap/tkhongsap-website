import { useParams, Link } from "wouter";
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";
import { getEssayById } from "@/data/essays";
import SEO from "@/components/seo";
import SchemaMarkup from "@/components/schema-markup";
import NotFound from "@/pages/not-found";

// Simple markdown-like parser for basic formatting
function parseContent(content: string): React.ReactNode[] {
  const lines = content.split('\n\n');
  const elements: React.ReactNode[] = [];

  lines.forEach((block, index) => {
    const trimmed = block.trim();

    if (!trimmed) return;

    // Handle headers
    if (trimmed.startsWith('## ')) {
      elements.push(
        <h2 key={index} className="font-serif text-2xl md:text-3xl font-semibold text-[#1A1A1A] mt-12 mb-6">
          {trimmed.replace('## ', '')}
        </h2>
      );
      return;
    }

    // Handle bold text with asterisks
    let text = trimmed;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    const boldRegex = /\*\*([^*]+)\*\*/g;
    let match;

    while ((match = boldRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      parts.push(
        <strong key={`bold-${match.index}`} className="font-semibold text-[#1A1A1A]">
          {match[1]}
        </strong>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    // Handle italic text with single asterisks
    const processedParts: React.ReactNode[] = [];
    parts.forEach((part, partIndex) => {
      if (typeof part === 'string') {
        const italicParts: React.ReactNode[] = [];
        let italicLastIndex = 0;
        const italicRegex = /\*([^*]+)\*/g;
        let italicMatch;

        while ((italicMatch = italicRegex.exec(part)) !== null) {
          if (italicMatch.index > italicLastIndex) {
            italicParts.push(part.slice(italicLastIndex, italicMatch.index));
          }
          italicParts.push(
            <em key={`italic-${partIndex}-${italicMatch.index}`} className="italic">
              {italicMatch[1]}
            </em>
          );
          italicLastIndex = italicMatch.index + italicMatch[0].length;
        }

        if (italicLastIndex < part.length) {
          italicParts.push(part.slice(italicLastIndex));
        }

        processedParts.push(...italicParts);
      } else {
        processedParts.push(part);
      }
    });

    elements.push(
      <p key={index} className="text-lg md:text-xl leading-relaxed text-[#5C5C5C] mb-6">
        {processedParts.length > 0 ? processedParts : text}
      </p>
    );
  });

  return elements;
}

export default function Essay() {
  const params = useParams();
  const essayId = params.id;

  const essay = essayId ? getEssayById(essayId) : undefined;

  if (!essay) {
    return <NotFound />;
  }

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
    <div className="bg-[#FAF9F6] min-h-screen">
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
          <Link href="/">
            <a className="inline-flex items-center text-[#5C5C5C] hover:text-[#C45B3E] transition-colors text-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to home
            </a>
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <header className="pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="container max-w-3xl mx-auto px-4 sm:px-6">
          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#5C5C5C] mb-6">
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
              className="flex items-center gap-1.5 hover:text-[#C45B3E] transition-colors ml-auto"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1A1A1A] leading-tight mb-6">
            {essay.title}
          </h1>

          {/* Subtitle */}
          {essay.subtitle && (
            <p className="text-xl md:text-2xl text-[#5C5C5C] italic leading-relaxed">
              {essay.subtitle}
            </p>
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
          <div className="prose-custom">
            {parseContent(essay.content)}
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
