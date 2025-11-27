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
    <div className="bg-[#FAF9F6] min-h-screen">
      <SEO
        title="Weekend Projects | Ta Khongsap"
        description="The best way to learn is by doing. Explore Ta Khongsap's playground for tinkering and testing ideas—each project represents a question answered through building."
        canonicalUrl="/portfolio"
        type="website"
        keywords="creative projects, algorithm visualization, interactive tools, software development, coding projects, mathematics, data science, AI projects"
      />
      <SchemaMarkup type="professionalService" data={pageSchemaData} />

      {/* Hero Section */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="editorial-container text-center">
          <h1 className="editorial-headline mb-6">Weekend Projects</h1>
          <p className="editorial-prose max-w-2xl mx-auto">
            The best way to learn is by doing. These projects are my playground
            for tinkering and testing ideas—built during free time with no
            pressure.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="pb-8">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilterChange(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter.id
                    ? "bg-[#C45B3E] text-white"
                    : "bg-white border border-[#E8E4DF] text-[#5C5C5C] hover:border-[#C45B3E] hover:text-[#C45B3E]"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        <div className="divider-subtle" style={{ margin: "0 0 2rem 0" }} />
      </div>

      {/* Project Grid */}
      <section className="pb-20 md:pb-32">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#5C5C5C] text-lg">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
