import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/projects";

/** Compact horizontal strip of projects — demoted from the writing-first home. */
export default function ProjectStrip({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="flex flex-col rounded-xl border border-line bg-surface p-5 transition-all duration-300 hover:border-line-strong"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-serif text-base font-semibold text-ink leading-snug">
              {project.title}
            </h3>
            {project.impactBadge && (
              <span className="text-[0.65rem] font-medium px-2 py-0.5 bg-brand/15 text-brand-text rounded-full whitespace-nowrap">
                {project.impactBadge}
              </span>
            )}
          </div>
          <p className="text-ink-muted text-xs leading-relaxed line-clamp-3 mb-3 flex-1">
            {project.shortDescription || project.description}
          </p>
          <div className="flex items-center gap-3 text-xs">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-text hover:underline flex items-center"
              >
                <ExternalLink className="h-3 w-3 mr-1" /> Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-muted hover:text-brand-text flex items-center"
              >
                <Github className="h-3 w-3 mr-1" /> Code
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
