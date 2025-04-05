export interface Article {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  url: string;
  imageUrl?: string;
}

export const articles: Article[] = [
  {
    id: "future-ai-business",
    title: "The Future of AI in Business Operations",
    date: "June 15, 2023",
    excerpt: "AI is transforming how businesses operate, from customer service to supply chain management. This article explores key trends and provides a framework for implementation that balances innovation with practical constraints.",
    url: "#"
  },
  {
    id: "ethical-ai",
    title: "Building Ethical AI Systems: A Practitioner's Guide",
    date: "May 22, 2023",
    excerpt: "As AI becomes increasingly embedded in critical systems, ethical considerations must be at the forefront of development. This guide provides practical steps for integrating ethics into the AI development lifecycle.",
    url: "#"
  },
  {
    id: "tech-leadership-wellbeing",
    title: "Finding Balance: Tech Leadership and Personal Wellbeing",
    date: "April 8, 2023",
    excerpt: "The demands of tech leadership can take a toll on personal wellbeing. This article explores strategies for maintaining balance while driving innovation and managing teams in high-pressure environments.",
    url: "#"
  },
  {
    id: "ai-democratization",
    title: "Democratizing AI: Making Advanced Technology Accessible",
    date: "March 14, 2023",
    excerpt: "How can we ensure AI technology benefits everyone? This article discusses approaches to making AI tools and knowledge more accessible to businesses of all sizes and technical capabilities.",
    url: "#"
  },
  {
    id: "data-driven-culture",
    title: "Creating a Data-Driven Culture in Traditional Organizations",
    date: "February 3, 2023",
    excerpt: "Transforming organizational culture to embrace data-driven decision making presents unique challenges. This piece outlines strategies for overcoming resistance and building analytical competency.",
    url: "#"
  }
];
