# Graph Report - user-frontend  (2026-07-18)

## Corpus Check
- 75 files · ~66,426 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 311 nodes · 532 edges · 29 communities (24 shown, 5 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `12ea88fa`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- apiUrl
- App.jsx
- dependencies
- devDependencies
- components.json
- LoginPage.jsx
- SuccessStories.jsx
- Why families trust us - illustrated scene panels
- compilerOptions
- button.jsx
- README.md
- dummyData.js
- vercel.json
- vite.config.js

## God Nodes (most connected - your core abstractions)
1. `apiUrl()` - 34 edges
2. `isSessionExpiryError()` - 21 edges
3. `useAuth()` - 21 edges
4. `authApi` - 10 edges
5. `getAuthNoticeClassName()` - 9 edges
6. `PageShell()` - 7 edges
7. `ProfileImageGallery()` - 7 edges
8. `getAuthNoticeRole()` - 7 edges
9. `authFetch()` - 7 edges
10. `Why families trust us - illustrated scene panels` - 7 edges

## Surprising Connections (you probably didn't know these)
- `ContactUs()` --calls--> `apiUrl()`  [EXTRACTED]
  src/components/ContactUs.jsx → src/config/constants.js
- `ForgotPasswordPopup()` --calls--> `apiUrl()`  [EXTRACTED]
  src/components/ForgotPasswordPopup.jsx → src/config/constants.js
- `LoginPage()` --calls--> `useAuth()`  [EXTRACTED]
  src/components/LoginPage.jsx → src/context/AuthContext.jsx
- `PreferencesPopup()` --calls--> `useAuth()`  [EXTRACTED]
  src/components/PreferencesPopup.jsx → src/context/AuthContext.jsx
- `Profile()` --calls--> `useAuth()`  [EXTRACTED]
  src/components/Profile.jsx → src/context/AuthContext.jsx

## Import Cycles
- None detected.

## Communities (29 total, 5 thin omitted)

### Community 0 - "apiUrl"
Cohesion: 0.10
Nodes (40): AboutLookingSection(), FindPartner(), MembershipPage(), MembershipRequired(), PreferencesPopup(), AstrologySection(), EducationSection(), FamilyDetailsSection() (+32 more)

### Community 1 - "App.jsx"
Cohesion: 0.07
Nodes (23): App(), AboutPage(), features, BlockingPage(), ContactUs(), CurrentMembershipPage(), CustomerReviews(), exploreLinks (+15 more)

### Community 2 - "dependencies"
Cohesion: 0.05
Nodes (43): axios, class-variance-authority, clsx, @fontsource/cormorant-garamond, @fontsource-variable/geist, @fontsource-variable/source-sans-3, framer-motion, lucide-react (+35 more)

### Community 3 - "devDependencies"
Cohesion: 0.06
Nodes (31): eslint, @eslint/js, eslint-plugin-react, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, devDependencies, eslint (+23 more)

### Community 4 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 5 - "LoginPage.jsx"
Cohesion: 0.35
Nodes (8): ForgotPasswordPopup(), LoginPage(), PageShell(), ResetPasswordPage(), SignupPage(), Modal(), getAuthNoticeClassName(), getAuthNoticeRole()

### Community 6 - "SuccessStories.jsx"
Cohesion: 0.26
Nodes (8): CoupleStoryDeck(), storyShape, usePrefersReducedMotion(), SuccessStories(), Testimonials(), buildMeta(), formatDate(), mapTestimonialsFromApi()

### Community 9 - "Why families trust us - illustrated scene panels"
Cohesion: 0.25
Nodes (7): Files, Goal, Layout, Motion, Out of scope, Scenes (custom SVG, no stock photos), Why families trust us - illustrated scene panels

### Community 10 - "compilerOptions"
Cohesion: 0.33
Nodes (6): compilerOptions, baseUrl, paths, include, @/*, ./src/*

## Knowledge Gaps
- **83 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+78 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Why does `apiUrl()` connect `apiUrl` to `App.jsx`, `LoginPage.jsx`, `SuccessStories.jsx`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _83 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `apiUrl` be split into smaller, more focused modules?**
  _Cohesion score 0.1005464480874317 - nodes in this community are weakly interconnected._
- **Should `App.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06753006475485661 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.046511627906976744 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._