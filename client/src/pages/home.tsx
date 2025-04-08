import { Link } from "wouter";
import { ArrowRight, Code, BarChart, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewsletterForm from "@/components/newsletter-form";
import { projects } from "@/data/projects";
import SEO from "@/components/seo";
import SchemaMarkup from "@/components/schema-markup";

export default function Home() {
  // Get the featured project (Enterprise AI Optimization Engine)
  const featuredProject = projects.find(p => p.id === "enterprise-ai");

  // SEO data for Home page
  const homeSchemaData = {
    url: 'https://totrakoolkhongsap.replit.app/',
    name: 'Ta Khongsap | AI Strategist',
    description: 'Ta Khongsap is an AI Strategist blending data science, finance, and leadership to transform business with AI-driven innovation.'
  };

  return (
    <div>
      <SEO 
        title="Home | Ta Khongsap - AI Strategist"
        description="Ta Khongsap is an AI Strategist blending data science, finance, and leadership to transform business with AI-driven innovation."
        canonicalUrl="/"
      />
      <SchemaMarkup type="website" data={homeSchemaData} />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section id="home" className="section bg-[#F8F8F8]">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h1 className="leading-tight mb-6 text-[#333333]">
                From Algorithms to Impact: Transforming Business with AI-Driven Innovation
              </h1>
              <p className="text-xl md:text-2xl mb-10 text-[#444444]">
                I'm <span className="text-primary">Ta</span> <span className="text-[#333333]">Khongsap</span>—an AI Strategist blending data science, finance, and leadership.
              </p>
              
              {/* Newsletter Signup */}
              <div id="newsletter" className="bg-white p-8 rounded-lg shadow-sm mb-12">
                <h3 className="mb-3">Join my newsletter</h3>
                <p className="mb-6 text-[#444444]">Get insights on AI trends and updates on my weekend coding/writing projects.</p>
                <NewsletterForm />
              </div>
              
              {/* Value Propositions */}
              <div className="grid md:grid-cols-3 gap-10">
                <div className="group">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-full mr-3">
                      <BarChart className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="group-hover:text-primary transition-colors">AI Strategy</h3>
                  </div>
                  <p className="text-[#444444]">Developing AI solutions that solve real business problems and drive measurable ROI.</p>
                </div>
                
                <div className="group">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-full mr-3">
                      <Lightbulb className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="group-hover:text-primary transition-colors">Data-Driven Leadership</h3>
                  </div>
                  <p className="text-[#444444]">Bridging technical expertise with strategic business acumen for holistic solutions.</p>
                </div>
                
                <div className="group">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-full mr-3">
                      <Code className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="group-hover:text-primary transition-colors">Weekend Innovation</h3>
                  </div>
                  <p className="text-[#444444]">Sharing learnings from side projects and exploring AI's potential for societal good.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Project Section */}
        {featuredProject && (
          <section className="section bg-white">
            <div className="container">
              <div className="max-w-4xl mx-auto">
                <h2 className="mb-10">Featured Work</h2>
                
                <div className="card">
                  <div className="p-8">
                    <h3 className="mb-4">{featuredProject.title}</h3>
                    <p className="text-[#444444] mb-6">
                      {featuredProject.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredProject.technologies.map((tech, index) => (
                        <span key={index} className="bg-[#F8F8F8] px-3 py-1 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Button asChild variant="outline" className="group border-primary text-primary hover:bg-primary hover:text-white">
                      <Link href="/portfolio" className="inline-flex items-center">
                        Learn more
                        <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
