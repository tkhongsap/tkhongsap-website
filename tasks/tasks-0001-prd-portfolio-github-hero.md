# Tasks: Portfolio Enhancement with GitHub Activity Hero Section

**PRD Reference**: `0001-prd-portfolio-github-hero.md`

## Relevant Files

### New Files
- `client/src/components/github-activity-hero.tsx` - GitHub activity hero component

### Modified Files
- `client/src/pages/portfolio.tsx` - Portfolio page integration
- `package.json` - Add react-github-calendar dependency
- `package-lock.json` - Auto-generated dependency lock file

### Reference Files (No Changes)
- `client/src/data/projects.ts` - Project data structure
- `client/src/components/project-card.tsx` - Project card component
- `client/src/components/ui/card.tsx` - UI Card component
- `CLAUDE.md` - Project documentation

---

## Task Breakdown

### 1.0 Setup and Dependencies
- [ ] 1.1 Install react-github-calendar npm package
- [ ] 1.2 Verify installation and check for peer dependency conflicts
- [ ] 1.3 Review library documentation and API options

### 2.0 Create GitHub Activity Hero Component
- [ ] 2.1 Create `client/src/components/github-activity-hero.tsx` file with TypeScript
- [ ] 2.2 Import required dependencies (react-github-calendar, Card, etc.)
- [ ] 2.3 Implement component structure with Card container wrapper
- [ ] 2.4 Add header section with title and description text
- [ ] 2.5 Integrate GitHubCalendar component with username "tkhongsap"
- [ ] 2.6 Configure calendar styling (blockSize, blockMargin, fontSize)
- [ ] 2.7 Add stats row displaying three metrics (Commits, Days, Repositories)
- [ ] 2.8 Add "View Full Profile" link to https://github.com/tkhongsap
- [ ] 2.9 Implement responsive design for mobile/tablet/desktop
- [ ] 2.10 Add loading states and error handling
- [ ] 2.11 Apply Tailwind CSS classes matching existing design system
- [ ] 2.12 Add ARIA labels for accessibility

### 3.0 Integrate Component into Portfolio Page
- [ ] 3.1 Open `client/src/pages/portfolio.tsx`
- [ ] 3.2 Import GitHubActivityHero component at top of file
- [ ] 3.3 Position component after main hero section (around line 44)
- [ ] 3.4 Position component before filter buttons
- [ ] 3.5 Verify vertical spacing with existing sections (mb-12 recommended)
- [ ] 3.6 Test component renders without errors

### 4.0 Responsive Design Testing
- [ ] 4.1 Test mobile layout (320px - 767px width)
  - [ ] Verify calendar fits within viewport
  - [ ] Verify stats stack vertically
  - [ ] Verify text remains readable
- [ ] 4.2 Test tablet layout (768px - 1023px width)
  - [ ] Verify calendar scaling
  - [ ] Verify stats row layout
- [ ] 4.3 Test desktop layout (1024px+ width)
  - [ ] Verify calendar centering
  - [ ] Verify stats row horizontal layout
  - [ ] Verify consistent spacing

### 5.0 Quality Assurance and Validation
- [ ] 5.1 Run TypeScript type checking (`npm run check`)
- [ ] 5.2 Verify no console errors or warnings in browser
- [ ] 5.3 Test GitHub API error handling (simulate offline/rate limit)
- [ ] 5.4 Verify commit count accuracy vs actual GitHub profile
- [ ] 5.5 Test loading states appear correctly
- [ ] 5.6 Validate accessibility features:
  - [ ] ARIA labels present
  - [ ] Keyboard navigation works
  - [ ] Screen reader compatibility
- [ ] 5.7 Performance check: page loads under 3 seconds

### 6.0 Build and Production Testing
- [ ] 6.1 Run development server (`npm run dev`)
- [ ] 6.2 Verify component works in development mode
- [ ] 6.3 Run production build (`npm run build`)
- [ ] 6.4 Verify build completes without errors
- [ ] 6.5 Test production build (`npm run start`)
- [ ] 6.6 Verify component works in production mode

### 7.0 Git Operations and Deployment
- [ ] 7.1 Review all changes with `git status`
- [ ] 7.2 Review diff with `git diff`
- [ ] 7.3 Stage all relevant files
- [ ] 7.4 Create commit with descriptive message following repo conventions
- [ ] 7.5 Push to feature branch: `claude/portfolio-github-hero-section-011CUwanxjMq4Kw9KaxkqKKF`
- [ ] 7.6 Verify push successful to remote

---

## Implementation Notes

### Task 2.5: Calendar Configuration
Use these recommended settings for `react-github-calendar`:
```tsx
<GitHubCalendar
  username="tkhongsap"
  blockSize={12}
  blockMargin={4}
  fontSize={14}
  colorScheme="light"
/>
```

### Task 2.7: Stats Metrics
Display three key metrics:
1. **Commits**: Target showing "1,500+" prominently
2. **Active Days**: Number of days with at least one contribution
3. **Repositories**: Total repositories contributed to

Note: The library provides contribution data; extract these metrics from the response if available, or use static values as fallback.

### Task 3.3: Exact Placement
Insert GitHubActivityHero component in `portfolio.tsx` between:
- **After**: Main hero section with title "Weekend Projects" (around line 43)
- **Before**: Filter buttons section (around line 45)

Example:
```tsx
{/* Main Hero */}
<div className="mb-12">...</div>

{/* NEW: GitHub Activity Hero */}
<GitHubActivityHero />

{/* Filter Buttons */}
<div className="flex flex-wrap gap-3 mb-12">...</div>
```

### Task 5.3: Error Handling Test
To test error handling without breaking production:
1. Temporarily pass invalid username to trigger API error
2. Verify graceful fallback message displays
3. Revert to correct username "tkhongsap"

### Task 7.4: Commit Message Format
Follow repository conventions (review `git log` for style):
```
Add GitHub activity hero section to portfolio page

- Install react-github-calendar library
- Create GitHubActivityHero component with contribution graph
- Display key metrics: commits, active days, repositories
- Integrate into portfolio page below main hero
- Maintain responsive design across all viewports
```

---

## Definition of Done

A task is considered complete when:

1. **Code Quality**
   - TypeScript compiles without errors (`npm run check` passes)
   - No console errors or warnings in browser
   - Code follows existing patterns in codebase

2. **Functionality**
   - Component renders GitHub contribution calendar
   - Metrics display correctly
   - Loading states work as expected
   - Error states handled gracefully

3. **Design**
   - Matches existing portfolio page aesthetic
   - Consistent spacing and typography
   - Responsive across all viewport sizes
   - Accessibility requirements met

4. **Testing**
   - Manually tested on mobile, tablet, desktop
   - Production build succeeds
   - Performance targets met (< 3s page load)

5. **Documentation**
   - Code includes necessary comments
   - Changes committed with clear message
   - Pushed to correct feature branch

---

## Estimated Effort

| Task Group | Estimated Time | Complexity |
|------------|---------------|------------|
| 1.0 Setup | 5 minutes | Low |
| 2.0 Component Creation | 45-60 minutes | Medium |
| 3.0 Integration | 15 minutes | Low |
| 4.0 Responsive Testing | 20 minutes | Low |
| 5.0 QA | 25 minutes | Medium |
| 6.0 Build Testing | 15 minutes | Low |
| 7.0 Git Operations | 10 minutes | Low |
| **Total** | **~2.5 hours** | **Medium** |

---

## Dependencies and Blockers

**External Dependencies:**
- react-github-calendar npm package (public, no auth required)
- GitHub public API (no authentication needed for public profiles)
- Internet connection for API calls during development

**No Blockers Identified:**
- All required files exist in codebase
- No database changes required
- No backend API development needed
- Design system components already available

---

## Success Criteria

Implementation is successful when:

1. ✅ GitHub contribution graph displays 12 months of activity for "tkhongsap"
2. ✅ Visual design matches existing portfolio page aesthetic
3. ✅ Component is responsive across mobile/tablet/desktop
4. ✅ Metrics accurately reflect GitHub activity (±5% tolerance)
5. ✅ Error states handle API failures gracefully
6. ✅ TypeScript compilation succeeds with no errors
7. ✅ Production build completes successfully
8. ✅ Page load performance remains under 3 seconds
9. ✅ Accessibility score maintains 90+ on Lighthouse
10. ✅ Code pushed to feature branch successfully

---

**Task List Version**: 1.0
**Created**: 2025-11-09
**Status**: Ready for Execution
**Next Action**: Begin with Task 1.1 (Install react-github-calendar)
