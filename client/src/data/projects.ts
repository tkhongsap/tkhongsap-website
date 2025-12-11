export interface TechnicalDetails {
  approach?: string;
  architecture?: string;
  metrics?: string[];
  techStack?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string | any; // Allow both string paths and imported image assets
  technologies: string[];
  category: "ai" | "data" | "finance" | "creative";
  githubUrl?: string;
  caseStudyUrl?: string;
  caseStudyLabel?: string;
  demoUrl?: string;
  impactBadge?: string; // e.g., "12% cost reduction"
  technicalDetails?: TechnicalDetails;
}

export const projects: Project[] = [
  {
    id: "fine-tuning-vision",
    title: "Fine-Tuning Vision Models",
    description:
      "Fine-tuning vision models to improve performance on specific tasks. The project uses vision fine-tuning to create a model that can determine if a bottle is eligible for deposit refund.",
    technologies: ["Python", "FastAPI", "Computer Vision"],
    category: "ai",
    githubUrl: "https://github.com/tkhongsap/fine-tune-vision",
    image: "https://i.imgur.com/LpXkAU5.png",
    impactBadge: "95% accuracy",
    technicalDetails: {
      approach:
        "Transfer learning approach using pre-trained vision models, fine-tuned on custom dataset of bottle images with various conditions.",
      architecture:
        "FastAPI backend serving the model, with image preprocessing pipeline and confidence scoring.",
      metrics: [
        "95% classification accuracy on test set",
        "Sub-100ms inference time",
        "Handles varying lighting conditions",
      ],
      techStack: ["PyTorch", "FastAPI", "OpenCV", "Docker"],
    },
  },
  {
    id: "img-story-hub",
    title: "ImgStory Hub",
    description:
      "A TypeScript app that turns your visuals & videos into compelling stories using AI vision models. Bridges the gap between seeing and storytelling—your silent media suddenly has context and voice.",
    technologies: ["TypeScript", "AI Vision Models", "React", "Next.js"],
    category: "ai",
    demoUrl: "https://imgstory.tkhongsap.io",
    githubUrl: "https://github.com/tkhongsap/img-story-hub",
    image: "https://i.imgur.com/5OrPoka.png",
    impactBadge: "Live demo",
    technicalDetails: {
      approach:
        "Zero-shot approach using GPT-4 Vision API without complex prompt engineering or fine-tuning. Focuses on simplicity and fast iteration.",
      architecture:
        "Next.js frontend with API routes handling vision model calls. Token tracking and rate limiting for cost control.",
      metrics: [
        "Generates bilingual stories (EN/TH)",
        "Handles images and short video clips",
        "< 3s average response time",
      ],
      techStack: ["Next.js", "OpenAI Vision API", "Tailwind CSS", "Vercel"],
    },
  },
  {
    id: "ai-dev-workflow",
    title: "Self-Correcting Coder",
    description:
      "A multi-agent workflow where one AI writes code and another tries to break it before a human sees it. Automated code review, test generation, and iterative improvement.",
    technologies: ["Python", "CrewAI", "LangChain", "OpenAI"],
    category: "ai",
    githubUrl: "https://github.com/tkhongsap/ai-dev-tasks",
    impactBadge: "Multi-agent",
    technicalDetails: {
      approach:
        "Planning → coding → test generation → evaluation loop. Uses rubric-based scoring for correctness, efficiency, and readability.",
      architecture:
        "CrewAI orchestration with specialized agents: Planner, Coder, Tester, and Reviewer. Each agent has distinct tools and personas.",
      metrics: [
        "Catches 70%+ of common bugs before review",
        "Generates comprehensive test suites",
        "Reduces code review cycles",
      ],
      techStack: ["CrewAI", "LangChain", "OpenAI GPT-4", "Python", "pytest"],
    },
  },
  {
    id: "rag-document-qa",
    title: "RAG Document Q&A",
    description:
      "Production-ready RAG system for document question-answering. Combines semantic search with LLM generation to provide accurate, cited answers from large document collections.",
    technologies: ["Python", "LlamaIndex", "OpenAI", "Pinecone"],
    category: "ai",
    githubUrl: "https://github.com/tkhongsap/implementing-rag",
    impactBadge: "Enterprise RAG",
    technicalDetails: {
      approach:
        "Hybrid retrieval combining dense embeddings with keyword search. Implements re-ranking and context compression for optimal answer quality.",
      architecture:
        "Document ingestion pipeline → Vector store (Pinecone) → Retrieval → Re-ranking → LLM generation with citations.",
      metrics: [
        "90%+ retrieval accuracy on test set",
        "Source attribution for all answers",
        "Handles 10k+ document corpus",
      ],
      techStack: ["LlamaIndex", "Pinecone", "OpenAI", "FastAPI", "Redis"],
    },
  },
  {
    id: "master-prompt-library",
    title: "Master Prompt Library",
    description:
      "Curated collection of production-tested prompts for various AI tasks. Includes templates for code generation, analysis, writing, and specialized domain tasks.",
    technologies: ["Markdown", "YAML", "Prompt Engineering"],
    category: "ai",
    githubUrl: "https://github.com/tkhongsap/master-prompt-library",
    impactBadge: "Open source",
    technicalDetails: {
      approach:
        "Systematic prompt design with clear structure: context, task, constraints, and output format. Version-controlled and tested.",
      architecture:
        "Organized by use case with metadata for model compatibility, token counts, and performance benchmarks.",
      metrics: [
        "100+ tested prompts",
        "Covers 15+ use case categories",
        "Community contributions welcome",
      ],
      techStack: ["Markdown", "YAML", "GitHub Actions", "Various LLMs"],
    },
  },
];
