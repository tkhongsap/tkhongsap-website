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
  author?: string; // Author of the article
  content?: string; // Full content or excerpt
  claps?: number; // Number of claps/likes (Medium)
  comments?: number; // Number of comments (Medium)
  publish_date?: string; // Original publish date from the JSON
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

// Function to generate a summary based on the title and URL content
function generateSummary(title: string, url: string, categories: string[]): string {
  // Check for specific article types to generate more relevant summaries
  
  if (url.includes("ai-agents") || url.includes("autonomous-agents")) {
    return "Explores the evolution of AI agents and how they're transforming the way we work and interact with technology. Learn about the latest developments in autonomous systems and their practical applications.";
  }
  
  if (url.includes("openai") || url.includes("gpt") || url.includes("claude")) {
    return "An analysis of recent developments in large language models and their impact on industries and workflows. Understand the capabilities, limitations, and potential future directions of these powerful AI systems.";
  }
  
  if (url.includes("cursor") || url.includes("coding") || url.includes("copilot")) {
    return "Examines how AI-powered coding tools are transforming software development. Discover practical insights on using these tools effectively and how they complement rather than replace programming skills.";
  }
  
  if (url.includes("well-being") || url.includes("mental") || url.includes("emotionally")) {
    return "Shares personal perspectives and research-backed insights on maintaining mental and emotional well-being in our increasingly digital world. Find practical tips you can apply to your daily life.";
  }
  
  if (url.includes("podcast")) {
    return "A curated overview of valuable podcasts worth your listening time. Discover thought-provoking content that will expand your knowledge and perspective on important topics.";
  }
  
  // For titles with specific meaning, create custom summaries
  if (title.toLowerCase().includes("productivity")) {
    return "Practical productivity advice to help you work smarter, not harder. Learn actionable strategies to organize your time, focus your attention, and accomplish more with less stress.";
  }
  
  if (title.toLowerCase().includes("future")) {
    return "A forward-looking exploration of emerging trends and their potential impact on society, business, and individual lives. Prepare yourself for the changes coming in the near and distant future.";
  }
  
  // Default summary based on title and categories
  const categoryText = categories.length > 0 
    ? `in the fields of ${categories.join(' and ')}` 
    : '';
    
  return `An insightful exploration of ${title.toLowerCase()} ${categoryText}. This article provides valuable perspectives and practical takeaways that you can apply to your work or personal development.`;
}

// Generate a publication date based on article position in list
// Newer articles are at the top (lower index)
function generatePublicationDate(index: number, totalArticles: number): string {
  // Start date is 2 years ago
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 2);
  
  // End date is today
  const endDate = new Date();
  
  // Calculate position in the timeline (0 to 1)
  // 0 = oldest (highest index), 1 = newest (index 0)
  const position = 1 - (index / totalArticles);
  
  // Calculate milliseconds between start and end
  const timeRange = endDate.getTime() - startDate.getTime();
  
  // Calculate the date based on position
  const timestamp = startDate.getTime() + (position * timeRange);
  const date = new Date(timestamp);
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Generate reading time estimate
function generateReadingTime(title: string, categories: string[]): string {
  // Base reading time (5 minutes)
  let minutes = 5;
  
  // Adjust based on title length (longer titles often indicate longer articles)
  minutes += Math.floor(title.length / 20);
  
  // Adjust based on category
  if (categories.includes('AI') || categories.includes('Coding')) {
    minutes += 3; // Technical content takes longer to read
  }
  
  if (categories.includes('Well-being') || categories.includes('Business')) {
    minutes += 1; // Slightly longer
  }
  
  // Ensure reading time is reasonable (3-15 minutes)
  minutes = Math.max(3, Math.min(15, minutes));
  
  return `${minutes} min`;
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
  "https://medium.com/@kenji-onisuka/programming-revolution-bf87b98bf0f9",
  "https://medium.com/@kenji-onisuka/python-scripts-for-easy-file-management-with-openai-assistant-a-guide-for-beginners-37cf16f99c8b",
  "https://medium.com/@kenji-onisuka/raising-a-resilient-son-in-the-age-of-social-media-3a2842b52181",
  "https://medium.com/@kenji-onisuka/redefining-progress-7ced747fd629",
  "https://medium.com/@kenji-onisuka/reflection-llama-3-1-70b-ab1b80886f87",
  "https://medium.com/@kenji-onisuka/reflection-llama-3-1-70b-best-new-self-correcting-open-source-llm-00a217aa0604",
  "https://medium.com/@kenji-onisuka/tariffs-are-a-tax-on-the-future-beb957388c5e",
  "https://medium.com/@kenji-onisuka/the-4-best-ai-podcasts-for-beginners-a-no-jargon-guide-43f31b384db9",
  "https://medium.com/@kenji-onisuka/the-end-of-traditional-coding-how-ai-is-empowering-non-coders-to-build-anything-d719f15e17f7",
  "https://medium.com/@kenji-onisuka/the-future-youre-avoiding-6a551174e948",
  "https://medium.com/@kenji-onisuka/the-great-amplifier-of-software-development-2af3bcafd4be",
  "https://medium.com/@kenji-onisuka/the-helper-function-i-wish-someone-had-told-me-about-653fb75e3d4b",
  "https://medium.com/@kenji-onisuka/the-intelligence-age-a-new-milestone-for-humanity-in-just-a-few-years-c685a8a10d3d",
  "https://medium.com/@kenji-onisuka/the-key-to-mental-strength-in-a-digital-age-86f1f50808bb",
  "https://medium.com/@kenji-onisuka/the-perfectionism-trap-be-less-self-critical-61e84f11c0c0",
  "https://medium.com/@kenji-onisuka/the-power-of-ai-the-compressed-21st-century-is-coming-3c4361dde71c",
  "https://medium.com/@kenji-onisuka/the-ted-ai-show-and-the-uns-plan-for-governing-ai-why-it-matters-ecffc1fa22df",
  "https://medium.com/@kenji-onisuka/the-u-s-canada-trade-war-a-self-inflicted-wound-that-hits-everyone-e5ad3dc0eb9c",
  "https://medium.com/@kenji-onisuka/why-mondays-are-now-my-favorite-day-of-the-week-02807108794d",
  "https://medium.com/@kenji-onisuka/work-quotes-i-keep-in-my-notebooklm-e8641a254d99",
  "https://medium.com/ai-unscripted/10-jobs-that-will-be-in-high-demand-in-2030-and-10-that-wont-0b2ecf50b990",
  "https://medium.com/ai-unscripted/ai-2025-the-age-of-autonomous-agents-b239b4f7a15c",
  "https://medium.com/ai-unscripted/ai-agents-%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%9B%E0%B8%A5%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%99%E0%B9%81%E0%B8%9B%E0%B8%A5%E0%B8%87%E0%B8%84%E0%B8%A3%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B9%83%E0%B8%AB%E0%B8%8D%E0%B9%88-df2ad367b927",
  "https://medium.com/ai-unscripted/ai-agents-in-2025-ee0c869dfee4",
  "https://medium.com/ai-unscripted/ai-isnt-just-about-coding-it-s-about-thinking-smarter-7986740a8766",
  "https://medium.com/ai-unscripted/anthropics-new-ai-tool-can-control-your-computer-706c8badbaf5",
  "https://medium.com/ai-unscripted/autonomous-agents-like-crewai-are-transforming-knowledge-work-9401a08f71ab",
  "https://medium.com/ai-unscripted/chatgpts-2nd-anniversary-3dc40e687e5d",
  "https://medium.com/ai-unscripted/claude-3-7-sonnet-just-dropped-and-its-proof-the-knowledge-economy-is-changing-9fb13a507578",
  "https://medium.com/ai-unscripted/claude-3-7-sonnet-super-coder-or-is-it-9b83e8f86be0",
  "https://medium.com/ai-unscripted/cursor-0-43-vs-github-copilot-the-best-ai-powered-ide-in-2024-39e1087d6c06",
  "https://medium.com/ai-unscripted/davos-2025-ai-progress-demands-global-cooperation-e540ed6e88f7",
  "https://medium.com/ai-unscripted/deepseek-deepdive-openais-rapid-response-with-o3-mini-2b26c0f5553b",
  "https://medium.com/ai-unscripted/deepseek-r1-affordable-ai-for-everyone-f8f183138d1b",
  "https://medium.com/ai-unscripted/deepseek-r1-beginners-guide-to-ai-planning-and-coding-36ebb9452e84",
  "https://medium.com/ai-unscripted/deepseek-r1-openai-o3-mini-ai-superpowers-in-programming-a9bcf66b4fe2",
  "https://medium.com/ai-unscripted/focus-on-what-matters-the-90-rule-95ec498bd84b",
  "https://medium.com/ai-unscripted/from-sql-to-ai-my-journey-in-data-analytics-a1161e7e1bcc",
  "https://medium.com/ai-unscripted/gemini-2-0-flash-thinking-googles-direct-response-to-openai-393b379277cb",
  "https://medium.com/ai-unscripted/google-introduces-gemini-2-0-286c0a8330ff",
  "https://medium.com/ai-unscripted/gpt-4-5-a-small-step-or-a-meaningful-upgrade-fec002376a08",
  "https://medium.com/ai-unscripted/gpt-4-5-is-here-but-is-it-worth-the-price-a474ae13182e",
  "https://medium.com/ai-unscripted/grok-3-best-model-on-the-planet-c6d008f24848",
  "https://medium.com/ai-unscripted/how-to-build-effective-ai-agents-lessons-from-anthropic-0e891a4ba7a3",
  "https://medium.com/ai-unscripted/how-to-create-effective-rag-applications-a-guide-for-beginners-and-enterprises-11dcd27618b3",
  "https://medium.com/ai-unscripted/i-am-not-a-developer-but-ive-been-vibe-coding-765d13ced348",
  "https://medium.com/ai-unscripted/jensen-huang-at-ces-2025-how-ai-agents-are-redefining-the-future-45ee9d374e3d",
  "https://medium.com/ai-unscripted/manus-ai-breakthrough-or-just-clever-orchestration-5db77c8234eb",
  "https://medium.com/ai-unscripted/mastering-openais-o1-model-e15b509b8a0f",
  "https://medium.com/ai-unscripted/mastering-the-art-of-talking-to-ai-a-beginners-guide-4875ee4666da",
  "https://medium.com/ai-unscripted/microsoft-copilot-your-companion-your-guide-my-confusion-146185e8a602",
  "https://medium.com/ai-unscripted/model-context-protocol-mcp-claudes-new-feature-explained-a232d23a6afa",
  "https://medium.com/ai-unscripted/my-2-favorite-prompts-to-boost-my-work-efficiency-556b19545ba2",
  "https://medium.com/ai-unscripted/notebooklm-revisited-smarter-tools-for-work-learning-and-life-a8a3555fdc6c",
  "https://medium.com/ai-unscripted/so-do-you-want-to-get-into-ai-heres-what-i-learned-so-far-89dae1683065",
  "https://medium.com/ai-unscripted/sora-leaked-what-happened-7bbebe576830",
  "https://medium.com/ai-unscripted/stop-ai-hallucinations-4-practical-tips-for-beginners-4d377dc405c8",
  "https://medium.com/ai-unscripted/the-hidden-potential-of-gemini-ai-18444cd79d0a",
  "https://medium.com/ai-unscripted/the-ultimate-data-analysts-guide-to-generative-ai-in-2025-from-data-to-ai-mastery-4f279668f1e6",
  "https://medium.com/ai-unscripted/top-5-generative-ai-trends-transforming-industries-in-2025-dfd7f1e738e7",
  "https://medium.com/ai-unscripted/us-post-election-2024-a-turning-point-for-technology-and-innovation-47706beef3e1",
  "https://medium.com/ai-unscripted/vibe-coding-i-just-think-and-review-65cfbc4ccf90",
  "https://medium.com/ai-unscripted/what-is-an-ai-engineer-and-how-to-become-one-beb30604cc40"
];

// Medium cover image variants for category-based selection
const MEDIUM_COVER_IMAGES = {
  AI: [
    "https://miro.medium.com/v2/resize:fit:1200/1*T9VaXXgESiXR_Qx_yQIvRg.jpeg", 
    "https://miro.medium.com/v2/resize:fit:1200/1*wQTLVXmPIJZ1x1oDYqfXYg.jpeg",
    "https://miro.medium.com/v2/resize:fit:1200/1*WI43epHjl6I9R0jVVzjxdg.jpeg",
    "https://miro.medium.com/v2/resize:fit:1200/1*7lHJf-E5nPFPNNYngYwPSQ.png",
    "https://miro.medium.com/v2/resize:fit:1200/1*0V4RztipOFbHPC6cjGLydg.jpeg"
  ],
  Coding: [
    "https://miro.medium.com/v2/resize:fit:1200/1*jfdwtvU6V6g99q3G7gq7dQ.jpeg",
    "https://miro.medium.com/v2/resize:fit:1200/1*pJQ4oLCxzQCUGdA7wsjFOQ.jpeg",
    "https://miro.medium.com/v2/resize:fit:1200/1*qLC-3low-YxZhCKiMQKTRg.jpeg",
    "https://miro.medium.com/v2/resize:fit:1200/1*uaGcG_0MrHuRoY6Gzq8Tww.jpeg",
    "https://miro.medium.com/v2/resize:fit:1200/1*U3WRRwLx3zeDkHmZdHlj-Q.jpeg"
  ],
  'Well-being': [
    "https://miro.medium.com/v2/resize:fit:1200/1*wdB6-KF8GlhGNhMOvH0Kew.jpeg",
    "https://miro.medium.com/v2/resize:fit:1200/1*rFwdQ6wJYgfZ5hGVZTQSXA.jpeg",
    "https://miro.medium.com/v2/resize:fit:1200/1*AaNLBBUMAMcL1ELRxTy3zQ.jpeg", 
    "https://miro.medium.com/v2/resize:fit:1200/1*NwGhWnD4t6zXl45lB3lAxA.jpeg",
    "https://miro.medium.com/v2/resize:fit:1200/1*XsimnjZIxUdCKfpXp7SvJw.jpeg"
  ],
  Podcast: [
    "https://miro.medium.com/v2/resize:fit:1200/1*vXWVmfL4yGtaOZXzemVfuQ.jpeg",
    "https://miro.medium.com/v2/resize:fit:1200/1*CgODCyULXbL0iVTIkcKDxw.jpeg",
    "https://miro.medium.com/v2/resize:fit:1200/1*Th5MgXy4fJWABoMRQkQiNA.jpeg",
    "https://miro.medium.com/v2/resize:fit:1200/1*UwZdqC8xZ238JXr4rHKcnA.jpeg",
    "https://miro.medium.com/v2/resize:fit:1200/1*nOXN-s8LJYkJF2U4RBG0rQ.jpeg"
  ],
  Business: [
    "https://miro.medium.com/v2/resize:fit:1200/1*T-w_k1OsJJ14Q-N_iXQpOw.jpeg",
    "https://miro.medium.com/v2/resize:fit:1200/1*H5s-QiQ4E1ReMBwpM0IiJQ.jpeg",
    "https://miro.medium.com/v2/resize:fit:1200/1*Ir3AcWiEwUdPbUK0PUITjw.jpeg",
    "https://miro.medium.com/v2/resize:fit:1200/1*ZW6gNYTJRiOBGFZgY80TRQ.jpeg",
    "https://miro.medium.com/v2/resize:fit:1200/1*OyWEekj-Vdaw-s4XpTjHnA.jpeg"
  ],
  Default: [
    "https://miro.medium.com/v2/resize:fit:1200/1*-IMtZtcUK-QuVa1ypGCJbg.jpeg",
    "https://miro.medium.com/v2/resize:fit:1200/1*IKY_z9sK-g93HXCy3LdLYg.jpeg",
    "https://miro.medium.com/v2/resize:fit:1200/1*JZH5y42NjIYc0nVc8 Dale5A.jpeg",
    "https://miro.medium.com/v2/resize:fit:1200/1*2SQ-q-McL8F6n0-GPl2ylQ.jpeg",
    "https://miro.medium.com/v2/resize:fit:1200/1*rLu3d0uzQBgTzQ_Un10dVQ.jpeg"
  ]
};

// Function to get Medium cover images using a deterministic approach
function getMediumCoverImage(url: string, categories: string[]): string {
  // Hash the URL to ensure consistent image selection for the same article
  let hashCode = 0;
  for (let i = 0; i < url.length; i++) {
    hashCode = ((hashCode << 5) - hashCode) + url.charCodeAt(i);
    hashCode = hashCode & hashCode; // Convert to 32bit integer
  }
  
  // Make the hash positive
  hashCode = Math.abs(hashCode);
  
  // Determine which category images to use
  let categoryImages;
  if (categories.includes('AI')) {
    categoryImages = MEDIUM_COVER_IMAGES.AI;
  } else if (categories.includes('Coding')) {
    categoryImages = MEDIUM_COVER_IMAGES.Coding;
  } else if (categories.includes('Well-being')) {
    categoryImages = MEDIUM_COVER_IMAGES["Well-being"];
  } else if (categories.includes('Podcast')) {
    categoryImages = MEDIUM_COVER_IMAGES.Podcast;
  } else if (categories.includes('Business')) {
    categoryImages = MEDIUM_COVER_IMAGES.Business;
  } else {
    categoryImages = MEDIUM_COVER_IMAGES.Default;
  }
  
  // Select an image using the hash
  const imageIndex = hashCode % categoryImages.length;
  return categoryImages[imageIndex];
}

// Import sample articles
import sampleArticle1 from './articles/20250104-How_to_Build_Effective_AI_Agents.json';
import sampleArticle2 from './articles/20250304-The_Future_of_AI_Agents.json';
import sampleArticle3 from './articles/20250221-Mastering_Social_Intelligence.json';

// Function to format a date string from various formats
function formatDateString(dateString: string | null): string {
  if (!dateString) {
    // Return current date if no date provided
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  // Try to parse the date
  const date = new Date(dateString);
  
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    // Return current date if invalid
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  // Format the date
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Function to extract a summary from the content
function extractSummary(content: string): string {
  if (!content) return '';
  
  // Remove any HTML tags if present
  const cleanContent = content.replace(/<[^>]*>/g, '');
  
  // Get the first paragraph or part of it
  const firstParagraph = cleanContent.split('\n\n')[0];
  
  // If the first paragraph is too short, get more text
  if (firstParagraph.length < 50) {
    return cleanContent.substring(0, 150) + '...';
  }
  
  // Return the first paragraph or truncate if it's too long
  return firstParagraph.length > 150 
    ? firstParagraph.substring(0, 150) + '...' 
    : firstParagraph;
}

// Create a function to convert a JSON article to our Article interface
function convertJsonToArticle(json: any, index: number): Article {
  // Extract ID from filename if available, or generate one
  const fileName = `article-${index + 1}`;
    
  // Use the data from the JSON file
  const title = json.title || extractTitleFromUrl(json.url);
  const url = json.url;
  // Use JSON publish_date, falling back to current date
  const date = formatDateString(json.publish_date);
  const readingTime = json.read_time || generateReadingTime(title, []);
  // Determine categories from title and URL
  const categories = determineCategories(title, url);
  // Get author from JSON or use default
  const author = json.author || "Totrakool Khongsap";
  // Get platform from URL
  let platform: "LinkedIn" | "Medium" | "Other" = "Other";
  if (url.includes("medium.com")) {
    platform = "Medium";
  } else if (url.includes("linkedin.com")) {
    platform = "LinkedIn";
  }
  
  // Use content from JSON, or generate a summary if not available
  const content = json.content || '';
  const summary = json.summary || extractSummary(content) || generateSummary(title, url, categories);
  
  // Use cover image from JSON if available, or generate one
  const imageUrl = json.cover_image || getMediumCoverImage(url, categories);
  
  // Additional properties from JSON
  const claps = json.claps !== undefined ? Number(json.claps) : undefined;
  const comments = json.comments !== undefined ? Number(json.comments) : undefined;
  
  return {
    id: fileName,
    title,
    date,
    summary,
    readingTime,
    platform,
    url,
    imageUrl,
    categories,
    author,
    content,
    claps,
    comments,
    publish_date: json.publish_date
  };
}

// Convert our sample JSON articles to Article objects
const sampleArticle1Converted = convertJsonToArticle(sampleArticle1, 0);
const sampleArticle2Converted = convertJsonToArticle(sampleArticle2, 1);
const sampleArticle3Converted = convertJsonToArticle(sampleArticle3, 2);

// Generate articles from the existing URLs, but add our sample articles at the beginning
export const articles: Article[] = [
  sampleArticle1Converted, 
  sampleArticle2Converted,
  sampleArticle3Converted,
  ...articleUrls.map((url, index) => {
  const title = extractTitleFromUrl(url);
  const categories = determineCategories(title, url);
  const date = generatePublicationDate(index, articleUrls.length);
  const readingTime = generateReadingTime(title, categories);
  const coverImage = getMediumCoverImage(url, categories);
  
  return {
    id: `article-${index + 4}`, // Start from index 4 since we already have three articles
    title,
    date,
    summary: generateSummary(title, url, categories),
    readingTime,
    platform: "Medium" as const,
    url,
    imageUrl: coverImage,
    categories
  };
})].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date (newest first)
