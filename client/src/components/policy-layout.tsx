import type { ReactNode } from "react";
import { Link } from "wouter";
import SEO from "@/components/seo";

interface PolicyLayoutProps {
  title: string;
  description: string;
  path: string;
  children: ReactNode;
}

export function PolicySection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-line pt-8">
      <h2 id={id} className="editorial-subhead mb-4">{title}</h2>
      <div className="space-y-4 text-ink-muted leading-relaxed">{children}</div>
    </section>
  );
}

export default function PolicyLayout({ title, description, path, children }: PolicyLayoutProps) {
  return (
    <>
      <SEO title={`${title} | Ta Khongsap`} description={description} canonicalUrl={path} pageUrl={path} keywords="personal website, BNIC internal evaluation, privacy, terms" />
      <article className="bg-bg min-h-[100dvh] pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="editorial-container break-words">
          <header className="mb-10">
            <p className="metadata mb-4">Website &amp; internal evaluation</p>
            <h1 className="editorial-headline mb-5">{title}</h1>
            <p className="text-sm text-ink-muted">
              Last updated: <time dateTime="2026-10-13">October 13, 2026</time>
            </p>
            <aside aria-label="Scope of this notice" className="mt-6 bg-surface border border-line border-l-2 border-l-brand rounded-lg p-5 sm:p-6">
              <p className="font-medium text-ink mb-3">Separate website, BNIC and Microsoft responsibilities.</p>
              <p className="text-sm mb-0">Confirmed scope and practices are distinguished from the remaining unknowns. This notice is not issued on behalf of BNIC or Microsoft.</p>
            </aside>
          </header>
          <div className="space-y-10">{children}</div>
          <nav aria-label="Related policy pages" className="mt-12 pt-6 border-t border-line flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <Link href="/privacy-policy" className="text-ink-muted hover:text-brand-text transition-colors" aria-current={path === "/privacy-policy" ? "page" : undefined}>Privacy Policy</Link>
            <Link href="/terms-of-use" className="text-ink-muted hover:text-brand-text transition-colors" aria-current={path === "/terms-of-use" ? "page" : undefined}>Terms of Use</Link>
            <Link href="/contact" className="text-ink-muted hover:text-brand-text transition-colors">Contact</Link>
          </nav>
        </div>
      </article>
    </>
  );
}
