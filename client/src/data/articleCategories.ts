/**
 * Categories utility functions for articles
 * Contains logic for determining article categories based on content
 */

/**
 * Determines categories for an article based on title, subtitle, and content
 * 
 * @param title Article title
 * @param subtitle Optional article subtitle
 * @param content Optional article content
 * @returns Array of category strings
 */
export function determineCategories(title: string, subtitle?: string, content?: string): string[] {
  const titleLower = title.toLowerCase();
  const subtitleLower = subtitle?.toLowerCase() || '';
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
    titleLower.includes('grok') ||
    subtitleLower.includes('ai') ||
    subtitleLower.includes('artificial intelligence') ||
    contentLower.includes('artificial intelligence') ||
    contentLower.includes('large language model')
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
    subtitleLower.includes('coding') ||
    subtitleLower.includes('programming') ||
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
    titleLower.includes('joy') ||
    subtitleLower.includes('well-being') ||
    subtitleLower.includes('mental health')
  ) {
    categories.push('Well-being');
  }
  
  // Business category
  if (
    titleLower.includes('business') ||
    titleLower.includes('work') ||
    titleLower.includes('strategy') ||
    titleLower.includes('leadership') ||
    titleLower.includes('organization') ||
    subtitleLower.includes('business') ||
    subtitleLower.includes('leadership')
  ) {
    categories.push('Business');
  }
  
  // Podcast category
  if (
    titleLower.includes('podcast') ||
    subtitleLower.includes('podcast')
  ) {
    categories.push('Podcast');
  }
  
  // Technology category
  if (
    titleLower.includes('technology') ||
    titleLower.includes('tech') ||
    subtitleLower.includes('technology') ||
    subtitleLower.includes('tech') ||
    contentLower.includes('technology trends')
  ) {
    categories.push('Technology');
  }
  
  // Innovation category
  if (
    titleLower.includes('innovation') ||
    titleLower.includes('innovate') ||
    titleLower.includes('breakthrough') ||
    subtitleLower.includes('innovation') ||
    contentLower.includes('innovative') ||
    contentLower.includes('cutting-edge')
  ) {
    categories.push('Innovation');
  }
  
  // FutureOfWork category
  if (
    titleLower.includes('future of work') ||
    titleLower.includes('remote work') ||
    titleLower.includes('hybrid work') ||
    titleLower.includes('workplace') ||
    subtitleLower.includes('future of work') ||
    subtitleLower.includes('workplace') ||
    contentLower.includes('future of work') ||
    contentLower.includes('workplace evolution')
  ) {
    categories.push('FutureOfWork');
  }
  
  // Productivity category
  if (
    titleLower.includes('productivity') ||
    titleLower.includes('efficient') ||
    titleLower.includes('workflow') ||
    titleLower.includes('time management') ||
    subtitleLower.includes('productivity') ||
    subtitleLower.includes('efficiency') ||
    contentLower.includes('productivity hack') ||
    contentLower.includes('time management')
  ) {
    categories.push('Productivity');
  }
  
  // If no specific category is detected, assign as General
  if (categories.length === 0) {
    categories.push('General');
  }
  
  return categories;
} 