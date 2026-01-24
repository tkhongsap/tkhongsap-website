# Ralph Loop Prompt: Portfolio Page Redesign

## How to Use

Run this command to start the Ralph Loop:

```
/ralph-loop "Implement the portfolio page redesign following tasks/tasks-portfolio-redesign.md. Reference tasks/prd-portfolio-redesign.md for requirements. Keep the math-to-business section unchanged. Check off completed sub-tasks as you go. When ALL tasks are complete and npm run check passes, output <promise>PORTFOLIO REDESIGN COMPLETE</promise>" --completion-promise "PORTFOLIO REDESIGN COMPLETE" --max-iterations 15
```

---

## Alternative: Shorter Prompt

If you prefer a more concise prompt:

```
/ralph-loop "Execute tasks in tasks/tasks-portfolio-redesign.md for portfolio redesign. Mark each sub-task [x] when done. Do NOT remove the math section. Run npm run check at end. Output <promise>DONE</promise> when all 5.x verification tasks pass." --completion-promise "DONE" --max-iterations 15
```

---

## What Ralph Will Do

Each iteration, Ralph will:

1. Read `tasks/tasks-portfolio-redesign.md` to see current progress
2. Find the next unchecked `- [ ]` sub-task
3. Implement that sub-task
4. Mark it `- [x]` in the task file
5. Continue until all tasks complete
6. Run verification (Task 5.0)
7. Output `<promise>PORTFOLIO REDESIGN COMPLETE</promise>` when done

---

## Key Files

| File | Role |
|------|------|
| `tasks/tasks-portfolio-redesign.md` | Task checklist (Ralph tracks progress here) |
| `tasks/prd-portfolio-redesign.md` | Full requirements and specifications |
| `client/src/data/projects.ts` | Project data to modify |
| `client/src/components/project-card.tsx` | Card component to modify |
| `client/src/pages/portfolio.tsx` | Page to modify (hero + filters only, keep math section) |
| `client/src/index.css` | Styles to add |

---

## Important Constraints

- **DO NOT remove** the "From Mathematics to Business Impact" section
- **DO NOT remove** the diagonal divider after the math section
- **DO NOT remove** the `mathToBusinessData` array or `MathToBusinessCard` import
- Keep personas and services sections unchanged

---

## Completion Promise

Ralph will output this tag when finished:

```
<promise>PORTFOLIO REDESIGN COMPLETE</promise>
```

The stop hook detects this and ends the loop.

---

## Manual Override

To cancel the loop at any time:

```
/cancel-ralph
```
