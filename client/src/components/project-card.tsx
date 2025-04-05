import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { Project } from "@/data/projects";

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
        {project.image && (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <svg className="w-full h-48 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" fill="none"/>
              <path d="M4 5H20V19H4V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 5L12 13L20 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 19L9 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 19L15 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
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
            >
              <Github size={20} />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
