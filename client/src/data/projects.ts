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
    id: "fine-tuning-vision",
    title: "Fine-Tuning Vision Models",
    description:
      "Fine-tuning vision models to improve performance on specific tasks. The project uses vision fine-tuning to create a model that can determine if a bottle is eligible for deposit refund. The model is trained to classify bottle images as either refundable or non-refundable based on their condition and completeness",
    technologies: ["Python", "FastAPI", "Computer Vision"],
    category: "ai",
    githubUrl: "https://github.com/tkhongsap/fine-tune-vision",
    image: "https://i.imgur.com/LpXkAU5.png",
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
];
