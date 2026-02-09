# Data Model: Search and Copy Emoji

**Feature Branch**: `001-search-copy-emoji`
**Date**: 2026-02-08

## Entities

### Emoji

Represents a single emoji entry displayed in the grid.

| Field      | Type       | Description                                                   | Source               |
| ---------- | ---------- | ------------------------------------------------------------- | -------------------- |
| `emoji`    | `string`   | The Unicode emoji character (e.g., "😀")                      | `unicode-emoji-json` |
| `name`     | `string`   | Human-readable name (e.g., "grinning face")                   | `unicode-emoji-json` |
| `slug`     | `string`   | URL-safe identifier (e.g., "grinning_face")                   | `unicode-emoji-json` |
| `group`    | `string`   | Category group name (e.g., "Smileys & Emotion")               | `unicode-emoji-json` |
| `keywords` | `string[]` | Searchable keyword aliases (e.g., ["face", "smile", "happy"]) | `emojilib`           |

**Notes**:

- Skin tone variants are excluded; only the base (default/yellow) emoji is used
- The `keywords` array is merged from `emojilib` data at build/import time
- Search matches against both `name` and `keywords` using case-insensitive substring matching

### Category

Represents a named grouping of emoji for browsing.

| Field   | Type      | Description                                       | Source                      |
| ------- | --------- | ------------------------------------------------- | --------------------------- |
| `name`  | `string`  | Category display name (e.g., "Smileys & Emotion") | `unicode-emoji-json` groups |
| `emoji` | `Emoji[]` | Ordered list of emoji belonging to this category  | Derived from group field    |

**Known categories** (from Unicode standard via `unicode-emoji-json`):

1. Smileys & Emotion
2. People & Body
3. Animals & Nature
4. Food & Drink
5. Travel & Places
6. Activities
7. Objects
8. Symbols
9. Flags

## TypeScript Interfaces

```typescript
/** A single emoji entry with character, metadata, and search keywords */
interface Emoji {
  /** The Unicode emoji character (e.g., "😀") */
  emoji: string;
  /** Human-readable name (e.g., "grinning face") */
  name: string;
  /** URL-safe slug identifier (e.g., "grinning_face") */
  slug: string;
  /** Category group name (e.g., "Smileys & Emotion") */
  group: string;
  /** Searchable keyword aliases from emojilib */
  keywords: string[];
}

/** A category grouping of emoji for browsing */
interface Category {
  /** Category display name */
  name: string;
  /** Ordered list of emoji in this category */
  emoji: Emoji[];
}
```

## Data Flow

```text
unicode-emoji-json (data-by-emoji.json)
        │
        ├── emoji character, name, slug, group
        │
        ▼
  emoji.ts adapter ──► merged Emoji[] ──► useEmojiSearch hook ──► filtered results ──► EmojiGrid
        ▲
        │
        ├── keywords per emoji
        │
emojilib (emoji-en-US.json)
```

### Adapter Logic (`src/data/emoji.ts`)

1. Import `data-by-emoji.json` from `unicode-emoji-json`
2. Import keyword data from `emojilib`
3. For each emoji entry:
   - Extract `emoji`, `name`, `slug`, `group` from `unicode-emoji-json`
   - Look up keywords from `emojilib` by emoji character
   - Merge into a single `Emoji` object
4. Export:
   - `allEmoji: Emoji[]` — flat list of all emoji
   - `emojiByCategory: Category[]` — emoji grouped by category with section headers
   - `categoryNames: string[]` — ordered list of category names for the CategoryBar

## Validation Rules

- Each emoji MUST have a non-empty `emoji` character
- Each emoji MUST have a non-empty `name`
- Each emoji MUST belong to exactly one `group`
- Keywords array MAY be empty (fallback to name-only search)
- Category list MUST preserve Unicode standard ordering

## State Management

No persistent state. All state is ephemeral within the React component tree:

| State              | Location | Type                               | Description                                              |
| ------------------ | -------- | ---------------------------------- | -------------------------------------------------------- |
| `searchTerm`       | `App`    | `string`                           | Current search input value                               |
| `selectedCategory` | `App`    | `string \| null`                   | Currently selected category filter (null = all)          |
| `copiedEmoji`      | `App`    | `string \| null`                   | Emoji character that was just copied (for toast display) |
| `copyPosition`     | `App`    | `{ x: number; y: number } \| null` | Position of the clicked emoji (for toast placement)      |
