import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Project } from "@/data/projects";
import OptimizedImage from "./optimized-image";

interface ProjectCardProps {
  project: Project;
  className?: string;
  variant?: "default" | "featured";
}

export default function ProjectCard({ 
  project, 
  className,
  variant = "default" 
}: ProjectCardProps) {
  const categoryLabels: Record<string, string> = {
    ai: "AI & Algorithms",
    data: "Data Visualization",
    finance: "Finance Tools",
    creative: "Creative Coding",
  };

  const isFeatured = variant === "featured";

  return (
    <article
      className={cn(
        "group maximalist-card overflow-hidden flex flex-col h-full",
        isFeatured && "lg:flex-row",
        className
      )}
    >
      {/* Project Image */}
      {project.image && (
        <div className={cn(
          "relative overflow-hidden",
          isFeatured ? "lg:w-1/2 aspect-[4/3] lg:aspect-auto" : "aspect-[16/10]"
        )}>
          <OptimizedImage
            src={project.image}
            alt={`Project thumbnail for ${project.title}`}
            height={isFeatured ? 400 : 240}
            width={isFeatured ? 600 : 400}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
            loading="lazy"
            objectFit="cover"
          />
          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Category badge overlay */}
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1.5 bg-white/90 backdrop-blur-sm text-[#1A1A1A] text-xs font-medium tracking-wider uppercase rounded-sm shadow-sm">
              {categoryLabels[project.category] || "Project"}
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className={cn(
        "flex flex-col flex-grow p-6 md:p-8",
        isFeatured && "lg:w-1/2 lg:justify-center"
      )}>
        {/* Title */}
        <h3 className={cn(
          "font-display leading-tight mb-4 group-hover:text-[#C45B3E] transition-colors duration-300",
          isFeatured 
            ? "text-2xl md:text-3xl font-medium" 
            : "text-xl md:text-2xl font-medium"
        )}>
          {project.title}
        </h3>

        {/* Description */}
        <p className={cn(
          "text-[#5C5C5C] leading-relaxed mb-6",
          isFeatured ? "text-base md:text-lg" : "text-sm md:text-base",
          !isFeatured && "line-clamp-3"
        )}>
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.slice(0, isFeatured ? 6 : 4).map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-[#F5F0EB] text-[#5C5C5C] text-xs font-medium tracking-wide border border-[#E8E4DF] transition-colors duration-300 hover:border-[#C45B3E] hover:text-[#C45B3E]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA Links */}
        <div className="flex flex-wrap gap-4 mt-auto pt-2 border-t border-[#E8E4DF]">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#C45B3E] font-medium text-sm tracking-wide hover:gap-3 transition-all duration-300"
              aria-label={`View demo for ${project.title}`}
            >
              <span>View Demo</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#5C5C5C] hover:text-[#1A1A1A] font-medium text-sm tracking-wide transition-colors duration-300"
              aria-label={`View source code for ${project.title}`}
            >
              <Github className="h-4 w-4" />
              <span>Source</span>
            </a>
          )}

          {project.caseStudyUrl && (
            <a
              href={project.caseStudyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#5C5C5C] hover:text-[#1A1A1A] font-medium text-sm tracking-wide transition-colors duration-300"
              aria-label={`View ${project.caseStudyLabel || "case study"} for ${project.title}`}
            >
              <ExternalLink className="h-4 w-4" />
              <span>{project.caseStudyLabel || "Case Study"}</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
