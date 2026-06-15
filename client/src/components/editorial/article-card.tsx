import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Essay } from "@/data/essays";
import { getColumnOrDefault } from "@/data/columns";
import CoverArt from "./cover-art";
import ColumnBadge from "./column-badge";

interface ArticleCardProps {
  essay: Essay;
  variant?: "grid" | "compact";
  className?: string;
}

/** Standard article card for grids and feeds. */
export default function ArticleCard({ essay, variant = "grid", className }: ArticleCardProps) {
  const accent = essay.coverAccent ?? getColumnOrDefault(essay.column).accent;

  if (variant === "compact") {
    return (
      <Link
        href={`/essay/${essay.id}`}
        className={cn(
          "group block rounded-xl border border-line bg-surface p-5 transition-all duration-300 hover:border-line-strong hover:bg-surface-2",
          className
        )}
      >
        <div className="flex items-center gap-3 mb-2">
          <ColumnBadge column={essay.column} />
          <span className="text-xs text-ink-faint">{essay.readingTime}</span>
        </div>
        <h3 className="font-serif text-lg font-semibold text-ink leading-snug group-hover:text-brand-text transition-colors">
          {essay.title}
        </h3>
      </Link>
    );
  }

  return (
    <Link
      href={`/essay/${essay.id}`}
      className={cn(
        "group flex flex-col rounded-2xl border border-line bg-surface overflow-hidden transition-all duration-300 hover:border-line-strong hover:-translate-y-1",
        className
      )}
    >
      <CoverArt seed={essay.id} label={essay.title} src={essay.coverImage} accent={accent} aspect="card" />
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-3 mb-3">
          <ColumnBadge column={essay.column} />
          <span className="text-xs text-ink-faint">{essay.date}</span>
          <span className="w-1 h-1 rounded-full bg-ink-faint" />
          <span className="text-xs text-ink-faint">{essay.readingTime}</span>
        </div>
        <h3 className="font-serif text-xl font-semibold text-ink mb-2 leading-snug group-hover:text-brand-text transition-colors">
          {essay.title}
        </h3>
        <p className="text-ink-muted text-sm leading-relaxed line-clamp-3 mb-4">{essay.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-2 text-brand-text font-medium text-sm group-hover:gap-3 transition-all">
          Read essay
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
