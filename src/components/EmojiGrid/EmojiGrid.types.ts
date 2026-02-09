import type { Category, Emoji } from 'src/types/emoji.types';

/** Props for the EmojiGrid component */
export interface EmojiGridProps {
  /** Flat list of filtered emoji (used when searching) */
  filteredEmoji: Emoji[];
  /** Emoji grouped by category (used when browsing) */
  filteredCategories: Category[];
  /** Whether a search is active */
  isSearching: boolean;
  /** Callback when an emoji is clicked */
  onEmojiClick: (emoji: string) => void;
}
