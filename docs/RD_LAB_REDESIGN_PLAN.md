# R&D Lab Website Redesign Plan

> Generated: December 2024

## User Decisions

1. **Home page**: Keep editorial/personal - no changes to "Thinking Out Loud"
2. **Projects**: Keep current weekend project content, rebrand to R&D Lab, add new software dev projects from GitHub
3. **Scope**: Full redesign

---

## Files to Modify

| File | Changes |
|------|---------|
| `client/src/pages/portfolio.tsx` | Rebrand to R&D Lab, add new sections |
| `client/src/data/projects.ts` | Add new software dev projects |
| `client/src/components/project-card.tsx` | Add Top/Deep layer expandable sections |
| `client/src/index.css` | Add new utility classes if needed |

---

## Implementation Steps

### Step 1: Rebrand Portfolio → R&D Lab
- [ ] Update page title from "Weekend Projects" to "R&D Lab"
- [ ] Update intro text: "Weekend projects, enterprise-grade thinking"
- [ ] Update hero subtitle with new positioning copy
- [ ] Update navigation link text (if applicable)

### Step 2: Add "From Mathematics to Business Impact" Section
- [ ] Create 2x2 grid section below hero
- [ ] 4 cards: Optimization, Signal Processing, Representation Theory, Statistical Inference
- [ ] Each card: Icon + Math concept → Business application + Result

### Step 3: Enhance Project Cards with Top/Deep Layers
- [ ] Add expandable "View Technical Details" accordion
- [ ] Top layer: Image, title, one-liner, impact badges
- [ ] Deep layer: Architecture notes, tech stack, metrics

### Step 4: Add New Projects from GitHub
- [ ] **ai-dev-tasks / ai-dev-workflow** → "Self-Correcting Coder"
- [ ] **RAG implementations** → AI/Agent category
- [ ] **Logistics/optimization work** → Data Analysis category
- [ ] **ImgStory** → Creative/AI product category

### Step 5: Add "Who I Usually Help" Section
- [ ] Operations/Logistics leaders
- [ ] AI/Data platform teams
- [ ] Finance/Strategy teams

### Step 6: Add "Work With Me" / Services Section
- [ ] AI & Automation, Analytics & Optimization, AI Evaluation, Advisory
- [ ] Low-friction CTA: "Send 3-4 sentences about your pain point"

### Step 7: Final Polish
- [ ] Review responsive design
- [ ] Test animations
- [ ] Run `npm run check`

---

## New Components Needed

1. **MathToBusinessCard** - 2x2 grid section
2. **PersonaCard** - "Who I usually help" section
3. **ServicesSection** - "Work With Me" block
4. **ExpandableProjectCard** - Project card with accordion

---

## Design Specifications

**Math-to-Business Cards:**
```
┌─────────────────────────────┐
│  [Icon]                     │
│  Optimization               │
│  ↓                          │
│  Smarter routing & resource │
│  allocation                 │
└─────────────────────────────┘
```

**Persona Cards:**
```
┌─────────────────────────────┐
│  Operations & Logistics     │
│  Leaders                    │
│                             │
│  Struggling with dirty      │
│  data, slow jobs, fragile   │
│  routing logic.             │
│                             │
│  What I do: design control  │
│  towers, routing optimizers │
└─────────────────────────────┘
```

**Services Section:**
```
┌─────────────────────────────────────────────────┐
│  How I Usually Help Teams                       │
│                                                 │
│  [AI & Automation] [Analytics] [Evaluation]     │
│                                                 │
│  "Not sure where to start? Send me 3-4         │
│  sentences about your data/AI pain point."      │
│                                                 │
│  [Contact Me →]                                 │
└─────────────────────────────────────────────────┘
```

---

## Design Evaluation Summary

| Proposed Change | Verdict |
|-----------------|---------|
| Rebrand to "R&D Lab" | EXCELLENT |
| Math-to-Business section | EXCELLENT |
| Top/Deep layer cards | GOOD |
| Personas section | GOOD |
| Services/Work With Me | EXCELLENT |

**Key insight**: Your maximalist portfolio design *reinforces* "serious R&D" - keep it.
