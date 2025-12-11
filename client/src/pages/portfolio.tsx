import { useState } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/project-card";
import SEO from "@/components/seo";
import SchemaMarkup from "@/components/schema-markup";
import MathToBusinessCard from "@/components/math-to-business-card";
import PersonaCard from "@/components/persona-card";
import ServicesSection from "@/components/services-section";
import { TrendingUp, Activity, Network, BarChart3, Truck, Brain, LineChart } from "lucide-react";

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
    name: "Ta Khongsap - After Hours",
    description:
      "Passion projects built on my own time. I prototype the systems I want in real life: agents that review code, optimizers that route trucks, tools that evaluate AI outputs.",
    serviceType: [
      "AI & Automation",
      "Analytics & Optimization",
      "AI Evaluation & Benchmarks",
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

  const mathToBusinessData = [
    {
      icon: TrendingUp,
      mathConcept: "Optimization",
      businessApplication: "Smarter routing & resource allocation",
      description:
        "Constraints, capacity, time windows—I model real operational limits to build routing engines that reduce cost and improve reliability.",
    },
    {
      icon: Activity,
      mathConcept: "Signal Processing",
      businessApplication: "Cleaner financial & demand signals",
      description:
        "Fourier transforms and wavelets cut through noisy data, making forecasts and alerts trustworthy for real decisions.",
    },
    {
      icon: Network,
      mathConcept: "Representation Theory",
      businessApplication: "Better embeddings & semantic search",
      description:
        "Understanding how structures transform helps build embeddings that capture meaning, powering RAG systems and recommendations.",
    },
    {
      icon: BarChart3,
      mathConcept: "Statistical Inference",
      businessApplication: "Rigorous A/B testing & evaluation",
      description:
        "Beyond p-values: proper experimental design and causal reasoning for decisions that actually move metrics.",
    },
  ];

  const personasData = [
    {
      icon: Truck,
      title: "Operations & Logistics Leaders",
      painPoint:
        "Struggling with dirty data, slow nightly jobs, or fragile routing logic that breaks when reality doesn't match the model.",
      whatIDo:
        "Design control towers, routing optimizers, and data pipelines that handle real-world messiness.",
    },
    {
      icon: Brain,
      title: "AI & Data Platform Teams",
      painPoint:
        "Need to trust RAG systems, coding assistants, or agents in production—but lack rigorous evaluation.",
      whatIDo:
        "Build evaluation frameworks, agent workflows, and benchmarks that catch failures before users do.",
    },
    {
      icon: LineChart,
      title: "Finance & Strategy Teams",
      painPoint:
        "Want forecasting and analytics that are statistically sound, not just pretty dashboards that mislead.",
      whatIDo:
        "Apply signal processing, time-series models, and proper A/B testing to questions that involve real money.",
    },
  ];

  return (
    <div className="min-h-screen gradient-mesh-warm grain-overlay relative overflow-hidden">
      <SEO
        title="After Hours | Ta Khongsap"
        description="Passion projects built on my own time. Prototyping AI agents, routing optimizers, and evaluation tools—experiments that grow into production systems."
        canonicalUrl="/portfolio"
        type="website"
        keywords="AI agents, routing optimization, RAG systems, code review automation, data pipelines, machine learning, enterprise AI, software development"
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
                Passion Projects, Real-World Thinking
              </span>
              <h1 className="maximalist-headline decorative-line animate-fade-in-up delay-100">
                After
                <br />
                <span className="italic text-[#C45B3E]">Hours</span>
              </h1>
            </div>

            {/* Subtext - offset to the right */}
            <div className="lg:col-span-4 lg:pb-4">
              <p className="maximalist-subhead animate-fade-in-up delay-300">
                What I build on my own time: agents that review code,
                optimizers that route trucks, tools that evaluate AI outputs.
                Some stay as demos. Some grow into production systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* From Mathematics to Business Impact Section */}
      <section className="py-16 md:py-24 relative z-10">
        <div className="container max-w-6xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block text-[#C45B3E] font-sans text-sm font-medium tracking-widest uppercase mb-4 animate-fade-in-up">
              The Foundation
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] animate-fade-in-up delay-100">
              From Mathematics to{" "}
              <span className="italic text-[#C45B3E]">Business Impact</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-[#5C5C5C] font-sans text-lg animate-fade-in-up delay-200">
              Academic rigor meets real-world constraints. Here's how mathematical thinking translates into systems that work.
            </p>
          </div>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {mathToBusinessData.map((card, index) => (
              <MathToBusinessCard
                key={card.mathConcept}
                icon={card.icon}
                mathConcept={card.mathConcept}
                businessApplication={card.businessApplication}
                description={card.description}
                index={index}
              />
            ))}
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

      {/* Who I Usually Help Section */}
      <section className="py-16 md:py-24 relative z-10 bg-[#F5F0EB]/50">
        <div className="container max-w-6xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block text-[#C45B3E] font-sans text-sm font-medium tracking-widest uppercase mb-4 animate-fade-in-up">
              Who I Work With
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] animate-fade-in-up delay-100">
              Who I Usually{" "}
              <span className="italic text-[#C45B3E]">Help</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-[#5C5C5C] font-sans text-lg animate-fade-in-up delay-200">
              Three types of teams that get the most value from working with me.
            </p>
          </div>

          {/* 3-column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {personasData.map((persona, index) => (
              <PersonaCard
                key={persona.title}
                icon={persona.icon}
                title={persona.title}
                painPoint={persona.painPoint}
                whatIDo={persona.whatIDo}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Work With Me / Services Section */}
      <ServicesSection />

      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C45B3E] to-transparent opacity-20" aria-hidden="true" />
    </div>
  );
}
