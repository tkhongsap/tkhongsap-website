import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { Project } from "@/data/projects";
import OptimizedImage from "./optimized-image";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300",
        isHovered ? "shadow-lg" : "shadow-md"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-48 bg-gray-200 relative">
        <OptimizedImage 
          src={project.image || '#'} 
          alt={`Project thumbnail for ${project.title}`}
          height={192}
          className="w-full h-full object-cover"
        />
      </div>
      
      <CardContent className="p-5">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-700 mb-3">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <Badge key={index} variant="outline" className="bg-gray-100 text-gray-700 rounded-full text-xs">
              {tech}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          {project.caseStudyUrl && (
            <a 
              href={project.caseStudyUrl} 
              className="text-primary font-medium hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.caseStudyLabel || "Case Study"} for ${project.title}`}
            >
              {project.caseStudyLabel || "Case Study"}
            </a>
          )}
          
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              className="text-gray-600 hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View source code for ${project.title} on GitHub`}
            >
              <Github size={20} aria-hidden="true" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
