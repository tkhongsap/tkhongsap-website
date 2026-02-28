import { useParams, Link } from "wouter";
import { useEffect, useState } from "react";
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPost, categoryLabels, type BlogPost } from "@/lib/posts";
import SEO from "@/components/seo";
import SchemaMarkup from "@/components/schema-markup";
import NotFound from "@/pages/not-found";
import NewsletterForm from "@/components/newsletter-form";

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.slug) {
      getPost(params.slug).then((p) => {
        setPost(p || null);
        setLoading(false);
      });
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#FAF9F6]">
        <div className="animate-pulse text-[#5C5C5C] dark:text-zinc-400">Loading...</div>
      </div>
    );
  }

  if (!post) return <NotFound />;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const schemaData = {
    url: `https://tkhongsap.io/blog/${post.slug}`,
    name: post.title,
    description: post.excerpt,
  };

  return (
    <div className="bg-[#FAF9F6] dark:bg-zinc-950 min-h-screen">
      <SEO
        title={`${post.title} | Ta Khongsap`}
        description={post.excerpt}
        canonicalUrl={`/blog/${post.slug}`}
        keywords={post.tags.join(", ")}
        pageUrl={`/blog/${post.slug}`}
      />
      <SchemaMarkup type="article" data={schemaData} />

      {/* Back navigation */}
      <div className="pt-28 md:pt-32">
        <div className="container max-w-3xl mx-auto px-4 sm:px-6">
          <Link href="/writing">
            <a className="inline-flex items-center text-[#5C5C5C] hover:text-[#C45B3E] transition-colors text-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Writing
            </a>
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <header className="pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="container max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#5C5C5C] mb-6">
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-[#C45B3E]/10 text-[#C45B3E]">
              {categoryLabels[post.category]}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
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

          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1A1A1A] leading-tight">
            {post.title}
          </h1>
        </div>
      </header>

      {/* Divider */}
      <div className="container max-w-3xl mx-auto px-4 sm:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E4DF] dark:via-zinc-800 to-transparent" />
      </div>

      {/* Article Content */}
      <article className="py-12 md:py-16">
        <div className="container max-w-3xl mx-auto px-4 sm:px-6">
          <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#1A1A1A] prose-p:text-[#5C5C5C] prose-p:leading-relaxed prose-a:text-[#C45B3E] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#1A1A1A] prose-blockquote:border-l-[#C45B3E] prose-blockquote:text-[#5C5C5C] prose-code:bg-[#F0EDEA] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-[#1A1A1A] prose-pre:text-[#FAF9F6]">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="container max-w-3xl mx-auto px-4 sm:px-6 pb-8">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium rounded-full bg-[#FAF9F6] text-[#5C5C5C] border border-[#E8E4DF] dark:border-zinc-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter Inline CTA */}
      <section className="pb-12">
        <div className="container max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-[#FAF9F6] dark:bg-zinc-900 rounded-xl border border-[#E8E4DF] dark:border-zinc-800 p-8 text-center">
            <h3 className="font-serif text-xl font-semibold text-[#1A1A1A] dark:text-zinc-100 mb-2">
              Enjoyed this post?
            </h3>
            <p className="text-[#5C5C5C] dark:text-zinc-400 mb-4 text-sm">
              Weekly insights on building with AI agents — what works, what breaks, and what I'm shipping next.
            </p>
            <div className="max-w-sm mx-auto">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="pb-20 md:pb-32">
        <div className="container max-w-3xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#E8E4DF] dark:via-zinc-800 to-transparent mb-12" />
          <div className="text-center">
            <p className="text-[#5C5C5C] dark:text-zinc-400 text-lg mb-6">
              Thanks for reading. Want to explore more?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/writing">
                <a className="inline-flex items-center px-6 py-3 text-white font-medium bg-[#C45B3E] rounded-lg hover:bg-[#A84832] transition-colors">
                  More writing
                </a>
              </Link>
              <Link href="/about">
                <a className="inline-flex items-center px-6 py-3 text-[#1A1A1A] dark:text-zinc-100 font-medium border border-[#E8E4DF] dark:border-zinc-800 rounded-lg hover:border-[#C45B3E] hover:text-[#C45B3E] transition-colors">
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
