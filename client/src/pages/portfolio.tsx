import { useState } from "react";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/project-card";
import SEO from "@/components/seo";
import SchemaMarkup from "@/components/schema-markup";

type ProjectCategory = 'all' | 'ai' | 'data' | 'finance';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');

  const handleFilterChange = (filter: ProjectCategory) => {
    setActiveFilter(filter);
  };

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  // Schema data for Weekend Projects page
  const pageSchemaData = {
    name: 'Ta Khongsap - Weekend Projects',
    description: 'A collection of fun and innovative personal projects I build during my free time, showcasing creative problem-solving and coding skills.',
    serviceType: ['Creative Coding', 'Algorithm Visualization', 'Interactive Tools'],
    url: 'https://totrakoolkhongsap.replit.app/portfolio'
  };

  return (
    <div>
      <SEO 
        title="Weekend Projects | Ta Khongsap"
        description="Explore Ta Khongsap's creative weekend projects, including algorithm visualizations and interactive tools built for fun and learning."
        canonicalUrl="/portfolio"
        type="website"
      />
      <SchemaMarkup type="professionalService" data={pageSchemaData} />
      
      <div className="pt-20">
        <section id="weekend-projects" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Weekend Projects</h2>
              <p className="text-lg text-gray-700 mb-10">A collection of creative personal projects I build during my free time to explore new ideas and technologies.</p>
              
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
    </div>
  );
}
