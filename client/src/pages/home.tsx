import { Link } from "wouter";
import { useState, useEffect } from "react";
import { ArrowRight, Clock, Calendar, ExternalLink, Github } from "lucide-react";
import { getFeaturedEssay, essays } from "@/data/essays";
import { projects } from "@/data/projects";
import { getPosts, categoryLabels, type BlogPost } from "@/lib/posts";
import SEO from "@/components/seo";
import SchemaMarkup from "@/components/schema-markup";

export default function Home() {
  const featuredProjects = projects.filter(p =>
    ["talentmatch-ai", "doc-extract", "airmood", "ai-agent-system"].includes(p.id)
  ).slice(0, 4);

  const latestEssays = essays.slice(0, 3);
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    getPosts().then(posts => setLatestPosts(posts.slice(0, 3)));
  }, []);

  const homeSchemaData = {
    url: "https://tkhongsap.io/",
    name: "Ta Khongsap | Building AI Systems That Ship",
    description:
      "Builder based in Bangkok. AI agent systems, products, and building in public.",
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <SEO
        title="Ta Khongsap | Building AI Systems That Ship"
        description="Builder based in Bangkok. Running AI agent systems that ship code, draft content, and manage workflows autonomously. Products, essays, and building in public."
        canonicalUrl="/"
        keywords="AI agents, OpenClaw, building in public, solopreneur, AI systems, Bangkok"
        pageUrl="/"
      />
      <SchemaMarkup type="website" data={homeSchemaData} />

      {/* Hero Section */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="editorial-container text-center">
          <h1 className="editorial-headline mb-6">
            Building AI Systems That Actually Ship
          </h1>
          <p className="editorial-prose max-w-2xl mx-auto mb-8">
            I build AI agents, ship products, and share the process publicly.
            4 agents, 20+ skills, running 24/7 on a single VPS.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/portfolio">
              <a className="inline-flex items-center px-6 py-3 text-white font-medium bg-[#C45B3E] rounded-lg hover:bg-[#A84832] transition-colors">
                <span>View Projects</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Link>
            <Link href="/about">
              <a className="inline-flex items-center px-6 py-3 text-[#1A1A1A] font-medium border border-[#E8E4DF] rounded-lg hover:border-[#C45B3E] hover:text-[#C45B3E] transition-colors">
                <span>About me</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="pb-16 md:pb-24">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#1A1A1A]">
              Featured Projects
            </h2>
            <Link href="/portfolio">
              <a className="text-[#C45B3E] font-medium text-sm flex items-center hover:underline">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl p-6 border border-[#E8E4DF] hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-serif text-xl font-semibold text-[#1A1A1A]">
                    {project.title}
                  </h3>
                  {project.impactBadge && (
                    <span className="text-xs font-medium px-2 py-1 bg-[#C45B3E]/10 text-[#C45B3E] rounded-full whitespace-nowrap ml-2">
                      {project.impactBadge}
                    </span>
                  )}
                </div>
                <p className="text-[#5C5C5C] text-sm mb-4 leading-relaxed">
                  {project.shortDescription || project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 bg-[#FAF9F6] text-[#5C5C5C] rounded border border-[#E8E4DF]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-sm">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C45B3E] hover:underline flex items-center"
                    >
                      <ExternalLink className="h-3.5 w-3.5 mr-1" /> Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#5C5C5C] hover:text-[#C45B3E] flex items-center"
                    >
                      <Github className="h-3.5 w-3.5 mr-1" /> GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Content Section */}
      <section className="pb-20 md:pb-32">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <div className="divider-subtle" style={{ margin: "0 0 2rem 0" }} />
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#1A1A1A]">
              Latest Writing
            </h2>
            <Link href="/writing">
              <a className="text-[#C45B3E] font-medium text-sm flex items-center hover:underline">
                All essays <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Link>
          </div>

          <div className="space-y-6">
            {latestPosts.length > 0 ? (
              latestPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <a className="block group">
                    <article className="bg-white rounded-xl p-6 border border-[#E8E4DF] hover:shadow-md transition-shadow">
                      <div className="flex flex-wrap items-center gap-3 text-sm text-[#5C5C5C] mb-3">
                        <span className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-[#C45B3E]/10 text-[#C45B3E]">
                          {categoryLabels[post.category]}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {post.readingTime}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg md:text-xl font-semibold text-[#1A1A1A] mb-2 group-hover:text-[#C45B3E] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-[#5C5C5C] text-sm leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    </article>
                  </a>
                </Link>
              ))
            ) : (
              latestEssays.map((essay) => (
                <Link key={essay.id} href={`/essay/${essay.id}`}>
                  <a className="block group">
                    <article className="bg-white rounded-xl p-6 border border-[#E8E4DF] hover:shadow-md transition-shadow">
                      <div className="flex flex-wrap items-center gap-3 text-sm text-[#5C5C5C] mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {essay.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {essay.readingTime}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg md:text-xl font-semibold text-[#1A1A1A] mb-2 group-hover:text-[#C45B3E] transition-colors">
                        {essay.title}
                      </h3>
                      <p className="text-[#5C5C5C] text-sm leading-relaxed line-clamp-2">
                        {essay.excerpt}
                      </p>
                    </article>
                  </a>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
