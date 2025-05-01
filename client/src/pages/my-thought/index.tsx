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
const SimpleTable = ({
  data,
  headers,
}: {
  data: string[][];
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
              {row.map((cell, cellIndex) => (
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

  const initiativesData = [
    [
      "**AI-Powered Knowledge Management**",
      "Converts internal case notes and resolutions into an LLM-searchable knowledge base, so support teams get consistent answers and best-practice fixes instantly.",
    ],
    [
      "**AI-Assisted Software Development**",
      "Uses code-assistant tooling and ML-driven code review to boost developer productivity, raise code quality and security, and upskill teams through real-time suggestions.",
    ],
    [
      "**AI-First Mobile OCR Application**",
      "An AI-powered OCR app that captures documents in the field, applies business rules, and pushes clean data straight into core workflows—eliminating re-keying delays.",
    ],
    [
      "**Agentic Document Workflow**",
      "A multi-agent pipeline that ingests contracts, extracts key clauses, and routes approvals automatically, turning days of manual processing into near real-time flow.",
    ],
    [
      "**Vision Models for Image Insight**",
      "Computer-vision models that detect, classify, and flag anomalies in images or video—supporting use-cases from product-defect QC to field asset inspections and visual analytics.",
    ],
  ];
  const initiativesHeaders = [
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
            <motion.div
              className="flex flex-col md:flex-row-reverse gap-8 md:gap-12 items-center justify-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="md:w-1/3">
                <div className="bg-modern-muted rounded-lg p-6">
                  <div className="mb-6 flex justify-center">
                    <div className="w-48 h-48 rounded-full overflow-hidden flex items-center justify-center border-2 border-modern-primary">
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
                  className="text-2xl md:text-3xl font-medium leading-relaxed text-modern-foreground border-l-4 border-modern-primary pl-4 md:pl-6 py-2"
                >
                  "AI isn't an option — it's the new baseline for building
                  secure, resilient, and revenue-generating systems."
                </motion.blockquote>
              </motion.div>
            </motion.div>
          </Slide>

          {/* Slide 2: Agenda */}
          <Slide className="pt-16 md:pt-20 lg:pt-24">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <SlideTitle>Agenda: Vision, Strategy, Impact</SlideTitle>
              <div className="max-w-3xl mx-auto mt-8 md:mt-10">
                <div className="grid grid-cols-1 gap-4">
                  {[
                    {
                      icon: Briefcase,
                      title: "Leadership Snapshot & Credentials",
                      order: 1,
                    },
                    {
                      icon: ClipboardList,
                      title: "Current Initiatives & Expected Outcomes",
                      order: 2,
                    },
                    {
                      icon: BrainCircuit,
                      title: "Enterprise AI Demo: Code Review System",
                      order: 3,
                    },
                    {
                      icon: Lightbulb,
                      title: "My Vision: Making 'AI-First' the Default",
                      order: 4,
                    },
                    {
                      icon: Milestone,
                      title: "AI Maturity Framework: Readiness Dimension",
                      order: 5,
                    },
                    { icon: Rocket, title: "Key Takeaways", order: 6 },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="rounded-lg border border-modern-border bg-modern-background text-modern-foreground shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                    >
                      <div className="p-4 md:p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 rounded-full bg-modern-primary/10 p-3">
                            <item.icon className="h-6 w-6 text-modern-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <h3 className="text-lg font-medium leading-6 text-modern-foreground">
                                {item.title}
                              </h3>
                              <div className="ml-2">
                                <span className="inline-flex items-center rounded-full bg-modern-primary/10 px-2.5 py-0.5 text-xs font-semibold text-modern-primary">
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
            </motion.div>
          </Slide>

          {/* Slide 4: Technical Credentials */}
          <Slide>
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
            </motion.div>
          </Slide>

          {/* Slide 4.5: GitHub Profile */}
          <Slide>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <SlideTitle>Open Source Contributions</SlideTitle>
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
                <div className="bg-modern-muted dark:bg-gray-900 border border-modern-border dark:border-gray-800 rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-modern-background dark:bg-gray-800 border-b border-modern-border dark:border-gray-700 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-modern-muted">
                          <img
                            src="/assets/profile-ta.jpg"
                            alt="Ta Khongsap GitHub profile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-modern-foreground dark:text-white">
                            tkhongsap
                          </h3>
                          <p className="text-sm text-modern-mutedForeground dark:text-gray-400">
                            2 followers · 15 following
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 border-b border-modern-border dark:border-gray-700 text-center p-3">
                    <div className="font-medium text-modern-foreground dark:text-white mb-2">
                      645 contributions in the last year
                    </div>
                    <img
                      src="/assets/github-contributions.png"
                      alt="GitHub contribution activity chart showing 645 contributions"
                      className="w-full h-auto max-w-3xl mx-auto"
                    />
                  </div>

                  <div className="grid grid-cols-3 border-b border-modern-border dark:border-gray-700 text-center">
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

                  <div className="p-4">
                    <div className="text-sm text-modern-foreground dark:text-gray-200 mb-4">
                      <span className="font-medium">Pinned repositories:</span>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-modern-muted dark:bg-gray-800 rounded border border-modern-border dark:border-gray-700 p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-modern-primary">
                              anthropic-cookbook
                            </h4>
                            <p className="text-sm text-modern-mutedForeground dark:text-gray-400 mt-1">
                              A collection of notebooks/recipes showcasing some
                              fun and effective ways of using Claude.
                            </p>
                            <div className="flex gap-2 mt-2">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                Jupyter Notebook
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-modern-muted dark:bg-gray-800 rounded border border-modern-border dark:border-gray-700 p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-modern-primary">
                              llama_index
                            </h4>
                            <p className="text-sm text-modern-mutedForeground dark:text-gray-400 mt-1">
                              LlamaIndex is a data framework for your LLM
                              applications
                            </p>
                            <div className="flex gap-2 mt-2">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                Python
                              </span>
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                <svg
                                  className="w-3 h-3 mr-1"
                                  viewBox="0 0 16 16"
                                  fill="currentColor"
                                >
                                  <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path>
                                </svg>
                                1
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-modern-muted dark:bg-gray-800 rounded border border-modern-border dark:border-gray-700 p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-modern-primary">
                              openai-cookbook
                            </h4>
                            <p className="text-sm text-modern-mutedForeground dark:text-gray-400 mt-1">
                              Examples and guides for using the OpenAI API
                            </p>
                            <div className="flex gap-2 mt-2">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                MDX
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-modern-muted dark:bg-gray-800 rounded border border-modern-border dark:border-gray-700 p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-modern-primary">
                              gen-ai-utils
                            </h4>
                            <p className="text-sm text-modern-mutedForeground dark:text-gray-400 mt-1">
                              A collection of utility scripts and helper
                              functions for integrating and managing generative
                              AI APIs, including OpenAI, Anthropic, and others.
                            </p>
                            <div className="flex gap-2 mt-2">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                Python
                              </span>
                            </div>
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
          </Slide>

          {/* Slide 5: Current Initiatives */}
          <Slide>
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
            </motion.div>
          </Slide>

          {/* Slide 6: Enterprise AI Demo - Real Example */}
          <Slide>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <SlideTitle>
                Enterprise AI Demo: Code Review & Quality Automation
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
                          Compliance auditing
                        </span>{" "}
                        <span className="text-modern-mutedForeground">
                          (e.g., adherence to ISO, GDPR, or internal standards)
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
                    <div className="mt-2 p-4 bg-modern-muted border border-modern-border rounded-lg">
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
                  </div>
                  <div className="md:col-span-2">
                    <div className="bg-modern-muted rounded-lg border border-modern-border p-4 mb-4">
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

                    <div className="bg-modern-primary/5 rounded-lg border border-modern-primary/20 p-4">
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
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </Slide>

          {/* Slide 7: Vision: AI-First Company */}
          <Slide className="bg-modern-muted">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              <SlideTitle>My Vision: Making "AI-First" the Default</SlideTitle>
              <motion.blockquote
                variants={itemVariants}
                className="text-xl md:text-2xl italic text-modern-foreground border-l-4 border-modern-primary pl-4 md:pl-6 py-2 max-w-3xl mx-auto mb-8 md:mb-10"
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
            </motion.div>
          </Slide>

          {/* Slide 8: AI Maturity Framework - Readiness */}
          <Slide>
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
            </motion.div>
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
                  className="relative mb-10 md:mb-12 px-4 md:px-8 py-6 md:py-8 bg-modern-primaryForeground/10 rounded-lg border border-modern-primaryForeground/20"
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

                {/* Key Take-aways section with icons */}
                <motion.div variants={itemVariants} className="mb-8 md:mb-10">
                  <h3 className="text-xl md:text-2xl font-semibold mb-5 text-center flex items-center justify-center gap-2">
                    <Lightbulb className="h-6 w-6" />
                    <span>Key Take-aways</span>
                  </h3>
                  <div className="space-y-4 md:space-y-5">
                    <div className="p-4 md:p-5 border border-modern-primaryForeground/20 rounded-lg bg-modern-primaryForeground/10 flex items-start gap-3">
                      <div className="flex-shrink-0 rounded-full bg-modern-primaryForeground/20 p-2">
                        <Zap className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-bold text-lg">AI-First Mindset</span>
                        <p className="mt-1 text-modern-primaryForeground/90">It's the default lens for design, decisions, and hiring.</p>
                      </div>
                    </div>
                    
                    <div className="p-4 md:p-5 border border-modern-primaryForeground/20 rounded-lg bg-modern-primaryForeground/10 flex items-start gap-3">
                      <div className="flex-shrink-0 rounded-full bg-modern-primaryForeground/20 p-2">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-bold text-lg">AI for Everyone</span>
                        <p className="mt-1 text-modern-primaryForeground/90">Using and prompting AI is the new baseline skill, not a bonus.</p>
                      </div>
                    </div>
                    
                    <div className="p-4 md:p-5 border border-modern-primaryForeground/20 rounded-lg bg-modern-primaryForeground/10 flex items-start gap-3">
                      <div className="flex-shrink-0 rounded-full bg-modern-primaryForeground/20 p-2">
                        <CloudCog className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-bold text-lg">Continuous Learning Loops</span>
                        <p className="mt-1 text-modern-primaryForeground/90">Secure, self-improving systems and an empowered talent pool.</p>
                      </div>
                    </div>
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
                    <div className="p-4 md:p-5 border border-modern-primaryForeground/20 rounded-lg bg-modern-primaryForeground/10 flex items-start gap-3">
                      <div className="flex-shrink-0 rounded-full bg-modern-primaryForeground/20 p-2 flex items-center justify-center w-9 h-9">
                        <span className="font-bold">1</span>
                      </div>
                      <div className="pt-1">
                        <p className="text-lg">Prioritise 90-day quick-win use cases / POCs.</p>
                      </div>
                    </div>
                    
                    <div className="p-4 md:p-5 border border-modern-primaryForeground/20 rounded-lg bg-modern-primaryForeground/10 flex items-start gap-3">
                      <div className="flex-shrink-0 rounded-full bg-modern-primaryForeground/20 p-2 flex items-center justify-center w-9 h-9">
                        <span className="font-bold">2</span>
                      </div>
                      <div className="pt-1">
                        <p className="text-lg">Define success metrics for each AI-enabled solution.</p>
                      </div>
                    </div>
                    
                    <div className="p-4 md:p-5 border border-modern-primaryForeground/20 rounded-lg bg-modern-primaryForeground/10 flex items-start gap-3">
                      <div className="flex-shrink-0 rounded-full bg-modern-primaryForeground/20 p-2 flex items-center justify-center w-9 h-9">
                        <span className="font-bold">3</span>
                      </div>
                      <div className="pt-1">
                        <p className="text-lg">Map the talent upskilling path to embed AI fluency across teams.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </Slide>
        </Presentation>
      </main>
    </>
  );
}
