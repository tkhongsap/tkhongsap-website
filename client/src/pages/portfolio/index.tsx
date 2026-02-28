import { useState } from "react";
import { Link } from "wouter";
import { Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { projects, type Project } from "@/data/projects";
import SEO from "@/components/seo";

type CategoryFilter = "all" | "apps" | "tools" | "experiments";

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");

  const filters: { label: string; value: CategoryFilter }[] = [
    { label: "All", value: "all" },
    { label: "Apps", value: "apps" },
    { label: "Tools", value: "tools" },
    { label: "Experiments", value: "experiments" },
  ];

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <SEO
        title="Projects | Ta Khongsap"
        description="AI agents, products, and experiments. Things I've built and shipped."
        canonicalUrl="/portfolio"
        keywords="AI projects, TalentMatch AI, Doc Extract, OpenClaw, AI agents"
        pageUrl="/portfolio"
      />

      <main className="container max-w-5xl mx-auto px-4 py-24 md:py-32">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
            Projects
          </h1>
          <p className="text-[#5C5C5C] text-lg max-w-2xl mx-auto">
            Things I've built — from production apps to agent systems to weekend experiments.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === f.value
                  ? "bg-[#C45B3E] text-white"
                  : "bg-white text-[#5C5C5C] border border-[#E8E4DF] hover:border-[#C45B3E] hover:text-[#C45B3E]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-[#E8E4DF] hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-serif text-xl font-semibold text-[#1A1A1A]">
          {project.title}
        </h3>
        {project.impactBadge && (
          <Badge variant="outline" className="text-[#C45B3E] border-[#C45B3E]/30 bg-[#C45B3E]/5 whitespace-nowrap ml-2">
            {project.impactBadge}
          </Badge>
        )}
      </div>

      <p className="text-[#5C5C5C] text-sm mb-4 leading-relaxed">
        {project.shortDescription || project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech) => (
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
            data-track="demo-link"
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
            data-track="social-link"
          >
            <Github className="h-3.5 w-3.5 mr-1" /> GitHub
          </a>
        )}
        {project.caseStudyUrl && (
          <Link
            href={project.caseStudyUrl}
            className="text-[#5C5C5C] hover:text-[#C45B3E] flex items-center"
          >
            <ExternalLink className="h-3.5 w-3.5 mr-1" /> Case Study
          </Link>
        )}
      </div>
    </div>
  );
}
