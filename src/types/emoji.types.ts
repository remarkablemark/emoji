/** A single emoji entry with character, metadata, and search keywords */
export interface Emoji {
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
export interface Category {
  /** Category display name */
  name: string;
  /** Ordered list of emoji in this category */
  emoji: Emoji[];
}
