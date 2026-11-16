# Why families trust us - illustrated scene panels

Date: 2026-07-18  
Surface: `user-frontend` - `WhyChooseUs` home section  
Direction: **B - Illustrated scene panels** (approved)

## Goal

Replace the three plain bordered cards with immersive tall panels. Each pillar gets a custom SVG scene band above the copy so the section feels atelier and memorable-not a generic icon grid.

## Layout

- Keep existing `Section` chrome (eyebrow, title, description).
- Desktop: 3 equal columns; mobile: stack.
- Each panel:
  1. Scene band (~16:10) - warm ivory/paper gradient + custom SVG
  2. Hairline border between scene and copy
  3. Copy - maroon step (`01`–`03`), Cormorant title, body text
- Panels: thin border, soft shadow, slight radius (`rounded-sm`). Equal height via grid stretch + `h-full` / `mt-auto` as needed.

## Scenes (custom SVG, no stock photos)

| Step | Pillar | Motif |
|------|--------|--------|
| 01 | Community first | Three figures in a circle + light phulkari-inspired pattern |
| 02 | Human verification | Document + maroon seal check, dashed ring |
| 03 | Respectful contact | Two figures, bridging gesture, diamond accents |

Stroke language: maroon / brown, line-art, paper-friendly. `currentColor` where practical.

## Motion

- Staggered fade/rise on scroll (Framer Motion, existing pattern).
- Optional subtle scene opacity settle; disabled under `prefers-reduced-motion` / `motion-reduce`.

## Out of scope

- Photos, Lottie, or downloaded illustration packs
- Changing pillar copy or section headline
- New routes or CMS

## Files

- [`src/components/WhyChooseUs.jsx`](../../src/components/WhyChooseUs.jsx) - section composition
- `src/components/trust/TrustScenes.jsx` - three SVG scene components
