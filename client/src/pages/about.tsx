import { Linkedin, Github } from "lucide-react";
import SEO from "@/components/seo";
import SchemaMarkup from "@/components/schema-markup";
import OptimizedImage from "@/components/optimized-image";

export default function About() {
  // Person schema data
  const personSchemaData = {
    name: 'Totrakool Khongsap',
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
        title="About | Totrakool Khongsap - AI Strategist"
        description="Learn about Totrakool Khongsap's professional journey, expertise in AI strategy, and leadership experience in data science and business transformation."
        canonicalUrl="/about"
      />
      <SchemaMarkup type="person" data={personSchemaData} />
      <div className="pt-20">
        <section id="about" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-10">About Me</h2>
              
              <div className="flex flex-col md:flex-row gap-10">
                <div className="md:w-2/3">
                  <p className="text-lg mb-6">
                    Here's the fascinating reality of AI today: we're witnessing a profound shift where our tools themselves have become 10X multipliers. Think about the most productive individuals you know—their ability to consistently exceed expectations. Now, imagine empowering those same people with AI tools that exponentially amplify their impact. Projects we might've laughed off as impossible a year ago are now tackled effortlessly.
                  </p>
                  <p className="text-lg mb-6">
                    Mastering AI has rapidly become an essential skill, no longer a niche expertise but as fundamental as using email. Whether you're in marketing, analytics, or leadership, competence in AI isn't optional—it's crucial for staying competitive.
                  </p>
                  <p className="text-lg mb-6">
                    Yet, truly effective AI usage isn't immediately obvious. People often abandon AI after initial disappointing results, missing out on its immense potential. The real magic emerges when we refine our questions, provide richer context, and iterate our approaches—similar to becoming fluent in a new language.
                  </p>
                  <p className="text-lg mb-8">
                    The best teams treat AI insights as shared knowledge. When someone discovers an impactful technique, openly sharing it propels everyone forward, sparking a cycle of continuous improvement.
                  </p>
                </div>
                
                <div className="md:w-1/3">
                  <div className="bg-gray-100 rounded-lg p-6">
                    <div className="mb-6 flex justify-center">
                      <div className="w-48 h-48 rounded-full overflow-hidden flex items-center justify-center border-2 border-primary">
                        <OptimizedImage 
                          src="/assets/profile-picture.jpg" 
                          alt="Totrakool Khongsap profile picture"
                          width={190}
                          height={190}
                          objectFit="cover"
                          className="rounded-full"
                        />
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-2">Totrakool Khongsap</h3>
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
