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
    name: 'Ta Khongsap | Math • Code • Finance',
    description: 'Ta Khongsap - Mathematician and Software Developer combining mathematical rigor, programming expertise, and finance domain knowledge to solve complex problems with AI and data science.'
  };

  return (
    <div>
      <SEO
        title="Ta Khongsap | Math • Code • Finance"
        description="Mathematician and Software Developer leveraging AI to transform finance and business. Combining mathematical rigor, programming expertise, and domain knowledge to solve complex problems."
        canonicalUrl="/"
        keywords="mathematics, software development, finance, quantitative analysis, AI, data science, machine learning, financial modeling, algorithmic trading, domain expertise"
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
              
              {/* Newsletter Signup - Temporarily commented out */}
              {/*
              <div id="newsletter" className="bg-white p-8 rounded-lg shadow-md mb-12 border-l-4 border-primary">
                <h2 className="mb-3 text-2xl font-bold flex items-center">
                  <span className="text-primary mr-2">→</span> Join my newsletter
                </h2>
                <p className="mb-6 text-[#444444] leading-relaxed">
                  Get exclusive insights on AI trends, productivity tips, and coding breakthroughs delivered straight to your inbox.
                </p>
                <NewsletterForm />
              </div>
              */}
              
              {/* Value Propositions */}
              <div className="grid md:grid-cols-3 gap-10">
                <div className="group hover:shadow-md hover:bg-white p-5 rounded-lg transition-all duration-300 text-center">
                  <div className="flex flex-col items-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-full mb-3">
                      <BarChart className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">AI Tools & Technologies</h3>
                  </div>
                  <p className="text-[#444444] leading-relaxed">Discover how cutting-edge solutions like Google NotebookLM, Cursor AI, and LLMs supercharge workflows and amplify creativity.</p>
                </div>
                
                <div className="group hover:shadow-md hover:bg-white p-5 rounded-lg transition-all duration-300 text-center">
                  <div className="flex flex-col items-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-full mb-3">
                      <Lightbulb className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">Productivity & Efficiency</h3>
                  </div>
                  <p className="text-[#444444] leading-relaxed">Explore powerful tips—from the "90% Rule" to AI-boosted prompts—to beat perfectionism, sharpen focus, and get more done.</p>
                </div>
                
                <div className="group hover:shadow-md hover:bg-white p-5 rounded-lg transition-all duration-300 text-center">
                  <div className="flex flex-col items-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-full mb-3">
                      <Code className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">The Future of Software Development</h3>
                  </div>
                  <p className="text-[#444444] leading-relaxed">Learn how AI is reshaping coding by empowering both newcomers and pros, potentially signaling the end of "traditional" development.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        

      </div>
    </div>
  );
}
