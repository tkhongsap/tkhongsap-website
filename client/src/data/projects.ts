export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string | any; // Allow both string paths and imported image assets
  technologies: string[];
  category: 'ai' | 'data' | 'finance';
  githubUrl?: string;
  caseStudyUrl?: string;
  caseStudyLabel?: string;
  demoUrl?: string;
}

// Import project images
import enterpriseRagImage from '../assets/enterprise-rag-diagram.png';
import towerOfHanoiImage from '../assets/tower-of-hanoi.png';

export const projects: Project[] = [
  {
    id: "enterprise-rag",
    title: "Enterprise RAG Framework",
    description: "A secure Retrieval-Augmented Generation (RAG) framework designed for enterprise environments with on-premise deployment capabilities.",
    technologies: ["Python", "FastAPI", "LangChain", "Vector DB"],
    category: "ai",
    demoUrl: "https://enterprise-rag-diagram-project.tkhongsap.io/",
    githubUrl: "https://github.com/tkhongsap/Enterprise-RAG-Framework",
    image: enterpriseRagImage, // Using imported image
  },
  {
    id: "tower-of-hanoi",
    title: "Tower of Hanoi Visualization",
    description: "A visual demonstration of the Tower of Hanoi puzzle, showcasing recursive algorithm solving.",
    technologies: ["JavaScript", "HTML", "CSS"],
    category: "ai",
    demoUrl: "https://tower-hanoi-project.tkhongsap.io/",
    githubUrl: "https://github.com/tkhongsap/tower-of-hanoi-visual",
    image: towerOfHanoiImage, // Using imported image
  }
];
