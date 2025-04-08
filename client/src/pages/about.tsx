import { Check } from "lucide-react";
import { Linkedin, Github } from "lucide-react";
import SEO from "@/components/seo";
import SchemaMarkup from "@/components/schema-markup";
import OptimizedImage from "@/components/optimized-image";

export default function About() {
  const expertiseAreas = [
    "Strategic AI implementation & business optimization",
    "Data-driven decision making & performance management",
    "Financial strategy & analytics",
    "Python programming & data science",
    "Cross-functional leadership & team development"
  ];

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
                    With over 15 years of experience in data science, finance, and leadership, I specialize in leveraging AI to optimize business operations and drive strategic growth.
                  </p>
                  <p className="text-lg mb-6">
                    My background bridges technical expertise with business acumen, allowing me to translate complex AI concepts into tangible business value. Throughout my career, I've worked with organizations ranging from startups to enterprise corporations, helping them harness the power of data and AI.
                  </p>
                  <p className="text-lg mb-8">
                    Beyond my professional work, I'm passionate about weekend coding projects and writing about technology and well-being. I firmly believe in AI's potential to foster societal peace and prosperity when developed and deployed responsibly.
                  </p>
                  
                  <blockquote className="border-l-4 border-primary pl-4 italic text-gray-700 mb-8">
                    My mission is to democratize AI knowledge and create solutions that not only optimize business performance but also contribute positively to society at large.
                  </blockquote>
                  
                  <h3 className="text-xl font-bold mb-4">Areas of Expertise</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                    {expertiseAreas.map((area, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="md:w-1/3">
                  <div className="bg-gray-100 rounded-lg p-6">
                    <div className="mb-6 flex justify-center">
                      <div className="w-48 h-48 rounded-full overflow-hidden flex items-center justify-center border-2 border-primary">
                        <OptimizedImage 
                          src="/assets/profile-picture.png" 
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
