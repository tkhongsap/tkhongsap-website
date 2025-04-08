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

  // SEO data for Home page with enhanced structured data
  const homeSchemaData = {
    url: 'https://tkhongsap.io/',
    name: 'Totrakool Khongsap | AI Strategist & Data Scientist',
    description: 'Totrakool Khongsap is an AI Strategist and Data Scientist specializing in enterprise AI transformation, machine learning solutions, and data-driven business strategies that deliver measurable ROI.'
  };

  return (
    <div>
      <SEO 
        title="AI Strategy & Data Science Expert | Totrakool Khongsap"
        description="Expert in AI strategy, machine learning, and data science solutions that deliver measurable business impact. Helping organizations transform with data-driven innovation."
        canonicalUrl="/"
        keywords="AI strategy, data science expert, machine learning solutions, enterprise AI, digital transformation, business intelligence, ROI-focused AI"
        pageUrl="/"
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
                <h2 className="mb-3 text-2xl">Join my newsletter</h2>
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
                <h2 className="mb-6">Featured Work</h2>
                
                <p className="mb-8 text-lg content-container">
                  Explore my portfolio of enterprise AI solutions and data science projects that demonstrate 
                  practical applications of machine learning, deep learning, and business intelligence systems.
                </p>
                
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
        
        {/* Added SEO-focused content section */}
        <section className="section bg-[#F8F8F8]">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="mb-6">AI Strategy for Business Transformation</h2>
              
              <div className="content-container">
                <p className="mb-4">
                  As an experienced AI Strategist and Data Scientist, I help organizations leverage artificial intelligence 
                  to transform their operations, improve decision-making processes, and create sustainable competitive advantages.
                </p>
                
                <p className="mb-4">
                  My approach combines technical expertise in machine learning, deep learning, and data science with practical 
                  business acumen to deliver solutions that generate measurable ROI and meaningful business impact.
                </p>
                
                <h3 className="mt-8 mb-4">Services & Expertise</h3>
                
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li><strong>Enterprise AI Transformation</strong> - Strategic roadmapping and implementation for organization-wide AI adoption</li>
                  <li><strong>Machine Learning Solutions</strong> - Custom ML models and algorithms for specific business challenges</li>
                  <li><strong>Data Strategy</strong> - Data infrastructure, governance, and analytics implementation</li>
                  <li><strong>AI Product Development</strong> - From concept to deployment and continuous improvement</li>
                  <li><strong>ROI-Focused Analytics</strong> - Business intelligence systems that drive measurable value</li>
                </ul>
                
                <div className="flex justify-center mt-8">
                  <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                    <Link href="/contact" className="inline-flex items-center">
                      Discuss Your AI Project
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
