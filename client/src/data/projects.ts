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
}

export const projects: Project[] = [
  {
    id: "invoice-ocr-extraction",
    title: "Invoice OCR Extraction",
    description:
      "An automated invoice processing system that uses OCR technology to extract key data from invoices, enabling and streamlining workflows and reducing manual data entry.",
    technologies: ["OCR", "JavaScript", "React", "Node.js", "Computer Vision"],
    category: "ai",
    demoUrl: "https://invoice-ocr-extraction.tkhongsap.io/",
    githubUrl: "https://github.com/tkhongsap/docs-ai-extraction",
    image: "https://i.imgur.com/v9Zqp1p.png",
  },
  {
    id: "enterprise-rag",
    title: "Enterprise RAG Framework",
    description:
      "A secure Retrieval-Augmented Generation (RAG) framework designed for enterprise environments with on-premise deployment capabilities.",
    technologies: ["Python", "FastAPI", "LangChain", "Vector DB"],
    category: "ai",
    demoUrl: "https://enterprise-rag-diagram-project.tkhongsap.io/",
    githubUrl: "https://github.com/tkhongsap/Enterprise-RAG-Framework",
    image: "https://i.imgur.com/fZciXlt.png",
  },
  {
    id: "tower-of-hanoi",
    title: "Tower of Hanoi Visualization",
    description:
      "A visual demonstration of the Tower of Hanoi puzzle, showcasing recursive algorithm solving.",
    technologies: ["JavaScript", "HTML", "CSS"],
    category: "ai",
    demoUrl: "https://tower-hanoi-project.tkhongsap.io/",
    githubUrl: "https://github.com/tkhongsap/tower-of-hanoi-visual",
    image: "https://i.imgur.com/w3AmuDI.png",
  },
  {
    id: "rubik-cube-simulation",
    title: "3D Rubik's Cube Simulator",
    description:
      "A modern, interactive 3D Rubik's Cube simulator supporting 3x3x3 up to 7x7x7 cubes, built with Three.js and Tailwind CSS. Scramble and solve cubes of various sizes with smooth animations and a clean UI.",
    technologies: ["Three.js", "JavaScript", "Tailwind CSS", "HTML5"],
    category: "creative",
    demoUrl: "https://rubik-cube-simulation.tkhongsap.io/",
    githubUrl: "https://github.com/tkhongsap/rubik-cube-master",
    image: "https://i.imgur.com/ewePKQd.png",
  },
];
