import emojilib from 'emojilib';
import type { Category, Emoji } from 'src/types/emoji.types';
import dataByEmoji from 'unicode-emoji-json';

/** Builds the complete emoji dataset by merging unicode-emoji-json with emojilib keywords */
function buildEmojiData(): Emoji[] {
  return Object.entries(dataByEmoji).map(([char, data]) => ({
    emoji: char,
    name: data.name,
    slug: data.slug,
    group: data.group,
    keywords: emojilib[char] ?? [],
  }));
}

/** All emoji as a flat list */
export const allEmoji: Emoji[] = buildEmojiData();

/** Ordered list of category names */
export const categoryNames: string[] = [
  ...new Set(allEmoji.map((e) => e.group)),
];

/** Emoji grouped by category with section headers */
export const emojiByCategory: Category[] = categoryNames.map((name) => ({
  name,
  emoji: allEmoji.filter((e) => e.group === name),
}));
