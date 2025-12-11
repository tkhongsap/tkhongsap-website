import { useState } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/project-card";
import SEO from "@/components/seo";
import SchemaMarkup from "@/components/schema-markup";

type ProjectCategory = "all" | "ai" | "data" | "finance" | "creative";

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");

  const handleFilterChange = (filter: ProjectCategory) => {
    setActiveFilter(filter);
  };

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const pageSchemaData = {
    name: "Ta Khongsap - Weekend Projects",
    description:
      "The best way to learn is by doing. These projects are my playground for tinkering and testing ideas—built during free time with no pressure.",
    serviceType: [
      "Creative Coding",
      "Algorithm Visualization",
      "Interactive Tools",
    ],
    url: "https://tkhongsap.io/portfolio",
  };

  const filters: { id: ProjectCategory; label: string }[] = [
    { id: "all", label: "All" },
    { id: "ai", label: "AI Solutions" },
    { id: "data", label: "Data Analysis" },
    { id: "finance", label: "Finance" },
    { id: "creative", label: "Creative" },
  ];

  return (
    <div className="min-h-screen gradient-mesh-warm grain-overlay relative overflow-hidden">
      <SEO
        title="Weekend Projects | Ta Khongsap"
        description="The best way to learn is by doing. Explore Ta Khongsap's playground for tinkering and testing ideas—each project represents a question answered through building."
        canonicalUrl="/portfolio"
        type="website"
        keywords="creative projects, algorithm visualization, interactive tools, software development, coding projects, mathematics, data science, AI projects"
      />
      <SchemaMarkup type="professionalService" data={pageSchemaData} />

      {/* Decorative geometric elements */}
      <div className="geo-accent top-20 -right-24 opacity-40" aria-hidden="true" />
      <div className="geo-accent-square top-40 left-10 opacity-30" aria-hidden="true" />
      <div className="geo-accent bottom-40 -left-32 opacity-20" aria-hidden="true" />

      {/* Hero Section - Asymmetric Editorial Layout */}
      <section className="pt-32 pb-16 md:pt-44 md:pb-24 relative z-10">
        <div className="container max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            {/* Main headline - takes up most space */}
            <div className="lg:col-span-8">
              <span className="inline-block text-[#C45B3E] font-sans text-sm font-medium tracking-widest uppercase mb-6 animate-fade-in-up">
                Creative Playground
              </span>
              <h1 className="maximalist-headline decorative-line animate-fade-in-up delay-100">
                Weekend
                <br />
                <span className="italic text-[#C45B3E]">Projects</span>
              </h1>
            </div>

            {/* Subtext - offset to the right */}
            <div className="lg:col-span-4 lg:pb-4">
              <p className="maximalist-subhead animate-fade-in-up delay-300">
                The best way to learn is by doing. These projects are my 
                playground for tinkering and testing ideas—built during 
                free time with no pressure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Diagonal Divider */}
      <div className="diagonal-divider" aria-hidden="true" />

      {/* Filter Section - Maximalist Style */}
      <section className="py-8 md:py-12 relative z-10">
        <div className="container max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex flex-wrap justify-start gap-1 md:gap-2">
            {filters.map((filter, index) => (
              <button
                key={filter.id}
                onClick={() => handleFilterChange(filter.id)}
                className={`filter-btn-maximalist animate-fade-in-up ${
                  activeFilter === filter.id ? "active" : ""
                }`}
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project Grid - Asymmetric Masonry-like Layout */}
      <section className="pb-24 md:pb-40 relative z-10">
        <div className="container max-w-6xl mx-auto px-6 md:px-8">
          {/* Grid with varied card sizes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8">
            {filteredProjects.map((project, index) => {
              // Create asymmetric layout pattern
              const isLarge = index === 0;
              const isOffset = index % 3 === 1;
              
              return (
                <div
                  key={project.id}
                  className={`
                    animate-fade-in-up
                    ${isLarge ? "lg:col-span-7" : "lg:col-span-5"}
                    ${isOffset ? "lg:mt-12" : ""}
                  `}
                  style={{ animationDelay: `${(index + 1) * 150}ms` }}
                >
                  <ProjectCard 
                    project={project} 
                    variant={isLarge ? "featured" : "default"}
                  />
                </div>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="font-display text-2xl text-[#5C5C5C] italic">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C45B3E] to-transparent opacity-20" aria-hidden="true" />
    </div>
  );
}
