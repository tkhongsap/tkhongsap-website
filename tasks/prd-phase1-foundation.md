# PRD: Website Redesign Phase 1 — Foundation

## Introduction

Redesign tkhongsap.io to reflect Ta's builder identity and mission. Transform from an academic/essay-focused portfolio into a builder's hub showcasing real AI agent work, products, and content. The site uses React + TypeScript + Vite + Tailwind + Shadcn/UI with an Express backend.

## Goals

- Update identity from "Math • Data Science • Code • AI • Supply Chain" to builder/solopreneur
- Showcase real projects with live demo links
- Rewrite About page with personal story
- Update all SEO metadata
- Modernize navigation structure

## User Stories

### US-001: Update navbar links and structure
**Description:** As a visitor, I want clear navigation that reflects the site's new structure.

**Acceptance Criteria:**
- [ ] Nav links updated to: Home, Projects, Writing, About
- [ ] "Portfolio" renamed to "Projects" in navLinks array
- [ ] "After Hours" label changed to "Projects"
- [ ] Contact page removed from nav (keep code, just hide)
- [ ] My Thought page remains hidden
- [ ] Mobile nav works correctly with new links
- [ ] Typecheck passes

### US-002: Update footer with social links and new tagline
**Description:** As a visitor, I want to find social links and understand who Ta is from the footer.

**Acceptance Criteria:**
- [ ] Footer tagline updated: "Building AI systems that work while I sleep"
- [ ] Social links added: X (@tkhongsap), LinkedIn (totrakool-khongsap), GitHub (tkhongsap)
- [ ] Social icons use lucide-react icons
- [ ] Newsletter signup CTA remains
- [ ] Copyright year updated
- [ ] Typecheck passes

### US-003: Rewrite homepage hero section
**Description:** As a visitor, I want to immediately understand who Ta is and what he builds.

**Acceptance Criteria:**
- [ ] Hero headline changed from "Thinking Out Loud" to something builder-focused (e.g., "Building AI Systems That Actually Ship")
- [ ] Subtitle updated: short punchy description of what Ta does (AI agents, products, building in public)
- [ ] Remove "Latest Essay" section from hero
- [ ] Background remains clean (#FAF9F6 or similar)
- [ ] Responsive on mobile and desktop
- [ ] Typecheck passes

### US-004: Add featured projects section to homepage
**Description:** As a visitor, I want to see Ta's best work on the homepage.

**Acceptance Criteria:**
- [ ] Section below hero showing 3-4 featured projects as cards
- [ ] Each card shows: title, short description, tech stack tags, live demo link
- [ ] Cards link to demo URL (external) or project detail
- [ ] Featured projects: TalentMatch AI, Doc Extract, AirMood, OpenClaw Multi-Agent System
- [ ] "View all projects →" link to /portfolio (Projects page)
- [ ] Responsive grid (2 cols desktop, 1 col mobile)
- [ ] Typecheck passes

### US-005: Add latest content section to homepage
**Description:** As a visitor, I want to see recent writing/posts on the homepage.

**Acceptance Criteria:**
- [ ] Section below featured projects showing latest 2-3 essays/posts
- [ ] Each entry shows: title, date, reading time, excerpt
- [ ] Links to full essay page
- [ ] "Read more →" link to /writing page
- [ ] Reuses existing essay data from essays.ts
- [ ] Typecheck passes

### US-006: Update project data with real projects
**Description:** As a developer, I need accurate project data that reflects real, current work.

**Acceptance Criteria:**
- [ ] Update projects.ts with accurate descriptions for TalentMatch AI, Doc Extract, AirMood
- [ ] Add new project: "AI Agent System" — description about 4-agent OpenClaw setup with 20+ skills, category "tools", no demo URL, GitHub URL to tkhongsap org
- [ ] Add new project: "Ava HQ" — operations dashboard, category "tools", demo URL https://hq.tkhongsap.io
- [ ] Remove or archive old placeholder projects from portfolio page (AI Code Reviewer, Document RAG System, Smart Home Dashboard)
- [ ] Verify all demo URLs are working
- [ ] Typecheck passes

### US-007: Update portfolio page to Projects page
**Description:** As a visitor, I want to browse all projects with proper categories.

**Acceptance Criteria:**
- [ ] Page title changed from "After Hours" or "Portfolio" to "Projects"
- [ ] Remove hardcoded dummy projects (AI Code Reviewer, Document RAG System, Smart Home Dashboard etc.)
- [ ] Display only projects from projects.ts data
- [ ] Category filters work: All, Apps, Tools, Experiments
- [ ] Each project card shows: title, description, tech tags, demo link, impact badge
- [ ] Typecheck passes

### US-008: Rewrite About page
**Description:** As a visitor, I want to learn Ta's story — from corporate career to building with AI.

**Acceptance Criteria:**
- [ ] Remove current essay-style about page ("The Game Has Changed" content)
- [ ] New structure: Personal intro → What I'm building → What I believe in → Connect
- [ ] Personal intro: brief background, transition from corporate to solopreneur
- [ ] What I'm building: AI agent systems, products, teaching/content
- [ ] What I believe in: ethics, building in public, financial freedom
- [ ] Social links section: X, LinkedIn, GitHub
- [ ] Calm Observer voice (see content-style-guide.md reference)
- [ ] Job title updated from "Domain Expert: Math, Data Science, AI & Supply Chain" to "Builder • AI Agent Systems • Solopreneur"
- [ ] Typecheck passes

### US-009: Update SEO metadata across all pages
**Description:** As the owner, I want search engines to understand the new site identity.

**Acceptance Criteria:**
- [ ] Homepage SEO title: "Ta Khongsap | Building AI Systems That Ship"
- [ ] Homepage meta description updated to reflect builder identity
- [ ] About page SEO title: "About Ta Khongsap | Builder, AI Agent Systems"
- [ ] Projects page SEO title: "Projects | Ta Khongsap"
- [ ] Writing page SEO: keep as-is (already fine)
- [ ] Open Graph title and description updated on all pages
- [ ] Schema markup Person type updated: jobTitle, description, sameAs links
- [ ] Keywords updated: AI agents, OpenClaw, building in public, solopreneur
- [ ] Typecheck passes

## Functional Requirements

- FR-1: All existing routes must continue to work (no broken links)
- FR-2: Newsletter subscription flow must not break
- FR-3: Essay pages must still render correctly
- FR-4: All external demo links must open in new tabs
- FR-5: Site must remain responsive (mobile + desktop)
- FR-6: Existing light theme (#FAF9F6 background) maintained

## Non-Goals

- No dark mode (Phase 3)
- No new blog/markdown system (Phase 2)
- No contact form changes
- No backend changes
- No new dependencies unless absolutely necessary

## Technical Considerations

- Stack: React + TypeScript + Vite + Wouter (routing) + Tailwind + Shadcn/UI
- Data: projects in client/src/data/projects.ts, essays in client/src/data/essays.ts
- Components: client/src/components/
- Pages: client/src/pages/
- Keep existing design language (clean, editorial, warm palette)
- Shadcn components already available in client/src/components/ui/

## Success Metrics

- All pages render without errors
- SEO metadata reflects new identity
- Projects page shows only real, current projects
- Homepage communicates builder identity within 5 seconds
