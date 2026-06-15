import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Renders an article's markdown body, styled for the dark editorial theme via
 * @tailwindcss/typography. Content is owner-authored, so raw HTML is not enabled.
 */
export default function ArticleContent({ content }: { content: string }) {
  return (
    <div
      className="prose prose-lg prose-invert max-w-none
        prose-headings:font-serif prose-headings:font-semibold prose-headings:text-ink
        prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
        prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
        prose-p:text-ink-muted prose-p:text-lg md:prose-p:text-xl prose-p:leading-relaxed
        prose-a:text-brand-text prose-a:no-underline hover:prose-a:underline
        prose-strong:text-ink prose-strong:font-semibold
        prose-em:italic
        prose-blockquote:border-l-[#C45B3E] prose-blockquote:text-ink prose-blockquote:font-serif prose-blockquote:not-italic
        prose-ul:text-ink-muted prose-ol:text-ink-muted prose-li:marker:text-[#C45B3E]
        prose-code:text-brand-text prose-code:bg-subtle prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-[#16161A] prose-pre:border prose-pre:border-line prose-pre:text-ink
        prose-img:rounded-xl prose-img:border prose-img:border-line"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
