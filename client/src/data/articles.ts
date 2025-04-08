export interface Article {
  id: string;
  title: string;
  subtitle?: string; // Optional subtitle or tagline
  date: string;
  summary: string; // Executive summary of the article
  readingTime?: string; // Optional reading time estimate
  platform: "LinkedIn" | "Medium" | "Other"; // Publishing platform
  url: string; // Link to the full article
  imageUrl?: string; // Featured image
  categories: string[]; // Categories for filtering
}

import { determineCategories } from './articleCategories';

// Function to extract the first paragraph from content as summary
function extractFirstParagraph(content: string): string {
  // Remove any Medium-specific prefixes like "Member-only story"
  const cleanContent = content.replace(/^Member-only story\n\n/, '');
  
  // Look for content after the author name marker
  const authorMarker = "\n\nKenji\n\n";
  let contentAfterAuthor = "";
  
  if (cleanContent.includes(authorMarker)) {
    contentAfterAuthor = cleanContent.split(authorMarker)[1];
    
    // Also handle cases where AI Unscripted might appear after the author
    if (contentAfterAuthor.startsWith("AI Unscripted")) {
      const lines = contentAfterAuthor.split('\n\n');
      // Skip the publication name and any single numbers (claps)
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim() !== "AI Unscripted" && isNaN(Number(lines[i].trim()))) {
          contentAfterAuthor = lines.slice(i).join('\n\n');
          break;
        }
      }
    }
  } else {
    contentAfterAuthor = cleanContent;
  }
  
  // Split by double newlines to get paragraphs
  const paragraphs = contentAfterAuthor.split('\n\n');
  
  // Find the first substantial paragraph (not a heading, not too short)
  let firstRealParagraph = '';
  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i].trim();
    
    // Skip very short paragraphs, likely headings
    if (paragraph.length > 40 && 
        !paragraph.includes('AI Unscripted') && 
        isNaN(Number(paragraph)) &&
        !paragraph.startsWith('#')) {
      firstRealParagraph = paragraph;
      break;
    }
  }
  
  // If we found a paragraph, extract first 1-3 sentences (max ~200 chars)
  if (firstRealParagraph) {
    // Split by sentence ending punctuation followed by space or end of string
    const sentences = firstRealParagraph.split(/(?<=[.!?])\s+|(?<=[.!?])$/);
    
    if (sentences.length === 1) {
      // If it's just one sentence, use it all (up to 250 chars)
      return sentences[0].length > 250 
        ? sentences[0].substring(0, 247) + '...' 
        : sentences[0];
    } else {
      // Take first 2-3 sentences depending on length
      let summary = sentences[0];
      let charCount = sentences[0].length;
      
      // Add second sentence if available and total under 200 chars
      if (sentences.length > 1 && charCount + sentences[1].length < 200) {
        summary += ' ' + sentences[1];
        charCount += sentences[1].length + 1;
        
        // Add third sentence if available and total under 250 chars
        if (sentences.length > 2 && charCount + sentences[2].length < 250) {
          summary += ' ' + sentences[2];
        } else if (charCount < 200) {
          // Add ellipsis if we're not adding the third sentence but have more
          summary += '...';
        }
      } else if (sentences.length > 1) {
        // Add ellipsis if we're not adding the second sentence but have more
        summary += '...';
      }
      
      return summary;
    }
  }
  
  return 'Click to read the full article on Medium.';
}

// Function to parse date in various formats
function parsePublishDate(dateStr: string): Date {
  // First, try to extract date from the filename if available
  if (dateStr.startsWith('20')) {
    // If it's in YYYYMMDD format from filename
    const year = parseInt(dateStr.substring(0, 4));
    const month = parseInt(dateStr.substring(4, 6)) - 1; // JS months are 0-indexed
    const day = parseInt(dateStr.substring(6, 8));
    return new Date(year, month, day);
  }
  
  // Handle common date formats
  // For "Feb 23, 2025" format (from publish_date in JSON)
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  if (dateStr.includes(',')) {
    // Format: "Month Day, Year" (e.g., "Feb 23, 2025")
    const parts = dateStr.split(' ');
    if (parts.length === 3) {
      const month = monthNames.indexOf(parts[0]);
      const day = parseInt(parts[1].replace(',', ''));
      const year = parseInt(parts[2]);
      if (month !== -1 && !isNaN(day) && !isNaN(year)) {
        return new Date(year, month, day);
      }
    }
  }
  
  // Handle "Month Day Year" format (e.g., "February 23 2025")
  const fullMonthRegex = /^([A-Za-z]+)\s+(\d{1,2})\s+(\d{4})$/;
  const fullMonthMatch = dateStr.match(fullMonthRegex);
  if (fullMonthMatch) {
    const monthName = fullMonthMatch[1];
    const day = parseInt(fullMonthMatch[2]);
    const year = parseInt(fullMonthMatch[3]);
    const month = new Date(`${monthName} 1, 2000`).getMonth();
    if (!isNaN(month) && !isNaN(day) && !isNaN(year)) {
      return new Date(year, month, day);
    }
  }
  
  // Last resort: try native Date parsing
  const date = new Date(dateStr);
  if (!isNaN(date.getTime())) {
    return date;
  }
  
  // If all parsing fails, return current date
  console.warn(`Unable to parse date: ${dateStr}, using current date instead`);
  return new Date();
}

// Function to convert the JSON data to an Article object
function jsonToArticle(json: any, id: string, filename?: string): Article {
  // Format the reading time to match our schema
  const readingTime = json.read_time.replace(' read', '');
  
  // Extract first paragraph for summary
  const summary = extractFirstParagraph(json.content);
  
  // Determine categories
  const categories = determineCategories(json.title, json.subtitle, json.content);
  
  // Get date from filename if possible (more reliable for sorting)
  let date = json.publish_date;
  if (filename && filename.includes('-')) {
    const datePrefix = filename.split('-')[0];
    if (datePrefix.length === 8 && /^\d+$/.test(datePrefix)) {
      // Format YYYYMMDD to a readable date
      const year = datePrefix.substring(0, 4);
      const month = parseInt(datePrefix.substring(4, 6)) - 1; // JS months are 0-indexed
      const day = datePrefix.substring(6, 8);
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                           'July', 'August', 'September', 'October', 'November', 'December'];
      date = `${monthNames[month]} ${parseInt(day)}, ${year}`;
    }
  }
  
  // Process the image URL - if it's from an external source, use it directly
  let imageUrl = json.cover_image_url || undefined;
  
  // If the URL is from miro.medium.com, make sure it's properly formatted
  if (imageUrl && imageUrl.includes('miro.medium.com')) {
    // Ensure we're getting a reasonable size image
    if (imageUrl.includes('resize:fit:')) {
      // URL already has sizing parameters, keep it as is
    } else {
      // Add sizing parameters if not present
      imageUrl = imageUrl.replace('miro.medium.com/v2/', 'miro.medium.com/v2/resize:fit:800/');
    }
  }
  
  return {
    id,
    title: json.title,
    subtitle: json.subtitle,
    date,
    summary,
    readingTime,
    platform: "Medium",
    url: json.url,
    imageUrl,
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
      articles.push(jsonToArticle(articleData, id, filename));
    });
  } catch (error) {
    console.error('Error importing articles:', error);
    // Return empty array on error
    return [];
  }
  
  // Sort by date (newest first) using the improved date parsing function
  return articles.sort((a, b) => {
    const dateA = parsePublishDate(a.date);
    const dateB = parsePublishDate(b.date);
    return dateB.getTime() - dateA.getTime();
  });
};

// Export the articles array
export const articles = importAllArticles();
