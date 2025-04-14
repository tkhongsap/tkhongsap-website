export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  category: 'ai' | 'data' | 'finance';
  githubUrl?: string;
  caseStudyUrl?: string;
  caseStudyLabel?: string;
  demoUrl?: string;
}

export const projects: Project[] = [
  {
    id: "enterprise-rag",
    title: "Enterprise RAG Framework",
    description: "A secure Retrieval-Augmented Generation (RAG) framework designed for enterprise environments with on-premise deployment capabilities.",
    technologies: ["Python", "FastAPI", "LangChain", "Vector DB"],
    category: "ai",
    demoUrl: "https://enterprise-rag-diagram-project.tkhongsap.io/",
    githubUrl: "https://github.com/tkhongsap/Enterprise-RAG-Framework",
    image: "/images/enterprise-rag-diagram.png", // Local image for Enterprise RAG diagram
  },
  {
    id: "tower-of-hanoi",
    title: "Tower of Hanoi Visualization",
    description: "A visual demonstration of the Tower of Hanoi puzzle, showcasing recursive algorithm solving.",
    technologies: ["JavaScript", "HTML", "CSS"],
    category: "ai",
    demoUrl: "https://tower-hanoi-project.tkhongsap.io/",
    githubUrl: "https://github.com/tkhongsap/tower-of-hanoi-visual",
    image: "/images/tower-of-hanoi.png", // Local image for Tower of Hanoi visualization
  }
];
