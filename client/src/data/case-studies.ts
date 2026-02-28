export interface CaseStudy {
  slug: string;
  projectId: string;
  title: string;
  subtitle: string;
  problem: string;
  approach: string;
  architecture: string;
  results: string[];
  lessons: string[];
  techStack: string[];
  liveUrl?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "ai-agent-system",
    projectId: "ai-agent-system",
    title: "AI Agent System",
    subtitle: "Multi-agent architecture running 24/7 on a single VPS",
    problem:
      "Managing multiple AI tasks manually doesn't scale. Writing code, drafting content, parsing documents, coordinating workflows — doing it all by hand meant context-switching constantly and dropping balls. I needed a system that could handle these tasks autonomously while I slept.",
    approach:
      "Built a multi-agent architecture on OpenClaw with specialized agents. Instead of one monolithic AI, I designed a team: each agent has a focused role, its own tools, and clear boundaries. The orchestrator delegates, the specialists execute, and everything flows through a single coordination layer.",
    architecture:
      "4 specialized agents working together:\n\n- **Orchestrator (Ava)** — Routes tasks, manages priorities, coordinates the team\n- **Builder** — Ships code, reviews PRs, fixes CI, handles GitHub workflows\n- **Content** — Drafts essays, schedules posts, manages the content pipeline\n- **DocParser** — Extracts structured data from PDFs, images, and documents\n\n20+ skills including GitHub, Notion, Postiz, Slack, and more. All running on a single VPS with OpenClaw as the runtime.",
    results: [
      "PRs shipping overnight — wake up to merged code",
      "Automated daily briefs summarizing agent activity",
      "Full content pipeline from draft to publish",
      "Document extraction running on demand",
      "24/7 autonomous operation on a single VPS",
    ],
    lessons: [
      "Memory is critical — agents without persistent memory make the same mistakes repeatedly",
      "Delegation over doing — the orchestrator should route, not execute",
      "Add tools carefully — each new tool increases complexity and failure surface",
      "Guardrails > capabilities — what agents can't do matters more than what they can",
    ],
    techStack: ["OpenClaw", "TypeScript", "AI Agents", "GitHub Actions", "Node.js"],
  },
  {
    slug: "talentmatch-ai",
    projectId: "talentmatch-ai",
    title: "TalentMatch AI",
    subtitle: "AI-powered recruitment platform for smarter candidate matching",
    problem:
      "Traditional recruitment is slow and biased. Recruiters spend hours screening resumes manually, often missing qualified candidates due to keyword-based filtering. The process doesn't scale, especially across languages — Thailand's bilingual job market (EN/TH) makes it even harder.",
    approach:
      "Built an AI recruitment platform that uses NLP to parse resumes intelligently, score candidates against job requirements, and surface the best matches. The system understands context, not just keywords — so a 'software engineer' with React experience matches a 'frontend developer' role.",
    architecture:
      "Full-stack application with:\n\n- **Resume Parser** — NLP-powered extraction of skills, experience, and education from any format\n- **Scoring Algorithm** — Multi-factor matching that weighs skills, experience level, and role fit\n- **Multilingual Support** — Handles both English and Thai resumes and job descriptions\n- **Dashboard** — Real-time candidate ranking with explainable match scores",
    results: [
      "Live at talentum.tkhongsap.io",
      "Handles bilingual resumes (EN/TH) seamlessly",
      "Reduces screening time from hours to minutes",
      "Explainable match scores — recruiters see why candidates rank",
    ],
    lessons: [
      "Multilingual NLP is hard — Thai tokenization requires special handling",
      "Explainability matters more than accuracy for recruiter adoption",
      "Start with the simplest scoring that works, then iterate",
    ],
    techStack: ["React", "TypeScript", "AI/ML", "Node.js", "NLP"],
    liveUrl: "https://talentum.tkhongsap.io",
  },
  {
    slug: "doc-extract",
    projectId: "doc-extract",
    title: "Doc Extract",
    subtitle: "AI document extraction for PDFs, images, and structured data",
    problem:
      "Extracting data from documents — invoices, contracts, forms — is tedious manual work. OCR alone produces messy text. What's needed is structured output: clean fields, tables, and relationships pulled from any document format.",
    approach:
      "Built a document extraction tool powered by LlamaParse that handles PDFs, images, and scanned documents. The system doesn't just OCR — it understands document structure and outputs clean, structured data ready for downstream use.",
    architecture:
      "Pipeline-based architecture:\n\n- **Input Handler** — Accepts PDFs, images (PNG/JPG), and scanned documents\n- **LlamaParse Engine** — AI-powered parsing that understands document layout and structure\n- **Structure Extractor** — Converts parsed content into structured JSON with tables, key-value pairs, and sections\n- **Export Layer** — Output as JSON, CSV, or direct API integration",
    results: [
      "Live at doc-extract.tkhongsap.io",
      "Handles PDFs, images, and scanned documents",
      "Structured data output — not just raw text",
      "Fast processing — most documents under 10 seconds",
    ],
    lessons: [
      "LlamaParse handles layout understanding better than traditional OCR pipelines",
      "Users care about output format more than extraction accuracy",
      "Edge cases in document formats are endless — build for graceful degradation",
    ],
    techStack: ["React", "TypeScript", "LlamaParse", "AI", "Node.js"],
    liveUrl: "https://doc-extract.tkhongsap.io",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
