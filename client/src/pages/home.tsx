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
    description: 'Totrakool Khongsap helps businesses implement AI solutions that supercharge their boldest projects and deliver measurable results, moving beyond existing limitations.'
  };

  return (
    <div>
      <SEO 
        title="AI Strategy & Data Science Expert | Totrakool Khongsap"
        description="AI isn't an option—it's the new baseline. Discover how the right AI implementations can supercharge your boldest projects and help you outpace old expectations."
        canonicalUrl="/"
        keywords="AI implementation, data science, AI solutions, enterprise AI, digital transformation, business intelligence, AI strategy, AI baseline"
        pageUrl="/"
      />
      <SchemaMarkup type="website" data={homeSchemaData} />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section id="home" className="section bg-[#F8F8F8]">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-8 text-[#333333]">
                AI Isn't an Option<span className="text-primary">—</span>It's the <span className="text-primary">New Baseline</span>
              </h1>
              <div className="space-y-4 mb-10">
                <p className="text-lg md:text-xl leading-relaxed text-[#444444]">
                  We're entering an extraordinary era—one where we can create more than ever before.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-[#444444]">
                  At every step, progress demands skill, judgment, and knowledge. Now, by embracing AI as an active collaborator rather than a mere consultant, we're revolutionizing the very notion of what's possible.
                </p>
              </div>
              
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
        

      </div>
    </div>
  );
}
