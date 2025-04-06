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

// Function to extract title from Medium URL
function extractTitleFromUrl(url: string): string {
  // Extract the slug from the URL
  const urlPath = new URL(url).pathname;
  const slug = urlPath.split('/').pop() || '';
  
  // Remove any query parameters or hashes
  const cleanSlug = slug.split('?')[0].split('#')[0];
  
  // Skip slugs that are just IDs
  if (/^[a-f0-9]+$/.test(cleanSlug)) {
    return 'Untitled Article';
  }
  
  // Format the slug into a readable title
  return cleanSlug
    .replace(/-/g, ' ') // Replace hyphens with spaces
    .split(' ')
    .map(word => {
      // Skip converting very short words or numbers
      if (word.length <= 2 || !isNaN(Number(word))) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

// Function to determine article categories based on title
function determineCategories(title: string, url: string): string[] {
  const titleLower = title.toLowerCase();
  const urlLower = url.toLowerCase();
  const categories: string[] = [];
  
  // Primary categories based on requirements
  if (
    titleLower.includes('ai') || 
    titleLower.includes('artificial intelligence') ||
    urlLower.includes('ai-') ||
    titleLower.includes('llm') ||
    titleLower.includes('gpt') ||
    titleLower.includes('machine learning') ||
    titleLower.includes('claude') ||
    titleLower.includes('gemini') ||
    titleLower.includes('openai')
  ) {
    categories.push('AI');
  }
  
  if (
    titleLower.includes('coding') ||
    titleLower.includes('code') ||
    titleLower.includes('developer') ||
    titleLower.includes('programming') ||
    titleLower.includes('software') ||
    titleLower.includes('github') ||
    titleLower.includes('cursor')
  ) {
    categories.push('Coding');
  }
  
  if (
    titleLower.includes('well-being') ||
    titleLower.includes('wellbeing') ||
    titleLower.includes('health') ||
    titleLower.includes('mental') ||
    titleLower.includes('life') ||
    titleLower.includes('focus') ||
    titleLower.includes('joy') ||
    titleLower.includes('morning')
  ) {
    categories.push('Well-being');
  }
  
  if (
    titleLower.includes('business') ||
    titleLower.includes('work') ||
    titleLower.includes('strategy') ||
    titleLower.includes('leadership') ||
    titleLower.includes('organization')
  ) {
    categories.push('Business');
  }
  
  if (
    titleLower.includes('podcast') ||
    urlLower.includes('podcast')
  ) {
    categories.push('Podcast');
  }
  
  // If no specific category is detected, assign as General
  if (categories.length === 0) {
    categories.push('General');
  }
  
  return categories;
}

// Function to generate a summary based on the title
function generateSummary(title: string, categories: string[]): string {
  // Create a generic summary based on title and categories
  const categoryText = categories.length > 0 
    ? `in ${categories.join(' and ')}` 
    : '';
    
  return `An insightful article about ${title} ${categoryText}. Click to read the full article on Medium to learn more about the subject and gain valuable insights.`;
}

// Function to generate a random date between Jan 2023 and April 2025
function generateRecentDate(): string {
  const start = new Date(2023, 0, 1).getTime(); // Jan 1, 2023
  const end = new Date(2025, 3, 6).getTime(); // April 6, 2025
  const randomTimestamp = start + Math.random() * (end - start);
  const date = new Date(randomTimestamp);
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Function to generate a random reading time (3-15 minutes)
function generateReadingTime(): string {
  return `${Math.floor(3 + Math.random() * 12)} min`;
}

// URLs of the articles from the provided JSON
const articleUrls = [
  "https://medium.com/@kenji-onisuka/%E0%B8%8A%E0%B8%B5%E0%B8%A7%E0%B8%B4%E0%B8%95%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%94%E0%B8%B5%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%81%E0%B8%B1%E0%B8%99%E0%B8%A2%E0%B8%B1%E0%B8%87%E0%B9%84%E0%B8%87-c4597bda1708",
  "https://medium.com/@kenji-onisuka/2024-podcast-playlist-8-essential-picks-for-curious-minds-3a07bfd2bda8",
  "https://medium.com/@kenji-onisuka/5-signs-youre-doing-better-than-you-think-even-if-it-doesn-t-feel-like-it-89e99d2090b7",
  "https://medium.com/@kenji-onisuka/ai-agents-in-2025-what-is-it-and-does-it-work-7fa9fde6d603",
  "https://medium.com/@kenji-onisuka/ai-coding-tools-like-cursor-helpful-but-not-a-replacement-for-skills-f2868101f074",
  "https://medium.com/@kenji-onisuka/ai-for-everyone-5-steps-to-master-ai-without-being-an-expert-421906ecc2db",
  "https://medium.com/@kenji-onisuka/ai-takes-the-nobel-prize-its-impact-on-science-and-society-4c73437fbbf8",
  "https://medium.com/@kenji-onisuka/ai-tinkering-weekend-cea7c7ae8286",
  "https://medium.com/@kenji-onisuka/ai-tools-for-autonomous-agents-the-9-to-5-is-on-life-support-25b11d0ca252",
  "https://medium.com/@kenji-onisuka/are-you-emotionally-healthy-70c24242dd69",
  "https://medium.com/@kenji-onisuka/are-you-rich-wealth-in-the-digital-age-d453548ed024",
  "https://medium.com/@kenji-onisuka/artificial-intelligence-a-journey-from-biological-inspiration-to-generative-revolution-6ab956615f0b",
  "https://medium.com/@kenji-onisuka/becoming-the-you-youve-been-waiting-for-c6a40c910056",
  "https://medium.com/@kenji-onisuka/beyond-basic-rag-642f0a9405d6",
  "https://medium.com/@kenji-onisuka/boredom-might-be-the-best-thing-that-ever-happened-to-you-ad2ccda0881c",
  "https://medium.com/@kenji-onisuka/chatgpt-canvas-easier-writing-mixed-feelings-f41a8b1fea47",
  "https://medium.com/@kenji-onisuka/chatgpt-canvas-vs-claude-3-5-sonnet-artifacts-a8ee6b34720c",
  "https://medium.com/@kenji-onisuka/coding-assistant-a-beginners-guide-to-copilot-cursor-and-more-4b6087cd6e83",
  "https://medium.com/@kenji-onisuka/cursor-ai-2-week-journey-and-rules-of-ai-da5fecc83a3f",
  "https://medium.com/@kenji-onisuka/cursor-ai-3-days-in-and-heres-why-i-m-subscribing-30079c5f37fc",
  "https://medium.com/@kenji-onisuka/cursor-ai-ai-powered-coding-editor-f92156f5365d",
  "https://medium.com/@kenji-onisuka/cursor-ai-how-it-help-me-make-my-first-github-contribution-9eda60bbc2b9",
  "https://medium.com/@kenji-onisuka/data-analyst-role-is-changing-upskill-or-risk-being-left-behind-a3988a97d277",
  "https://medium.com/@kenji-onisuka/extracting-parsed-documents-from-llamacloud-072e199bcf6f",
  "https://medium.com/@kenji-onisuka/finding-joy-in-the-chaos-2584be87e830",
  "https://medium.com/@kenji-onisuka/focus-on-the-present-my-new-years-resolution-2e55f1597fab",
  "https://medium.com/@kenji-onisuka/focusing-on-what-matters-3bac4369c5fd",
  "https://medium.com/@kenji-onisuka/from-move-37-to-24-7-ai-51808236e3cd",
  "https://medium.com/@kenji-onisuka/from-sql-to-gen-ai-a-beginners-guide-to-building-chatbots-with-coding-assistants-7dc4a422c03a",
  "https://medium.com/@kenji-onisuka/game-is-on-556457594148",
  "https://medium.com/@kenji-onisuka/gemini-2-5-pro-a-bold-leap-in-thinking-ai-cec871c0a17e",
  "https://medium.com/@kenji-onisuka/github-copilot-vs-cursor-levels-up-and-closing-the-gap-1307bdea0af7",
  "https://medium.com/@kenji-onisuka/good-life-its-not-about-the-finish-line-35c9131a96ad",
  "https://medium.com/@kenji-onisuka/google-notebook-lm-podcast-feature-5baec71798b7",
  "https://medium.com/@kenji-onisuka/google-notebooklm-part-2-7baaacfb8bd8",
  "https://medium.com/@kenji-onisuka/how-to-build-ai-solutions-faster-5-proven-steps-for-success-fe51e29acfff",
  "https://medium.com/@kenji-onisuka/i-do-this-every-morning-to-feel-energized-focused-and-in-control-aaad7bc221dd",
  "https://medium.com/@kenji-onisuka/lessons-for-my-son-as-he-becomes-a-young-adult-56cb0d2842a8",
  "https://medium.com/@kenji-onisuka/life-changing-productivity-quotes-i-keep-in-my-notebooklm-28f7b722a900",
  "https://medium.com/@kenji-onisuka/life-loss-and-letting-go-a-simpler-perspective-421f6674fb25",
  "https://medium.com/@kenji-onisuka/llama-3-1-start-of-open-source-ai-592461617b9f",
  "https://medium.com/@kenji-onisuka/mastering-ai-prompts-a-beginners-guide-to-unlocking-generative-ai-5a8137acf92a",
  "https://medium.com/@kenji-onisuka/mastering-software-and-strategy-with-openais-o1-models-22a0c1325c28",
  "https://medium.com/@kenji-onisuka/mcp-the-standard-for-connecting-ai-agents-to-tools-and-data-b2dd7fa24156",
  "https://medium.com/@kenji-onisuka/mcp-what-the-heck-is-it-78122e0d02aa",
  "https://medium.com/@kenji-onisuka/mental-health-on-the-brink-83c82805d5a3",
  "https://medium.com/@kenji-onisuka/metas-ai-gambit-opening-the-code-to-all-f7424ef154dd",
  "https://medium.com/@kenji-onisuka/my-experience-with-openwebui-api-access-overcoming-common-integration-challenges-3026aba44378",
  "https://medium.com/@kenji-onisuka/my-quest-for-social-intelligence-6-things-im-learning-014fe3123eb5",
  "https://medium.com/@kenji-onisuka/not-loving-every-day-of-work-heres-why-that-s-completely-normal-e870231abebd",
  "https://medium.com/@kenji-onisuka/notebook-lm-your-personal-ai-assistant-for-work-and-life-d677cf14c9b8",
  "https://medium.com/@kenji-onisuka/openai-unveils-o3-agi-almost-achieved-5282c0c6cb3f",
  "https://medium.com/@kenji-onisuka/openais-audio-models-in-the-api-explained-why-voice-matters-9432eed62162",
  "https://medium.com/@kenji-onisuka/openais-o1-model-use-cases-and-story-behind-strawberry-a0c61ade23a8",
  "https://medium.com/@kenji-onisuka/openais-responses-api-a-smarter-simpler-way-to-build-ai-apps-2e94efadd40c",
  "https://medium.com/@kenji-onisuka/openhands-formerly-opendevin-fde9f4b53bdb",
  "https://medium.com/@kenji-onisuka/powerful-ai-by-2026-9ba26ce81c43",
  "https://medium.com/@kenji-onisuka/programming-revolution-bf87b98bf0f9"
];

// Generate articles from the URLs
export const articles: Article[] = articleUrls.map((url, index) => {
  const title = extractTitleFromUrl(url);
  const categories = determineCategories(title, url);
  const date = generateRecentDate();
  
  // Use consistent image based on category
  let imageUrl = "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; // Default
  
  if (categories.includes('AI')) {
    imageUrl = "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  } else if (categories.includes('Coding')) {
    imageUrl = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  } else if (categories.includes('Well-being')) {
    imageUrl = "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  } else if (categories.includes('Business')) {
    imageUrl = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  } else if (categories.includes('Podcast')) {
    imageUrl = "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  }
  
  return {
    id: `article-${index + 1}`,
    title,
    date,
    summary: generateSummary(title, categories),
    readingTime: generateReadingTime(),
    platform: "Medium" as const, // Type assertion to satisfy the union type
    url,
    imageUrl,
    categories
  };
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date (newest first)
