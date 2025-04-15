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

export const projects: Project[] = [
  {
    id: "enterprise-rag",
    title: "Enterprise RAG Framework",
    description: "A secure Retrieval-Augmented Generation (RAG) framework designed for enterprise environments with on-premise deployment capabilities.",
    technologies: ["Python", "FastAPI", "LangChain", "Vector DB"],
    category: "ai",
    demoUrl: "https://enterprise-rag-diagram-project.tkhongsap.io/",
    githubUrl: "https://github.com/tkhongsap/Enterprise-RAG-Framework",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1536&q=80", // Revert to working image
  },
  {
    id: "tower-of-hanoi",
    title: "Tower of Hanoi Visualization",
    description: "A visual demonstration of the Tower of Hanoi puzzle, showcasing recursive algorithm solving.",
    technologies: ["JavaScript", "HTML", "CSS"],
    category: "ai",
    demoUrl: "https://tower-hanoi-project.tkhongsap.io/",
    githubUrl: "https://github.com/tkhongsap/tower-of-hanoi-visual",
    image: "https://images.unsplash.com/photo-1580835239846-5bb9ce03c8c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80", // Tower image from Unsplash
  }
];
