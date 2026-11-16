# Profile studio — portrait + panels

**Date:** 2026-08-04  
**Status:** Approved

## Goal
Replace `/profilepage` with a full-width profile editor: large primary portrait on the left, one section at a time on the right — calm for all ages, safe for the Play Store app’s existing APIs.

## Layout
- **Desktop:** ~1/3 left (portrait + vertical section list), ~2/3 right (section title, fields, Save). Uses most of the viewport width — not a skinny centered strip.
- **Mobile / app-like:** portrait on top → section list → fields → sticky **Save this section**.

## Interaction
- Always editable; explicit **Save this section** (no Edit/Cancel mode).
- Switch section with unsaved changes → confirm: Save / Discard / Cancel.
- Inline success/error notices — no `alert()`.
- Completion: quiet `%` + aim for 70%; no RGB bar.
- Account (password / logout / delete) as its own nav item.

## Sections & APIs
Pictures, Who you are, About, Lifestyle & place, Family, Education, Profession, Astrology, Account — existing PUTs / photo endpoints only. No backend contract changes.

## Out of scope
Native Android UI changes; redesign of password/delete flows beyond reachable branded modals.
