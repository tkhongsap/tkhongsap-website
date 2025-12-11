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

- [ ] 1.0 Rebrand Portfolio page to "R&D Lab"
  - [ ] 1.1 Update page title from "Weekend Projects" to "R&D Lab"
  - [ ] 1.2 Update hero headline with italic accent styling
  - [ ] 1.3 Update intro text to "Weekend projects, enterprise-grade thinking"
  - [ ] 1.4 Update subtitle/description with new positioning copy
  - [ ] 1.5 Update navbar link text from "Portfolio" to "R&D Lab" (if applicable)

- [ ] 2.0 Add "From Mathematics to Business Impact" section
  - [ ] 2.1 Create `math-to-business-card.tsx` component with icon, title, arrow, description
  - [ ] 2.2 Define data for 4 cards: Optimization, Signal Processing, Representation Theory, Statistical Inference
  - [ ] 2.3 Add 2x2 grid section to portfolio page below hero
  - [ ] 2.4 Style cards using `.editorial-card` patterns with hover effects
  - [ ] 2.5 Add section heading "From Mathematics to Business Impact"

- [ ] 3.0 Enhance project cards with Top/Deep expandable layers
  - [ ] 3.1 Add Radix Accordion to project-card component
  - [ ] 3.2 Create "Top Layer" with image, title, one-liner, impact badges
  - [ ] 3.3 Create "Deep Layer" collapsible section with technical details
  - [ ] 3.4 Add "View Technical Details" toggle button
  - [ ] 3.5 Update project data type to include `technicalDetails` field
  - [ ] 3.6 Style accordion to match maximalist aesthetic

- [ ] 4.0 Add new software development projects from GitHub
  - [ ] 4.1 Research tkhongsap GitHub repos for featured projects
  - [ ] 4.2 Add "Self-Correcting Coder" project (ai-dev-tasks/ai-dev-workflow)
  - [ ] 4.3 Add RAG implementation project
  - [ ] 4.4 Add any other relevant AI/automation projects
  - [ ] 4.5 Include GitHub links, descriptions, and technical details for each

- [ ] 5.0 Add "Who I Usually Help" personas section
  - [ ] 5.1 Create `persona-card.tsx` component
  - [ ] 5.2 Define 3 personas: Operations/Logistics, AI/Data teams, Finance/Strategy
  - [ ] 5.3 Add 3-column grid section after projects
  - [ ] 5.4 Each card: title, pain point description, "What I do" bullet
  - [ ] 5.5 Style cards to match editorial aesthetic

- [ ] 6.0 Add "Work With Me" / Services section
  - [ ] 6.1 Create `services-section.tsx` component
  - [ ] 6.2 Add section heading "How I Usually Help Teams"
  - [ ] 6.3 Add 4 service offerings: AI & Automation, Analytics, AI Evaluation, Advisory
  - [ ] 6.4 Add low-friction CTA text and Contact button
  - [ ] 6.5 Place at bottom of R&D Lab page before footer
  - [ ] 6.6 Style with warm background to differentiate from projects

- [ ] 7.0 Final polish and testing
  - [ ] 7.1 Review responsive design on mobile, tablet, desktop
  - [ ] 7.2 Test all animations and hover interactions
  - [ ] 7.3 Verify accessibility (keyboard navigation, focus states)
  - [ ] 7.4 Run `npm run check` for TypeScript validation
  - [ ] 7.5 Test in development server
  - [ ] 7.6 Commit changes with descriptive message
