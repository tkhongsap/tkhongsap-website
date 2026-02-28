# PRD: Website Phase 2 — Content Pipeline

## Introduction

Build a markdown-based blog system, add categories/filtering, repurpose social posts as blog entries, and add RSS feed. This transforms the site from a static essay collection into a living content hub.

## Goals

- Move from hardcoded essays to markdown files with frontmatter
- Add blog listing with category filtering
- Create initial blog posts from LinkedIn/X content
- Add RSS feed for subscribers

## User Stories

### US-010: Create markdown content directory and parser
**Description:** As a developer, I need a markdown-based content system so adding new posts is just dropping a .md file.

**Acceptance Criteria:**
- [ ] Create `content/posts/` directory at project root
- [ ] Define frontmatter schema: title, date, category, tags, excerpt, readingTime, featured
- [ ] Install `gray-matter` for frontmatter parsing and `react-markdown` with `remark-gfm` for rendering
- [ ] Create utility function `getPosts()` that reads all .md files from content/posts/ and returns sorted array
- [ ] Create utility function `getPost(slug)` that reads a single post
- [ ] Categories: "ai-agents", "building-in-public", "industry-takes", "tutorials"
- [ ] Typecheck passes

### US-011: Migrate existing essay to markdown
**Description:** As a developer, I need to move the existing essay from essays.ts to a markdown file.

**Acceptance Criteria:**
- [ ] Convert "The Unraveling of a Promise" essay to `content/posts/the-unraveling-of-a-promise.md` with proper frontmatter
- [ ] Essay renders identically to current version
- [ ] Update essays.ts to read from markdown (or keep both systems working during migration)
- [ ] Existing essay route `/essay/the-unraveling-of-a-promise` still works
- [ ] Typecheck passes

### US-012: Create blog listing page with categories
**Description:** As a visitor, I want to browse all posts filtered by category.

**Acceptance Criteria:**
- [ ] Update Writing page (`/writing`) to show all posts from markdown files
- [ ] Category filter tabs: All, AI Agents, Building in Public, Industry Takes, Tutorials
- [ ] Each post card shows: title, date, reading time, category badge, excerpt
- [ ] Click card → opens full post page
- [ ] Sorted by date (newest first)
- [ ] Responsive layout
- [ ] Typecheck passes

### US-013: Create blog post detail page
**Description:** As a visitor, I want to read a full blog post with proper formatting.

**Acceptance Criteria:**
- [ ] Route: `/blog/:slug` renders markdown post
- [ ] Proper typography for headings, paragraphs, code blocks, lists, links
- [ ] Code syntax highlighting (install `rehype-highlight` or similar)
- [ ] Reading time and date displayed at top
- [ ] Category badge displayed
- [ ] "Back to Writing" link
- [ ] SEO metadata from frontmatter (title, description, keywords)
- [ ] Typecheck passes

### US-014: Create initial blog posts from social content
**Description:** As the owner, I want my best social posts expanded into blog articles.

**Acceptance Criteria:**
- [ ] Post 1: "Block Cut 40% of Its Workforce. The Stock Went Up." — Category: industry-takes. Expand the Block/Dorsey layoffs story with Chegg/Pinterest/CrowdStrike data, what's driving it, what it means.
- [ ] Post 2: "Agents Without the Right Skills Are Just Chatbots" — Category: ai-agents. Expand the 4-agent, 20+ skills OpenClaw post with details on each agent, skills architecture, lessons learned.
- [ ] Post 3: "What I Learned Running AI Agents for a Month" — Category: building-in-public. Consolidate lessons: memory matters, delegation, guardrails, adding tools carefully.
- [ ] Each post has proper frontmatter, 800-1500 words, follows content-style-guide.md voice
- [ ] All posts render correctly on blog detail page
- [ ] Typecheck passes

### US-015: Add RSS feed
**Description:** As a reader, I want to subscribe via RSS to get new posts.

**Acceptance Criteria:**
- [ ] API route `/api/rss` generates RSS 2.0 XML feed
- [ ] Feed includes: title, date, excerpt, link for each post
- [ ] Feed metadata: site title, description, link
- [ ] Add RSS link icon to navbar or footer
- [ ] Add `<link rel="alternate" type="application/rss+xml">` to HTML head
- [ ] Typecheck passes

### US-016: Update homepage to pull from markdown posts
**Description:** As a developer, the homepage latest content section should read from markdown posts.

**Acceptance Criteria:**
- [ ] Homepage "Latest Writing" section reads from markdown posts instead of essays.ts
- [ ] Shows 3 most recent posts
- [ ] Each shows: title, date, reading time, excerpt
- [ ] Links to `/blog/:slug`
- [ ] Falls back gracefully if no markdown posts exist
- [ ] Typecheck passes
