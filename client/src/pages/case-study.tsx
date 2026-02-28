import { useParams, Link } from "wouter";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getCaseStudy } from "@/data/case-studies";
import { projects } from "@/data/projects";
import SEO from "@/components/seo";
import NotFound from "@/pages/not-found";

export default function CaseStudyPage() {
  const params = useParams<{ slug: string }>();
  const study = params.slug ? getCaseStudy(params.slug) : undefined;

  if (!study) return <NotFound />;

  const project = projects.find((p) => p.id === study.projectId);

  return (
    <div className="bg-[#FAF9F6] dark:bg-zinc-950 min-h-screen">
      <SEO
        title={`${study.title} — Case Study | Ta Khongsap`}
        description={study.subtitle}
        canonicalUrl={`/projects/${study.slug}`}
        keywords={study.techStack.join(", ")}
        pageUrl={`/projects/${study.slug}`}
      />

      {/* Back navigation */}
      <div className="pt-28 md:pt-32">
        <div className="container max-w-3xl mx-auto px-4 sm:px-6">
          <Link href="/portfolio">
            <a className="inline-flex items-center text-[#5C5C5C] dark:text-zinc-400 hover:text-[#C45B3E] transition-colors text-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </a>
          </Link>
        </div>
      </div>

      {/* Header */}
      <header className="pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="container max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1A1A1A] dark:text-zinc-100 leading-tight mb-4">
            {study.title}
          </h1>
          <p className="text-[#5C5C5C] dark:text-zinc-400 text-lg md:text-xl">
            {study.subtitle}
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {study.techStack.map((tech) => (
              <span
                key={tech}
                className="text-xs px-3 py-1 bg-white dark:bg-zinc-900 text-[#5C5C5C] dark:text-zinc-400 rounded-full border border-[#E8E4DF] dark:border-zinc-800"
              >
                {tech}
              </span>
            ))}
          </div>
          {study.liveUrl && (
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-[#C45B3E] hover:underline text-sm font-medium"
              data-track="demo-link"
            >
              <ExternalLink className="h-4 w-4" />
              View Live Demo
            </a>
          )}
        </div>
      </header>

      {/* Divider */}
      <div className="container max-w-3xl mx-auto px-4 sm:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E4DF] dark:via-zinc-800 to-transparent" />
      </div>

      {/* Content */}
      <article className="py-12 md:py-16">
        <div className="container max-w-3xl mx-auto px-4 sm:px-6 space-y-12">
          {/* Problem */}
          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] dark:text-zinc-100 mb-4">
              The Problem
            </h2>
            <p className="text-[#5C5C5C] dark:text-zinc-400 leading-relaxed text-lg">
              {study.problem}
            </p>
          </section>

          {/* Approach */}
          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] dark:text-zinc-100 mb-4">
              Approach
            </h2>
            <p className="text-[#5C5C5C] dark:text-zinc-400 leading-relaxed text-lg">
              {study.approach}
            </p>
          </section>

          {/* Architecture */}
          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] dark:text-zinc-100 mb-4">
              Architecture
            </h2>
            <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#1A1A1A] dark:prose-headings:text-zinc-100 prose-p:text-[#5C5C5C] dark:prose-p:text-zinc-400 prose-strong:text-[#1A1A1A] dark:prose-strong:text-zinc-200 prose-li:text-[#5C5C5C] dark:prose-li:text-zinc-400">
              {study.architecture.split("\n\n").map((block, i) => {
                if (block.startsWith("- ")) {
                  return (
                    <ul key={i} className="space-y-2">
                      {block.split("\n").map((line, j) => (
                        <li key={j} dangerouslySetInnerHTML={{ __html: line.replace(/^- /, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={i} dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                );
              })}
            </div>
          </section>

          {/* Results */}
          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] dark:text-zinc-100 mb-4">
              Results
            </h2>
            <ul className="space-y-3">
              {study.results.map((result, i) => (
                <li key={i} className="flex items-start gap-3 text-[#5C5C5C] dark:text-zinc-400 text-lg">
                  <span className="text-[#C45B3E] mt-1.5 text-sm">●</span>
                  <span>{result}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Lessons Learned */}
          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] dark:text-zinc-100 mb-4">
              Lessons Learned
            </h2>
            <ul className="space-y-3">
              {study.lessons.map((lesson, i) => (
                <li key={i} className="flex items-start gap-3 text-[#5C5C5C] dark:text-zinc-400 text-lg">
                  <span className="text-[#C45B3E] mt-1.5 text-sm">●</span>
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>

      {/* Footer CTA */}
      <section className="pb-20 md:pb-32">
        <div className="container max-w-3xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#E8E4DF] dark:via-zinc-800 to-transparent mb-12" />
          <div className="text-center">
            <p className="text-[#5C5C5C] dark:text-zinc-400 text-lg mb-6">
              Want to see more projects?
            </p>
            <Link href="/portfolio">
              <a className="inline-flex items-center px-6 py-3 text-white font-medium bg-[#C45B3E] rounded-lg hover:bg-[#A84832] transition-colors">
                View All Projects
              </a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
