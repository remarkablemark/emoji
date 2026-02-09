# Quickstart: Search and Copy Emoji

**Feature Branch**: `001-search-copy-emoji`
**Date**: 2026-02-08

## Prerequisites

- Node.js 24 (see `.nvmrc`)
- npm (comes with Node.js)

## Setup

```bash
# Switch to the feature branch
git checkout 001-search-copy-emoji

# Install dependencies
npm install

# Install new dependencies for emoji data
npm install unicode-emoji-json emojilib
```

## Development

```bash
# Start dev server (opens browser at http://localhost:5173)
npm start
```

## Quality Gates (all must pass before merge)

```bash
# 1. Lint — zero ESLint errors
npm run lint

# 2. Type check — zero TypeScript errors
npm run lint:tsc

# 3. Tests — all pass with 100% coverage
npm run test:ci
```

## Key Files to Create/Modify

### New Files

| File                              | Purpose                                                |
| --------------------------------- | ------------------------------------------------------ |
| `src/types/emoji.types.ts`        | Shared `Emoji` and `Category` interfaces               |
| `src/data/emoji.ts`               | Data adapter merging `unicode-emoji-json` + `emojilib` |
| `src/hooks/useEmojiSearch.ts`     | Search + category filter hook                          |
| `src/hooks/useCopyToClipboard.ts` | Clipboard copy + toast state hook                      |
| `src/components/SearchBar/`       | Search input component                                 |
| `src/components/CategoryBar/`     | Category filter navigation                             |
| `src/components/EmojiGrid/`       | Emoji grid with category sections                      |
| `src/components/EmojiCard/`       | Individual emoji tile with copy button                 |
| `src/components/CopyToast/`       | "Copied!" tooltip feedback                             |
| `src/components/NoResults/`       | Empty state message                                    |

### Modified Files

| File                              | Change                                       |
| --------------------------------- | -------------------------------------------- |
| `src/components/App/App.tsx`      | Replace starter content with emoji search UI |
| `src/components/App/App.test.tsx` | Update tests for new App behavior            |

## Architecture Overview

```text
App
├── SearchBar          (search input, sticky at top)
├── CategoryBar        (horizontal category filter)
├── EmojiGrid          (scrollable grid grouped by category)
│   └── EmojiCard[]    (individual emoji tiles with copy button)
│       └── CopyToast  (positioned near clicked emoji)
└── NoResults          (shown when search has no matches)
```

## Data Flow

1. `src/data/emoji.ts` merges `unicode-emoji-json` + `emojilib` into typed `Emoji[]` and `Category[]`
2. `useEmojiSearch` hook accepts `searchTerm` and `selectedCategory`, returns filtered emoji
3. `useCopyToClipboard` hook manages clipboard write and toast visibility state
4. `App` orchestrates state and passes props down to child components

## Dependencies Added

| Package              | Version | Purpose                                | Size        |
| -------------------- | ------- | -------------------------------------- | ----------- |
| `unicode-emoji-json` | latest  | Emoji data (characters, names, groups) | ~300KB JSON |
| `emojilib`           | latest  | Emoji search keywords                  | ~270KB JSON |

Both are data-only packages with zero runtime dependencies.
