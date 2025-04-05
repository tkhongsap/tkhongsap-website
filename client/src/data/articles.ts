export interface Article {
  id: string;
  title: string;
  date: string;
  summary: string; // Executive summary of the article
  readingTime?: string; // Optional reading time estimate
  platform: "LinkedIn" | "Medium" | "Other"; // Publishing platform
  url: string; // Link to the full article
  imageUrl?: string; // Featured image
}

export const articles: Article[] = [
  {
    id: "generative-ai-business-value",
    title: "Unlocking Business Value with Generative AI",
    date: "March 15, 2025",
    summary: "Generative AI promises to transform business operations, but how can organizations realize tangible value? This article explores strategic implementation frameworks that bridge technological capabilities with business objectives. Learn key success factors from early adopters and practical approaches to measure ROI from AI investments.",
    readingTime: "8 min",
    platform: "Medium",
    url: "https://medium.com/@totrakool.khongsap/unlocking-business-value-with-generative-ai",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ethical-ai-frameworks",
    title: "Ethical AI Frameworks for the Enterprise",
    date: "February 10, 2025",
    summary: "As AI becomes embedded in critical business functions, ethical considerations cannot be an afterthought. This executive summary outlines a structured approach to developing ethical AI frameworks that align with corporate values while satisfying regulatory requirements. Discover how leading organizations are implementing governance models that promote responsible innovation.",
    readingTime: "6 min",
    platform: "LinkedIn",
    url: "https://www.linkedin.com/pulse/ethical-ai-frameworks-enterprise-totrakool-khongsap",
    imageUrl: "https://images.unsplash.com/photo-1620983579703-fc310ff90def?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ai-driven-finance-transformation",
    title: "AI-Driven Finance Transformation: Beyond Automation",
    date: "January 22, 2025",
    summary: "Financial services are experiencing a paradigm shift that extends far beyond cost reduction through automation. This summary explores how advanced analytics and machine learning are creating entirely new value propositions in finance. Learn how predictive insights, personalized services, and risk modeling are reshaping traditional financial business models.",
    readingTime: "9 min",
    platform: "Medium",
    url: "https://medium.com/@totrakool.khongsap/ai-driven-finance-transformation-beyond-automation",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "leadership-in-digital-era",
    title: "Leadership in the Digital Era: Balancing Tech and Human Skills",
    date: "December 5, 2024",
    summary: "The digital transformation era demands a new leadership profile that harmonizes technical literacy with human-centered capabilities. This article examines the evolving competency matrix for executives navigating technology-driven businesses. Discover strategies for developing digital fluency while strengthening essential soft skills like adaptability and systems thinking.",
    readingTime: "7 min",
    platform: "LinkedIn",
    url: "https://www.linkedin.com/pulse/leadership-digital-era-balancing-tech-human-skills-totrakool-khongsap",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "data-driven-decision-making",
    title: "The Art and Science of Data-Driven Decision Making",
    date: "November 18, 2024",
    summary: "Effective decision-making in complex business environments requires both analytical rigor and contextual understanding. This executive summary provides a framework for integrating quantitative data analysis with qualitative business expertise. Learn techniques for overcoming common cognitive biases and building organizational capabilities that support evidence-based decisions.",
    readingTime: "5 min",
    platform: "Medium",
    url: "https://medium.com/@totrakool.khongsap/the-art-and-science-of-data-driven-decision-making",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "emerging-tech-strategy",
    title: "Crafting an Emerging Technology Strategy That Delivers",
    date: "October 3, 2024",
    summary: "Many organizations struggle to translate emerging technology investments into tangible business outcomes. This summary outlines a structured approach to developing a technology strategy that aligns innovation initiatives with strategic objectives. Discover how to evaluate technology options, prioritize investments, and create implementation roadmaps that deliver measurable value.",
    readingTime: "8 min",
    platform: "LinkedIn",
    url: "https://www.linkedin.com/pulse/crafting-emerging-technology-strategy-delivers-totrakool-khongsap",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];
