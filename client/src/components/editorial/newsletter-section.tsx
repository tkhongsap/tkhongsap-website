import NewsletterForm from "@/components/newsletter-form";

/** Editorial newsletter signup block, wrapping the existing NewsletterForm. */
export default function NewsletterSection() {
  return (
    <div className="relative rounded-3xl border border-line bg-surface overflow-hidden grain-overlay">
      <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C45B3E] to-transparent" />
      <div className="relative px-6 py-12 md:px-12 md:py-16 max-w-2xl mx-auto text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-brand-text mb-4">
          The newsletter
        </p>
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-ink mb-4">
          Writing from the edge of AI, in your inbox
        </h2>
        <p className="text-ink-muted leading-relaxed mb-8">
          New essays on AI developments, agent systems, and where the trend lines point —
          once or twice a month. No noise.
        </p>
        <NewsletterForm className="max-w-md mx-auto" />
      </div>
    </div>
  );
}
