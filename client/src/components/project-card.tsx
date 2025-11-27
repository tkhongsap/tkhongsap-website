import { ArrowRight, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { Project } from "@/data/projects";
import OptimizedImage from "./optimized-image";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
  const categoryLabels: Record<string, string> = {
    ai: "AI & Algorithms",
    data: "Data Visualization",
    finance: "Finance Tools",
    creative: "Creative Coding",
  };

  return (
    <div
      className={cn(
        "group editorial-card overflow-hidden flex flex-col",
        className
      )}
    >
      {/* Project Image */}
      {project.image && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <OptimizedImage
            src={project.image}
            alt={`Project thumbnail for ${project.title}`}
            height={240}
            width={400}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
            objectFit="cover"
          />
          {/* Accent top border on hover */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#C45B3E] transition-all duration-300 scale-x-0 origin-left group-hover:scale-x-100" />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-grow p-5 md:p-6">
        {/* Category Badge */}
        <div className="mb-3">
          <span className="metadata">
            {categoryLabels[project.category] || "Project"}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl font-semibold text-[#1A1A1A] leading-tight mb-3 group-hover:text-[#C45B3E] transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-[#5C5C5C] text-sm leading-relaxed mb-4 flex-grow">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-[#F5F0EB] text-[#5C5C5C] text-xs rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA Links */}
        <div className="flex gap-3 mt-auto pt-2">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[#C45B3E] font-medium text-sm hover:underline"
              aria-label={`View demo for ${project.title}`}
            >
              View Demo
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[#5C5C5C] hover:text-[#C45B3E] font-medium text-sm transition-colors"
              aria-label={`View source code for ${project.title}`}
            >
              <Github className="mr-1 h-4 w-4" />
              Source
            </a>
          )}

          {project.caseStudyUrl && (
            <a
              href={project.caseStudyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[#5C5C5C] hover:text-[#C45B3E] font-medium text-sm transition-colors"
              aria-label={`View ${project.caseStudyLabel || "case study"} for ${project.title}`}
            >
              {project.caseStudyLabel || "Case Study"}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
