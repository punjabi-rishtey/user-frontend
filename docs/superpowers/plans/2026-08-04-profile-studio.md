# Profile Studio Implementation Plan

> **For agentic workers:** Implement task-by-task. Steps use checkbox syntax.

**Goal:** Ship full-width portrait + panels profile editor on `/profilepage`.

**Architecture:** New `ProfileStudioPage` orchestrator + `StudioShell`; reuse field chapter components from `profile/dossier/` for forms; left column owns portrait + nav.

**Tech Stack:** Vite React, PageShell, existing authApi / photo APIs, formStyles tokens.

## Global Constraints
- Full width on desktop — never max-w-xl centered dossier strip
- Always-editable + Save this section + unsaved confirm
- No backend contract changes
- Age-friendly: large targets, plain labels, sticky Save on mobile
- Real photos only

---

### Task 1: Studio shell
- [ ] Add `profile/studio/StudioShell.jsx` (photo slot, section nav, right panel, sticky save, completion %)
- [ ] Add `profile/studio/constants.js` (section ids/labels)

### Task 2: Orchestrator
- [ ] Add `ProfileStudioPage.jsx` — load/save like dossier page, section switching with dirty confirm
- [ ] Account section + existing password/delete/logout modals
- [ ] Pictures: left portrait synced; right panel gallery controls (reuse PhotosChapter logic)

### Task 3: Route
- [ ] Point `App.jsx` `/profilepage` at `ProfileStudioPage`
- [ ] Build verify

### Task 4: Cleanup (optional follow-up)
- [ ] Leave old Profilepage.jsx and unused dossier shell until stable
