# R&D Lab Redesign - Task List

## Relevant Files

- `client/src/pages/portfolio.tsx` - Main portfolio page to rebrand and add new sections
- `client/src/components/project-card.tsx` - Project card component to enhance with expandable layers
- `client/src/data/projects.ts` - Projects data file to add new GitHub projects
- `client/src/components/math-to-business-card.tsx` - NEW: Component for math-to-business section
- `client/src/components/persona-card.tsx` - NEW: Component for personas section
- `client/src/components/services-section.tsx` - NEW: Component for Work With Me section
- `client/src/index.css` - May need new utility classes
- `client/src/components/navbar.tsx` - Update navigation link text if needed

### Notes

- Use existing design system: Terracotta `#C45B3E`, Cormorant Garamond, Source Serif 4, Sora fonts
- Maintain maximalist aesthetic on portfolio page (gradients, geometric shapes, animations)
- Use existing Radix UI Accordion component for expandable sections
- Run `npm run check` for TypeScript validation before committing

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, check it off by changing `- [ ]` to `- [x]`.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [x] 0.0 Create feature branch
  - [x] 0.1 Create branch `task/update-frontend-design`

- [x] 1.0 Rebrand Portfolio page to "R&D Lab"
  - [x] 1.1 Update page title from "Weekend Projects" to "R&D Lab"
  - [x] 1.2 Update hero headline with italic accent styling
  - [x] 1.3 Update intro text to "Weekend projects, enterprise-grade thinking"
  - [x] 1.4 Update subtitle/description with new positioning copy
  - [x] 1.5 Update navbar link text from "Portfolio" to "R&D Lab" (if applicable)

- [x] 2.0 Add "From Mathematics to Business Impact" section
  - [x] 2.1 Create `math-to-business-card.tsx` component with icon, title, arrow, description
  - [x] 2.2 Define data for 4 cards: Optimization, Signal Processing, Representation Theory, Statistical Inference
  - [x] 2.3 Add 2x2 grid section to portfolio page below hero
  - [x] 2.4 Style cards using `.editorial-card` patterns with hover effects
  - [x] 2.5 Add section heading "From Mathematics to Business Impact"

- [x] 3.0 Enhance project cards with Top/Deep expandable layers
  - [x] 3.1 Add Radix Accordion to project-card component
  - [x] 3.2 Create "Top Layer" with image, title, one-liner, impact badges
  - [x] 3.3 Create "Deep Layer" collapsible section with technical details
  - [x] 3.4 Add "View Technical Details" toggle button
  - [x] 3.5 Update project data type to include `technicalDetails` field
  - [x] 3.6 Style accordion to match maximalist aesthetic

- [x] 4.0 Add new software development projects from GitHub
  - [x] 4.1 Research tkhongsap GitHub repos for featured projects
  - [x] 4.2 Add "Self-Correcting Coder" project (ai-dev-tasks/ai-dev-workflow)
  - [x] 4.3 Add RAG implementation project
  - [x] 4.4 Add any other relevant AI/automation projects (Master Prompt Library)
  - [x] 4.5 Include GitHub links, descriptions, and technical details for each

- [x] 5.0 Add "Who I Usually Help" personas section
  - [x] 5.1 Create `persona-card.tsx` component
  - [x] 5.2 Define 3 personas: Operations/Logistics, AI/Data teams, Finance/Strategy
  - [x] 5.3 Add 3-column grid section after projects
  - [x] 5.4 Each card: title, pain point description, "What I do" bullet
  - [x] 5.5 Style cards to match editorial aesthetic

- [x] 6.0 Add "Work With Me" / Services section
  - [x] 6.1 Create `services-section.tsx` component
  - [x] 6.2 Add section heading "How I Usually Help Teams"
  - [x] 6.3 Add 4 service offerings: AI & Automation, Analytics, AI Evaluation, Advisory
  - [x] 6.4 Add low-friction CTA text and Contact button
  - [x] 6.5 Place at bottom of R&D Lab page before footer
  - [x] 6.6 Style with dark background (#1A1A1A) to differentiate from projects

- [x] 7.0 Final polish and testing
  - [x] 7.1 Review responsive design on mobile, tablet, desktop
  - [x] 7.2 Test all animations and hover interactions
  - [x] 7.3 Verify accessibility (keyboard navigation, focus states)
  - [x] 7.4 Run `npm run check` for TypeScript validation
  - [x] 7.5 Test in development server
  - [ ] 7.6 Commit changes with descriptive message
