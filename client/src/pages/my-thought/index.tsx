import Presentation from "../../components/presentation/Presentation";
import Slide from "../../components/presentation/Slide";
import SlideTitle from "../../components/presentation/SlideTitle";
import { BulletList, BulletPoint } from "../../components/presentation/BulletPoint";
import { motion } from "framer-motion";
import {
  Briefcase,
  BrainCircuit,
  Users,
  TrendingUp,
  CheckCircle,
  Award,
  CloudCog,
  GitBranch,
  Milestone,
  BarChartBig,
  Zap,
  Rocket,
  Handshake,
  ShieldCheck,
  ClipboardList,
  Lightbulb,
  BookOpen,
  Activity,
} from "lucide-react";
// Use react-helmet-async instead of react-helmet to avoid the UNSAFE_componentWillMount warning
// Since we've already installed react-helmet, we'll continue using it with a note for future updates
import { Helmet } from "react-helmet"; // TODO: Consider migrating to react-helmet-async in future

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
};

// Simple Table Component for Credentials/Initiatives/Why
const SimpleTable = ({ data, headers }: { data: string[][]; headers: string[] }) => {
  return (
    <motion.div variants={containerVariants} className="overflow-x-auto mt-6 md:mt-8">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <motion.th
                key={index}
                variants={itemVariants}
                className="p-2 md:p-3 border-b-2 border-modern-border text-sm md:text-base font-semibold text-modern-foreground bg-modern-muted/50"
              >
                {header}
              </motion.th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <motion.tr key={rowIndex} variants={itemVariants} className="hover:bg-modern-muted/30">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="p-2 md:p-3 border-b border-modern-border text-sm md:text-base text-modern-mutedForeground align-top"
                  // Use dangerouslySetInnerHTML for basic markdown like bold
                  dangerouslySetInnerHTML={{ __html: cell.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                />
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default function MyThought() {
  // Data for tables
  const techCredentialsData = [
    ["**Generative AI & Agents**", "DeepLearning.AI certs in Prompt Engineering, ChatGPT API, RAG with LlamaIndex, CrewAI multi-agent systems"],
    ["**Analytics & Data Engineering**", "Built end-to-end ETL & BI platforms for telecom & F&B enterprises; doctorate in Mathematics strengthens ML depth"],
    ["**Cybersecurity R&D**", "Current research with **CMKL University** on AI-powered threat detection modules (prototype live)"],
    ["**Cloud & DevOps**", "Kubernetes, Docker, OpenShift, CI/CD, IaC; delivered high-availability Oracle Exadata & Mongo clusters"],
    ["**Leadership**", "Sr. Special-Project Expert (ThaiBev IT), former VP Data Science (dtac), +10 yrs P&L ownership"],
  ];
  const techCredentialsHeaders = ["Domain", "Proof-points"];

  const initiativesData = [
    ["**AI-Powered Knowledge Management**", "• Turn ticket data into searchable knowledge • Auto-suggest solutions to support staff", "• Vector-DB of 120k tickets • 35% faster MTTR"],
    ["**AI-Powered Software Development**", "• GitHub Copilot & LLM code-review • Predictive QA test-case generation", "• 18% velocity lift • 25% defect drop"],
    ["**AI-First Mobile Application**", "• Real-time OCR & doc-classification app • Sales onboarding & logistics POD", "• < 3 sec latency • 99.1% accuracy"],
    ["**Vision Model for Detection**", "• Custom YOLOv8 + OpenAI fine-tune model • Bottle-claim / product-defect QC", "• 95% hit-rate @ 4 FPS • Saving ฿8M/yr waste"],
    ["**Agentic Document Workflow**", "• Multi-agent pipeline for contracts • Extract clauses & route approvals", "• Cuts approval lead-time 50%"],
  ];
  const initiativesHeaders = ["Initiative", "Key Objectives", "Deliverables"];

  const aiMaturityReadinessData = [
    ["**Infrastructure**", "Latency, pipelines, GPUs", "Cloud / edge refactor"],
    ["**Data Ecosystem**", "Lineage, access, quality", "Central Lake + catalog"],
    ["**Talent Availability**", "SME bandwidth", "Rotation + up-/re-skilling"],
    ["**Risk Tolerance**", "Iteration culture", "Pilot play-book, KPIs"],
    ["**Funding Alignment**", "Opex vs Capex mix", "Stage-gated budgets"],
  ];
  const aiMaturityReadinessHeaders = ["Readiness Dimension", "What I Audit", "Typical Gap I Fix"];

  const whySirisoftData = [
    ["Scale DevOps to AI/ML **(60% role focus)**", "Proven Gen-AI & MLOps roll-outs"],
    ["**Cyber-secure** financial & energy clients", "Active AI threat-detection POC"],
    ["Grow & retain 70+ engineers", "Track record in curriculum & culture"],
    ["Visionary + hands-on peer to CTO", "Blend of strategy & execution"],
  ];
  const whySirisoftHeaders = ["Sirisoft Need", "What I Bring"];

  return (
    <>
      <Helmet>
        <title>My Thought: CSEO Vision Brief | Totrakool Khongsap</title>
        <meta name="description" content="Chief Solution Engineering Officer vision brief - Totrakool Khongsap" />
      </Helmet>
      
      <main className="flex min-h-screen flex-col items-center justify-center bg-modern-background">
        <div className="w-full max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-0">My Thought</h1>
        </div>
        
        <Presentation>
          {/* Slide 1: Hero + Tagline */}
          <Slide className="bg-modern-background text-modern-foreground pt-0 md:pt-0 flex items-center justify-center min-h-[calc(100vh-180px)]">
            <motion.div
              className="flex flex-col md:flex-row-reverse gap-8 md:gap-12 items-center justify-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="md:w-1/3">
                <div className="bg-gray-100 rounded-lg p-6">
                  <div className="mb-6 flex justify-center">
                    <div className="w-48 h-48 rounded-full overflow-hidden flex items-center justify-center border-2 border-primary">
                      <img 
                        src="/assets/profile-ta.jpg" 
                        alt="Ta Khongsap profile picture"
                        className="rounded-full w-full h-full object-cover"
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                      </a>
                      <a 
                        href="https://github.com/tkhongsap" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-700 hover:text-primary transition-colors"
                        aria-label="GitHub"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="md:w-2/3">
                <motion.blockquote
                  variants={itemVariants}
                  className="text-2xl md:text-3xl font-medium leading-relaxed text-gray-800 border-l-4 border-primary pl-4 md:pl-6 py-2"
                >
                  "AI isn't an option — it's the new baseline for building secure, resilient, and revenue-generating systems."
                </motion.blockquote>
              </motion.div>
            </motion.div>
          </Slide>

          {/* Slide 2: Agenda */}
          <Slide className="pt-16 md:pt-20 lg:pt-24">
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <SlideTitle>Agenda: Vision, Strategy, Impact</SlideTitle>
              <div className="max-w-3xl mx-auto mt-8 md:mt-10">
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { icon: Briefcase, title: "Leadership Snapshot & Credentials", order: 1 },
                    { icon: ClipboardList, title: "Current Initiatives & Expected Outcomes", order: 2 },
                    { icon: Lightbulb, title: "My Vision: The AI-First Imperative", order: 3 },
                    { icon: Milestone, title: "AI Maturity: Readiness & Execution", order: 4 },
                    { icon: Handshake, title: "Alignment with Sirisoft's Needs", order: 5 },
                    { icon: Rocket, title: "Commitment & Impact", order: 6 }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                    >
                      <div className="p-4 md:p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 rounded-full bg-primary/10 p-3">
                            <item.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <h3 className="text-lg font-medium leading-6">{item.title}</h3>
                              <div className="ml-2">
                                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                                  {item.order}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </Slide>

          {/* Slide 3: Leadership Snapshot */}
          <Slide>
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <SlideTitle>15 Years Turning Data & AI Into ฿40 M+ Business Impact</SlideTitle>
              <BulletList className="mt-8 md:mt-10 space-y-4 md:space-y-6">
                <BulletPoint icon={Award}>
                  <span className="font-semibold text-modern-foreground">AI & Data Strategy Executive:</span> <span className="text-modern-mutedForeground">Led enterprise-wide AI roll-outs across <strong>finance, telecom, supply-chain, and CPG</strong> sectors.</span>
                </BulletPoint>
                <BulletPoint icon={Users}>
                  <span className="font-semibold text-modern-foreground">Team Builder:</span> <span className="text-modern-mutedForeground">Scaled & mentored cross-functional groups of <strong>data engineers, ML scientists, infra & DevSecOps</strong> specialists.</span>
                </BulletPoint>
                <BulletPoint icon={BarChartBig}>
                  <span className="font-semibold text-modern-foreground">Scale & Governance:</span> <span className="text-modern-mutedForeground">Designed data estates, MLOps pipelines, and governance frameworks that cut analytic cycle-time 40% and saved over ฿25M logistics costs.</span>
                </BulletPoint>
              </BulletList>
            </motion.div>
          </Slide>

          {/* Slide 4: Technical Credentials */}
          <Slide>
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <SlideTitle>Technical Credentials</SlideTitle>
              <SimpleTable headers={techCredentialsHeaders} data={techCredentialsData} />
            </motion.div>
          </Slide>

          {/* Slide 5: Current Initiatives */}
          <Slide>
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <SlideTitle>Current Enterprise-Scale AI Initiatives (2024-25)</SlideTitle>
              <SimpleTable headers={initiativesHeaders} data={initiativesData} />
              <motion.h3 variants={itemVariants} className="mt-6 md:mt-8 font-semibold text-modern-primary">Expected Outcomes</motion.h3>
              <BulletList className="mt-2 md:mt-4 space-y-2">
                <BulletPoint icon={ShieldCheck}>Industry-leading AI-powered systems with built-in security</BulletPoint>
                <BulletPoint icon={Activity}>Proven autonomous operations concepts with measurable ROI</BulletPoint>
                <BulletPoint icon={BookOpen}>Highly skilled, AI-fluent engineering workforce ready for next-gen projects</BulletPoint>
              </BulletList>
            </motion.div>
          </Slide>

          {/* Slide 6: Vision: AI-First Company */}
          <Slide className="bg-modern-muted">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center">
              <SlideTitle>My Vision: Building an AI-First Company</SlideTitle>
              <motion.blockquote variants={itemVariants} className="text-xl md:text-2xl italic text-modern-foreground border-l-4 border-modern-primary pl-4 md:pl-6 py-2 max-w-3xl mx-auto mb-8 md:mb-10">
                Becoming <strong>AI-First</strong> isn't an add-on; it's a default lens for product design, decision-making, and hiring.
              </motion.blockquote>
              <motion.h3 variants={itemVariants} className="font-semibold text-modern-primary mb-4">Key Pillars:</motion.h3>
              <BulletList className="inline-block text-left space-y-3 md:space-y-4 max-w-xl">
                <BulletPoint icon={CloudCog}>Systems that learn & adapt (continuous data loops)</BulletPoint>
                <BulletPoint icon={GitBranch}>Process redesign, not mere automation</BulletPoint>
                <BulletPoint icon={Users}>Teams equipped to <em>use</em> AI, not just demo it</BulletPoint>
                <BulletPoint icon={Rocket}>Experiment → learn → ship fast — pace of learning beats polish</BulletPoint>
              </BulletList>
            </motion.div>
          </Slide>

          {/* Slide 7: AI Maturity Framework - Readiness */}
          <Slide>
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <SlideTitle>AI-Maturity Framework: Readiness Dimensions</SlideTitle>
              <SimpleTable headers={aiMaturityReadinessHeaders} data={aiMaturityReadinessData} />
               <motion.blockquote variants={itemVariants} className="text-lg md:text-xl italic text-modern-mutedForeground border-l-4 border-modern-accent pl-4 md:pl-6 py-2 max-w-3xl mx-auto mt-6 md:mt-8">
                "Before you sprint, build the shoes, map the course, train the runners."
              </motion.blockquote>
            </motion.div>
          </Slide>

          {/* Slide 8: AI Maturity Framework - Execution Modes */}
          <Slide>
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <SlideTitle>AI-Maturity Framework: Strategic Execution Modes</SlideTitle>
              <motion.p variants={itemVariants} className="text-center text-modern-mutedForeground mb-6 md:mb-8">(Applied once readiness is known)</motion.p>
              {/* Using Grid for Execution Modes */}
              <motion.div variants={containerVariants} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mt-8 md:mt-12 text-center">
                <motion.div variants={itemVariants} className="p-3 md:p-4 border border-modern-border rounded-lg shadow-sm bg-modern-secondary h-full">
                    <Zap className="w-7 h-7 md:w-8 md:h-8 mb-2 text-modern-primary mx-auto" />
                    <h3 className="text-sm md:text-base font-semibold text-modern-secondaryForeground">Efficiency</h3>
                    <p className="text-xs md:text-sm text-modern-secondaryForeground/80">Automate repetitive tasks</p>
                </motion.div>
                <motion.div variants={itemVariants} className="p-3 md:p-4 border border-modern-border rounded-lg shadow-sm bg-modern-secondary h-full">
                    <CheckCircle className="w-7 h-7 md:w-8 md:h-8 mb-2 text-modern-primary mx-auto" />
                    <h3 className="text-sm md:text-base font-semibold text-modern-secondaryForeground">Effectiveness</h3>
                    <p className="text-xs md:text-sm text-modern-secondaryForeground/80">Improve decisions</p>
                </motion.div>
                <motion.div variants={itemVariants} className="p-3 md:p-4 border border-modern-border rounded-lg shadow-sm bg-modern-secondary h-full">
                    <TrendingUp className="w-7 h-7 md:w-8 md:h-8 mb-2 text-modern-primary mx-auto" />
                    <h3 className="text-sm md:text-base font-semibold text-modern-secondaryForeground">Productivity</h3>
                    <p className="text-xs md:text-sm text-modern-secondaryForeground/80">Augment internal teams</p>
                </motion.div>
                <motion.div variants={itemVariants} className="p-3 md:p-4 border border-modern-border rounded-lg shadow-sm bg-modern-secondary h-full">
                    <Rocket className="w-7 h-7 md:w-8 md:h-8 mb-2 text-modern-primary mx-auto" />
                    <h3 className="text-sm md:text-base font-semibold text-modern-secondaryForeground">Growth</h3>
                    <p className="text-xs md:text-sm text-modern-secondaryForeground/80">Create new capabilities</p>
                </motion.div>
                <motion.div variants={itemVariants} className="p-3 md:p-4 border border-modern-border rounded-lg shadow-sm bg-modern-secondary h-full col-span-2 md:col-span-1 lg:col-span-1">
                    <BrainCircuit className="w-7 h-7 md:w-8 md:h-8 mb-2 text-modern-primary mx-auto" />
                    <h3 className="text-sm md:text-base font-semibold text-modern-secondaryForeground">Expert</h3>
                    <p className="text-xs md:text-sm text-modern-secondaryForeground/80">Augment complex expertise</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </Slide>

          {/* Slide 9: Why Sirisoft */}
          <Slide>
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <SlideTitle>Why This Matters to Sirisoft</SlideTitle>
              <SimpleTable headers={whySirisoftHeaders} data={whySirisoftData} />
            </motion.div>
          </Slide>

          {/* Slide 10: Commitment & Impact */}
          <Slide className="bg-modern-primary text-modern-primaryForeground">
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <SlideTitle>Let's Talk Impact</SlideTitle>
              <motion.div variants={itemVariants} className="max-w-3xl mx-auto text-center">
                <div className="text-xl md:text-2xl font-medium mb-8">
                  I'm ready to:
                </div>
                <div className="space-y-4 md:space-y-6 text-lg md:text-xl">
                  <div className="p-4 md:p-6 border border-modern-primaryForeground/20 rounded-lg bg-modern-primaryForeground/5">
                    <span className="font-bold">1.</span> Stand up AI-powered DevSecOps in 120 days.
                  </div>
                  <div className="p-4 md:p-6 border border-modern-primaryForeground/20 rounded-lg bg-modern-primaryForeground/5">
                    <span className="font-bold">2.</span> Halve mean-time-to-detect with anomaly models.
                  </div>
                  <div className="p-4 md:p-6 border border-modern-primaryForeground/20 rounded-lg bg-modern-primaryForeground/5">
                    <span className="font-bold">3.</span> Upskill every engineer on Gen-AI tooling in Year 1.
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </Slide>
        </Presentation>
      </main>
    </>
  );
}