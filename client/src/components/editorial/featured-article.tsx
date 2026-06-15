import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import type { Essay } from "@/data/essays";
import { getColumnOrDefault } from "@/data/columns";
import CoverArt from "./cover-art";
import ColumnBadge from "./column-badge";

/** Large hero treatment for the featured article. */
export default function FeaturedArticle({ essay }: { essay: Essay }) {
  const accent = essay.coverAccent ?? getColumnOrDefault(essay.column).accent;

  return (
    <Link
      href={`/essay/${essay.id}`}
      className="group grid lg:grid-cols-2 gap-0 rounded-3xl border border-line bg-surface overflow-hidden transition-all duration-300 hover:border-line-strong"
    >
      <CoverArt
        seed={essay.id}
        label={essay.title}
        src={essay.coverImage}
        accent={accent}
        aspect="wide"
        priority
        className="lg:h-full lg:aspect-auto"
      />
      <div className="flex flex-col justify-center p-8 md:p-12">
        <div className="flex items-center gap-3 mb-4">
          <ColumnBadge column={essay.column} size="md" />
          <span className="text-sm text-ink-faint">{essay.date}</span>
          <span className="w-1 h-1 rounded-full bg-ink-faint" />
          <span className="text-sm text-ink-faint">{essay.readingTime}</span>
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-ink leading-tight mb-4 group-hover:text-brand-text transition-colors">
          {essay.title}
        </h2>
        {essay.subtitle && (
          <p className="text-ink-muted text-lg italic mb-5 font-serif">{essay.subtitle}</p>
        )}
        <p className="text-ink-muted leading-relaxed line-clamp-4 mb-6">{essay.excerpt}</p>
        <span className="inline-flex items-center gap-2 text-brand-text font-medium group-hover:gap-3 transition-all">
          Read essay
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
