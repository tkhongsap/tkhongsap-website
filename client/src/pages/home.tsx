import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { getFeatured, getLatest } from "@/data/essays";
import { projects } from "@/data/projects";
import SEO from "@/components/seo";
import SchemaMarkup from "@/components/schema-markup";
import FeaturedArticle from "@/components/editorial/featured-article";
import ArticleCard from "@/components/editorial/article-card";
import ColumnRow from "@/components/editorial/column-row";
import ProjectStrip from "@/components/editorial/project-strip";
import NewsletterSection from "@/components/editorial/newsletter-section";

export default function Home() {
  const featured = getFeatured();
  const latest = getLatest(6, featured?.id);

  const featuredProjects = projects
    .filter((p) =>
      ["talentmatch-ai", "doc-extract", "airmood", "ai-agent-system"].includes(p.id)
    )
    .slice(0, 4);

  const homeSchemaData = {
    url: "https://tkhongsap.io/",
    name: "Ta Khongsap | Writing from the edge of AI",
    description:
      "Essays on AI developments, agent systems, and the future of work — by a Bangkok-based builder running AI agents 24/7.",
  };

  return (
    <div className="bg-bg min-h-screen">
      <SEO
        title="Ta Khongsap | Writing from the edge of AI"
        description="Essays on AI developments, agent systems, and the future of work. A builder in Bangkok running AI agents that ship code, draft content, and manage workflows 24/7."
        canonicalUrl="/"
        keywords="AI essays, AI agents, building in public, future of work, AI trends, Bangkok"
        pageUrl="/"
      />
      <SchemaMarkup type="website" data={homeSchemaData} />

      {/* Masthead intro */}
      <section className="pt-32 pb-10 md:pt-40 md:pb-12">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-text mb-4">
            Ta Khongsap — Building AI systems that ship
          </p>
          <h1 className="editorial-headline max-w-3xl">
            Writing from the edge of AI
          </h1>
          <p className="editorial-prose max-w-2xl mt-5">
            Developments, build logs, and trend analysis from a builder running four
            agents and 20+ skills, around the clock, on a single VPS.
          </p>
        </div>
      </section>

      {/* Featured article hero */}
      {featured && (
        <section className="pb-16 md:pb-20">
          <div className="container max-w-5xl mx-auto px-4 sm:px-6">
            <FeaturedArticle essay={featured} />
          </div>
        </section>
      )}

      {/* Latest grid */}
      {latest.length > 0 && (
        <section className="pb-16 md:pb-24">
          <div className="container max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-ink">
                Latest
              </h2>
              <Link
                href="/writing"
                className="text-brand-text font-medium text-sm flex items-center hover:gap-2 transition-all"
              >
                All writing <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latest.map((essay) => (
                <ArticleCard key={essay.id} essay={essay} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Columns row */}
      <section className="pb-16 md:pb-24">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <div className="divider-subtle" style={{ margin: "0 0 2.5rem 0" }} />
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-ink mb-8">
            The columns
          </h2>
          <ColumnRow />
        </div>
      </section>

      {/* Projects strip (demoted) */}
      <section className="pb-16 md:pb-24">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-ink">
              Also building
            </h2>
            <Link
              href="/portfolio"
              className="text-brand-text font-medium text-sm flex items-center hover:gap-2 transition-all"
            >
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <ProjectStrip projects={featuredProjects} />
        </div>
      </section>

      {/* Newsletter */}
      <section className="pb-20 md:pb-32">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <NewsletterSection />
        </div>
      </section>
    </div>
  );
}
