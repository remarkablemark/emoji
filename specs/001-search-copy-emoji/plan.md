# Implementation Plan: Search and Copy Emoji

**Branch**: `001-search-copy-emoji` | **Date**: 2026-02-08 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-search-copy-emoji/spec.md`

## Summary

Build an emoji search and copy tool as a React static website. Users can search emoji by keyword (case-insensitive substring match), browse by category (grouped with section headers), and copy emoji to clipboard by clicking the emoji tile or a "Copy" button. Emoji data is sourced from an npm package. The UI is responsive with a fluid grid, sticky search, and horizontally scrollable category bar on mobile.

## Technical Context

**Language/Version**: TypeScript 5 (strict mode)
**Primary Dependencies**: React 19, Vite 7, Tailwind CSS 4, unicode-emoji-json + emojilib (emoji data + search keywords)
**Storage**: N/A (static client-side app, emoji data bundled from npm package)
**Testing**: Vitest 4 + @testing-library/react + @testing-library/user-event (100% coverage required)
**Target Platform**: Modern browsers (Chrome, Firefox, Safari, Edge) — desktop and mobile
**Project Type**: Single static web application
**Performance Goals**: Search results within 300ms of last keystroke; 1,800+ emoji rendered efficiently
**Constraints**: No backend; client-side only; Tailwind CSS for all styling; no custom CSS files
**Scale/Scope**: ~1,800 emoji across all Unicode categories; single-page app with ~6-8 components

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                       | Status  | Notes                                                                                                                                 |
| ------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **I. Accessibility-First**      | ✅ PASS | FR-010 (emoji names for a11y), FR-011 (keyboard nav), ARIA attributes planned for all interactive elements                            |
| **II. Component Architecture**  | ✅ PASS | All components will be functional React components in `src/components/ComponentName/` with barrel exports, co-located tests and types |
| **III. Full Test Coverage**     | ✅ PASS | 100% coverage enforced; clipboard API and emoji data will be mocked in tests                                                          |
| **IV. Type Safety**             | ✅ PASS | Strict mode; interfaces for Emoji and Category entities; proper React event types                                                     |
| **V. Simplicity & Performance** | ✅ PASS | Minimal dependencies; Tailwind-only styling; YAGNI (no skin tone variants, no variant picker)                                         |
| **Technology Constraints**      | ✅ PASS | React 19, TypeScript 5, Vite 7, Tailwind CSS 4, Vitest 4 — all aligned                                                                |
| **Development Workflow**        | ✅ PASS | Feature branch from master; lint + tsc + test:ci gates; conventional commits                                                          |

**Gate Result**: ALL PASS — proceeding to Phase 0.

## Project Structure

### Documentation (this feature)

```text
specs/001-search-copy-emoji/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A — no API, static app)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── App/                  # Root app component (existing, to be updated)
│   │   ├── App.tsx
│   │   ├── App.test.tsx
│   │   └── index.ts
│   ├── SearchBar/            # Search input field (FR-001, FR-002)
│   │   ├── SearchBar.tsx
│   │   ├── SearchBar.types.ts
│   │   ├── SearchBar.test.tsx
│   │   └── index.ts
│   ├── CategoryBar/          # Category filter navigation (FR-008, FR-009)
│   │   ├── CategoryBar.tsx
│   │   ├── CategoryBar.types.ts
│   │   ├── CategoryBar.test.tsx
│   │   └── index.ts
│   ├── EmojiGrid/            # Emoji display grid with category sections (FR-003, FR-012, FR-013)
│   │   ├── EmojiGrid.tsx
│   │   ├── EmojiGrid.types.ts
│   │   ├── EmojiGrid.test.tsx
│   │   └── index.ts
│   ├── EmojiCard/            # Individual emoji tile with copy button (FR-005, FR-010)
│   │   ├── EmojiCard.tsx
│   │   ├── EmojiCard.types.ts
│   │   ├── EmojiCard.test.tsx
│   │   └── index.ts
│   ├── CopyToast/            # "Copied!" tooltip/toast feedback (FR-006)
│   │   ├── CopyToast.tsx
│   │   ├── CopyToast.types.ts
│   │   ├── CopyToast.test.tsx
│   │   └── index.ts
│   └── NoResults/            # Empty state message (FR-004)
│       ├── NoResults.tsx
│       ├── NoResults.test.tsx
│       └── index.ts
├── data/
│   └── emoji.ts              # Emoji data adapter (transforms npm package data)
├── hooks/
│   ├── useEmojiSearch.ts     # Search + category filter logic
│   ├── useEmojiSearch.test.ts
│   ├── useCopyToClipboard.ts # Clipboard copy with toast state
│   └── useCopyToClipboard.test.ts
├── types/
│   └── emoji.types.ts        # Shared Emoji and Category interfaces
├── index.css
├── main.tsx
├── main.test.tsx
└── vite-env.d.ts

test/
└── setupFiles.ts
```

**Structure Decision**: Single project (Option 1 adapted for React SPA). This is a client-side-only static website with no backend. All source lives under `src/` following the existing component directory pattern. Custom hooks are extracted to `src/hooks/` for reusability and testability. Shared types go in `src/types/`. Emoji data transformation lives in `src/data/`.

## Complexity Tracking

> No constitution violations. No complexity justifications needed.
