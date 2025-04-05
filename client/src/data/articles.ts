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
    id: "generative-ai-business-value",
    title: "Unlocking Business Value with Generative AI",
    date: "March 15, 2025",
    excerpt: "An exploration of how businesses can effectively implement generative AI technologies to create tangible value. This article examines real-world case studies and provides a strategic framework for implementation.",
    url: "https://medium.com/@totrakool.khongsap/unlocking-business-value-with-generative-ai",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ethical-ai-frameworks",
    title: "Ethical AI Frameworks for the Enterprise",
    date: "February 10, 2025",
    excerpt: "As AI becomes more prevalent in business operations, establishing ethical frameworks is critical. This guide outlines practical approaches to developing responsible AI systems that align with corporate values and regulatory requirements.",
    url: "https://www.linkedin.com/pulse/ethical-ai-frameworks-enterprise-totrakool-khongsap",
    imageUrl: "https://images.unsplash.com/photo-1620983579703-fc310ff90def?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ai-driven-finance-transformation",
    title: "AI-Driven Finance Transformation: Beyond Automation",
    date: "January 22, 2025",
    excerpt: "Financial services are being reinvented through AI capabilities that go far beyond simple automation. This article explores how advanced analytics and machine learning are creating new value propositions in finance.",
    url: "https://medium.com/@totrakool.khongsap/ai-driven-finance-transformation-beyond-automation",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "leadership-in-digital-era",
    title: "Leadership in the Digital Era: Balancing Tech and Human Skills",
    date: "December 5, 2024",
    excerpt: "The digital transformation era demands a new kind of leadership that balances technical expertise with human-centered skills. This article examines key competencies for leaders navigating today's technology-driven business landscape.",
    url: "https://www.linkedin.com/pulse/leadership-digital-era-balancing-tech-human-skills-totrakool-khongsap"
  },
  {
    id: "data-driven-decision-making",
    title: "The Art and Science of Data-Driven Decision Making",
    date: "November 18, 2024",
    excerpt: "Making effective decisions in complex environments requires both rigorous data analysis and contextual understanding. This article provides a framework for integrating quantitative insights with qualitative business knowledge.",
    url: "https://medium.com/@totrakool.khongsap/the-art-and-science-of-data-driven-decision-making",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "emerging-tech-strategy",
    title: "Crafting an Emerging Technology Strategy That Delivers",
    date: "October 3, 2024",
    excerpt: "Many organizations struggle to translate emerging technology investments into business outcomes. This article outlines a practical approach to developing a technology strategy that aligns innovation with strategic objectives.",
    url: "https://www.linkedin.com/pulse/crafting-emerging-technology-strategy-delivers-totrakool-khongsap",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];
