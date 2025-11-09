---
title: "Weekend Projects Portfolio – Task Plan"
owner: "Ta Khongsap"
status: "Draft"
last_updated: "2025-02-14"
---

# Execution Plan

> **Legend:** `[ ]` not started · `[~]` in progress · `[x]` complete · `(@)` blocked

## Epic A – Strategy & Content Architecture
1. **[ ] A1.1 · Audit Current Weekend Projects Experience**
   - [ ] Capture current screenshots (desktop, mobile, hero, project cards).
   - [ ] Inventory existing data sources (`projects.ts`, Medium posts, live demos).
   - [ ] Document pain points & opportunities in FigJam/Notion.
2. **[ ] A1.2 · Define Content Model & Taxonomy**
   - [ ] Finalize project schema (fields, optional metadata, relationships).
   - [ ] Map categories/tags (AI, Data, Creative, Finance, Experiment).
   - [ ] Draft content governance checklist (how to add/update projects).
3. **[ ] A1.3 · Assemble Portfolio Narrative**
   - [ ] Craft hero messaging (mission statement, supporting copy).
   - [ ] Curate initial “featured five” projects with success metrics.
   - [ ] Gather testimonials or social proof quotes.

## Epic B – Visual & Interaction Design
1. **[ ] B2.1 · Hero Concept Exploration**
   - [ ] Moodboard "ultrathink" references (GitHub profile visuals, dataviz).
   - [ ] Sketch hero layout options (heatmap vs radial vs sparkline stats).
   - [ ] Select typography, color, and motion guidelines.
2. **[ ] B2.2 · Portfolio Layout System**
   - [ ] Design featured carousel, filter chips, and list/timeline view toggles.
   - [ ] Define responsive breakpoints (desktop, tablet, mobile) with component specs.
   - [ ] Create asset templates for project imagery (ratio, overlay treatments).
3. **[ ] B2.3 · Prototype & Handoff**
   - [ ] Build high-fidelity prototype in Figma.
   - [ ] Annotate interactions (hover states, animation durations, scroll behavior).
   - [ ] Package design tokens + component variants for engineering.

## Epic C – Engineering Implementation
1. **[ ] C3.1 · Data Layer & CMS Prep**
   - [ ] Refactor `@/data/projects` to match new schema (featured flags, metrics, media).
   - [ ] Create import pipeline (e.g., JSON/CSV parser or Notion export adapter).
   - [ ] Add validation via Zod schema for project entries.
2. **[ ] C3.2 · Hero & GitHub Activity Visualization**
   - [ ] Implement GitHub GraphQL fetcher + cache (server-side function or cron snapshot).
   - [ ] Build visualization component (heatmap or chart) with fallback mock data.
   - [ ] Expose stat summary component with animation (count-up, gradient background).
3. **[ ] C3.3 · Portfolio Experience Enhancements**
   - [ ] Implement featured carousel + scroll anchors.
   - [ ] Expand filter system (multi-select, tech tags, year filters).
   - [ ] Add project detail modals/accordions with case-study content.
4. **[ ] C3.4 · Performance & Accessibility**
   - [ ] Lazy-load heavy assets (videos, Lottie animations).
   - [ ] Audit keyboard navigation & focus states for interactive elements.
   - [ ] Optimize bundle (code-splitting hero chart, memoization).

## Epic D – Content Launch & Growth
1. **[ ] D4.1 · Content Population & QA**
   - [ ] Import curated project list (at least 12 apps with visuals & metrics).
   - [ ] Verify links (live demos, GitHub repos) and update meta descriptions.
   - [ ] Run cross-browser smoke tests (Chrome, Safari, Firefox, mobile Safari/Chrome).
2. **[ ] D4.2 · Conversion & Engagement Hooks**
   - [ ] Insert CTA blocks (newsletter, consulting inquiry) with A/B copy variations.
   - [ ] Configure analytics events (hero CTA clicks, project filter interactions).
   - [ ] Set up SEO enhancements (structured data, OpenGraph previews per project).
3. **[ ] D4.3 · Launch Checklist & Post-Launch Iteration**
   - [ ] Final content review with Ta (typo pass, tone alignment).
   - [ ] Publish release notes + share on social channels.
   - [ ] Collect metrics after 2 weeks and prioritize follow-up experiments.

## Supporting Workstreams
- **Spike S1:** Evaluate charting libraries (Recharts vs. D3 vs. GitHub-style heatmap) → deliver comparison doc.
- **Spike S2:** Prototype GitHub API integration locally using personal access token + caching strategy.
- **Spike S3:** Explore automated screenshot generation for project thumbnails.

## Dependencies & Coordination
- Align with branding assets (logos, gradients) stored in `/public/branding/` (to be confirmed).
- Confirm availability of GitHub token with necessary scopes.
- Coordinate with newsletter/contact team for CTA integration deadlines.

## Definition of Done
- Hero renders live GitHub stats with graceful fallback.
- Minimum 12 projects populated with consistent schema and visuals.
- Filters, featured carousel, and detail views fully responsive + accessible.
- Performance scores meet targets; analytics & conversion events tracked.
