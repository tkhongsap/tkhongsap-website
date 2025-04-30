import { Helmet } from "react-helmet";
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
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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
    transition: { type: "spring", stiffness: 100 }
  },
};

// Simple Table Component for data display
const SimpleTable = ({ data, headers }: { data: string[][]; headers: string[] }) => {
  return (
    <motion.div variants={containerVariants} className="overflow-x-auto mt-6 md:mt-8 w-full">
      <div className="bg-card rounded-lg shadow-sm border border-border">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <motion.th
                  key={index}
                  variants={itemVariants}
                  className="p-3 md:p-4 border-b-2 border-border text-sm md:text-base font-semibold bg-muted/50"
                >
                  {header}
                </motion.th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <motion.tr key={rowIndex} variants={itemVariants} className="hover:bg-muted/30">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="p-3 md:p-4 border-b border-border text-sm md:text-base text-muted-foreground align-top"
                    // Use dangerouslySetInnerHTML for basic markdown like bold
                    dangerouslySetInnerHTML={{ __html: cell.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                  />
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

// Bullet List Component
const BulletList = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.ul variants={containerVariants} className={`space-y-4 ${className}`}>
    {children}
  </motion.ul>
);

// Bullet Point Component
const BulletPoint = ({ 
  children, 
  icon: Icon 
}: { 
  children: React.ReactNode, 
  icon: React.ElementType 
}) => (
  <motion.li variants={itemVariants} className="flex items-start gap-3">
    <span className="mt-1 flex-shrink-0 text-primary">
      <Icon size={18} />
    </span>
    <span>{children}</span>
  </motion.li>
);

// Section Header Component
const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <motion.h2 
    variants={itemVariants} 
    className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-foreground"
  >
    {children}
  </motion.h2>
);

export default function SirisoftCSEO() {
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
        <title>CSEO Vision Brief | Totrakool Khongsap</title>
        <meta name="description" content="Chief Solution Engineering Officer vision brief - Totrakool Khongsap" />
        <meta name="robots" content="noindex" />
      </Helmet>
      
      <main className="container mx-auto px-4 py-10 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <Link href="/my-thought" className="inline-flex items-center text-muted-foreground hover:text-primary mb-4 transition-colors">
              <ChevronLeft size={16} className="mr-1" />
              Back to My Thought
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold">Agenda: Vision, Strategy, Impact</h1>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Badge>Confidential</Badge>
            <Badge variant="outline">May 2025</Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Award className="h-8 w-8 text-primary mb-2" />
                </div>
                <CardTitle className="text-xl">Leadership Snapshot</CardTitle>
                <CardDescription>15 Years Turning Data & AI Into ฿40 M+ Business Impact</CardDescription>
              </CardHeader>
              <CardContent>
                <BulletList className="space-y-3">
                  <BulletPoint icon={Award}>
                    <span className="font-semibold">AI & Data Strategy Executive:</span> Led enterprise-wide AI roll-outs across finance, telecom, supply-chain, and CPG sectors.
                  </BulletPoint>
                  <BulletPoint icon={Users}>
                    <span className="font-semibold">Team Builder:</span> Scaled & mentored cross-functional groups of data engineers, ML scientists, infra & DevSecOps specialists.
                  </BulletPoint>
                  <BulletPoint icon={BarChartBig}>
                    <span className="font-semibold">Scale & Governance:</span> Designed data estates, MLOps pipelines, and governance frameworks that cut analytic cycle-time 40% and saved over ฿25M logistics costs.
                  </BulletPoint>
                </BulletList>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <ClipboardList className="h-8 w-8 text-primary mb-2" />
                </div>
                <CardTitle className="text-xl">Current Initiatives & Expected Outcomes</CardTitle>
                <CardDescription>Enterprise-Scale AI Initiatives (2024-25)</CardDescription>
              </CardHeader>
              <CardContent>
                <BulletList className="space-y-3">
                  <BulletPoint icon={BrainCircuit}>
                    <span className="font-semibold">AI-Powered Knowledge Management:</span> Vector-DB of 120k tickets; 35% faster MTTR
                  </BulletPoint>
                  <BulletPoint icon={CloudCog}>
                    <span className="font-semibold">AI-First Mobile Application:</span> Real-time OCR & doc-classification; &lt;3 sec latency
                  </BulletPoint>
                  <BulletPoint icon={GitBranch}>
                    <span className="font-semibold">Agentic Document Workflow:</span> Multi-agent pipeline cuts approval lead-time 50%
                  </BulletPoint>
                </BulletList>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <SectionHeader>My Vision: The AI-First Imperative</SectionHeader>
          
          <Card className="mb-8">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <Lightbulb className="h-5 w-5 text-primary mr-2" />
                Building an AI-First Company
              </CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="text-xl border-l-4 border-primary pl-4 py-2 mb-6 italic">
                "AI isn't an option — it's the new baseline for building secure, resilient, and revenue-generating systems."
              </blockquote>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div variants={itemVariants} className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold flex items-center mb-2">
                    <CloudCog className="h-4 w-4 text-primary mr-2" />
                    Systems that learn & adapt
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Building continuous data loops that allow systems to improve over time with usage
                  </p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold flex items-center mb-2">
                    <GitBranch className="h-4 w-4 text-primary mr-2" />
                    Process redesign, not mere automation
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Reimagining workflows to leverage AI capabilities rather than simply automating existing processes
                  </p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold flex items-center mb-2">
                    <Users className="h-4 w-4 text-primary mr-2" />
                    Teams equipped to use AI, not just demo it
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Ensuring AI tools are integrated into daily workflows and team members are skilled in AI utilization
                  </p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold flex items-center mb-2">
                    <Rocket className="h-4 w-4 text-primary mr-2" />
                    Experiment → learn → ship fast
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Pace of learning beats polish; rapid iteration with focus on validated insights
                  </p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <SectionHeader>AI Maturity: Readiness & Execution</SectionHeader>
          
          <p className="text-muted-foreground mb-6">
            Before implementing AI solutions, organizations must assess their readiness across several key dimensions.
          </p>
          
          <SimpleTable headers={aiMaturityReadinessHeaders} data={aiMaturityReadinessData} />
          
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-3">Execution Modes</h3>
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="py-1.5 px-3">Efficiency</Badge>
              <Badge variant="outline" className="py-1.5 px-3">Effectiveness</Badge>
              <Badge variant="outline" className="py-1.5 px-3">Productivity</Badge>
              <Badge variant="outline" className="py-1.5 px-3">Growth</Badge>
              <Badge variant="outline" className="py-1.5 px-3">Expert-augmentation</Badge>
            </div>
          </div>
          
          <blockquote className="text-lg border-l-4 border-primary pl-4 py-2 mt-6 italic">
            "Before you sprint, build the shoes, map the course, train the runners."
          </blockquote>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <SectionHeader>Alignment with Sirisoft's Needs</SectionHeader>
          <SimpleTable headers={whySirisoftHeaders} data={whySirisoftData} />
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <SectionHeader>Commitment & Impact</SectionHeader>
          
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">I'm ready to:</h3>
              <BulletList className="space-y-4">
                <motion.div 
                  variants={itemVariants} 
                  className="flex items-center space-x-3 bg-primary-foreground/10 p-4 rounded-lg"
                >
                  <span className="font-bold text-2xl">1</span>
                  <span>Stand up an AI-powered DevSecOps platform within 120 days</span>
                </motion.div>
                <motion.div 
                  variants={itemVariants} 
                  className="flex items-center space-x-3 bg-primary-foreground/10 p-4 rounded-lg"
                >
                  <span className="font-bold text-2xl">2</span>
                  <span>Cut mean-time-to-detect by 50% using ML anomaly models</span>
                </motion.div>
                <motion.div 
                  variants={itemVariants} 
                  className="flex items-center space-x-3 bg-primary-foreground/10 p-4 rounded-lg"
                >
                  <span className="font-bold text-2xl">3</span>
                  <span>Upskill every engineer on Gen-AI tooling in first year</span>
                </motion.div>
              </BulletList>
            </CardContent>
          </Card>
        </motion.div>
        
        <div className="flex justify-between items-center border-t border-border pt-6 pb-8">
          <div className="text-sm text-muted-foreground">
            Confidential — prepared exclusively for Sirisoft COO interview (2 May 2025)
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm mr-2">2 / 10</span>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronLeft size={16} />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}