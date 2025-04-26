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
      "A weekend-built FastAPI demo that puts OpenAI’s new GPT Image model behind a single REST endpoint and a slick UI. Fire off a text prompt, get studio-grade graphics, and drop a one-line POST into your app—no GPUs, hosting, or heavy setup. Perfect for quickly prototyping marketing tools, auto-generating design assets, or injecting dynamic visuals into any workflow",
    technologies: ["FastAPI", "Python", "OpenAI Vision"],
    category: "ai",
    demoUrl: "https://fastapi-image-generation.tkhongsap.io",
    githubUrl: "https://github.com/tkhongsap/fastapi-image-generation",
    image: "https://i.imgur.com/6jpqGC1.png",
  },
  {
    id: "fastapi-imgstory",
    title: "FastAPI ImgStory",
    description:
      "FastAPI ImgStroy is a lightweight web app that turns your images or videos into vivid narratives in both English and Thai. Upload a file, and GPT-4 Vision extracts the scene’s details, senses the mood, and spins a short story you can drop straight into social posts, travel blogs, marketing copy, or content-rich dashboards—no heavy setup, just one clean REST endpoint and a modern UI.",
    technologies: ["FastAPI", "Python", "OpenAI Vision"],
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
