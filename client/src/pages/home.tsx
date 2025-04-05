import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewsletterForm from "@/components/newsletter-form";
import { projects } from "@/data/projects";

export default function Home() {
  // Get the featured project (Enterprise AI Optimization Engine)
  const featuredProject = projects.find(p => p.id === "enterprise-ai");

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section id="home" className="pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              From Algorithms to Impact: Transforming Business with AI-Driven Innovation
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-700">
              I'm Totrakool Khongsap—an AI Strategist blending data science, finance, and leadership.
            </p>
            
            {/* Newsletter Signup */}
            <div className="bg-gray-100 p-6 rounded-lg mb-12">
              <h3 className="text-xl font-semibold mb-3">Join my newsletter</h3>
              <p className="mb-4">Get insights on AI trends and updates on my weekend coding/writing projects.</p>
              <NewsletterForm />
            </div>
            
            {/* Value Propositions */}
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">AI Strategy</h3>
                <p className="text-gray-700">Developing AI solutions that solve real business problems and drive measurable ROI.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Data-Driven Leadership</h3>
                <p className="text-gray-700">Bridging technical expertise with strategic business acumen for holistic solutions.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Weekend Innovation</h3>
                <p className="text-gray-700">Sharing learnings from side projects and exploring AI's potential for societal good.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Project Section */}
      {featuredProject && (
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-10">Featured Work</h2>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{featuredProject.title}</h3>
                  <p className="text-gray-700 mb-4">
                    {featuredProject.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredProject.technologies.map((tech, index) => (
                      <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link href="/portfolio" className="text-primary font-medium inline-flex items-center hover:underline">
                    Learn more
                    <ArrowRight className="h-5 w-5 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
