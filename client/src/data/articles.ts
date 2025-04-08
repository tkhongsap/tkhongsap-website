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

// Function to determine article categories based on title and content
function determineCategories(title: string, content?: string): string[] {
  const titleLower = title.toLowerCase();
  const contentLower = content?.toLowerCase() || '';
  const categories: string[] = [];
  
  // AI category
  if (
    titleLower.includes('ai') || 
    titleLower.includes('artificial intelligence') ||
    titleLower.includes('llm') ||
    titleLower.includes('gpt') ||
    titleLower.includes('machine learning') ||
    titleLower.includes('claude') ||
    titleLower.includes('gemini') ||
    titleLower.includes('openai') ||
    titleLower.includes('grok')
  ) {
    categories.push('AI');
  }
  
  // Coding category
  if (
    titleLower.includes('coding') ||
    titleLower.includes('code') ||
    titleLower.includes('developer') ||
    titleLower.includes('programming') ||
    titleLower.includes('software') ||
    titleLower.includes('github') ||
    titleLower.includes('cursor') ||
    contentLower.includes('coding with') ||
    contentLower.includes('debugging')
  ) {
    categories.push('Coding');
  }
  
  // Well-being category
  if (
    titleLower.includes('well-being') ||
    titleLower.includes('wellbeing') ||
    titleLower.includes('health') ||
    titleLower.includes('mental') ||
    titleLower.includes('life') ||
    titleLower.includes('focus') ||
    titleLower.includes('joy')
  ) {
    categories.push('Well-being');
  }
  
  // Business category
  if (
    titleLower.includes('business') ||
    titleLower.includes('work') ||
    titleLower.includes('strategy') ||
    titleLower.includes('leadership') ||
    titleLower.includes('organization')
  ) {
    categories.push('Business');
  }
  
  // Podcast category
  if (
    titleLower.includes('podcast')
  ) {
    categories.push('Podcast');
  }
  
  // Technology category
  if (
    titleLower.includes('technology') ||
    titleLower.includes('tech') ||
    titleLower.includes('innovation')
  ) {
    categories.push('Technology');
  }
  
  // If no specific category is detected, assign as General
  if (categories.length === 0) {
    categories.push('General');
  }
  
  return categories;
}

// Function to extract the first paragraph from content as summary
function extractFirstParagraph(content: string): string {
  // Remove any Medium-specific prefixes like "Member-only story"
  const cleanContent = content.replace(/^Member-only story\n\n/, '');
  
  // Split by double newlines to get paragraphs
  const paragraphs = cleanContent.split('\n\n');
  
  // Skip title paragraphs and find the first real paragraph
  // Often the first few entries might be title, author, publication name
  let firstRealParagraph = '';
  for (let i = 0; i < paragraphs.length; i++) {
    // Skip very short paragraphs (likely headings) or ones that match the title
    const paragraph = paragraphs[i].trim();
    if (paragraph.length > 40 && !paragraph.includes('AI Unscripted') && isNaN(Number(paragraph))) {
      firstRealParagraph = paragraph;
      break;
    }
  }
  
  return firstRealParagraph || 'Click to read the full article on Medium.';
}

// Function to convert the JSON data to an Article object
function jsonToArticle(json: any, id: string): Article {
  // Format the reading time to match our schema
  const readingTime = json.read_time.replace(' read', '');
  
  // Extract first paragraph for summary
  const summary = extractFirstParagraph(json.content);
  
  // Determine categories
  const categories = determineCategories(json.title, json.content);
  
  return {
    id,
    title: json.title,
    date: json.publish_date,
    summary,
    readingTime,
    platform: "Medium",
    url: json.url,
    imageUrl: json.cover_image_url,
    categories
  };
}

// Import all JSON files from the medium_articles directory
// This uses webpack's require.context for dynamic imports
const importAllArticles = (): Article[] => {
  const articles: Article[] = [];
  
  // Using the import.meta approach for Vite/ESM
  // This is a more modern approach than require.context
  try {
    // Get all JSON files from the directory
    const modules = import.meta.glob('/src/data/medium_articles/*.json', { eager: true });
    
    Object.entries(modules).forEach(([path, module]) => {
      // Extract id from filename (removing date prefix)
      const filename = path.split('/').pop() || '';
      const id = filename.replace(/^\d{8}-/, '').replace('.json', '');
      
      // Convert the JSON module to an Article
      const articleData = module as any;
      articles.push(jsonToArticle(articleData, id));
    });
  } catch (error) {
    console.error('Error importing articles:', error);
    // Return empty array on error
    return [];
  }
  
  // Sort by date (newest first)
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Export the articles array
export const articles = importAllArticles();
