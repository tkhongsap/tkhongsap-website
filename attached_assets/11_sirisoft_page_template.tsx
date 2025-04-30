"use client"; // Required for Presentation component with hooks

import Presentation from "@/components/presentation/Presentation";
import Slide from "@/components/presentation/Slide";
import SlideTitle from "@/components/presentation/SlideTitle";
import { BulletList, BulletPoint } from "@/components/presentation/BulletPoint";
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
  ShieldCheck, // For Cybersecurity
  ClipboardList, // For Initiatives
  Lightbulb, // For Vision
  BookOpen, // For Curriculum
  Activity, // For Anomaly
} from "lucide-react"; // Import relevant icons

// Animation Variants (Keep existing variants, they are suitable for modern style)
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

// Title animations are now handled directly in the SlideTitle component

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

export default function Home() {

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
    ["**Cybersecurity × AI Integration**", "• Identify high-risk domains • Joint research with CMKL • Prod roadmap", "Production-ready AI security modules • Monthly AI-driven security reports"],
    ["**Enterprise Operations Center**", "• Validate autonomous decision systems • Prototype anomaly engine", "POC for finished-goods monitoring • Gen-AI recommendations"],
    ["**Capability Development**", "• Quarterly AI/MLOps curriculum • Knowledge-base sharing", "Upskill > 70 engineers; launch internal wiki"],
  ];
  const initiativesHeaders = ["Theme", "Key Objectives", "Deliverables"];

  const aiMaturityReadinessData = [
    ["**Infrastructure**", "Latency, pipelines, GPUs", "Cloud / edge refactor"],
    ["**Data Ecosystem**", "Lineage, access, quality", "Central Lake + catalog"],
    ["**Talent Availability**", "SME bandwidth", "Rotation + up-/re-skilling"],
    ["**Risk Tolerance**", "Iteration culture", "Pilot play-book, KPIs"],
    ["**Funding Alignment**", "Opex vs Capex mix", "Stage-gated budgets"],
  ];
  const aiMaturityReadinessHeaders = ["Readiness Dimension", "What I Audit", "Typical Gap I Fix"];

  const whySirisoftData = [
    ["Scale DevOps to AI/ML **(60 % role focus)**", "Proven Gen-AI & MLOps roll-outs"],
    ["**Cyber-secure** financial & energy clients", "Active AI threat-detection POC"],
    ["Grow & retain 70+ engineers", "Track record in curriculum & culture"],
    ["Visionary + hands-on peer to CTO", "Blend of strategy & execution"],
  ];
  const whySirisoftHeaders = ["Sirisoft Need", "What I Bring"];


  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-modern-background">
      {/* Increased number of slides to 13 */}
      <Presentation>
        {/* Slide 1: Hero + Tagline (Updated) */}
        <Slide className="bg-modern-primary text-modern-primaryForeground">
          <motion.div
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={itemVariants} className="font-bold mb-4">
              Chief Solution Engineering Officer – Vision Brief
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-2xl md:text-3xl text-modern-secondary mb-8"
            >
              Ta Khongsap
            </motion.p>
            <motion.blockquote
              variants={itemVariants}
              className="text-xl md:text-2xl italic text-modern-secondary/80 border-l-4 border-modern-accent pl-4 md:pl-6 py-2 max-w-3xl mx-auto"
            >
              “AI isn’t an option — it’s the new baseline for building secure, resilient, and revenue-generating systems.”
            </motion.blockquote>
          </motion.div>
        </Slide>

        {/* Slide 2: Agenda (Keep existing, maybe update titles based on new flow) */}
        <Slide>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <SlideTitle>Agenda: Vision, Strategy, Impact</SlideTitle>
            <BulletList className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <BulletPoint icon={Briefcase}>Leadership Snapshot & Credentials</BulletPoint>
              <BulletPoint icon={ClipboardList}>Current Initiatives & Expected Outcomes</BulletPoint>
              <BulletPoint icon={Lightbulb}>My Vision: The AI-First Imperative</BulletPoint>
              <BulletPoint icon={Milestone}>AI Maturity: Readiness & Execution</BulletPoint>
              <BulletPoint icon={Handshake}>Alignment with Sirisoft's Needs</BulletPoint>
              <BulletPoint icon={Rocket}>Commitment & Impact</BulletPoint>
            </BulletList>
          </motion.div>
        </Slide>

        {/* Slide 3: Leadership Snapshot (Updated from New Content Section 2) */}
        <Slide>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <SlideTitle>15 Years Turning Data & AI Into $40 M+ Business Impact</SlideTitle>
            <BulletList className="mt-8 md:mt-10 space-y-4 md:space-y-6">
              <BulletPoint icon={Award}>
                <span className="font-semibold text-modern-foreground">AI & Data Strategy Executive:</span> <span className="text-modern-mutedForeground">Led enterprise-wide AI roll-outs across **finance, telecom, supply-chain, and CPG** sectors.</span>
              </BulletPoint>
              <BulletPoint icon={Users}>
                <span className="font-semibold text-modern-foreground">Team Builder:</span> <span className="text-modern-mutedForeground">Scaled & mentored cross-functional groups of **data engineers, ML scientists, infra & DevSecOps** specialists.</span>
              </BulletPoint>
              <BulletPoint icon={BarChartBig}>
                <span className="font-semibold text-modern-foreground">Scale & Governance:</span> <span className="text-modern-mutedForeground">Designed data estates, MLOps pipelines, and governance frameworks that cut analytic cycle-time 40 % and saved &gt; $25 M logistics costs.</span>
              </BulletPoint>
            </BulletList>
          </motion.div>
        </Slide>

        {/* Slide 4: Technical Credentials (Table - Updated from New Content Section 3) */}
        <Slide>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <SlideTitle>Technical Credentials</SlideTitle>
            <SimpleTable headers={techCredentialsHeaders} data={techCredentialsData} />
          </motion.div>
        </Slide>

        {/* Slide 5: Current Initiatives (Table + Bullets - New Content Section 4) */}
        <Slide>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <SlideTitle>Current Initiatives (2024-25)</SlideTitle>
            <SimpleTable headers={initiativesHeaders} data={initiativesData} />
            <motion.h3 variants={itemVariants} className="mt-6 md:mt-8 font-semibold text-modern-primary">Expected Outcomes</motion.h3>
            <BulletList className="mt-2 md:mt-4 space-y-2">
              <BulletPoint icon={ShieldCheck}>Industry-leading AI-powered cyber-defence</BulletPoint>
              <BulletPoint icon={Activity}>Proven autonomous ops concept</BulletPoint>
              <BulletPoint icon={BookOpen}>Highly skilled, AI-fluent engineering workforce</BulletPoint>
            </BulletList>
          </motion.div>
        </Slide>

        {/* Slide 6: Vision: AI-First Company (Updated from New Content Section 5) */}
        <Slide className="bg-modern-muted">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center">
            <SlideTitle>My Vision: Building an AI-First Company</SlideTitle>
            <motion.blockquote variants={itemVariants} className="text-xl md:text-2xl italic text-modern-foreground border-l-4 border-modern-primary pl-4 md:pl-6 py-2 max-w-3xl mx-auto mb-8 md:mb-10">
              Becoming **AI-First** isn’t an add-on; it’s a default lens for product design, decision-making, and hiring.
            </motion.blockquote>
            <motion.h3 variants={itemVariants} className="font-semibold text-modern-primary mb-4">Key Pillars:</motion.h3>
            <BulletList className="inline-block text-left space-y-3 md:space-y-4 max-w-xl">
              <BulletPoint icon={CloudCog}>Systems that learn & adapt (continuous data loops)</BulletPoint>
              <BulletPoint icon={GitBranch}>Process redesign, not mere automation</BulletPoint>
              <BulletPoint icon={Users}>Teams equipped to *use* AI, not just demo it</BulletPoint>
              <BulletPoint icon={Rocket}>Experiment → learn → ship fast — pace of learning beats polish</BulletPoint>
            </BulletList>
          </motion.div>
        </Slide>

        {/* Slide 7: AI Maturity Framework - Readiness (Table - Updated from New Content Section 6) */}
        <Slide>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <SlideTitle>AI-Maturity Framework: Readiness Dimensions</SlideTitle>
            <SimpleTable headers={aiMaturityReadinessHeaders} data={aiMaturityReadinessData} />
             <motion.blockquote variants={itemVariants} className="text-lg md:text-xl italic text-modern-mutedForeground border-l-4 border-modern-accent pl-4 md:pl-6 py-2 max-w-3xl mx-auto mt-6 md:mt-8">
              “Before you sprint, build the shoes, map the course, train the runners.”
            </motion.blockquote>
          </motion.div>
        </Slide>

        {/* Slide 8: AI Maturity Framework - Execution Modes (Updated from New Content Section 6) */}
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

        {/* Slide 9: Why Sirisoft (Table - Updated from New Content Section 7) */}
        <Slide>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <SlideTitle>Why This Matters to Sirisoft</SlideTitle>
            <SimpleTable headers={whySirisoftHeaders} data={whySirisoftData} />
          </motion.div>
        </Slide>

        {/* Slide 10: Commitment & Impact (Updated from New Content Section 8) */}
        <Slide className="bg-modern-primary text-modern-primaryForeground">
          <motion.div var
(Content truncated due to size limit. Use line ranges to read in chunks)