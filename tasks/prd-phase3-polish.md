# PRD: Website Phase 3 — Polish & Growth

## Introduction

Add project case studies, social proof, improve newsletter positioning, integrate analytics, and add dark mode.

## User Stories

### US-017: Add project case study template and first case study
**Description:** As a visitor, I want to read detailed case studies of Ta's projects.

**Acceptance Criteria:**
- [ ] Create case study page template at `/projects/:slug`
- [ ] Sections: Problem, Approach, Architecture, Results, Lessons Learned
- [ ] Screenshots/diagrams support (images in public/projects/)
- [ ] First case study: AI Agent System (4 agents, 20+ skills, OpenClaw setup)
- [ ] Link from project card on Projects page
- [ ] SEO metadata per case study
- [ ] Typecheck passes

### US-018: Add second and third case studies
**Description:** As a visitor, I want case studies for TalentMatch AI and Doc Extract.

**Acceptance Criteria:**
- [ ] Case study: TalentMatch AI — AI recruitment platform, matching algorithm, results
- [ ] Case study: Doc Extract — document extraction, LlamaParse integration, accuracy
- [ ] Both follow same template as US-017
- [ ] Typecheck passes

### US-019: Add social proof section to homepage
**Description:** As a visitor, I want to see credibility signals.

**Acceptance Criteria:**
- [ ] Section on homepage below featured projects
- [ ] GitHub stats: repos count, total commits (static or API)
- [ ] "Building in public" counter: X posts, LinkedIn posts
- [ ] Tech stack badges showing tools used
- [ ] Clean, minimal design matching site aesthetic
- [ ] Typecheck passes

### US-020: Improve newsletter positioning
**Description:** As the owner, I want better newsletter conversion.

**Acceptance Criteria:**
- [ ] Clear value prop: "Weekly insights on building with AI agents"
- [ ] Signup CTA added to homepage (below latest writing section)
- [ ] Inline signup CTA at end of every blog post
- [ ] Update footer newsletter section with value prop
- [ ] Typecheck passes

### US-021: Integrate GA4 analytics
**Description:** As the owner, I want to track what content performs.

**Acceptance Criteria:**
- [ ] GA4 measurement ID configured (replace placeholder in google-analytics component)
- [ ] Page view tracking verified
- [ ] Event tracking: newsletter signups, project link clicks, social link clicks
- [ ] Typecheck passes

### US-022: Add dark mode toggle
**Description:** As a visitor, I want to switch between light and dark themes.

**Acceptance Criteria:**
- [ ] Theme toggle button in navbar
- [ ] Dark mode color palette (zinc/slate, matching Ava HQ aesthetic)
- [ ] All components support dark: Tailwind classes
- [ ] Preference persisted in localStorage
- [ ] Respects system preference as default
- [ ] Smooth transition between themes
- [ ] Typecheck passes
