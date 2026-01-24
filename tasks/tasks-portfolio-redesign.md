# Tasks: Portfolio Page Redesign

## Relevant Files

- `client/src/data/projects.ts` - Project data schema and content; needs new fields, 3 new projects, and category updates
- `client/src/components/project-card.tsx` - Project card component; needs new "visual" variant with larger images and hover overlay
- `client/src/pages/portfolio.tsx` - Portfolio page; hero updates, update filters (keep math section unchanged)
- `client/src/index.css` - Global styles; add CSS for visual card hover overlay and animations

### Notes

- No new npm packages required; uses existing shadcn/ui, Tailwind CSS, and Lucide icons
- Use `npm run dev` to start development server and verify changes
- Use `npm run check` to validate TypeScript before committing
- Maintain the existing warm editorial design aesthetic (terracotta #C45B3E, cream #FAF9F6)
- Total projects after update: 8 (3 new + 5 existing)
- **Keep "From Mathematics to Business Impact" section unchanged**

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [ ] 1.0 Update Project Data Layer
  - [ ] 1.1 Add `shortDescription?: string` field to the `Project` interface in `projects.ts`
  - [ ] 1.2 Update `category` type from `"ai" | "data" | "finance" | "creative"` to `"apps" | "tools" | "experiments"`
  - [ ] 1.3 Add TalentMatch AI project with all required fields (id, title, description, shortDescription, technologies, category: "apps", demoUrl, impactBadge: "Live App")
  - [ ] 1.4 Add Doc Extract project with all required fields (category: "apps", demoUrl, impactBadge: "Live App")
  - [ ] 1.5 Add AirMood project with all required fields (category: "apps", demoUrl, impactBadge: "Live App")
  - [ ] 1.6 Update ImgStory Hub: change category from "ai" to "apps", add shortDescription
  - [ ] 1.7 Update Fine-Tuning Vision: change category from "ai" to "experiments", add shortDescription
  - [ ] 1.8 Update Self-Correcting Coder: change category from "ai" to "tools", add shortDescription
  - [ ] 1.9 Update RAG Document Q&A: change category from "ai" to "tools", add shortDescription
  - [ ] 1.10 Update Master Prompt Library: change category from "ai" to "experiments", add shortDescription
  - [ ] 1.11 Reorder projects array so new projects (TalentMatch AI, Doc Extract, AirMood) appear first

- [ ] 2.0 Redesign ProjectCard Component (Visual Variant)
  - [ ] 2.1 Update `ProjectCardProps` interface to add `variant?: "default" | "featured" | "visual"`
  - [ ] 2.2 Update `categoryLabels` object to use new categories: apps → "Applications", tools → "Tools & Utilities", experiments → "Experiments"
  - [ ] 2.3 For visual variant: change image aspect ratio from `16/10` to `4/3`
  - [ ] 2.4 For visual variant: add hover overlay div with gradient (dark gradient from bottom)
  - [ ] 2.5 For visual variant: add "View Project →" CTA text inside overlay that appears on hover
  - [ ] 2.6 For visual variant: make entire card clickable (wrap in anchor tag or add onClick) - prioritize demoUrl, fallback to githubUrl
  - [ ] 2.7 For visual variant: use `shortDescription` instead of full `description` (with fallback)
  - [ ] 2.8 For visual variant: limit technology tags to maximum 2-3
  - [ ] 2.9 For visual variant: hide the technical details accordion
  - [ ] 2.10 For visual variant: add CSS class `project-card-visual` to the card root element

- [ ] 3.0 Update Portfolio Page Structure
  - [ ] 3.1 Update hero tagline from "Passion Projects, Real-World Thinking" to "The Workshop"
  - [ ] 3.2 Update hero title from "After Hours" to "Built After Hours"
  - [ ] 3.3 Update hero subtitle to "Full-stack applications and AI experiments. Some stay as prototypes. Some become products."
  - [ ] 3.4 Update `ProjectCategory` type from `"all" | "ai" | "data" | "finance" | "creative"` to `"all" | "apps" | "tools" | "experiments"`
  - [ ] 3.5 Update `filters` array with new labels: { id: "all", label: "Everything" }, { id: "apps", label: "Applications" }, { id: "tools", label: "Tools & Utilities" }, { id: "experiments", label: "Experiments" }
  - [ ] 3.6 Update ProjectCard usage to pass `variant="visual"` prop

- [ ] 4.0 Add Visual Card Styling
  - [ ] 4.1 Add `.project-card-visual` class with `position: relative` and `cursor: pointer`
  - [ ] 4.2 Add `.project-card-visual .card-image` with `aspect-ratio: 4/3`
  - [ ] 4.3 Add `.project-card-visual-overlay` class with gradient background, absolute positioning, opacity transition
  - [ ] 4.4 Add hover state `.project-card-visual:hover .project-card-visual-overlay` to show overlay (opacity: 1)
  - [ ] 4.5 Add `.project-card-visual-overlay .cta-text` with transform animation (translateY effect on hover)
  - [ ] 4.6 Ensure image zoom effect (scale 1.05) works on hover within visual variant

- [ ] 5.0 Verification and Testing
  - [ ] 5.1 Run `npm run dev` and navigate to portfolio page
  - [ ] 5.2 Verify hero displays updated messaging ("The Workshop", "Built After Hours")
  - [ ] 5.3 Verify "From Mathematics to Business Impact" section is still present and unchanged
  - [ ] 5.4 Verify all 8 projects display in the grid
  - [ ] 5.5 Verify new projects (TalentMatch AI, Doc Extract, AirMood) appear at top of grid
  - [ ] 5.6 Verify hover effects work: image zoom, overlay appears, CTA text animates in
  - [ ] 5.7 Verify clicking a project card opens the correct demo URL
  - [ ] 5.8 Test filter "Everything" - shows all 8 projects
  - [ ] 5.9 Test filter "Applications" - shows 4 projects (TalentMatch AI, Doc Extract, AirMood, ImgStory Hub)
  - [ ] 5.10 Test filter "Tools & Utilities" - shows 2 projects (Self-Correcting Coder, RAG Document Q&A)
  - [ ] 5.11 Test filter "Experiments" - shows 2 projects (Fine-Tuning Vision, Master Prompt Library)
  - [ ] 5.12 Test responsive layout: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
  - [ ] 5.13 Verify personas and services sections still render unchanged
  - [ ] 5.14 Run `npm run check` to validate TypeScript - ensure no errors
