import { useState, useEffect } from "react";
import { 
  ArrowRight, 
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft, 
  LayoutGrid, 
  X, 
  ArrowRightCircle, 
  Download
} from "lucide-react";
import SEO from "@/components/seo";
import SchemaMarkup from "@/components/schema-markup";
import OptimizedImage from "@/components/optimized-image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SirisoftCSEO() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAgenda, setShowAgenda] = useState(false);
  
  // Professional service schema data
  const professionalServiceSchemaData = {
    name: 'Chief Solution Engineering Officer Vision Brief - Ta Khongsap',
    description: 'Vision brief for the CSEO role at Sirisoft, focusing on AI strategy, implementation, and leadership.',
    provider: {
      name: 'Ta Khongsap',
      url: 'https://totrakoolkhongsap.replit.app'
    }
  };

  // Define all slides with their titles and content
  const slides = [
    {
      id: 'title',
      title: 'Chief Solution Engineering Officer – Vision Brief',
      type: 'cover'
    },
    {
      id: 'intro',
      title: 'Leadership Snapshot',
      type: 'content'
    },
    {
      id: 'vision',
      title: 'My Vision – Building an AI-First Company',
      type: 'content'
    },
    {
      id: 'framework',
      title: 'AI-Maturity Framework',
      type: 'content'
    },
    {
      id: 'relevance',
      title: 'Why This Matters to Sirisoft',
      type: 'content'
    },
    {
      id: 'impact',
      title: 'Let\'s Talk Impact',
      type: 'content'
    }
  ];

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        goToNextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToPrevSlide();
      } else if (e.key === 'Escape') {
        setShowAgenda(!showAgenda);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, showAgenda]);

  const goToNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setShowAgenda(false);
  };

  const toggleAgenda = () => {
    setShowAgenda(!showAgenda);
  };

  // Render the slide content based on the current slide
  const renderSlideContent = () => {
    const slide = slides[currentSlide];
    
    switch (slide.id) {
      case 'title':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary">
              Chief Solution Engineering Officer
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-10">
              Vision Brief
            </h2>
            <h3 className="text-xl md:text-2xl mb-12">Ta Khongsap</h3>
            
            <blockquote className="border-l-4 border-primary pl-4 py-2 bg-gray-50/80 italic text-gray-700 my-8 text-lg max-w-2xl">
              "AI isn't an option — it's the new baseline for building secure, resilient, and revenue-generating systems."
            </blockquote>
            
            <div className="absolute bottom-10 animate-bounce">
              <ChevronRight size={36} className="text-primary" />
            </div>
          </div>
        );
      
      case 'intro':
        return (
          <div className="h-full">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">
              Leadership Snapshot
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold mb-6 text-gray-300">
              15 Years Turning Data & AI Into $40 M+ Business Impact
            </h3>
            
            <ul className="space-y-6 mb-8 text-lg">
              <li className="flex items-start bg-[#242a38] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <span className="text-primary mr-3 mt-1 text-xl">•</span>
                <span><strong className="text-primary">AI & Data Strategy Executive</strong> — led enterprise-wide AI roll-outs across <strong>finance, telecom, supply-chain, and CPG</strong> sectors.</span>
              </li>
              <li className="flex items-start bg-[#242a38] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <span className="text-primary mr-3 mt-1 text-xl">•</span>
                <span><strong className="text-primary">Team Builder</strong> — scaled & mentored cross-functional groups of <strong>data engineers, ML scientists, infra & DevSecOps</strong> specialists.</span>
              </li>
              <li className="flex items-start bg-[#242a38] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <span className="text-primary mr-3 mt-1 text-xl">•</span>
                <span><strong className="text-primary">Scale & Governance</strong> — designed data estates, MLOps pipelines, and governance frameworks that cut analytic cycle-time 40 % and saved over $25 M.</span>
              </li>
            </ul>
          </div>
        );
      
      case 'vision':
        return (
          <div className="h-full">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">
              My Vision – Building an AI-First Company
            </h2>
            
            <blockquote className="border-l-4 border-primary pl-4 py-4 bg-[#242a38] my-6 rounded-r-lg shadow-sm">
              <p className="italic text-lg">Becoming <strong>AI-First</strong> isn't an add-on; it's the default lens for product design, decision-making, and hiring.</p>
            </blockquote>
            
            <div className="mt-10 space-y-6">
              <div className="flex items-center bg-[#242a38] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">1</div>
                <span className="text-lg"><strong className="text-white">Systems that learn & adapt</strong> – continuous data loops.</span>
              </div>
              
              <div className="flex items-center bg-[#242a38] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">2</div>
                <span className="text-lg"><strong className="text-white">Process redesign, not mere automation.</strong></span>
              </div>
              
              <div className="flex items-center bg-[#242a38] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">3</div>
                <span className="text-lg"><strong className="text-white">Teams equipped to <em>use</em> AI, not just demo it.</strong></span>
              </div>
              
              <div className="flex items-center bg-[#242a38] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">4</div>
                <span className="text-lg"><strong className="text-white">Experiment → learn → ship fast</strong> — pace of learning beats polish.</span>
              </div>
            </div>
          </div>
        );
      
      case 'framework':
        return (
          <div className="h-full">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">
              AI-Maturity Framework
            </h2>
            
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full border-collapse shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="py-3 px-4 border border-gray-700 text-left font-medium">Readiness Dimension</th>
                    <th className="py-3 px-4 border border-gray-700 text-left font-medium">What I Audit</th>
                    <th className="py-3 px-4 border border-gray-700 text-left font-medium">Typical Gap I Fix</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-[#242a38] hover:bg-[#2a3142] transition-colors">
                    <td className="py-3 px-4 border border-gray-700 font-semibold">Infrastructure</td>
                    <td className="py-3 px-4 border border-gray-700">Latency, pipelines, GPUs</td>
                    <td className="py-3 px-4 border border-gray-700">Cloud / edge refactor</td>
                  </tr>
                  <tr className="bg-[#1e2431] hover:bg-[#2a3142] transition-colors">
                    <td className="py-3 px-4 border border-gray-700 font-semibold">Data Ecosystem</td>
                    <td className="py-3 px-4 border border-gray-700">Lineage, access, quality</td>
                    <td className="py-3 px-4 border border-gray-700">Central Lake + catalog</td>
                  </tr>
                  <tr className="bg-[#242a38] hover:bg-[#2a3142] transition-colors">
                    <td className="py-3 px-4 border border-gray-700 font-semibold">Talent Availability</td>
                    <td className="py-3 px-4 border border-gray-700">SME bandwidth</td>
                    <td className="py-3 px-4 border border-gray-700">Rotation + up-/re-skilling</td>
                  </tr>
                  <tr className="bg-[#1e2431] hover:bg-[#2a3142] transition-colors">
                    <td className="py-3 px-4 border border-gray-700 font-semibold">Risk Tolerance</td>
                    <td className="py-3 px-4 border border-gray-700">Iteration culture</td>
                    <td className="py-3 px-4 border border-gray-700">Pilot play-book, KPIs</td>
                  </tr>
                  <tr className="bg-[#242a38] hover:bg-[#2a3142] transition-colors">
                    <td className="py-3 px-4 border border-gray-700 font-semibold">Funding Alignment</td>
                    <td className="py-3 px-4 border border-gray-700">Opex vs Capex mix</td>
                    <td className="py-3 px-4 border border-gray-700">Stage-gated budgets</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-[#242a38] p-5 rounded-lg shadow-sm mb-6">
              <p className="font-semibold mb-2 text-primary">Execution Modes <span className="text-gray-400">(applied once readiness known)</span></p>
              <p className="italic text-gray-300">Efficiency · Effectiveness · Productivity · Growth · Expert-augmentation</p>
            </div>
            
            <blockquote className="border-l-4 border-primary pl-4 py-3 bg-[#242a38] italic text-gray-300 rounded-r-lg shadow-sm">
              "Before you sprint, build the shoes, map the course, train the runners."
            </blockquote>
          </div>
        );
      
      case 'relevance':
        return (
          <div className="h-full">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">
              Why This Matters to Sirisoft
            </h2>
            
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse shadow-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="py-3 px-4 border border-gray-700 text-left font-medium">Sirisoft Need</th>
                    <th className="py-3 px-4 border border-gray-700 text-left font-medium">What I Bring</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-[#242a38] hover:bg-[#2a3142] transition-colors">
                    <td className="py-4 px-4 border border-gray-700">Scale DevOps to AI/ML <strong className="text-primary">(60 % role focus)</strong></td>
                    <td className="py-4 px-4 border border-gray-700">Proven Gen-AI & MLOps roll-outs</td>
                  </tr>
                  <tr className="bg-[#1e2431] hover:bg-[#2a3142] transition-colors">
                    <td className="py-4 px-4 border border-gray-700"><strong className="text-primary">Cyber-secure</strong> financial & energy clients</td>
                    <td className="py-4 px-4 border border-gray-700">Active AI threat-detection POC</td>
                  </tr>
                  <tr className="bg-[#242a38] hover:bg-[#2a3142] transition-colors">
                    <td className="py-4 px-4 border border-gray-700">Grow & retain 70+ engineers</td>
                    <td className="py-4 px-4 border border-gray-700">Track record in curriculum & culture</td>
                  </tr>
                  <tr className="bg-[#1e2431] hover:bg-[#2a3142] transition-colors">
                    <td className="py-4 px-4 border border-gray-700">Visionary + hands-on peer to CTO</td>
                    <td className="py-4 px-4 border border-gray-700">Blend of strategy & execution</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-center mt-10">
              <ArrowRightCircle size={30} className="text-primary animate-pulse" />
            </div>
          </div>
        );
      
      case 'impact':
        return (
          <div className="h-full">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">
              Let's Talk Impact
            </h2>
            
            <div className="bg-[#242a38] p-6 rounded-lg shadow-md mb-10">
              <p className="font-semibold mb-6 text-xl text-primary">I'm ready to:</p>
              <div className="space-y-8">
                <div className="flex items-center gap-4 pl-2 py-2 border-l-4 border-primary bg-[#2a3142] hover:bg-[#313a4d] transition-colors rounded-r-lg">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">1</div>
                  <span className="text-lg">Stand up an AI-powered DevSecOps platform within 120 days</span>
                </div>
                <div className="flex items-center gap-4 pl-2 py-2 border-l-4 border-primary bg-[#2a3142] hover:bg-[#313a4d] transition-colors rounded-r-lg">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">2</div>
                  <span className="text-lg">Cut mean-time-to-detect by 50 % using ML anomaly models</span>
                </div>
                <div className="flex items-center gap-4 pl-2 py-2 border-l-4 border-primary bg-[#2a3142] hover:bg-[#313a4d] transition-colors rounded-r-lg">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">3</div>
                  <span className="text-lg">Upskill every engineer on Gen-AI tooling in first year</span>
                </div>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <Button variant="outline" className="flex items-center gap-2 text-white border-primary hover:bg-primary/20">
                <Download size={16} /> Download full deck (PDF)
              </Button>
            </div>
            
            <footer className="text-sm text-gray-500 italic absolute bottom-4 left-0 right-0 text-center">
              Confidential — prepared exclusively for Sirisoft COO interview (2 May 2025).
            </footer>
          </div>
        );
      
      default:
        return <div>Slide not found</div>;
    }
  };

  return (
    <>
      <SEO 
        title="Chief Solution Engineering Officer – Vision Brief | Ta Khongsap"
        description="Ta Khongsap's vision brief for the CSEO role at Sirisoft, focusing on AI implementation strategy and enterprise-wide transformation."
        canonicalUrl="/sirisoft-cseo"
        noindex={true} // Keep this page private from search engines
      />
      <SchemaMarkup type="professionalService" data={professionalServiceSchemaData} />
      
      {/* Presentation container */}
      <div className="fixed inset-0 bg-[#1a1f2c] text-gray-100 flex flex-col">
        {/* Presentation header */}
        <header className="flex justify-between items-center px-4 py-2 border-b border-gray-700">
          <div className="text-sm text-gray-300">
            CSEO Vision Brief • <span className="text-primary">Ta</span> Khongsap
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-300 hover:text-primary"
              onClick={toggleAgenda}
            >
              {showAgenda ? <X size={18} /> : <LayoutGrid size={18} />}
              <span className="ml-1">{showAgenda ? 'Close' : 'Agenda'}</span>
            </Button>
          </div>
        </header>
        
        {/* Main content area */}
        <div className="flex-grow relative overflow-hidden">
          {/* Slide content */}
          <div className="absolute inset-0 px-6 md:px-12 py-8 overflow-auto">
            <div className="max-w-5xl mx-auto h-full">
              {renderSlideContent()}
            </div>
          </div>
          
          {/* Agenda overlay */}
          <div className={cn(
            "absolute inset-0 bg-[#1a1f2c]/98 transition-all duration-300 p-8 overflow-auto",
            showAgenda ? "opacity-100 z-10" : "opacity-0 -z-10"
          )}>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-primary">Presentation Agenda</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(index)}
                    className={cn(
                      "text-left p-4 rounded-lg transition-colors",
                      currentSlide === index 
                        ? "bg-primary text-white" 
                        : "bg-[#242a38] hover:bg-[#2a3142] text-gray-100"
                    )}
                  >
                    <div className="flex items-center">
                      <span className={cn(
                        "w-8 h-8 flex items-center justify-center rounded-full mr-3",
                        currentSlide === index 
                          ? "border-white border" 
                          : "border border-gray-600"
                      )}>
                        {index + 1}
                      </span>
                      <h3 className="font-medium">{slide.title}</h3>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation and progress bar */}
        <footer className="border-t border-gray-700 px-4 py-2">
          <div className="flex justify-between items-center">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={goToPrevSlide}
              disabled={currentSlide === 0}
              className="text-gray-300 hover:text-primary disabled:opacity-50"
            >
              <ArrowLeft size={18} className="mr-1" />
              Previous
            </Button>
            
            <div className="flex space-x-1 items-center">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    currentSlide === index ? "bg-primary w-4" : "bg-gray-600 hover:bg-gray-400"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
              <span className="ml-3 text-sm text-gray-400">
                {currentSlide + 1} / {slides.length}
              </span>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={goToNextSlide}
              disabled={currentSlide === slides.length - 1}
              className="text-gray-300 hover:text-primary disabled:opacity-50"
            >
              Next
              <ArrowRight size={18} className="ml-1" />
            </Button>
          </div>
        </footer>
      </div>
    </>
  );
}