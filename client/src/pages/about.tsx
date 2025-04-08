import { Linkedin, Github, ZapIcon, BrainCircuit, Share2, ArrowRight } from "lucide-react";
import SEO from "@/components/seo";
import SchemaMarkup from "@/components/schema-markup";
import OptimizedImage from "@/components/optimized-image";
import { Button } from "@/components/ui/button";

export default function About() {
  // Person schema data
  const personSchemaData = {
    name: 'Ta Khongsap',
    jobTitle: 'AI Strategist & Data Science Leader',
    description: 'AI Strategist with over 15 years of experience in data science, finance, and leadership, specializing in leveraging AI to optimize business operations and drive strategic growth.',
    url: 'https://totrakoolkhongsap.replit.app/about',
    sameAs: [
      'https://www.linkedin.com/in/totrakool-k-b504a912/',
      'https://github.com/tkhongsap'
    ]
  };

  return (
    <>
      <SEO 
        title="About | Ta Khongsap - AI Strategist"
        description="Learn about Ta Khongsap's professional journey, expertise in AI strategy, and leadership experience in data science and business transformation."
        canonicalUrl="/about"
      />
      <SchemaMarkup type="person" data={personSchemaData} />
      <div className="pt-20">
        <section id="about" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-10">Why This Matters</h2>
              
              <div className="flex flex-col md:flex-row gap-10">
                <div className="md:w-2/3">
                  
                  {/* Section 1: The 10X Multiplier */}
                  <div className="mb-8">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold">The 10X Multiplier</h3>
                    </div>
                    
                    <p className="text-lg mb-4">
                      Here's the fascinating reality of AI today: we're witnessing a profound shift where our tools themselves have become <strong>10X multipliers</strong>. Think about the most productive individuals you know—their ability to consistently exceed expectations. Now, imagine empowering those same people with AI tools that <em>exponentially amplify their impact</em>.
                    </p>
                    
                    <blockquote className="border-l-4 border-primary pl-4 py-2 bg-gray-50 italic text-gray-700 my-4">
                      Projects we might've laughed off as impossible a year ago are now tackled effortlessly.
                    </blockquote>
                    
                    <p className="text-lg">
                      Mastering AI has rapidly become an essential skill, no longer a niche expertise but as fundamental as using email. Whether you're in marketing, analytics, or leadership, competence in AI isn't optional—it's <strong>crucial for staying competitive</strong>.
                    </p>
                  </div>
                  
                  {/* Section 2: Why AI Mastery Isn't Obvious */}
                  <div className="mb-8">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold">Why AI Mastery Isn't Obvious</h3>
                    </div>
                    
                    <p className="text-lg mb-4">
                      Yet, truly effective AI usage isn't immediately obvious. People often abandon AI after initial disappointing results, missing out on its immense potential.
                    </p>
                    
                    <p className="text-lg">
                      The real magic emerges when we:
                    </p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                      <li>Refine our questions for clarity and specificity</li>
                      <li>Provide richer context to guide the AI</li>
                      <li>Iterate our approaches through experimentation</li>
                      <li>Learn from each interaction, similar to becoming fluent in a new language</li>
                    </ul>
                  </div>
                  
                  {/* Section 3: AI as a Shared Resource */}
                  <div className="mb-8">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold">AI as a Shared Resource</h3>
                    </div>
                    
                    <p className="text-lg mb-4">
                      The best teams treat AI insights as <strong>shared knowledge</strong>. When someone discovers an impactful technique, openly sharing it propels everyone forward, sparking a cycle of continuous improvement.
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
                      <p className="text-gray-700 mb-4">AI Strategist & Data Science Leader</p>
                      
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
