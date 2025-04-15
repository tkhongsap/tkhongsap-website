import { ArrowRight, Github, Code } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Project } from "@/data/projects";
import OptimizedImage from "./optimized-image";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <div className={cn(
      "border border-gray-200 rounded-lg overflow-hidden group",
      "hover:shadow-lg transition-all duration-200", 
      "dark:border-gray-700 bg-white dark:bg-gray-800",
      className
    )}>
      {/* Card Layout - Horizontal with image on the left */}
      <div className="flex flex-col md:flex-row h-full">
        {/* Project Image - Left side on medium+ screens */}
        <div className="w-full md:w-1/3 h-48 md:h-auto overflow-hidden bg-gray-200 dark:bg-gray-700">
          <OptimizedImage 
            src={project.image || '#'} 
            alt={`Project thumbnail for ${project.title}`}
            height={240}
            width={400}
            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
            loading="lazy"
            objectFit="cover"
          />
        </div>
        
        {/* Content - Right side on medium+ screens */}
        <div className="flex flex-col flex-grow p-6 md:w-2/3">
          {/* Project Type */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <Badge variant="outline" className="text-xs font-medium">
              {project.category === 'ai' ? 'AI & Algorithms' : 
               project.category === 'data' ? 'Data Visualization' : 
               project.category === 'finance' ? 'Finance Tools' : 
               project.category === 'creative' ? 'Creative Coding' : 'Other'}
            </Badge>
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {project.title}
          </h3>
          
          {/* Description */}
          <div className="mb-4 flex-grow">
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>
          
          {/* Technologies */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 items-center">
              <Code className="h-3 w-3 text-gray-500" />
              {project.technologies.map((tech, index) => (
                <Badge 
                  key={index} 
                  variant="secondary"
                  className="text-xs"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="mt-auto pt-2 flex gap-3">
            {project.demoUrl && (
              <Button variant="default" size="sm" className="group/button" asChild>
                <a 
                  href={project.demoUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View live demo for ${project.title}`}
                  className="hover:no-underline"
                >
                  View Demo
                  <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover/button:translate-x-1" aria-hidden="true" />
                </a>
              </Button>
            )}
            
            {project.githubUrl && (
              <Button variant="outline" size="sm" className="group/button" asChild>
                <a 
                  href={project.githubUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View source code for ${project.title} on GitHub`}
                  className="hover:no-underline flex items-center"
                >
                  <Github className="h-4 w-4 mr-1" aria-hidden="true" />
                  Source Code
                </a>
              </Button>
            )}
            
            {project.caseStudyUrl && (
              <Button variant="outline" size="sm" className="group/button" asChild>
                <a 
                  href={project.caseStudyUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.caseStudyLabel || "Case Study"} for ${project.title}`}
                  className="hover:no-underline"
                >
                  {project.caseStudyLabel || "Case Study"}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
