import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Project } from "@/data/projects";
import OptimizedImage from "./optimized-image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProjectCardProps {
  project: Project;
  className?: string;
  variant?: "default" | "featured" | "visual";
}

export default function ProjectCard({
  project,
  className,
  variant = "default"
}: ProjectCardProps) {
  const categoryLabels: Record<string, string> = {
    apps: "Applications",
    tools: "Tools & Utilities",
    experiments: "Experiments",
  };

  const isFeatured = variant === "featured";
  const isVisual = variant === "visual";

  // For visual variant, get the primary URL (demo first, then github)
  const primaryUrl = project.demoUrl || project.githubUrl;

  // Visual variant card - entire card is clickable
  if (isVisual) {
    return (
      <a
        href={primaryUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group project-card-visual maximalist-card overflow-hidden flex flex-col h-full block",
          className
        )}
        aria-label={`View ${project.title}`}
      >
        {/* Project Image with Hover Overlay */}
        <div className="relative overflow-hidden aspect-[4/3]">
          {project.image ? (
            <OptimizedImage
              src={project.image}
              alt={`Project thumbnail for ${project.title}`}
              height={300}
              width={400}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              loading="lazy"
              objectFit="cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#F5F0EB] to-[#E8E4DF] flex items-center justify-center">
              <span className="text-[#5C5C5C] text-4xl font-display">
                {project.title.charAt(0)}
              </span>
            </div>
          )}

          {/* Category badge overlay */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-block px-3 py-1.5 bg-white/90 backdrop-blur-sm text-[#1A1A1A] text-xs font-medium tracking-wider uppercase rounded-sm shadow-sm">
              {categoryLabels[project.category] || "Project"}
            </span>
          </div>

          {/* Impact badge overlay */}
          {project.impactBadge && (
            <div className="absolute bottom-4 right-4 z-10">
              <span className="inline-block px-3 py-1.5 bg-[#C45B3E] text-white text-xs font-semibold tracking-wide rounded-sm shadow-md">
                {project.impactBadge}
              </span>
            </div>
          )}

          {/* Hover overlay with CTA */}
          <div className="project-card-visual-overlay">
            <span className="cta-text">
              View Project
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-6">
          {/* Title */}
          <h3 className="font-display text-xl md:text-2xl font-medium leading-tight mb-3 group-hover:text-[#C45B3E] transition-colors duration-300">
            {project.title}
          </h3>

          {/* Short Description */}
          <p className="text-[#5C5C5C] text-sm md:text-base leading-relaxed mb-4 line-clamp-2">
            {project.shortDescription || project.description}
          </p>

          {/* Technologies - limited to 3 */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.technologies.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-[#F5F0EB] text-[#5C5C5C] text-xs font-medium tracking-wide border border-[#E8E4DF]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </a>
    );
  }

  // Default and Featured variant
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

          {/* Impact badge overlay */}
          {project.impactBadge && (
            <div className="absolute bottom-4 right-4">
              <span className="inline-block px-3 py-1.5 bg-[#C45B3E] text-white text-xs font-semibold tracking-wide rounded-sm shadow-md">
                {project.impactBadge}
              </span>
            </div>
          )}
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

        {/* Technical Details Accordion */}
        {project.technicalDetails && (
          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="details" className="border-[#E8E4DF]">
              <AccordionTrigger className="text-sm text-[#5C5C5C] hover:text-[#C45B3E] hover:no-underline py-3">
                View Technical Details
              </AccordionTrigger>
              <AccordionContent className="text-sm">
                <div className="space-y-4 pt-2">
                  {project.technicalDetails.approach && (
                    <div>
                      <h4 className="font-semibold text-[#1A1A1A] mb-1">Approach</h4>
                      <p className="text-[#5C5C5C] leading-relaxed">
                        {project.technicalDetails.approach}
                      </p>
                    </div>
                  )}

                  {project.technicalDetails.architecture && (
                    <div>
                      <h4 className="font-semibold text-[#1A1A1A] mb-1">Architecture</h4>
                      <p className="text-[#5C5C5C] leading-relaxed">
                        {project.technicalDetails.architecture}
                      </p>
                    </div>
                  )}

                  {project.technicalDetails.metrics && project.technicalDetails.metrics.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-[#1A1A1A] mb-2">Key Metrics</h4>
                      <ul className="space-y-1">
                        {project.technicalDetails.metrics.map((metric, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-[#5C5C5C]">
                            <span className="text-[#C45B3E] mt-1">•</span>
                            <span>{metric}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.technicalDetails.techStack && project.technicalDetails.techStack.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-[#1A1A1A] mb-2">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technicalDetails.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-[#F5F0EB] text-[#5C5C5C] text-xs font-medium border border-[#E8E4DF] rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>
    </article>
  );
}
