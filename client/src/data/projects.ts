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
    id: "fastapi-image-generation",
    title: "FastAPI Image Generation",
    description:
      "A web application that generates images using OpenAI's GPT Image and DALL-E models through a FastAPI backend and a clean, modern web interface.",
    technologies: ["FastAPI", "Python", "OpenAI", "DALL-E", "React"],
    category: "ai",
    githubUrl: "https://github.com/tkhongsap/fastapi-image-generation",
    image: "https://i.imgur.com/6jpqGC1.png",
  },
  {
    id: "fine-tune-vision",
    title: "Fine-Tune Vision for Deposit Refund",
    description:
      "This project uses vision fine-tuning to create a model that can determine if a product is eligible for deposit refund. The model is trained to classify the product's images as either \"claimable\" or \"non-claimable\" based on their condition and completeness.",
    technologies: ["Computer Vision", "Fine-Tuning", "Python", "Machine Learning", "Image Classification"],
    category: "ai",
    githubUrl: "https://github.com/tkhongsap/fine-tune-vision",
    image: "https://i.imgur.com/LpXkAU5.png",
  },
  {
    id: "fastapi-imgstory",
    title: "FastAPI ImgStory",
    description:
      "FastAPI ImgStroy transforms images and videos into stories using OpenAI Vision technology. The application handles multiple images, extracts video frames, and supports custom prompts for guided storytelling. Built with FastAPI, Python 3.8+, and FFmpeg, it offers a clean interface with full API documentation. While currently a prototype, I'm planning to fine-tune the vision models for a more specialized production version.",
    technologies: ["FastAPI", "Python", "OpenAI Vision", "FFmpeg"],
    category: "ai",
    demoUrl: "https://fastapi-imgstory.tkhongsap.io",
    githubUrl: "https://github.com/tkhongsap/fastapi-imgStory",
    image: "https://i.imgur.com/V4uZlb3.png",
  },
  {
    id: "img-story-hub",
    title: "ImgStory Hub",
    description:
      "A TypeScript app that turns your visuals & videos into compelling stories using AI vision models. What makes it cool? While most vision apps need complex prompt engineering and fine-tuning, I wanted to test a simpler approach first. This quick build bridges the gap between seeing and storytelling – your silent media suddenly has context and voice. Just a proof of concept, but already turning everything from vacation clips to design mockups into narratives! Next steps: refine prompts and model fine-tuning.",
    technologies: ["TypeScript", "AI Vision Models", "React", "Next.js"],
    category: "ai",
    demoUrl: "https://imgstory.tkhongsap.io",
    githubUrl: "https://github.com/tkhongsap/img-story-hub",
    image: "https://i.imgur.com/5OrPoka.png",
  },
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
