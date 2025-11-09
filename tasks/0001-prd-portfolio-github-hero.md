# PRD: Portfolio Enhancement with GitHub Activity Hero Section

## Introduction/Overview

This feature transforms the existing Weekend Projects page into a comprehensive portfolio showcase with an engaging GitHub activity visualization. The enhancement addresses two key needs:

1. **Portfolio Organization**: Provide a scalable structure for displaying apps and projects built over time, making it easy to add new projects without code changes
2. **GitHub Activity Showcase**: Visualize 1,500+ commits from the past 12 months through an interactive contribution graph, demonstrating consistent coding practice and technical dedication

**Problem Statement**: Currently, the portfolio page has only 2 projects and lacks a compelling visual narrative around the developer's consistent GitHub activity. Visitors cannot easily grasp the scope of work or the dedication to continuous learning and building.

## Goals

1. **Implement GitHub Contribution Graph**: Display a visual calendar grid showing 12 months of commit activity (targeting 1,500+ commits)
2. **Create Hero Activity Section**: Build an engaging component featuring the contribution graph with key metrics (commits, active days, repositories)
3. **Enhance Portfolio Scalability**: Ensure the project data structure easily accommodates new apps/projects without requiring component changes
4. **Maintain Performance**: Keep page load times under 3 seconds with optimized image loading and API caching
5. **Preserve SEO Quality**: Maintain existing schema markup and meta tag implementation while adding new structured data for projects

## User Stories

**As a visitor** exploring the portfolio page, I want to see a visual representation of GitHub activity so that I can quickly understand the developer's consistency and commitment to coding.

**As a recruiter**, I want to see quantified metrics (commit counts, streak days, repository count) so that I can assess technical activity at a glance without visiting external profiles.

**As a potential collaborator**, I want to browse through diverse projects organized by category (AI, Data, Finance, Creative) so that I can identify relevant expertise and previous work.

**As the portfolio owner**, I want to add new projects by simply updating a data file (no component changes) so that I can maintain my portfolio efficiently as I build more apps.

## Functional Requirements

### GitHub Activity Hero Section

1. The system must display a contribution calendar showing the past 12 months of GitHub activity in a grid format (52 weeks × 7 days)
2. The system must show different intensity levels for contribution days using visual indicators (e.g., color gradients from light to dark green)
3. The system must display the following metrics prominently:
   - Total commits in the past 12 months
   - Number of active contribution days
   - Total number of repositories contributed to
4. The system must fetch GitHub data using the `react-github-calendar` npm library to avoid custom API implementation
5. The system must handle loading states gracefully with skeleton UI or loading indicators
6. The system must handle API failures gracefully by displaying cached data or a fallback message
7. The system must position the GitHub activity hero section directly below the main portfolio hero and above the category filter buttons

### Portfolio Structure Enhancement

8. The system must support the existing project data structure defined in `client/src/data/projects.ts`
9. The system must maintain the current filtering functionality (All, AI, Data, Finance, Creative categories)
10. The system must continue to render projects using the existing `ProjectCard` component without breaking changes
11. The system must support the following project fields: id, title, description, image, technologies, category, githubUrl, demoUrl, caseStudyUrl, caseStudyLabel
12. The system must maintain responsive design across mobile (320px+), tablet (768px+), and desktop (1024px+) viewports

### UI/UX Requirements

13. The system must integrate seamlessly with the existing Tailwind CSS and shadcn/ui design system
14. The system must use the existing Card component from `@/components/ui/card` for the GitHub activity container
15. The system must maintain consistent spacing and typography matching the portfolio page design
16. The system must support both light and dark color schemes if the site implements theme switching in the future
17. The contribution graph must be interactive, showing tooltips on hover with specific date and contribution count

## Non-Goals (Out of Scope)

1. **Backend API for GitHub Data**: This implementation will not create custom server-side endpoints for fetching GitHub GraphQL data (using library instead)
2. **Database Storage for Projects**: Projects will remain as frontend-only static data (no database migration)
3. **Real-time Contribution Updates**: The graph will not update in real-time; standard caching applies
4. **Multiple GitHub Profile Support**: Only the owner's profile (tkhongsap) will be displayed
5. **Detailed Repository Analytics**: Beyond basic metrics, no detailed per-repo analytics or language breakdowns
6. **Authentication/Admin Panel for Projects**: No CMS or admin interface for managing projects (manual data file updates only)
7. **Advanced Filtering**: No search functionality, tags, or multi-category filtering beyond existing single-category filters
8. **Project CRUD Operations**: No ability to add/edit/delete projects through the UI

## Design Considerations

### Component Hierarchy

```
Portfolio Page (portfolio.tsx)
├── SEO Component
├── SchemaMarkup Component
├── Main Hero Section (existing)
├── GitHubActivityHero Component (NEW)
│   ├── Card Container
│   ├── Header (Title + Description)
│   ├── GitHubCalendar (from library)
│   └── Stats Row (Commits / Days / Repos)
├── Filter Buttons (existing)
└── ProjectCard Grid (existing)
```

### Visual Layout

**GitHub Activity Hero Section:**
- Background: Card with subtle border, matching existing design
- Padding: `p-8` (2rem) for desktop, `p-6` (1.5rem) for mobile
- Margin Bottom: `mb-12` to create clear separation from filters
- Title: `text-3xl font-bold` centered
- Description: `text-muted-foreground` for supporting text
- Graph: Centered with `flex justify-center`
- Stats: 3-column grid on desktop, stacked on mobile

### Accessibility

- All interactive elements must have proper ARIA labels
- Contribution graph must include screen-reader-friendly alternative text
- Color intensity must meet WCAG AA contrast requirements
- Keyboard navigation must work for all interactive elements

## Technical Considerations

### Dependencies

**New Dependency Required:**
- `react-github-calendar` (https://www.npmjs.com/package/react-github-calendar)
- Install via: `npm install react-github-calendar`

**Existing Dependencies (No Changes):**
- React 18 + TypeScript
- Tailwind CSS
- shadcn/ui components
- TanStack Query (if implementing caching)

### File Structure

**New Files:**
- `client/src/components/github-activity-hero.tsx` - Main component for GitHub activity section

**Modified Files:**
- `client/src/pages/portfolio.tsx` - Import and render GitHubActivityHero component
- `package.json` - Add react-github-calendar dependency

**No Changes Required:**
- `client/src/data/projects.ts` - Already properly structured
- `client/src/components/project-card.tsx` - No modifications needed
- Database schema - Not applicable

### Performance Considerations

1. **Library Caching**: `react-github-calendar` includes built-in caching (15 minutes)
2. **Lazy Loading**: Consider wrapping in React.lazy() if bundle size becomes a concern
3. **Image Optimization**: Existing `OptimizedImage` component handles project thumbnails
4. **Bundle Size**: react-github-calendar adds ~20KB gzipped (acceptable overhead)

### Integration Points

- **GitHub API**: Library handles API calls to GitHub's public contribution API (no auth required)
- **Error Boundaries**: Wrap component in error boundary to prevent page crashes if GitHub API fails
- **SEO**: No impact on existing schema markup; activity section is supplementary content

## Success Metrics

1. **Implementation Completeness**: GitHub contribution graph displays correctly with accurate data (100% of days visible)
2. **Performance**: Portfolio page load time remains under 3 seconds on 3G connections
3. **Visual Consistency**: Design matches existing portfolio aesthetic (validated through visual QA)
4. **Data Accuracy**: Commit count in hero section matches actual GitHub profile within ±5% tolerance
5. **Error Rate**: Less than 1% of page views encounter GitHub API errors (tracked via error logging)
6. **Mobile Responsiveness**: Component renders correctly on screens from 320px to 2560px width
7. **Accessibility Score**: Lighthouse accessibility score remains 90+ after implementation

## Open Questions

1. ~~Should the contribution graph show the current year-to-date, or always show a rolling 12-month window?~~
   - **Decision**: Use library default (rolling 12 months from current date)

2. ~~Should metrics update dynamically or use static values?~~
   - **Decision**: Library provides live data; use dynamic values

3. ~~What happens if GitHub API is down or rate-limited?~~
   - **Decision**: Library handles gracefully; display last cached data or empty state

4. ~~Should we add a "View Full Profile" link to GitHub?~~
   - **Decision**: Yes, include subtle link to https://github.com/tkhongsap

5. ~~Should the graph animate on page load?~~
   - **Decision**: Use library defaults (no custom animations for v1)

---

## Appendix: Project Data Structure Reference

For future project additions, use this structure in `client/src/data/projects.ts`:

```typescript
{
  id: "unique-slug",
  title: "Project Name",
  description: "1-2 sentence description of what it does and why",
  image: "https://i.imgur.com/xxx.png", // or import
  technologies: ["React", "TypeScript", "Node.js"],
  category: "ai" | "data" | "finance" | "creative",
  githubUrl: "https://github.com/tkhongsap/repo-name", // optional
  demoUrl: "https://demo.example.com", // optional
  caseStudyUrl: "/writing/article-slug", // optional
  caseStudyLabel: "Read case study" // optional
}
```

---

**PRD Version**: 1.0
**Created**: 2025-11-09
**Status**: Ready for Implementation
