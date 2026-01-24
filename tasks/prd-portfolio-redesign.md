# PRD: Portfolio Page Redesign

## 1. Introduction/Overview

The portfolio page currently showcases "After Hours" passion projects with an AI/data science focus. This redesign will transform it into a **visual showcase for coding and web application projects** while maintaining the warm editorial design aesthetic.

### Problem Statement
The current portfolio page:
- Uses smaller project thumbnails that don't showcase visual work effectively
- Has category filters (ai, data, finance, creative) that don't align with coding/web app focus
- Displays technical details prominently, which detracts from visual impact

### Solution
Redesign the portfolio to be a **visual-first showcase** of coding and web app work with:
- Larger, more prominent project visuals
- Updated hero messaging focused on building/coding
- New filter categories relevant to web development
- Updated project content with better visual presentation

---

## 2. Goals

1. **Transform the portfolio into a visual showcase** that highlights coding/web app projects with large, impactful imagery
2. **Update project presentation** with larger images, hover interactions, and streamlined content
3. **Refresh project categories** to align with coding/web app work
4. **Maintain brand consistency** with the existing warm, editorial design aesthetic
5. **Keep existing professional sections** (math-to-business, personas, services) unchanged

---

## 3. User Stories

### US-1: Visitor Browsing Portfolio
**As a** potential client or employer
**I want to** quickly see visual examples of coding/web app projects
**So that** I can evaluate the quality and style of work

**Acceptance Criteria:**
- Projects display with large, prominent thumbnails
- I can see project type at a glance (app, tool, experiment)
- Clicking a project takes me to a demo or repository
- Page loads quickly with optimized images

### US-2: Visitor Filtering Projects
**As a** visitor interested in specific types of projects
**I want to** filter projects by category
**So that** I can find relevant examples of work

**Acceptance Criteria:**
- Filter options are clear and descriptive
- Filtering is instant (client-side)
- "All" option shows everything
- Empty state message if no projects match

### US-3: Visitor Understanding Services
**As a** potential client
**I want to** understand what services are offered
**So that** I can determine if there's a fit for my needs

**Acceptance Criteria:**
- Personas section clearly describes who benefits from services
- Services section outlines offerings
- Call-to-action is visible and accessible

### US-4: Site Owner Adding Projects
**As the** portfolio owner
**I want to** easily add new coding/web app projects
**So that** I can keep my portfolio current

**Acceptance Criteria:**
- Project data structure supports new fields (shortDescription, updated categories)
- Adding a project requires minimal code changes (just data file)
- Images can be external URLs or local assets

---

## 4. Functional Requirements

### 4.1 Hero Section Updates

| ID | Requirement |
|----|-------------|
| FR-1.1 | Hero section must display updated tagline focused on coding/building |
| FR-1.2 | Hero must maintain asymmetric 12-column grid layout |
| FR-1.3 | Hero must include animated fade-in effects on load |
| FR-1.4 | Hero subtitle must describe the portfolio focus (web apps, tools, experiments) |

**Suggested Copy:**
- Tagline: "The Workshop" or "Code & Craft"
- Title: "Built After Hours"
- Subtitle: "Full-stack applications, developer tools, and experiments—designed, built, and shipped."

### 4.2 Section Structure

| ID | Requirement |
|----|-------------|
| FR-2.1 | Keep "From Mathematics to Business Impact" section unchanged |
| FR-2.2 | Keep diagonal divider after math section |
| FR-2.3 | Keep "Who I Usually Help" (personas) section unchanged |
| FR-2.4 | Keep "Services" section unchanged |
| FR-2.5 | Page order: Hero → Math Section → Filter → Project Grid → Personas → Services |

### 4.3 Project Filter Updates

| ID | Requirement |
|----|-------------|
| FR-3.1 | Update filter categories to: "all", "apps", "tools", "experiments" |
| FR-3.2 | Filter labels: "Everything", "Applications", "Tools & Utilities", "Experiments" |
| FR-3.3 | Maintain existing filter button styling (maximalist underline animation) |
| FR-3.4 | Default filter state must be "all" |

### 4.4 Project Card Redesign

| ID | Requirement |
|----|-------------|
| FR-4.1 | Increase project image aspect ratio from 16/10 to 4/3 (taller images) |
| FR-4.2 | Add hover overlay with gradient and "View Project" call-to-action |
| FR-4.3 | Reduce visible technology tags to maximum 2-3 |
| FR-4.4 | Remove or collapse technical details accordion by default |
| FR-4.5 | Make project title and short description the primary text content |
| FR-4.6 | Keep impact badge visible on image |
| FR-4.7 | Keep category badge but make it more subtle |
| FR-4.8 | Image must have hover zoom effect (scale 1.05) |
| FR-4.9 | **Entire card clickable → opens live demo** (demo URL priority, GitHub as fallback) |

### 4.5 Project Data Schema Updates

| ID | Requirement |
|----|-------------|
| FR-5.1 | Add `shortDescription` field (string, 1-2 sentences for card display) |
| FR-5.2 | Update `category` type to: "apps" \| "tools" \| "experiments" |
| FR-5.3 | Maintain backward compatibility with existing project fields |
| FR-5.4 | Add 3 new web application projects (see section 4.8) |

### 4.8 New Projects to Add

| Project | URL | Category | Description |
|---------|-----|----------|-------------|
| TalentMatch AI | https://talentum.tkhongsap.io | apps | AI-powered recruitment platform that automates candidate screening and matching |
| Doc Extract | https://doc-extract.tkhongsap.io | apps | AI-powered document extraction tool for extracting text/data from documents |
| AirMood | https://airmood.tkhongsap.io | apps | Weather and mood application combining atmospheric data with wellness features |

**Project Data Details:**

```typescript
// TalentMatch AI
{
  id: "talentmatch-ai",
  title: "TalentMatch AI",
  description: "AI-powered recruitment platform that automates candidate screening. Analyzes resumes and matches candidates to job requirements using intelligent algorithms.",
  shortDescription: "AI recruitment platform for automated candidate screening and matching.",
  technologies: ["React", "TypeScript", "AI/ML", "Node.js"],
  category: "apps",
  demoUrl: "https://talentum.tkhongsap.io",
  impactBadge: "Live App",
}

// Doc Extract
{
  id: "doc-extract",
  title: "Doc Extract",
  description: "AI-powered document extraction tool that pulls text and structured data from PDFs, images, and other documents. Streamlines data entry and document processing workflows.",
  shortDescription: "Extract text and data from documents using AI.",
  technologies: ["React", "TypeScript", "OCR", "AI"],
  category: "apps",
  demoUrl: "https://doc-extract.tkhongsap.io",
  impactBadge: "Live App",
}

// AirMood
{
  id: "airmood",
  title: "AirMood",
  description: "Weather and mood application that combines atmospheric data with wellness insights. Track how weather affects your mood and get personalized recommendations.",
  shortDescription: "Weather meets wellness - track mood with atmospheric data.",
  technologies: ["React", "TypeScript", "Weather API"],
  category: "apps",
  demoUrl: "https://airmood.tkhongsap.io",
  impactBadge: "Live App",
}
```

### 4.6 Project Grid Layout

| ID | Requirement |
|----|-------------|
| FR-6.1 | Grid must be responsive: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop) |
| FR-6.2 | All projects treated equally (no featured/highlighted projects) |
| FR-6.3 | Staggered fade-in animation on load |
| FR-6.4 | Consistent card heights within each row |
| FR-6.5 | Gap spacing: 1.5rem (mobile) → 2rem (desktop) |
| FR-6.6 | **Project order: Newest first** - New projects (TalentMatch AI, Doc Extract, AirMood) appear at top of grid |

### 4.7 Visual Design Requirements

| ID | Requirement |
|----|-------------|
| FR-7.1 | Maintain warm editorial color palette (terracotta #C45B3E, cream #FAF9F6) |
| FR-7.2 | Use existing typography system (Cormorant Garamond display, Source Serif 4, Sora) |
| FR-7.3 | Apply creative, distinctive design patterns (asymmetry, layered shadows, subtle gradients) |
| FR-7.4 | Add visual interest through hover interactions and micro-animations |
| FR-7.5 | Maintain accessibility standards (focus states, color contrast, semantic HTML) |

---

## 5. Non-Goals (Out of Scope)

| Item | Reason |
|------|--------|
| Backend/API changes | Projects are static data, no database integration needed |
| New personas content | Existing personas section remains unchanged |
| New services content | Existing services section remains unchanged |
| Math section changes | Keep "From Mathematics to Business Impact" section as-is |
| Project detail pages | Projects link to external demos/repos, not internal pages |
| CMS integration | Project data managed via code files |
| Search functionality | Filter by category is sufficient for current project count |
| Pagination | Not needed until project count exceeds ~12 |
| Dark mode | Not part of current design system |

---

## 6. Design Considerations

### 6.1 Existing Design System

The project uses a warm, editorial design aesthetic with:

**Colors (CSS Variables):**
- Primary text: `#1A1A1A` (deep charcoal)
- Secondary text: `#5C5C5C` (warm gray)
- Accent: `#C45B3E` (terracotta)
- Background: `#FAF9F6` (warm cream)
- Border: `#E8E4DF` (light taupe)
- Subtle accent: `#F5F0EB`

**Typography:**
- Display: Cormorant Garamond (serif)
- Headlines: Source Serif 4 (serif)
- Body: Sora (sans-serif)

**Existing CSS Classes to Use:**
- `.maximalist-headline` - Large serif display text
- `.maximalist-subhead` - Sans-serif subheadings
- `.maximalist-card` - Card with layered shadows
- `.filter-btn-maximalist` - Filter buttons with animated underline
- `.animate-fade-in-up` - Staggered reveal animation
- `.gradient-mesh-warm` - Layered background gradients
- `.grain-overlay` - Subtle noise texture

### 6.2 New CSS Needed

**Project Card Visual Variant:**
```css
/* Hover overlay for visual cards */
.project-card-visual .card-overlay {
  background: linear-gradient(to top, rgba(26, 26, 26, 0.85) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.project-card-visual:hover .card-overlay {
  opacity: 1;
}

/* Larger aspect ratio */
.project-card-visual .card-image {
  aspect-ratio: 4/3;
}
```

### 6.3 Component Structure

```
portfolio.tsx
├── Hero Section (updated copy)
├── Math-to-Business Section (unchanged)
├── Diagonal Divider (unchanged)
├── Filter Section (updated categories)
├── Project Grid
│   └── ProjectCard (visual variant) × N
├── PersonaCard Section (unchanged)
└── ServicesSection (unchanged)
```

---

## 7. Technical Considerations

### 7.1 Files to Modify

| File | Changes |
|------|---------|
| `client/src/pages/portfolio.tsx` | Update hero copy, update filters |
| `client/src/data/projects.ts` | Add fields, update categories, add new projects |
| `client/src/components/project-card.tsx` | Add visual variant with larger images and hover overlay |
| `client/src/index.css` | Add CSS for visual card overlay and hover states |

### 7.2 Dependencies

- No new npm packages required
- Uses existing shadcn/ui components
- Uses existing Tailwind CSS configuration
- Uses existing Lucide icons

### 7.3 Project Category Mapping

| Project | Current Category | New Category |
|---------|------------------|--------------|
| **TalentMatch AI** | new | apps |
| **Doc Extract** | new | apps |
| **AirMood** | new | apps |
| ImgStory Hub | ai | apps |
| Fine-Tuning Vision | ai | experiments |
| Self-Correcting Coder | ai | tools |
| RAG Document Q&A | ai | tools |
| Master Prompt Library | ai | experiments |

**Total: 8 projects** (3 new + 5 existing)

| Category | Count | Projects |
|----------|-------|----------|
| Applications | 4 | TalentMatch AI, Doc Extract, AirMood, ImgStory Hub |
| Tools & Utilities | 2 | Self-Correcting Coder, RAG Document Q&A |
| Experiments | 2 | Fine-Tuning Vision, Master Prompt Library |

### 7.4 Image Optimization

- Maintain lazy loading for project images
- Use `OptimizedImage` component for responsive loading
- Recommended image dimensions: 800×600px (4:3 aspect ratio)
- Support both external URLs (imgur) and local assets

---

## 8. Success Metrics

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Visual Impact | Projects are immediately visible with large thumbnails | Visual inspection at different viewport sizes |
| Page Load | < 3 seconds on 3G connection | Lighthouse performance audit |
| Accessibility | WCAG 2.1 AA compliance | Lighthouse accessibility audit |
| Responsiveness | Proper display on mobile, tablet, desktop | Manual testing on devices |
| Code Quality | No TypeScript errors | `npm run check` passes |
| Filter Functionality | All filters work correctly | Manual testing of each category |

---

## 9. Open Questions

| # | Question | Status |
|---|----------|--------|
| 1 | What new projects will be added? | ✅ Resolved - Add 3 apps: TalentMatch AI, Doc Extract, AirMood |
| 2 | Should existing project images be updated for better visual impact? | ✅ Resolved - Keep existing images for now |
| 3 | Are there specific projects that should appear first in the grid? | ✅ Resolved - Newest first (new apps at top) |
| 4 | Should project card click behavior prioritize demo URL over GitHub? | ✅ Resolved - Yes, demo URL first, GitHub fallback |
| 5 | Should the math-to-business section be removed? | ✅ Resolved - No, keep it unchanged |

---

## 10. Implementation Phases

### Phase 1: Data Layer
- Update `projects.ts` with new schema fields (`shortDescription`)
- Add 3 new projects: TalentMatch AI, Doc Extract, AirMood
- Update existing project categories to: apps, tools, experiments
- Add `shortDescription` to all existing projects

### Phase 2: Component Updates
- Update `project-card.tsx` with visual variant
- Add hover overlay with gradient + "View Project" CTA
- Larger image aspect ratio (4:3)
- Make entire card clickable (demo URL priority)
- Simplify content display (title + short description only)

### Phase 3: Page Structure
- Update `portfolio.tsx` hero section (new messaging)
- Update filter categories to: Everything, Applications, Tools & Utilities, Experiments
- Keep math-to-business section unchanged

### Phase 4: Styling
- Add CSS for visual card hover overlay
- Add image zoom effect on hover
- Fine-tune hover animations
- Verify responsive behavior (1/2/3 column grid)

### Phase 5: Verification
- Run `npm run dev` and verify all 8 projects display
- Test hover effects on all project cards
- Verify new project demo URLs work
- Test filter functionality (each category shows correct count)
- Run `npm run check` for TypeScript validation
- Test responsive layouts on mobile/tablet/desktop
