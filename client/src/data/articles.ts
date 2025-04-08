export interface Article {
  id: string;
  title: string;
  date: string;
  summary: string; // Executive summary of the article
  readingTime?: string; // Optional reading time estimate
  platform: "LinkedIn" | "Medium" | "Other"; // Publishing platform
  url: string; // Link to the full article
  imageUrl?: string; // Featured image
  categories: string[]; // Categories for filtering
}

// Articles data with real information instead of generated mock data
export const articles: Article[] = [
  {
    id: "article-1",
    title: "ชีวิตที่ดีวัดกันยังไง",
    date: "April 4, 2024",
    summary: "Exploring what makes a good life and how we measure it. This article discusses the various factors that contribute to a fulfilling life and how different cultures perceive what makes life worth living.",
    readingTime: "4 min",
    platform: "Medium",
    url: "https://medium.com/@kenji-onisuka/%E0%B8%8A%E0%B8%B5%E0%B8%A7%E0%B8%B4%E0%B8%95%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%94%E0%B8%B5%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%81%E0%B8%B1%E0%B8%99%E0%B8%A2%E0%B8%B1%E0%B8%87%E0%B9%84%E0%B8%87-c4597bda1708",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    categories: ["Well-being", "Life"]
  },
  {
    id: "article-2",
    title: "2024 Podcast Playlist: 8 Essential Picks for Curious Minds",
    date: "March 28, 2024",
    summary: "A curated list of 8 must-listen podcasts for 2024 that cover a range of topics from science and technology to personal development and storytelling.",
    readingTime: "6 min",
    platform: "Medium",
    url: "https://medium.com/@kenji-onisuka/2024-podcast-playlist-8-essential-picks-for-curious-minds-3a07bfd2bda8",
    imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    categories: ["Podcast"]
  },
  {
    id: "article-3",
    title: "5 Signs You're Doing Better Than You Think, Even If It Doesn't Feel Like It",
    date: "March 24, 2024",
    summary: "This article explores the indicators that suggest you're making progress in life, even when it's difficult to recognize. Learn how to identify and appreciate your personal growth.",
    readingTime: "5 min",
    platform: "Medium",
    url: "https://medium.com/@kenji-onisuka/5-signs-youre-doing-better-than-you-think-even-if-it-doesn-t-feel-like-it-89e99d2090b7",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    categories: ["Well-being", "Personal Growth"]
  },
  {
    id: "article-4",
    title: "AI Agents in 2025: What Is It and Does It Work?",
    date: "March 20, 2024",
    summary: "An exploration of AI agents and their expected capabilities in 2025. This article examines the current state of AI agent technology and projects its evolution over the next year.",
    readingTime: "7 min",
    platform: "Medium",
    url: "https://medium.com/@kenji-onisuka/ai-agents-in-2025-what-is-it-and-does-it-work-7fa9fde6d603",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    categories: ["AI", "Technology"]
  },
  {
    id: "article-5",
    title: "AI Coding Tools Like Cursor: Helpful But Not a Replacement for Skills",
    date: "March 15, 2024",
    summary: "This article discusses how AI coding tools like Cursor can enhance productivity but emphasizes the continuing importance of fundamental programming skills and knowledge.",
    readingTime: "6 min",
    platform: "Medium",
    url: "https://medium.com/@kenji-onisuka/ai-coding-tools-like-cursor-helpful-but-not-a-replacement-for-skills-f2868101f074",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    categories: ["AI", "Coding"]
  },
  {
    id: "article-6",
    title: "AI for Everyone: 5 Steps to Master AI Without Being an Expert",
    date: "March 12, 2024",
    summary: "A practical guide for non-technical people to effectively use and benefit from AI tools. Learn five actionable steps to leverage AI in your personal and professional life.",
    readingTime: "8 min",
    platform: "Medium",
    url: "https://medium.com/@kenji-onisuka/ai-for-everyone-5-steps-to-master-ai-without-being-an-expert-421906ecc2db",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    categories: ["AI", "Education"]
  },
  {
    id: "article-7",
    title: "AI Takes the Nobel Prize: Its Impact on Science and Society",
    date: "March 8, 2024",
    summary: "An examination of AI's growing influence in scientific research and the implications of AI systems contributing to Nobel Prize-winning work.",
    readingTime: "9 min",
    platform: "Medium",
    url: "https://medium.com/@kenji-onisuka/ai-takes-the-nobel-prize-its-impact-on-science-and-society-4c73437fbbf8",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    categories: ["AI", "Science"]
  },
  {
    id: "article-8",
    title: "AI Tinkering Weekend",
    date: "March 5, 2024",
    summary: "A personal account of a weekend spent exploring and experimenting with various AI tools and technologies, with insights on practical applications and limitations.",
    readingTime: "5 min",
    platform: "Medium",
    url: "https://medium.com/@kenji-onisuka/ai-tinkering-weekend-cea7c7ae8286",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    categories: ["AI", "Technology"]
  },
  {
    id: "article-9",
    title: "AI Tools for Autonomous Agents: The 9 to 5 Is on Life Support",
    date: "March 1, 2024",
    summary: "This article explores how autonomous AI agents are transforming traditional work structures and what this means for the future of employment and productivity.",
    readingTime: "7 min",
    platform: "Medium",
    url: "https://medium.com/@kenji-onisuka/ai-tools-for-autonomous-agents-the-9-to-5-is-on-life-support-25b11d0ca252",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    categories: ["AI", "Business"]
  },
  {
    id: "article-10",
    title: "Are You Emotionally Healthy?",
    date: "February 25, 2024",
    summary: "An introspective look at emotional health and the indicators that can help you assess and improve your own emotional well-being.",
    readingTime: "6 min",
    platform: "Medium",
    url: "https://medium.com/@kenji-onisuka/are-you-emotionally-healthy-70c24242dd69",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    categories: ["Well-being", "Mental Health"]
  },
  // Add more articles with real data...
  {
    id: "article-11",
    title: "Cursor AI: How It Help Me Make My First GitHub Contribution",
    date: "February 10, 2024",
    summary: "A personal story about using Cursor AI to navigate the process of making a first contribution to an open-source project on GitHub.",
    readingTime: "5 min",
    platform: "Medium",
    url: "https://medium.com/@kenji-onisuka/cursor-ai-how-it-help-me-make-my-first-github-contribution-9eda60bbc2b9",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    categories: ["Coding", "AI"]
  },
  {
    id: "article-12",
    title: "From SQL to Gen AI: A Beginner's Guide to Building Chatbots with Coding Assistants",
    date: "February 8, 2024",
    summary: "A practical tutorial on how to leverage coding assistants to build chatbots, even with limited programming experience beyond SQL.",
    readingTime: "10 min",
    platform: "Medium",
    url: "https://medium.com/@kenji-onisuka/from-sql-to-gen-ai-a-beginners-guide-to-building-chatbots-with-coding-assistants-7dc4a422c03a",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    categories: ["Coding", "AI", "Education"]
  }
];

// Sort by date (newest first)
articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
