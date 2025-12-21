export interface Publication {
  id: string;
  title: string;
  platform: "Medium" | "LinkedIn";
  url: string;
  synopsis: string;
  topics: string[];
  coverImage?: string;
  accentColor?: string;
}

export const publications: Publication[] = [
  {
    id: "ai-unscripted",
    title: "AI Unscripted",
    platform: "Medium",
    url: "https://medium.com/ai-unscripted",
    synopsis:
      "Essays exploring artificial intelligence, its implications, and the evolving relationship between humans and machines. Deep dives into AI tools, emerging trends, and what they mean for how we work and create.",
    topics: ["AI Tools", "Future of Work", "Technology", "Machine Learning", "Innovation"],
    accentColor: "#C45B3E",
  },
  {
    id: "ai-me-you",
    title: "AI, Me & You",
    platform: "LinkedIn",
    url: "https://www.linkedin.com/newsletters/ai-me-you-7248498719979888640/",
    synopsis:
      "A newsletter on navigating AI in professional life—practical insights for knowledge workers embracing the AI era. Career strategies, productivity tips, and staying relevant in a changing landscape.",
    topics: ["Career", "Productivity", "AI Strategy", "Professional Growth", "Skills"],
    accentColor: "#0A66C2",
  },
];
