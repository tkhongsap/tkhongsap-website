import { ArrowRight } from "lucide-react";
import SEO from "@/components/seo";
import SchemaMarkup from "@/components/schema-markup";
import OptimizedImage from "@/components/optimized-image";
import { Button } from "@/components/ui/button";

export default function SirisoftCSEO() {
  // Professional service schema data
  const professionalServiceSchemaData = {
    name: 'Chief Solution Engineering Officer Vision Brief - Ta Khongsap',
    description: 'Vision brief for the CSEO role at Sirisoft, focusing on AI strategy, implementation, and leadership.',
    provider: {
      name: 'Ta Khongsap',
      url: 'https://totrakoolkhongsap.replit.app'
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
      
      <div className="pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-4xl mx-auto">
            {/* 1 · Hero + Tagline */}
            <section className="mb-16">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Chief Solution Engineering Officer – Vision Brief
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold mb-8">Ta Khongsap</h2>
              
              <blockquote className="border-l-4 border-primary pl-4 py-2 bg-gray-50 italic text-gray-700 my-6 text-lg">
                "AI isn't an option — it's the new baseline for building secure, resilient, and revenue-generating systems."
              </blockquote>
            </section>
            
            {/* 2 · Who I Am — Leadership Snapshot */}
            <section className="mb-16">
              <h3 className="text-2xl font-bold mb-4">15 Years Turning Data & AI Into $40 M+ Business Impact</h3>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-primary mr-2 mt-1">•</span>
                  <span><strong>AI & Data Strategy Executive</strong> — led enterprise-wide AI roll-outs across <strong>finance, telecom, supply-chain, and CPG</strong> sectors.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 mt-1">•</span>
                  <span><strong>Team Builder</strong> — scaled & mentored cross-functional groups of <strong>data engineers, ML scientists, infra & DevSecOps</strong> specialists.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 mt-1">•</span>
                  <span><strong>Scale & Governance</strong> — designed data estates, MLOps pipelines, and governance frameworks that cut analytic cycle-time 40 % and saved over $25 M.</span>
                </li>
              </ul>
            </section>
            
            {/* 4 · My Vision – Building an AI-First Company */}
            <section className="mb-16">
              <h3 className="text-2xl font-bold mb-4">My Vision – Building an AI-First Company</h3>
              
              <blockquote className="border-l-4 border-primary pl-4 py-2 bg-gray-50 my-6">
                <p className="italic">Becoming <strong>AI-First</strong> isn't an add-on; it's the default lens for product design, decision-making, and hiring.</p>
              </blockquote>
              
              <ol className="list-decimal pl-6 space-y-3 mb-6">
                <li><strong>Systems that learn & adapt</strong> – continuous data loops.</li>
                <li><strong>Process redesign, not mere automation.</strong></li>
                <li><strong>Teams equipped to <em>use</em> AI, not just demo it.</strong></li>
                <li><strong>Experiment → learn → ship fast</strong> — pace of learning beats polish.</li>
              </ol>
            </section>
            
            {/* 6 · AI-Maturity Framework */}
            <section className="mb-16">
              <h3 className="text-2xl font-bold mb-6">AI-Maturity Framework</h3>
              
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-3 px-4 border border-gray-200 text-left font-medium">Readiness Dimension</th>
                      <th className="py-3 px-4 border border-gray-200 text-left font-medium">What I Audit</th>
                      <th className="py-3 px-4 border border-gray-200 text-left font-medium">Typical Gap I Fix</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3 px-4 border border-gray-200 font-semibold">Infrastructure</td>
                      <td className="py-3 px-4 border border-gray-200">Latency, pipelines, GPUs</td>
                      <td className="py-3 px-4 border border-gray-200">Cloud / edge refactor</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-3 px-4 border border-gray-200 font-semibold">Data Ecosystem</td>
                      <td className="py-3 px-4 border border-gray-200">Lineage, access, quality</td>
                      <td className="py-3 px-4 border border-gray-200">Central Lake + catalog</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border border-gray-200 font-semibold">Talent Availability</td>
                      <td className="py-3 px-4 border border-gray-200">SME bandwidth</td>
                      <td className="py-3 px-4 border border-gray-200">Rotation + up-/re-skilling</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-3 px-4 border border-gray-200 font-semibold">Risk Tolerance</td>
                      <td className="py-3 px-4 border border-gray-200">Iteration culture</td>
                      <td className="py-3 px-4 border border-gray-200">Pilot play-book, KPIs</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border border-gray-200 font-semibold">Funding Alignment</td>
                      <td className="py-3 px-4 border border-gray-200">Opex vs Capex mix</td>
                      <td className="py-3 px-4 border border-gray-200">Stage-gated budgets</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mb-6">
                <p className="font-semibold mb-2">Execution Modes (applied once readiness known)</p>
                <p className="italic">Efficiency · Effectiveness · Productivity · Growth · Expert-augmentation</p>
              </div>
              
              <blockquote className="border-l-4 border-primary pl-4 py-2 bg-gray-50 italic text-gray-700 my-6">
                "Before you sprint, build the shoes, map the course, train the runners."
              </blockquote>
            </section>
            
            {/* 7 · Why This Matters to Sirisoft */}
            <section className="mb-16">
              <h3 className="text-2xl font-bold mb-6">Why This Matters to Sirisoft</h3>
              
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-3 px-4 border border-gray-200 text-left font-medium">Sirisoft Need</th>
                      <th className="py-3 px-4 border border-gray-200 text-left font-medium">What I Bring</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3 px-4 border border-gray-200">Scale DevOps to AI/ML <strong>(60 % role focus)</strong></td>
                      <td className="py-3 px-4 border border-gray-200">Proven Gen-AI & MLOps roll-outs</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-3 px-4 border border-gray-200"><strong>Cyber-secure</strong> financial & energy clients</td>
                      <td className="py-3 px-4 border border-gray-200">Active AI threat-detection POC</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border border-gray-200">Grow & retain 70+ engineers</td>
                      <td className="py-3 px-4 border border-gray-200">Track record in curriculum & culture</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-3 px-4 border border-gray-200">Visionary + hands-on peer to CTO</td>
                      <td className="py-3 px-4 border border-gray-200">Blend of strategy & execution</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            
            {/* 8 · Let's Talk Impact */}
            <section className="mb-16">
              <h3 className="text-2xl font-bold mb-6">Let's Talk Impact</h3>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="font-semibold mb-4">I'm ready to:</p>
                <ol className="list-decimal pl-6 space-y-3">
                  <li>Stand up an AI-powered DevSecOps platform within 120 days</li>
                  <li>Cut mean-time-to-detect by 50 % using ML anomaly models</li>
                  <li>Upskill every engineer on Gen-AI tooling in first year</li>
                </ol>
              </div>
              
              <div className="mt-8">
                <Button variant="outline" className="flex items-center gap-2">
                  Download full deck (PDF) <ArrowRight size={16} />
                </Button>
              </div>
            </section>
            
            {/* Footer */}
            <footer className="text-sm text-gray-500 italic border-t pt-4">
              Confidential — prepared exclusively for Sirisoft COO interview (2 May 2025).
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}