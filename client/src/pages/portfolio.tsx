import { useState } from "react";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/project-card";

type ProjectCategory = 'all' | 'ai' | 'data' | 'finance';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');

  const handleFilterChange = (filter: ProjectCategory) => {
    setActiveFilter(filter);
  };

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="pt-20">
      <section id="portfolio" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Portfolio</h2>
            <p className="text-lg text-gray-700 mb-10">A selection of AI solutions, MVPs, and POCs I've worked on.</p>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Button 
                variant={activeFilter === 'all' ? 'default' : 'outline'}
                onClick={() => handleFilterChange('all')}
                className={activeFilter === 'all' ? 'bg-primary text-white' : ''}
              >
                All Projects
              </Button>
              <Button 
                variant={activeFilter === 'ai' ? 'default' : 'outline'}
                onClick={() => handleFilterChange('ai')}
                className={activeFilter === 'ai' ? 'bg-primary text-white' : ''}
              >
                AI Solutions
              </Button>
              <Button 
                variant={activeFilter === 'data' ? 'default' : 'outline'}
                onClick={() => handleFilterChange('data')}
                className={activeFilter === 'data' ? 'bg-primary text-white' : ''}
              >
                Data Analysis
              </Button>
              <Button 
                variant={activeFilter === 'finance' ? 'default' : 'outline'}
                onClick={() => handleFilterChange('finance')}
                className={activeFilter === 'finance' ? 'bg-primary text-white' : ''}
              >
                Finance
              </Button>
            </div>
            
            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
              
              {filteredProjects.length === 0 && (
                <div className="col-span-3 text-center py-12">
                  <p className="text-gray-500 text-lg">No projects found in this category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
