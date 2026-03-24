/**
 * Browser-safe frontmatter parser and markdown post loader.
 * Uses Vite's import.meta.glob to load .md files at build time.
 */

export interface PostFrontmatter {
  title: string;
  subtitle?: string;
  date: string;
  category: string;
  tags: string[];
  readingTime: string;
  excerpt: string;
  featured: boolean;
}

export interface Post extends PostFrontmatter {
  id: string;
  content: string;
}

/**
 * Parse YAML-like frontmatter from a markdown string.
 * Handles strings, booleans, and arrays (inline YAML style).
 */
function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: raw };
  }

  const frontmatterStr = match[1];
  const content = match[2].trim();
  const data: Record<string, unknown> = {};

  for (const line of frontmatterStr.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).trim();
    let value: unknown = line.slice(colonIdx + 1).trim();

    // Remove surrounding quotes
    if (typeof value === 'string' && value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    // Parse booleans
    if (value === 'true') value = true;
    if (value === 'false') value = false;

    // Parse arrays: ["item1", "item2"]
    if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
      const inner = value.slice(1, -1);
      value = inner.split(',').map(item => {
        const trimmed = item.trim();
        return trimmed.startsWith('"') && trimmed.endsWith('"')
          ? trimmed.slice(1, -1)
          : trimmed;
      });
    }

    data[key] = value;
  }

  return { data, content };
}

// Load all markdown files at build time via Vite glob import
const postFiles = import.meta.glob('/content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

/**
 * Get all posts, parsed and sorted by date (newest first).
 */
export function getAllPosts(): Post[] {
  const posts: Post[] = [];

  for (const [filepath, raw] of Object.entries(postFiles)) {
    // Extract slug from filename: /content/posts/my-post.md -> my-post
    const filename = filepath.split('/').pop() || '';
    const id = filename.replace(/\.md$/, '');

    const { data, content } = parseFrontmatter(raw);

    posts.push({
      id,
      title: (data.title as string) || '',
      subtitle: data.subtitle as string | undefined,
      date: (data.date as string) || '',
      category: (data.category as string) || 'Uncategorized',
      tags: (data.tags as string[]) || [],
      readingTime: (data.readingTime as string) || '',
      excerpt: (data.excerpt as string) || '',
      featured: (data.featured as boolean) || false,
      content,
    });
  }

  // Sort by date descending
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

/**
 * Get a single post by ID (slug).
 */
export function getPostById(id: string): Post | undefined {
  return getAllPosts().find(post => post.id === id);
}

/**
 * Get the featured post.
 */
export function getFeaturedPost(): Post | undefined {
  return getAllPosts().find(post => post.featured);
}

/**
 * Get all unique categories from posts.
 */
export function getAllCategories(): string[] {
  const categories = new Set<string>();
  for (const post of getAllPosts()) {
    categories.add(post.category);
  }
  return Array.from(categories).sort();
}

/**
 * Get all unique tags from posts.
 */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort();
}
