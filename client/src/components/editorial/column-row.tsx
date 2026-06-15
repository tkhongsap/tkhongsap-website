import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { columns } from "@/data/columns";
import { getArticlesByColumn } from "@/data/essays";

/** Row of the named columns, each linking to its landing page. */
export default function ColumnRow() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {columns.map((col) => {
        const count = getArticlesByColumn(col.slug).length;
        return (
          <Link
            key={col.slug}
            href={`/column/${col.slug}`}
            className="group relative rounded-2xl border border-line bg-surface p-7 overflow-hidden transition-all duration-300 hover:border-line-strong hover:-translate-y-1"
          >
            {/* accent top bar */}
            <span
              className="absolute top-0 left-0 right-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
              style={{ backgroundColor: col.accent }}
            />
            <p
              className="text-xs font-medium uppercase tracking-wider mb-3"
              style={{ color: col.accent }}
            >
              {col.tagline}
            </p>
            <h3 className="font-serif text-2xl font-semibold text-ink mb-2 group-hover:text-brand-text transition-colors">
              {col.name}
            </h3>
            <p className="text-ink-muted text-sm leading-relaxed mb-5">{col.description}</p>
            <span className="inline-flex items-center gap-2 text-sm text-ink-faint group-hover:text-brand-text group-hover:gap-3 transition-all">
              {count} {count === 1 ? "piece" : "pieces"}
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
