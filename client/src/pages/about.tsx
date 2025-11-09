import { Linkedin, Github, ZapIcon, BrainCircuit, Share2, ArrowRight } from "lucide-react";
import SEO from "@/components/seo";
import SchemaMarkup from "@/components/schema-markup";
import OptimizedImage from "@/components/optimized-image";
import { Button } from "@/components/ui/button";

export default function About() {
  // Person schema data
  const personSchemaData = {
    name: 'Ta Khongsap',
    jobTitle: 'Domain Expert: Math, Data Science, AI & Supply Chain',
    description: 'Domain expert in Mathematics, Data Science, Software Development, AI, and Supply Chain. Leveraging mathematical rigor, data-driven insights, and programming skills to solve complex problems in finance, operations, and logistics.',
    url: 'https://tkhongsap.io/about',
    sameAs: [
      'https://www.linkedin.com/in/totrakool-k-b504a912/',
      'https://github.com/tkhongsap'
    ]
  };

  return (
    <>
      <SEO
        title="About Ta Khongsap | Math, Data Science, AI & Supply Chain Expert"
        description="Learn about Ta Khongsap's expertise in mathematics, data science, software development, AI, and supply chain. Discover how mathematical rigor, data-driven insights, and domain knowledge solve complex problems in finance, operations, and logistics."
        canonicalUrl="/about"
        keywords="mathematician, data scientist, software developer, AI expert, supply chain optimization, operations research, logistics, quantitative analysis, machine learning, domain expertise"
      />
      <SchemaMarkup type="person" data={personSchemaData} />
      <div className="pt-20">
        <section id="about" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-10">The Game Has Changed</h2>
              
              <div className="flex flex-col md:flex-row gap-10">
                <div className="md:w-2/3">
                  
                  {/* Section 1: The Leverage Revolution */}
                  <div className="mb-8">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold">AI Is the New Leverage</h3>
                    </div>
                    
                    <p className="text-lg mb-4">
                      The internet gave us <strong>access</strong>. AI gives us <strong>leverage</strong>.
                    </p>
                    
                    <p className="text-lg mb-4">
                      One person with the right AI tools now outproduces entire teams from five years ago.
                    </p>
                    
                    <blockquote className="border-l-4 border-primary pl-4 py-2 bg-gray-50 italic text-gray-700 my-4">
                      What seemed impossible yesterday is Tuesday's work today.
                    </blockquote>
                    
                    <p className="text-lg">
                      This isn't about being <em>tech-savvy</em>. It's about understanding <strong>systems of leverage</strong>.
                    </p>
                  </div>
                  
                  {/* Section 2: The Hidden Truth */}
                  <div className="mb-8">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold">Most People Use AI Wrong</h3>
                    </div>
                    
                    <p className="text-lg mb-4">
                      They treat AI like Google. Ask once, get disappointed, quit.
                    </p>
                    
                    <p className="text-lg mb-4">
                      Real AI mastery is a conversation, not a transaction.
                    </p>
                    
                    <p className="text-lg mb-2">
                      The breakthrough happens when you:
                    </p>
                    <ul className="list-none pl-0 mb-4 space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Ask better questions (specificity beats generality)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Provide context (AI needs to understand your world)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Iterate relentlessly (every conversation teaches both of you)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Think in systems (not just tasks)</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Section 3: Network Effects */}
                  <div className="mb-8">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold">Knowledge Compounds</h3>
                    </div>
                    
                    <p className="text-lg mb-4">
                      The best teams don't hoard AI insights. They <strong>share them</strong>.
                    </p>
                    
                    <p className="text-lg mb-4">
                      When you discover a powerful technique and teach it to others, you create a network effect that benefits everyone—including you.
                    </p>
                    
                    <p className="text-lg">
                      Abundance mindset wins in the AI era. <em>Scarcity thinking loses</em>.
                    </p>
                  </div>

                  {/* Section 4: The Bottom Line */}
                  <div className="mb-8">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold">The Real Opportunity</h3>
                    </div>
                    
                    <p className="text-lg mb-4">
                      Most people are still figuring out email while others are building AI-powered empires.
                    </p>
                    
                    <p className="text-lg">
                      The question isn't whether AI will change everything. It's whether <strong>you'll be ahead of the curve or behind it</strong>.
                    </p>
                  </div>

                  {/* Navigation buttons section - currently empty */}
                  <div className="mt-10 mb-8">
                    <div className="flex flex-wrap gap-4">
                      {/* Contact button removed temporarily during initial launch */}
                      {/* Portfolio button removed temporarily - under construction */}
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/3">
                  <div className="bg-gray-100 rounded-lg p-6">
                    <div className="mb-6 flex justify-center">
                      <div className="w-48 h-48 rounded-full overflow-hidden flex items-center justify-center border-2 border-primary">
                        <OptimizedImage 
                          src="/images/Ta Khongsap OPEN-TEC.jpg" 
                          alt="Ta Khongsap profile picture"
                          width={180}
                          height={180}
                          objectFit="cover"
                          className="rounded-full w-full h-full"
                          priority={true}
                        />
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-2"><span className="text-primary">Ta</span> <span className="text-gray-800">Khongsap</span></h3>
                      <p className="text-gray-700 mb-4">Math • Data Science • AI • Supply Chain</p>
                      
                      <div className="flex justify-center space-x-4">
                        <a 
                          href="https://www.linkedin.com/in/totrakool-k-b504a912/" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-gray-700 hover:text-primary transition-colors"
                          aria-label="LinkedIn"
                        >
                          <Linkedin size={24} />
                        </a>
                        <a 
                          href="https://github.com/tkhongsap" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-gray-700 hover:text-primary transition-colors"
                          aria-label="GitHub"
                        >
                          <Github size={24} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
