# Research: Search and Copy Emoji

**Feature Branch**: `001-search-copy-emoji`
**Date**: 2026-02-08

## R1: Emoji Data Package Selection

**Decision**: Use `unicode-emoji-json` for emoji data + `emojilib` for search keywords

**Rationale**:

- `unicode-emoji-json` (by muan) provides Unicode emoji data in multiple JSON formats:
  - `data-by-group.json` — emoji pre-grouped by category (e.g., "Smileys & Emotion", "People & Body") — ideal for category browsing (FR-003, FR-008)
  - `data-by-emoji.json` — keyed by emoji character with name, slug, group, and skin tone support flag — ideal for search (FR-002)
- `emojilib` (by muan) provides keyword arrays for each emoji (e.g., 😀 → ["grinning_face", "face", "smile", "happy", "joy"]) — enables rich substring search beyond just the emoji name
- Both packages are from the same author and designed to complement each other
- Skin tone variants are consolidated into a single base entry with a `skin_tone_support` flag — aligns perfectly with our clarification to show only default (yellow) emoji
- RGI-only data (Recommended for General Interchange) — ensures broad platform support
- Lightweight JSON files, no runtime dependencies — keeps bundle small per Constitution V (Simplicity & Performance)
- Unicode 16.0 data — latest standard

**Alternatives considered**:

- `emoji-mart` — Full emoji picker component; too opinionated, brings its own UI, violates YAGNI and Constitution V
- `emoji-datasource` — Used by Slack; larger bundle, includes image assets we don't need (we use native emoji rendering)
- `unicode-emoji` — Good data but less community adoption; `unicode-emoji-json` has simpler JSON format
- `emoji.json` — Flat list without categories or keywords; would require more transformation

## R2: Search Implementation Strategy

**Decision**: Client-side substring matching with combined name + keyword search

**Rationale**:

- With ~1,800 emoji, client-side filtering is fast enough (no need for server-side search or indexing libraries)
- Combine `unicode-emoji-json` names with `emojilib` keywords for comprehensive search coverage
- Case-insensitive substring match (per clarification) using `String.includes()` — simple, performant, no dependencies
- Pre-compute a merged data structure at module load time to avoid repeated lookups during search
- No debounce needed for filtering ~1,800 items — `Array.filter()` on this scale completes in <1ms

**Alternatives considered**:

- Fuse.js (fuzzy search library) — Overkill for substring matching; adds bundle size; fuzzy matching was explicitly not chosen in clarification
- Web Workers — Unnecessary for this data size; adds complexity
- Debounced search — Not needed given the small dataset; would add perceived latency

## R3: Clipboard API Usage

**Decision**: Use `navigator.clipboard.writeText()` with fallback error handling

**Rationale**:

- Modern Clipboard API is supported in all target browsers (Chrome, Firefox, Safari, Edge)
- Requires secure context (HTTPS or localhost) — dev server and production both qualify
- Simple async API: `await navigator.clipboard.writeText(emoji)`
- Error handling for permission denied or insecure context (FR-007)
- No fallback to deprecated `document.execCommand('copy')` — all target browsers support the modern API

**Alternatives considered**:

- `document.execCommand('copy')` — Deprecated, synchronous, requires creating temporary textarea elements
- Third-party clipboard libraries — Unnecessary; native API is sufficient and well-supported

## R4: Performance with 1,800+ Emoji

**Decision**: Render all emoji in a flat list (no virtualization); use CSS grid for layout

**Rationale**:

- ~1,800 emoji rendered as small DOM elements (each is a button with emoji text + name) is well within browser rendering capability
- CSS Grid with `auto-fill` handles responsive column count automatically (FR-012)
- React Compiler (already in project) will optimize re-renders during search filtering
- No virtualization library needed — avoids complexity and dependency (Constitution V)

**Alternatives considered**:

- `react-window` / `react-virtuoso` — Virtual scrolling; adds dependency and complexity for a dataset that doesn't need it
- Pagination — Breaks the browsing experience; users expect to scroll through emoji
- Lazy loading by category — Adds complexity without meaningful performance gain

## R5: Toast/Tooltip Implementation

**Decision**: Custom lightweight toast component using CSS transitions and `setTimeout`

**Rationale**:

- Simple "Copied!" text that appears near the clicked emoji and fades after 1-2 seconds
- Implemented with absolute positioning relative to the clicked emoji tile
- CSS `opacity` transition for fade effect — no animation library needed
- `setTimeout` to auto-dismiss after 1.5 seconds
- Only one toast visible at a time (clicking another emoji replaces the current toast)
- Tailwind CSS classes for all styling (Constitution V)

**Alternatives considered**:

- `react-hot-toast` / `sonner` — Third-party toast libraries; overkill for a single "Copied!" message; adds bundle size
- CSS `@keyframes` animation — More complex than needed; simple opacity transition suffices
