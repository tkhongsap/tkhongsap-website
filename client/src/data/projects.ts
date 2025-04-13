export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  category: 'ai' | 'data' | 'finance';
  githubUrl?: string;
  caseStudyUrl?: string;
  caseStudyLabel?: string;
  demoUrl?: string;
}

export const projects: Project[] = [
  {
    id: "ai-optimization",
    title: "AI Optimization Engine",
    description: "Developed an AI-driven optimization system that reduced operational costs by 23% while improving output quality.",
    technologies: ["Python", "TensorFlow", "AWS"],
    category: "ai",
    caseStudyUrl: "#",
    githubUrl: "https://github.com/"
  },
  {
    id: "financial-dashboard",
    title: "Financial Analytics Dashboard",
    description: "Created a real-time financial analytics dashboard with predictive capabilities for a multinational corporation.",
    technologies: ["Python", "React", "SQL"],
    category: "finance",
    caseStudyLabel: "Demo",
    caseStudyUrl: "#",
    githubUrl: "https://github.com/"
  },
  {
    id: "predictive-maintenance",
    title: "Predictive Maintenance System",
    description: "Built a machine learning model that predicts equipment failures with 94% accuracy, reducing downtime by 78%.",
    technologies: ["Python", "Scikit-learn", "IoT"],
    category: "data",
    caseStudyUrl: "#",
    githubUrl: "https://github.com/"
  },
  {
    id: "enterprise-ai",
    title: "Enterprise AI Optimization Engine",
    description: "Developed an end-to-end AI solution that improved operational efficiency by 37% for a Fortune 500 company, integrating predictive analytics with existing business processes.",
    technologies: ["Python", "TensorFlow", "AWS", "Data Architecture"],
    category: "ai",
    caseStudyUrl: "#",
    caseStudyLabel: "Learn more"
  },
  {
    id: "nlp-customer-service",
    title: "NLP Customer Service Bot",
    description: "Created an AI-driven customer service solution that handles 65% of routine inquiries, improving response time by 82%.",
    technologies: ["Python", "NLP", "React", "Node.js"],
    category: "ai",
    caseStudyUrl: "#",
    githubUrl: "https://github.com/"
  },
  {
    id: "risk-analysis",
    title: "Financial Risk Analysis Tool",
    description: "Designed a risk prediction platform for investment portfolios, achieving 88% accuracy in market downturn scenarios.",
    technologies: ["Python", "R", "Financial Modeling", "Vue.js"],
    category: "finance",
    demoUrl: "#",
    githubUrl: "https://github.com/"
  },
  {
    id: "tower-of-hanoi",
    title: "Tower of Hanoi Visualization",
    description: "A visual demonstration of the Tower of Hanoi puzzle, showcasing recursive algorithm solving.",
    technologies: ["JavaScript", "HTML", "CSS"],
    category: "ai",
    demoUrl: "https://tower-of-hanoi-visual-tkhongsap.replit.app/",
  }
];
