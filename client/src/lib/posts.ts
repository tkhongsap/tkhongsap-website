// Blog post types and utilities for loading markdown content

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: BlogCategory;
  tags: string[];
  excerpt: string;
  readingTime: string;
  featured: boolean;
  content: string;
}

export type BlogCategory = 'ai-agents' | 'building-in-public' | 'industry-takes' | 'tutorials';

export const categoryLabels: Record<BlogCategory, string> = {
  'ai-agents': 'AI Agents',
  'building-in-public': 'Building in Public',
  'industry-takes': 'Industry Takes',
  'tutorials': 'Tutorials',
};

// Simple frontmatter parser (no gray-matter dependency for browser)
function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const frontmatter = match[1];
  const content = match[2];
  const data: Record<string, unknown> = {};

  for (const line of frontmatter.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value: unknown = line.slice(colonIdx + 1).trim();

    // Handle arrays like [tag1, tag2]
    if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
    }
    // Handle booleans
    else if (value === 'true') value = true;
    else if (value === 'false') value = false;
    // Strip quotes
    else if (typeof value === 'string' && value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  }

  return { data, content };
}

// Load all markdown posts using Vite's import.meta.glob
const markdownModules = import.meta.glob('/content/posts/*.md', { query: '?raw', import: 'default' });

let cachedPosts: BlogPost[] | null = null;

export async function getPosts(): Promise<BlogPost[]> {
  if (cachedPosts) return cachedPosts;

  const posts: BlogPost[] = [];

  for (const [path, loader] of Object.entries(markdownModules)) {
    const raw = (await loader()) as string;
    const slug = path.replace('/content/posts/', '').replace('.md', '');
    const { data, content } = parseFrontmatter(raw);

    posts.push({
      slug,
      title: (data.title as string) || slug,
      date: (data.date as string) || '',
      category: (data.category as BlogCategory) || 'building-in-public',
      tags: (data.tags as string[]) || [],
      excerpt: (data.excerpt as string) || '',
      readingTime: (data.readingTime as string) || estimateReadingTime(content),
      featured: (data.featured as boolean) || false,
      content,
    });
  }

  // Sort newest first
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  cachedPosts = posts;
  return posts;
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await getPosts();
  return posts.find(p => p.slug === slug);
}

function estimateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 250));
  return `${minutes} min read`;
}
