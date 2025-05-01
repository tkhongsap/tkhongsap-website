import Presentation from "../../components/presentation/Presentation";
import Slide from "../../components/presentation/Slide";
import SlideTitle from "../../components/presentation/SlideTitle";
import {
  BulletList,
  BulletPoint,
} from "../../components/presentation/BulletPoint";
import { motion } from "framer-motion";
import Navbar from "../../components/navbar";
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
  ExternalLink,
  Sparkles,
  LineChart,
  BarChart4,
  PieChart,
  Target,
  Code,
  Server,
  Database,
  Cpu,
  Network,
} from "lucide-react";
// Use react-helmet-async instead of react-helmet to avoid the UNSAFE_componentWillMount warning
// Since we've already installed react-helmet, we'll continue using it with a note for future updates
import { Helmet } from "react-helmet"; // TODO: Consider migrating to react-helmet-async in future
import React from "react";

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

// Graphics Components 
const GradientBg = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`relative overflow-hidden ${className}`}>
    <div className="absolute -z-10 top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-modern-primary/5 via-modern-background to-modern-muted/20 opacity-70"></div>
    <div className="absolute -z-10 top-0 left-20 w-72 h-72 bg-modern-primary/10 rounded-full filter blur-3xl"></div>
    <div className="absolute -z-10 bottom-0 right-20 w-80 h-80 bg-modern-accent/10 rounded-full filter blur-3xl"></div>
    {children}
  </div>
);

const CirclePattern = ({ className = "" }: { className?: string }) => (
  <div className={`absolute -z-10 ${className}`}>
    {[...Array(6)].map((_, i) => (
      <div 
        key={i}
        className="absolute rounded-full border border-modern-primary/20"
        style={{
          width: `${(i+1) * 40}px`,
          height: `${(i+1) * 40}px`,
          opacity: 0.1 + (6-i) * 0.02,
          top: `calc(50% - ${(i+1) * 20}px)`,
          left: `calc(50% - ${(i+1) * 20}px)`,
        }}
      />
    ))}
  </div>
);

const DataChart = ({ type = "bar", className = "" }: { type?: "bar" | "line" | "pie", className?: string }) => {
  return (
    <div className={`${className} bg-modern-muted/50 p-4 rounded-lg border border-modern-border`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-modern-foreground font-medium">Data Visualization</h4>
        {type === "bar" && <BarChart4 className="text-modern-primary h-5 w-5" />}
        {type === "line" && <LineChart className="text-modern-primary h-5 w-5" />}
        {type === "pie" && <PieChart className="text-modern-primary h-5 w-5" />}
      </div>
      <div className="h-32 flex items-end justify-between gap-1 pt-4">
        {type === "bar" && [...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className="bg-modern-primary/80 hover:bg-modern-primary transition-all rounded-t w-full"
            style={{ 
              height: `${15 + Math.random() * 70}%`,
              opacity: 0.5 + Math.random() * 0.5
            }}
          />
        ))}
        {type === "line" && (
          <svg viewBox="0 0 100 50" className="w-full h-full stroke-modern-primary fill-none">
            <path 
              d={`M 0,${40 - Math.random() * 30} ${[...Array(10)].map((_, i) => `L ${i * 11},${40 - Math.random() * 30}`).join(' ')}`} 
              strokeWidth="2"
              className="drop-shadow-md"
            />
            <path 
              d={`M 0,${40 - Math.random() * 30} ${[...Array(10)].map((_, i) => `L ${i * 11},${40 - Math.random() * 30}`).join(' ')}`} 
              strokeWidth="2"
              className="opacity-40"
              stroke="rgba(var(--modern-accent)/0.8)"
            />
          </svg>
        )}
        {type === "pie" && (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(var(--modern-primary)/0.2)" strokeWidth="10" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(var(--modern-primary)/0.8)" strokeWidth="10" 
              strokeDasharray="282.6" strokeDashoffset={282.6 * (1 - 0.65)} 
              transform="rotate(-90 50 50)"
            />
            <text x="50" y="55" textAnchor="middle" className="fill-modern-foreground font-medium text-sm">65%</text>
          </svg>
        )}
      </div>
      <div className="flex justify-between mt-2 text-xs text-modern-mutedForeground">
        {type !== "pie" && [...Array(6)].map((_, i) => <div key={i}>Q{i+1}</div>)}
      </div>
    </div>
  );
};

const IconGrid = ({ icons, title }: { icons: any[], title: string }) => (
  <motion.div variants={itemVariants} className="bg-modern-muted/30 rounded-lg border border-modern-border p-4 mt-4">
    <h4 className="text-sm font-medium text-modern-foreground mb-3">{title}</h4>
    <div className="grid grid-cols-4 gap-3">
      {icons.map((Icon, i) => (
        <div key={i} className="flex flex-col items-center justify-center p-2 rounded bg-modern-background/50 hover:bg-modern-muted transition-colors">
          <Icon className="h-6 w-6 text-modern-primary mb-1" />
        </div>
      ))}
    </div>
  </motion.div>
);

// Simple Table Component for Credentials/Initiatives/Why
type TableData = (string | React.ComponentType<any>)[][];

const SimpleTable = ({
  data,
  headers,
}: {
  data: TableData;
  headers: string[];
}) => {
  return (
    <motion.div
      variants={containerVariants}
      className="overflow-x-auto mt-6 md:mt-8"
    >
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
            <motion.tr
              key={rowIndex}
              variants={itemVariants}
              className="hover:bg-modern-muted/30"
            >
              {row.map((cell, cellIndex) => {
                // If cell is a React component (icon), render it
                if (typeof cell === 'function') {
                  const IconComponent = cell as React.ComponentType<any>;
                  return (
                    <td
                      key={cellIndex}
                      className="p-2 md:p-3 border-b border-modern-border text-sm md:text-base text-modern-mutedForeground align-middle text-center"
                    >
                      <div className="flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-modern-primary" />
                      </div>
                    </td>
                  );
                }
                
                // Otherwise, render as text with markdown
                // Make sure cell is a string before using replace
                if (typeof cell === 'string') {
                  return (
                    <td
                      key={cellIndex}
                      className="p-2 md:p-3 border-b border-modern-border text-sm md:text-base text-modern-mutedForeground align-top"
                      // Use dangerouslySetInnerHTML for basic markdown like bold
                      dangerouslySetInnerHTML={{
                        __html: cell.replace(
                          /\*\*(.*?)\*\*/g,
                          "<strong>$1</strong>",
                        ),
                      }}
                    />
                  );
                }
                
                // Fallback for any other type
                return (
                  <td
                    key={cellIndex}
                    className="p-2 md:p-3 border-b border-modern-border text-sm md:text-base text-modern-mutedForeground align-top"
                  >
                    {String(cell)}
                  </td>
                );
              })}
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
    [
      "**ML, AI & Agents**",
      "Executive-level expertise with DeepLearning.AI certifications in Prompt Engineering, ChatGPT API integration, and RAG with advanced multi-agent systems",
    ],
    [
      "**Analytics & Data Engineering**",
      "Orchestrated enterprise-wide ETL & BI platforms delivering actionable insights for C-suite decision makers; doctorate in Mathematics providing strategic depth to ML implementations",
    ],
    [
      "**Cybersecurity R&D**",
      "Leading strategic research partnership with **CMKL University** on AI-powered threat detection solutions driving organizational security innovation",
    ],
  ];
  const techCredentialsHeaders = ["Domain", "Proof-points"];

  // Icons for each initiative
  const initiativeIcons = {
    knowledgeManagement: BookOpen,
    softwareDev: Code,
    mobileOcr: Cpu,
    documentWorkflow: ClipboardList,
    visionModels: BrainCircuit
  };

  const initiativesData = [
    [
      initiativeIcons.knowledgeManagement,
      "**AI-Powered Knowledge Management**",
      "Converts internal case notes and resolutions into an LLM-searchable knowledge base, so support teams get consistent answers and best-practice fixes instantly.",
    ],
    [
      initiativeIcons.softwareDev,
      "**AI-Assisted Software Development**",
      "Uses code-assistant tooling and ML-driven code review to boost developer productivity, raise code quality and security, and upskill teams through real-time suggestions.",
    ],
    [
      initiativeIcons.mobileOcr,
      "**AI-First Mobile OCR Application**",
      "An AI-powered OCR app that captures documents in the field, applies business rules, and pushes clean data straight into core workflows—eliminating re-keying delays.",
    ],
    [
      initiativeIcons.documentWorkflow,
      "**Agentic Document Workflow**",
      "A multi-agent pipeline that ingests contracts, extracts key clauses, and routes approvals automatically, turning days of manual processing into near real-time flow.",
    ],
    [
      initiativeIcons.visionModels,
      "**Vision Models for Image Insight**",
      "Computer-vision models that detect, classify, and flag anomalies in images or video—supporting use-cases from product-defect QC to field asset inspections and visual analytics.",
    ],
  ];
  const initiativesHeaders = [
    "",  // For the icon column
    "Initiative",
    "Enterprise Use-Case & Business Value",
  ];

  const aiMaturityReadinessData = [
    ["**Infrastructure**", "Latency, pipelines, GPUs", "Cloud / edge refactor"],
    [
      "**Data Ecosystem**",
      "Lineage, access, quality",
      "Central Lake + catalog",
    ],
    ["**Talent Availability**", "SME bandwidth", "Rotation + up-/re-skilling"],
    ["**Risk Tolerance**", "Iteration culture", "Pilot play-book, KPIs"],
    ["**Funding Alignment**", "Opex vs Capex mix", "Stage-gated budgets"],
  ];
  const aiMaturityReadinessHeaders = [
    "Readiness Dimension",
    "What I Audit",
    "Typical Gap I Fix",
  ];

  const whySirisoftData = [
    [
      "Scale DevOps to AI/ML **(60% role focus)**",
      "Proven Gen-AI & MLOps roll-outs",
    ],
    [
      "**Cyber-secure** financial & energy clients",
      "Active AI threat-detection POC",
    ],
    ["Grow & retain 70+ engineers", "Track record in curriculum & culture"],
    ["Visionary + hands-on peer to CTO", "Blend of strategy & execution"],
  ];
  const whySirisoftHeaders = ["Sirisoft Need", "What I Bring"];

  return (
    <>
      <Helmet>
        <title>My Thought: CSEO Vision Brief | Totrakool Khongsap</title>
        <meta
          name="description"
          content="Chief Solution Engineering Officer vision brief - Totrakool Khongsap"
        />
      </Helmet>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center bg-modern-background pt-20 md:pt-24">
        <Presentation>
          {/* Slide 1: Hero + Tagline */}
          <Slide className="bg-modern-background text-modern-foreground pt-0 md:pt-0 flex items-center justify-center min-h-[calc(100vh-180px)]">
            <GradientBg className="w-full h-full">
              <CirclePattern className="right-10 top-20" />
              <motion.div
                className="flex flex-col md:flex-row-reverse gap-8 md:gap-12 items-center justify-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants} className="md:w-1/3">
                  <div className="bg-modern-muted/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                    <div className="mb-6 flex justify-center">
                      <div className="w-48 h-48 rounded-full overflow-hidden flex items-center justify-center border-2 border-modern-primary relative">
                        {/* Animated ring around profile */}
                        <div className="absolute inset-0 border-4 border-modern-primary/20 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-modern-primary/40 rounded-full animate-[spin_8s_linear_infinite]" style={{ clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)' }}></div>
                        
                        <img
                          src="/assets/profile-ta.jpg"
                          alt="Ta Khongsap profile picture"
                          className="rounded-full w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-2">
                        <span className="text-modern-primary">Ta</span>{" "}
                        <span className="text-modern-foreground">Khongsap</span>
                      </h3>
                      <p className="text-modern-mutedForeground mb-4">
                        AI Strategist & Data Science Leader
                      </p>

                      <div className="flex justify-center space-x-4">
                        <a
                          href="https://www.linkedin.com/in/totrakool-k-b504a912/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-modern-mutedForeground hover:text-modern-primary transition-colors"
                          aria-label="LinkedIn"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                            <rect width="4" height="12" x="2" y="9" />
                            <circle cx="4" cy="4" r="2" />
                          </svg>
                        </a>
                        <a
                          href="https://github.com/tkhongsap"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-modern-mutedForeground hover:text-modern-primary transition-colors"
                          aria-label="GitHub"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                            <path d="M9 18c-4.51 2-5-2-7-2" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="md:w-2/3">
                  <motion.blockquote
                    variants={itemVariants}
                    className="text-2xl md:text-3xl font-medium leading-relaxed text-modern-foreground bg-modern-muted/50 backdrop-blur-sm border-l-4 border-modern-primary pl-4 md:pl-6 py-4 px-6 rounded-tr-lg rounded-br-lg shadow-lg"
                  >
                    "AI isn't an option — it's the new baseline for building
                    secure, resilient, and revenue-generating systems."
                    <div className="mt-4 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-modern-primary" />
                      <div className="h-1 bg-modern-primary flex-grow rounded"></div>
                    </div>
                  </motion.blockquote>
                  
                  {/* Removing data visualizations
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <DataChart type="bar" className="h-auto" />
                    <DataChart type="line" className="h-auto" />
                    <DataChart type="pie" className="h-auto" />
                  </div>
                  */}
                </motion.div>
              </motion.div>
            </GradientBg>
          </Slide>

          {/* Slide 2: Agenda */}
          <Slide className="pt-16 md:pt-20 lg:pt-24">
            <GradientBg>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <SlideTitle>Vision and Strategy</SlideTitle>
                <div className="max-w-4xl mx-auto mt-8 md:mt-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        icon: Briefcase,
                        title: "Leadership Snapshot & Credentials",
                        order: 1,
                        color: "from-blue-500/20 to-blue-600/10",
                      },
                      {
                        icon: ClipboardList,
                        title: "Current Initiatives & Expected Outcomes",
                        order: 2,
                        color: "from-purple-500/20 to-purple-600/10",
                      },
                      {
                        icon: BrainCircuit,
                        title: "Enterprise AI Demo: Code Review System",
                        order: 3,
                        color: "from-green-500/20 to-green-600/10",
                      },
                      {
                        icon: Lightbulb,
                        title: "My Vision: Making 'AI-First' the Default",
                        order: 4,
                        color: "from-amber-500/20 to-amber-600/10",
                      },
                      {
                        icon: Milestone,
                        title: "AI Maturity Framework: Readiness Dimension",
                        order: 5,
                        color: "from-red-500/20 to-red-600/10",
                      },
                      { 
                        icon: Rocket, 
                        title: "Key Takeaways", 
                        order: 6,
                        color: "from-cyan-500/20 to-cyan-600/10",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="rounded-lg border border-modern-border bg-modern-background text-modern-foreground shadow-md hover:shadow-lg transition-all overflow-hidden group"
                        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                      >
                        <div className={`bg-gradient-to-br ${item.color} p-4 md:p-6`}>
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 rounded-full bg-modern-background p-3 shadow-md group-hover:shadow-lg transition-shadow">
                              <item.icon className="h-6 w-6 text-modern-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium leading-6 text-modern-foreground">
                                  {item.title}
                                </h3>
                                <div className="ml-2">
                                  <span className="inline-flex items-center rounded-full bg-modern-background px-2.5 py-0.5 text-xs font-semibold text-modern-primary">
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
                  
                  {/* Tech icons grid below agenda items */}
                  <IconGrid 
                    icons={[BrainCircuit, Server, Database, Code, Network, Cpu, Target, BarChartBig]} 
                    title="Technologies & Domains"
                  />
                </div>
              </motion.div>
            </GradientBg>
          </Slide>

          {/* Slide 3: Leadership Snapshot */}
          <Slide>
            <GradientBg>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <SlideTitle>
                  15 Years Driving Enterprise-Wide AI & Data Transformation
                </SlideTitle>
                <BulletList className="mt-8 md:mt-10 space-y-4 md:space-y-6">
                  <BulletPoint icon={Award}>
                    <span className="font-semibold text-modern-foreground">
                      AI & Data Strategy Executive —
                    </span>{" "}
                    <span className="text-modern-mutedForeground">
                      led large-scale analytics and AI programmes in{" "}
                      <strong>finance, telecom, supply-chain, and CPG</strong>,
                      turning data into a core competitive advantage.
                    </span>
                  </BulletPoint>
                  <BulletPoint icon={Users}>
                    <span className="font-semibold text-modern-foreground">
                      Senior People Leader —
                    </span>{" "}
                    <span className="text-modern-mutedForeground">
                      built and mentored multidisciplinary teams of{" "}
                      <strong>data scientists and ML engineers</strong>,
                      instilling a culture of fast iteration and responsible AI.
                    </span>
                  </BulletPoint>
                  <BulletPoint icon={BarChartBig}>
                    <span className="font-semibold text-modern-foreground">
                      Transformation Catalyst —
                    </span>{" "}
                    <span className="text-modern-mutedForeground">
                      delivered data, AI, and automation solutions that elevated
                      decision-making and unlocked new revenue streams.
                    </span>
                  </BulletPoint>
                </BulletList>
                
                {/* Removing timeline visualization
                <motion.div 
                  variants={itemVariants}
                  className="mt-10 relative max-w-3xl mx-auto pt-8"
                >
                  <div className="absolute top-0 left-1/2 w-1 h-full bg-modern-primary/20 transform -translate-x-1/2"></div>
                  
                  {[
                    { year: "2008", role: "Data Analyst", company: "Morgan Stanley" },
                    { year: "2012", role: "Head of Analytics", company: "Telecoms Inc." },
                    { year: "2016", role: "AI Director", company: "FinTech Global" },
                    { year: "2020", role: "Chief AI Officer", company: "Enterprise Solutions" },
                    { year: "Present", role: "AI Strategy Lead", company: "Multiple Clients" }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className={`flex items-center mb-8 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                        <div className="bg-modern-muted/80 backdrop-blur-sm p-4 rounded-lg border border-modern-border shadow-md">
                          <div className="text-modern-primary font-bold mb-1">
                            {item.year}
                          </div>
                          <div className="font-medium text-modern-foreground">
                            {item.role}
                          </div>
                          <div className="text-modern-mutedForeground text-sm">
                            {item.company}
                          </div>
                        </div>
                      </div>
                      
                      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-modern-primary"></div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                */}
              </motion.div>
            </GradientBg>
          </Slide>

          {/* Slide 4: Technical Credentials */}
          <Slide>
            <GradientBg>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <SlideTitle>Technical Credentials</SlideTitle>
                <SimpleTable
                  headers={techCredentialsHeaders}
                  data={techCredentialsData}
                />
                
                {/* Removing skills visualization
                <motion.div 
                  variants={itemVariants}
                  className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
                >
                  <div className="bg-modern-muted/60 backdrop-blur-sm rounded-lg p-5 border border-modern-border shadow-md">
                    <div className="flex items-center gap-2 mb-4">
                      <BrainCircuit className="text-modern-primary h-5 w-5" />
                      <h3 className="font-semibold text-modern-foreground">ML/AI Skills</h3>
                    </div>
                    
                    {[
                      { name: "Prompt Engineering", level: 95 },
                      { name: "RAG Systems", level: 90 },
                      { name: "Multi-Agent Architecture", level: 85 },
                      { name: "Deep Learning", level: 80 },
                    ].map((skill, i) => (
                      <div key={i} className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-modern-foreground">{skill.name}</span>
                          <span className="text-modern-primary font-medium">{skill.level}%</span>
                        </div>
                        <div className="h-2 w-full bg-modern-muted rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-modern-primary rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-modern-muted/60 backdrop-blur-sm rounded-lg p-5 border border-modern-border shadow-md">
                    <div className="flex items-center gap-2 mb-4">
                      <BarChartBig className="text-modern-primary h-5 w-5" />
                      <h3 className="font-semibold text-modern-foreground">Analytics Skills</h3>
                    </div>
                    
                    {[
                      { name: "Data Pipeline Engineering", level: 90 },
                      { name: "Enterprise BI", level: 95 },
                      { name: "Statistical Analysis", level: 85 },
                      { name: "Data Visualization", level: 88 },
                    ].map((skill, i) => (
                      <div key={i} className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-modern-foreground">{skill.name}</span>
                          <span className="text-modern-primary font-medium">{skill.level}%</span>
                        </div>
                        <div className="h-2 w-full bg-modern-muted rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-modern-primary rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-modern-muted/60 backdrop-blur-sm rounded-lg p-5 border border-modern-border shadow-md">
                    <div className="flex items-center gap-2 mb-4">
                      <ShieldCheck className="text-modern-primary h-5 w-5" />
                      <h3 className="font-semibold text-modern-foreground">Security Skills</h3>
                    </div>
                    
                    {[
                      { name: "AI-Powered Threat Detection", level: 88 },
                      { name: "Secure AI Deployment", level: 85 },
                      { name: "AI Risk Assessment", level: 92 },
                      { name: "Data Privacy & Governance", level: 90 },
                    ].map((skill, i) => (
                      <div key={i} className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-modern-foreground">{skill.name}</span>
                          <span className="text-modern-primary font-medium">{skill.level}%</span>
                        </div>
                        <div className="h-2 w-full bg-modern-muted rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-modern-primary rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
                */}
              </motion.div>
            </GradientBg>
          </Slide>

          {/* Slide 4.5: GitHub Profile */}
          <Slide>
            <GradientBg>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <SlideTitle>Still an Active AI Engineer</SlideTitle>
                <motion.div
                  variants={itemVariants}
                  className="mt-6 md:mt-8 text-center"
                >
                  <a
                    href="https://github.com/tkhongsap"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-modern-primary hover:text-modern-primary/80 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    github.com/tkhongsap
                  </a>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="mt-6 mb-4 px-4 md:px-0"
                >
                  <div className="bg-modern-muted/90 backdrop-blur-sm border border-modern-border dark:border-gray-800 rounded-lg shadow-lg overflow-hidden relative">
                    <div className="bg-modern-background/90 backdrop-blur-sm dark:bg-gray-800 border-b border-modern-border dark:border-gray-700 p-4 relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-modern-muted border-2 border-modern-primary/30 shadow-md">
                            <img
                              src="/assets/profile-ta.jpg"
                              alt="Ta Khongsap GitHub profile"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-modern-foreground dark:text-white flex items-center gap-2">
                              tkhongsap
                              <span className="text-xs bg-modern-primary/10 text-modern-primary px-2 py-0.5 rounded-full">Pro</span>
                            </h3>
                            <p className="text-sm text-modern-mutedForeground dark:text-gray-400 flex items-center gap-1">
                              <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span> 
                              Active contributor
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-modern-border dark:border-gray-700 p-4 md:p-6 relative z-10">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <svg viewBox="0 0 24 24" className="h-5 w-5 text-modern-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m5.67 7.95-3.17-.71L3.2 4l2.47 1.24m.22 6.76-2.47 1.54 1.24 1.54 1.23-2.47m5.95-3.08L9.07 5.53 6.6 7.07l1.24 2.46m4.92 6.77-1.23-3.7-2.47.72.72 2.47"/>
                        </svg>
                        <h3 className="font-bold text-lg text-modern-primary">Active Code Contributions</h3>
                      </div>
                      <div className="bg-modern-background/70 backdrop-blur-sm p-4 rounded-lg border border-modern-border mb-2 shadow-md">
                        <div className="font-medium text-modern-foreground dark:text-white mb-3 flex justify-between items-center">
                          <span>645 contributions in the last year</span>
                          <span className="text-sm text-modern-primary font-semibold px-2 py-1 bg-modern-primary/10 rounded-full">Top 10% Active</span>
                        </div>
                        
                        {/* Removing custom activity heatmap */}
                        <div className="relative">
                          <img
                            src="https://ghchart.rshah.org/tkhongsap"
                            alt="GitHub contribution activity chart showing contributions"
                            onError={(e) => {
                              // Fallback to a placeholder if the dynamic chart fails
                              e.currentTarget.src = "https://placehold.co/800x200/0969DA/ffffff?text=GitHub+Contributions";
                              e.currentTarget.alt = "GitHub contributions placeholder";
                            }}
                            className="w-full h-auto max-w-3xl mx-auto rounded-md border border-modern-border/50 shadow-sm bg-[#ebedf0]"
                          />
                        </div>
                        <p className="text-sm text-modern-mutedForeground mt-3 text-center italic">
                          Consistent code contributions across multiple AI and ML open-source projects
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 border-b border-modern-border dark:border-gray-700 text-center relative z-10">
                      <div className="p-3 border-r border-modern-border dark:border-gray-700">
                        <div className="font-medium text-modern-foreground dark:text-white">
                          6
                        </div>
                        <div className="text-sm text-modern-mutedForeground dark:text-gray-400">
                          Pinned Repos
                        </div>
                      </div>
                      <div className="p-3 border-r border-modern-border dark:border-gray-700">
                        <div className="font-medium text-modern-foreground dark:text-white">
                          2
                        </div>
                        <div className="text-sm text-modern-mutedForeground dark:text-gray-400">
                          Followers
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="font-medium text-modern-foreground dark:text-white">
                          15
                        </div>
                        <div className="text-sm text-modern-mutedForeground dark:text-gray-400">
                          Following
                        </div>
                      </div>
                    </div>

                    {/* Simplify repository section */}
                    <div className="p-4 relative z-10">
                      <div className="text-sm text-modern-foreground dark:text-gray-200 mb-4">
                        <span className="font-medium">Notable repositories:</span>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-modern-muted/80 backdrop-blur-sm dark:bg-gray-800 rounded border border-modern-border dark:border-gray-700 p-3 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-modern-primary flex items-center gap-1">
                                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                                  <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
                                </svg>
                                anthropic-cookbook
                              </h4>
                              <p className="text-sm text-modern-mutedForeground dark:text-gray-400 mt-1">
                                A collection of notebooks/recipes showcasing some
                                fun and effective ways of using Claude.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-modern-muted/80 backdrop-blur-sm dark:bg-gray-800 rounded border border-modern-border dark:border-gray-700 p-3 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-modern-primary flex items-center gap-1">
                                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                                  <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
                                </svg>
                                llama_index
                              </h4>
                              <p className="text-sm text-modern-mutedForeground dark:text-gray-400 mt-1">
                                LlamaIndex is a data framework for your LLM applications
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="text-center mb-6 text-modern-mutedForeground italic text-sm"
                >
                  Recent contributions to: <strong>gen-ai-jira</strong>,{" "}
                  <strong>learning-ai-mockup</strong>,{" "}
                  <strong>tkhongsap-website</strong>
                </motion.div>
              </motion.div>
            </GradientBg>
          </Slide>

          {/* Slide 5: Current Initiatives */}
          <Slide>
            <GradientBg>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <SlideTitle>
                  Examples of Enterprise-Scale AI Initiatives
                </SlideTitle>
                <SimpleTable
                  headers={initiativesHeaders}
                  data={initiativesData}
                />
                <motion.h3
                  variants={itemVariants}
                  className="mt-6 md:mt-8 font-semibold text-modern-primary"
                >
                  Expected Outcomes
                </motion.h3>
                <BulletList className="mt-2 md:mt-4 space-y-2">
                  <BulletPoint icon={ShieldCheck}>
                    Consistent, knowledge-driven support with faster incident
                    resolution
                  </BulletPoint>
                  <BulletPoint icon={Activity}>
                    Higher-quality, secure code delivered sooner through AI
                    augmentation
                  </BulletPoint>
                  <BulletPoint icon={BookOpen}>
                    Seamless document capture that feeds business processes with
                    zero manual touch
                  </BulletPoint>
                  <BulletPoint icon={GitBranch}>
                    Automated, audit-ready document approvals
                  </BulletPoint>
                  <BulletPoint icon={Zap}>
                    Real-time visual insight that reduces risk and improves
                    operational quality
                  </BulletPoint>
                </BulletList>
                
                {/* Removing visual metrics 
                <motion.div 
                  variants={itemVariants}
                  className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
                >
                  {[
                    { label: "Productivity Gain", value: 68, icon: Zap, color: "from-green-500 to-emerald-700" },
                    { label: "Cost Reduction", value: 42, icon: TrendingUp, color: "from-blue-500 to-indigo-700" },
                    { label: "Quality Improvement", value: 55, icon: CheckCircle, color: "from-purple-500 to-violet-700" }
                  ].map((metric, i) => (
                    <motion.div
                      key={i}
                      className="bg-modern-muted/60 backdrop-blur-sm rounded-lg border border-modern-border p-5 shadow-md"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className="flex flex-col items-center">
                        <div className="relative w-24 h-24 mb-3">
                          <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle 
                              cx="50" cy="50" r="45" 
                              className="stroke-modern-muted fill-none" 
                              strokeWidth="10"
                            />
                          </svg>
                          
                          <svg className="w-full h-full absolute top-0 left-0" viewBox="0 0 100 100">
                            <defs>
                              <linearGradient id={`gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" className={`stop-color-${metric.color.split(' ')[0]}`} />
                                <stop offset="100%" className={`stop-color-${metric.color.split(' ')[1]}`} />
                              </linearGradient>
                            </defs>
                            <circle 
                              cx="50" cy="50" r="45" 
                              className="fill-none" 
                              stroke={`url(#gradient-${i})`}
                              strokeWidth="10"
                              strokeDasharray="283"
                              strokeDashoffset={283 - (283 * metric.value / 100)}
                              transform="rotate(-90 50 50)"
                            />
                          </svg>
                          
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <span className="text-xl font-bold text-modern-foreground">{metric.value}%</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <metric.icon className="h-4 w-4 text-modern-primary" />
                          <h4 className="font-medium text-modern-foreground">{metric.label}</h4>
                        </div>
                        <p className="text-xs text-modern-mutedForeground mt-3 text-center">
                          Based on pilot implementations
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                */}
              </motion.div>
            </GradientBg>
          </Slide>

          {/* Slide 6: Enterprise AI Demo - Real Example */}
          <Slide>
            <GradientBg>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <SlideTitle>
                  Enterprise AI Example: Code Review & Quality Automation
                </SlideTitle>
                <motion.div
                  variants={itemVariants}
                  className="mt-4 mb-6 px-4 md:px-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div className="md:col-span-3 flex flex-col justify-center">
                      <h3 className="text-xl font-semibold text-modern-primary mb-3">
                        Intelligent Code Analysis in Action
                      </h3>
                      <p className="text-modern-mutedForeground mb-4">
                        This enterprise-ready AI system automates code reviews,
                        identifies risks, and optimizes software quality. It
                        demonstrates practical applications for:
                      </p>
                      <ul className="space-y-2 list-disc pl-5 mb-4">
                        <li>
                          <span className="font-medium text-modern-foreground">
                            Technical debt reduction
                          </span>{" "}
                          <span className="text-modern-mutedForeground">
                            in legacy systems
                          </span>
                        </li>
                        <li>
                          <span className="font-medium text-modern-foreground">
                            Security vulnerability detection
                          </span>{" "}
                          <span className="text-modern-mutedForeground">
                            (e.g., secrets in code, misconfigurations)
                          </span>
                        </li>
                        <li>
                          <span className="font-medium text-modern-foreground">
                            Developer productivity benchmarking
                          </span>
                        </li>
                      </ul>
                      <p className="text-modern-mutedForeground font-medium italic mb-4">
                        A scalable solution to enforce code quality, accelerate
                        delivery, and reduce operational risks.
                      </p>
                      <div className="mt-2 p-4 bg-modern-muted/70 backdrop-blur-sm border border-modern-border rounded-lg shadow-md">
                        <p className="font-medium text-modern-foreground mb-2">
                          Demo Link:
                        </p>
                        <a
                          href="https://kzml8wmdn62m0pm4mt86.lite.vusercontent.net/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-modern-primary hover:text-modern-primary/80 font-medium flex items-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Code Review Demo
                        </a>
                        <p className="text-xs text-modern-mutedForeground mt-2">
                          Explore how AI analyzes codebases in real time, surfaces
                          actionable insights, and integrates with CI/CD
                          pipelines.
                        </p>
                      </div>
                      
                      {/* Removing code review animation 
                      <motion.div 
                        className="mt-6 relative p-4 bg-modern-muted/40 rounded-lg border border-modern-border"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                      >
                        <div className="overflow-hidden rounded-md shadow-inner bg-black/80 p-4 font-mono text-xs text-green-400">
                          <div className="flex items-center gap-1 mb-2 text-white/80">
                            <Code className="h-4 w-4" />
                            <span>Code Review Analysis</span>
                          </div>
                          
                          <motion.div
                            initial={{ opacity: 1 }}
                            animate={{ 
                              opacity: [1, 1, 1, 1],
                              transition: { duration: 4, repeat: Infinity }
                            }}
                          >
                            <p className="mb-1">Scanning repository...</p>
                            <p className="mb-1">Analyzing 238 files, 42,567 lines of code...</p>
                            <p className="mb-1 text-yellow-400">Found 3 potential security issues:</p>
                            <p className="mb-1 ml-4">• Hardcoded credentials in config.js</p>
                            <p className="mb-1 ml-4">• Insecure dependency in package.json</p>
                            <p className="mb-1 ml-4">• SQL injection vulnerability in query builder</p>
                            <p className="mb-1 text-blue-400">Found 7 code quality improvements:</p>
                            <p className="mb-1 ml-4">• Redundant logic in UserService</p>
                            <p className="mb-1 ml-4">• Memory leak in WebSocket handler</p>
                            <p className="mb-1 ml-4">• Inefficient query patterns in 5 files</p>
                            <p className="mb-1 text-green-400">Generating detailed report...</p>
                            <p className="mb-1">Code review completed in 7.2 seconds</p>
                          </motion.div>
                        </div>
                      </motion.div>
                      */}
                    </div>
                    <div className="md:col-span-2">
                      <div className="bg-modern-muted/70 backdrop-blur-sm rounded-lg border border-modern-border p-4 mb-4 shadow-md">
                        <h4 className="font-medium text-modern-foreground mb-3">
                          Business Impact:
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-start gap-2">
                            <Zap className="w-5 h-5 text-modern-primary flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-modern-mutedForeground">
                              Reduces code review time by{" "}
                              <span className="font-medium">60–80%</span> via
                              automated analysis
                            </p>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-modern-primary flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-modern-mutedForeground">
                              Improves code quality scores from{" "}
                              <span className="font-medium">7.2 to 9.1/10</span>{" "}
                              in pilot teams
                            </p>
                          </div>
                          <div className="flex items-start gap-2">
                            <TrendingUp className="w-5 h-5 text-modern-primary flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-modern-mutedForeground">
                              Scales code governance without hiring additional
                              reviewers
                            </p>
                          </div>
                          <div className="flex items-start gap-2">
                            <ShieldCheck className="w-5 h-5 text-modern-primary flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-modern-mutedForeground">
                              Provides audit-ready reports for compliance (SOC2,
                              PCI-DSS)
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-modern-primary/5 backdrop-blur-sm rounded-lg border border-modern-primary/20 p-4 shadow-md">
                        <h4 className="font-medium text-modern-foreground mb-2">
                          Why This Matters:
                        </h4>
                        <div className="space-y-2 text-sm">
                          <p className="text-modern-mutedForeground">
                            <span className="font-medium text-modern-foreground">
                              Faster Releases:
                            </span>{" "}
                            Cut QA cycles by prioritizing high-risk code.
                          </p>
                          <p className="text-modern-mutedForeground">
                            <span className="font-medium text-modern-foreground">
                              Risk Mitigation:
                            </span>{" "}
                            Proactively flag vulnerabilities before production.
                          </p>
                          <p className="text-modern-mutedForeground">
                            <span className="font-medium text-modern-foreground">
                              Cost Savings:
                            </span>{" "}
                            Reduce post-deployment bug-fixing costs by 40%.
                          </p>
                        </div>
                      </div>
                      
                      {/* Removing data visualization
                      <div className="mt-4">
                        <DataChart type="line" className="mb-2" />
                        <p className="text-xs text-modern-mutedForeground text-center">
                          Code quality improvements over time with AI-assisted reviews
                        </p>
                      </div>
                      */}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </GradientBg>
          </Slide>

          {/* Slide 7: Vision: AI-First Company */}
          <Slide className="bg-modern-muted">
            <GradientBg>
              <CirclePattern className="top-20 right-10" />
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-center"
              >
                <SlideTitle>My Vision: Making "AI-First" the Default</SlideTitle>
                <motion.blockquote
                  variants={itemVariants}
                  className="text-xl md:text-2xl italic text-modern-foreground bg-modern-background/50 backdrop-blur-sm border-l-4 border-modern-primary pl-4 md:pl-6 py-2 px-4 max-w-3xl mx-auto mb-8 md:mb-10 shadow-md rounded-r-lg"
                >
                  <strong>AI-First</strong> isn't a feature—​it's the lens through
                  which every decision, design, and hire is made.
                </motion.blockquote>
                <motion.h3
                  variants={itemVariants}
                  className="font-semibold text-modern-primary mb-4"
                >
                  Key Pillars:
                </motion.h3>
                <BulletList className="inline-block text-left space-y-3 md:space-y-4 max-w-xl">
                  <BulletPoint icon={CloudCog}>
                    <span className="font-semibold text-modern-foreground">
                      Continuous Learning Loops
                    </span>{" "}
                    – systems get smarter with every use.
                  </BulletPoint>
                  <BulletPoint icon={GitBranch}>
                    <span className="font-semibold text-modern-foreground">
                      Process Re-imagination
                    </span>{" "}
                    – workflows designed around AI capabilities, not bolt-on
                    automation.
                  </BulletPoint>
                  <BulletPoint icon={Users}>
                    <span className="font-semibold text-modern-foreground">
                      People-Centric Adoption
                    </span>{" "}
                    – every employee wields AI daily to turn insight into action.
                  </BulletPoint>
                </BulletList>

                <motion.h3
                  variants={itemVariants}
                  className="font-semibold text-modern-primary mb-4 mt-6"
                >
                  Operating Norms:
                </motion.h3>
                <BulletList className="inline-block text-left space-y-3 md:space-y-4 max-w-xl">
                  <BulletPoint icon={CheckCircle}>
                    Everyone is expected to use AI in their day-to-day work.
                  </BulletPoint>
                  <BulletPoint icon={Lightbulb}>
                    Prompting isn't a bonus skill—it's becoming part of the job.
                  </BulletPoint>
                </BulletList>
                
                {/* Removing AI-first organization diagram
                <motion.div 
                  variants={itemVariants}
                  className="mt-10 max-w-3xl mx-auto"
                >
                  <div className="bg-modern-background/80 backdrop-blur-sm rounded-lg shadow-md p-6 border border-modern-border">
                    <h4 className="text-lg font-medium text-modern-foreground mb-4 text-center">AI-First Organization Model</h4>
                    
                    <div className="relative h-64 mb-6">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-modern-primary/80 rounded-full flex items-center justify-center shadow-lg z-20">
                        <BrainCircuit className="h-10 w-10 text-white" />
                      </div>
                      
                      <div className="absolute top-0 left-0 w-full h-full">
                        {[...Array(5)].map((_, i) => {
                          const angle = (i * (360 / 5) * Math.PI) / 180;
                          const lineLength = "40%";
                          return (
                            <motion.div 
                              key={i}
                              className="absolute top-1/2 left-1/2 bg-modern-primary/40 h-px origin-left z-10"
                              style={{ 
                                width: lineLength,
                                transform: `rotate(${angle}rad) translateY(-50%)`,
                              }}
                              initial={{ width: 0, opacity: 0 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                              viewport={{ once: true }}
                            />
                          );
                        })}
                      </div>
                      
                      {[
                        { icon: Users, label: "Workforce", position: "top-0 left-1/4" },
                        { icon: Code, label: "Development", position: "top-0 right-1/4" },
                        { icon: ShieldCheck, label: "Security", position: "bottom-0 left-1/4" },
                        { icon: Target, label: "Strategy", position: "bottom-0 right-1/4" },
                        { icon: Database, label: "Data Architecture", position: "top-1/2 right-0" }
                      ].map((node, i) => (
                        <motion.div 
                          key={i}
                          className={`absolute ${node.position} bg-modern-muted rounded-lg border border-modern-border p-2 shadow-md flex flex-col items-center w-24 z-20`}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + (i * 0.15) }}
                          viewport={{ once: true }}
                        >
                          <node.icon className="h-6 w-6 text-modern-primary mb-1" />
                          <span className="text-xs text-modern-foreground font-medium">{node.label}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="text-sm text-modern-mutedForeground text-center">
                      AI as the central nervous system connecting all organizational functions
                    </div>
                  </div>
                </motion.div>
                */}
              </motion.div>
            </GradientBg>
          </Slide>

          {/* Slide 8: AI Maturity Framework - Readiness */}
          <Slide>
            <GradientBg>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <SlideTitle>
                  AI-Maturity Framework: Readiness Dimensions
                </SlideTitle>
                <SimpleTable
                  headers={aiMaturityReadinessHeaders}
                  data={aiMaturityReadinessData}
                />
                <motion.blockquote
                  variants={itemVariants}
                  className="text-lg md:text-xl italic text-modern-mutedForeground border-l-4 border-modern-accent pl-4 md:pl-6 py-2 max-w-3xl mx-auto mt-6 md:mt-8"
                >
                  "Before you sprint, build the shoes, map the course, train the
                  runners."
                </motion.blockquote>
                
                {/* Removing maturity visualization
                <motion.div 
                  variants={itemVariants}
                  className="mt-8 max-w-4xl mx-auto"
                >
                  <div className="bg-modern-muted/50 backdrop-blur-sm rounded-lg border border-modern-border p-6 shadow-md">
                    <h4 className="text-lg font-medium text-modern-foreground mb-4 text-center">AI Maturity Assessment</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      {[
                        { name: "Infrastructure", level: 2, maxLevel: 5 },
                        { name: "Data Ecosystem", level: 3, maxLevel: 5 },
                        { name: "Talent Availability", level: 1, maxLevel: 5 },
                        { name: "Risk Tolerance", level: 2, maxLevel: 5 },
                        { name: "Funding Alignment", level: 3, maxLevel: 5 }
                      ].map((dim, i) => (
                        <div key={i} className="bg-modern-background/80 rounded-lg p-4 shadow-sm">
                          <div className="text-center mb-2">
                            <h5 className="font-medium text-modern-foreground text-sm">{dim.name}</h5>
                          </div>
                          
                          <div className="flex flex-col gap-1">
                            {[...Array(dim.maxLevel)].map((_, levelIndex) => (
                              <motion.div 
                                key={levelIndex}
                                className={`h-6 rounded-sm ${levelIndex < dim.level ? 'bg-modern-primary' : 'bg-modern-muted'} flex items-center justify-center`}
                                initial={{ opacity: 0.3, width: "60%" }}
                                whileInView={{ opacity: 1, width: "100%" }}
                                transition={{ delay: 0.2 + (levelIndex * 0.1) }}
                                viewport={{ once: true }}
                              >
                                {levelIndex < dim.level && (
                                  <span className="text-xs text-white font-medium">
                                    Level {levelIndex + 1}
                                  </span>
                                )}
                              </motion.div>
                            ))}
                          </div>
                          
                          <div className="mt-2 text-center">
                            <span className="text-xs px-2 py-1 rounded-full bg-modern-primary/10 text-modern-primary">
                              {dim.level}/{dim.maxLevel}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 text-sm text-modern-mutedForeground text-center">
                      Sample maturity assessment for a mid-sized enterprise transitioning to AI-first
                    </div>
                  </div>
                </motion.div>
                */}
              </motion.div>
            </GradientBg>
          </Slide>

          {/* Slide 11: Key Takeaways */}
          <Slide className="bg-modern-primary text-modern-primaryForeground">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <SlideTitle>Key Takeaways</SlideTitle>
              <motion.div
                variants={itemVariants}
                className="max-w-3xl mx-auto pt-6 md:pt-8"
              >
                {/* Quote section with enhanced styling */}
                <motion.div 
                  variants={itemVariants}
                  className="relative mb-10 md:mb-12 px-4 md:px-8 py-6 md:py-8 bg-modern-primaryForeground/10 backdrop-blur-sm rounded-lg border border-modern-primaryForeground/20 shadow-lg"
                >
                  <motion.div 
                    variants={itemVariants}
                    className="absolute -top-4 left-6 bg-modern-primary px-3 py-1"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-modern-primaryForeground">
                      <path d="M10 11L7 15H10V19H4V15L7 11V8H10V11ZM20 11L17 15H20V19H14V15L17 11V8H20V11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                  <motion.blockquote
                    variants={itemVariants}
                    className="text-xl md:text-2xl font-medium text-center"
                  >
                    "The competitive edge isn't the algorithm; it's how fast we
                    learn from it."
                  </motion.blockquote>
                </motion.div>

                {/* Key points section with icons */}
                <motion.div variants={itemVariants} className="mb-8 md:mb-10">
                  <div className="space-y-4 md:space-y-5">
                    <motion.div 
                      className="p-4 md:p-5 border border-modern-primaryForeground/20 rounded-lg bg-modern-primaryForeground/10 backdrop-blur-sm flex items-start gap-3"
                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    >
                      <div className="flex-shrink-0 rounded-full bg-modern-primaryForeground/20 p-2">
                        <Zap className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-bold text-lg">AI-First Mindset</span>
                        <p className="mt-1 text-modern-primaryForeground/90">It's the default lens for design, decisions, and hiring.</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="p-4 md:p-5 border border-modern-primaryForeground/20 rounded-lg bg-modern-primaryForeground/10 backdrop-blur-sm flex items-start gap-3"
                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    >
                      <div className="flex-shrink-0 rounded-full bg-modern-primaryForeground/20 p-2">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-bold text-lg">AI for Everyone</span>
                        <p className="mt-1 text-modern-primaryForeground/90">Using and prompting AI is the new baseline skill, not a bonus.</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="p-4 md:p-5 border border-modern-primaryForeground/20 rounded-lg bg-modern-primaryForeground/10 backdrop-blur-sm flex items-start gap-3"
                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    >
                      <div className="flex-shrink-0 rounded-full bg-modern-primaryForeground/20 p-2">
                        <CloudCog className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-bold text-lg">Continuous Learning Loops</span>
                        <p className="mt-1 text-modern-primaryForeground/90">Secure, self-improving systems and an empowered talent pool.</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.hr
                  variants={itemVariants}
                  className="border-t border-modern-primaryForeground/20 mb-8 md:mb-10"
                />

                {/* Next Steps section with improved styling */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-xl md:text-2xl font-semibold mb-5 text-center flex items-center justify-center gap-2">
                    <Rocket className="h-6 w-6" />
                    <span>Next Steps</span>
                  </h3>
                  <div className="space-y-4 md:space-y-5">
                    <motion.div 
                      className="p-4 md:p-5 border border-modern-primaryForeground/20 rounded-lg bg-modern-primaryForeground/10 backdrop-blur-sm flex items-start gap-3 group"
                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    >
                      <div className="flex-shrink-0 rounded-full bg-modern-primaryForeground/20 p-2 flex items-center justify-center w-9 h-9 group-hover:bg-modern-primaryForeground/30 transition-colors">
                        <span className="font-bold">1</span>
                      </div>
                      <div className="pt-1">
                        <p className="text-lg">Prioritise 90-day quick-win use cases / POCs.</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="p-4 md:p-5 border border-modern-primaryForeground/20 rounded-lg bg-modern-primaryForeground/10 backdrop-blur-sm flex items-start gap-3 group"
                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    >
                      <div className="flex-shrink-0 rounded-full bg-modern-primaryForeground/20 p-2 flex items-center justify-center w-9 h-9 group-hover:bg-modern-primaryForeground/30 transition-colors">
                        <span className="font-bold">2</span>
                      </div>
                      <div className="pt-1">
                        <p className="text-lg">Define success metrics for each AI-enabled solution.</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="p-4 md:p-5 border border-modern-primaryForeground/20 rounded-lg bg-modern-primaryForeground/10 backdrop-blur-sm flex items-start gap-3 group"
                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    >
                      <div className="flex-shrink-0 rounded-full bg-modern-primaryForeground/20 p-2 flex items-center justify-center w-9 h-9 group-hover:bg-modern-primaryForeground/30 transition-colors">
                        <span className="font-bold">3</span>
                      </div>
                      <div className="pt-1">
                        <p className="text-lg">Map the talent upskilling path to embed AI fluency across teams.</p>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Removing floating particles
                  <div className="relative h-20 mt-10">
                    {[...Array(15)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-full bg-modern-primaryForeground/30"
                        style={{
                          width: `${5 + Math.random() * 8}px`,
                          height: `${5 + Math.random() * 8}px`,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [0, -15, 0],
                          opacity: [0.3, 0.8, 0.3],
                          transition: {
                            duration: 2 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                          }
                        }}
                      />
                    ))}
                  </div>
                  */}
                </motion.div>
              </motion.div>
            </motion.div>
          </Slide>
        </Presentation>
      </main>
    </>
  );
}
