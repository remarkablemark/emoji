import { useMemo } from 'react';
import { allEmoji, emojiByCategory } from 'src/data/emoji';
import type { Category, Emoji } from 'src/types/emoji.types';

/** Result of the emoji search hook */
export interface UseEmojiSearchResult {
  /** Filtered emoji as a flat list (when searching) */
  filteredEmoji: Emoji[];
  /** Filtered emoji grouped by category (when browsing) */
  filteredCategories: Category[];
  /** Whether the search returned no results */
  hasNoResults: boolean;
  /** Whether a search term is active */
  isSearching: boolean;
}

/**
 * Filters emoji by search term and/or category using case-insensitive substring matching.
 * @param searchTerm - The current search input value
 * @param selectedCategory - The currently selected category (null for all)
 * @returns Filtered emoji data and search state
 */
export function useEmojiSearch(
  searchTerm: string,
  selectedCategory: string | null,
): UseEmojiSearchResult {
  const normalizedSearch = searchTerm.toLowerCase().trim();
  const isSearching = normalizedSearch.length > 0;

  const filteredEmoji = useMemo(() => {
    let results = allEmoji;

    if (selectedCategory) {
      results = results.filter((e) => e.group === selectedCategory);
    }

    if (isSearching) {
      results = results.filter(
        (e) =>
          e.name.toLowerCase().includes(normalizedSearch) ||
          e.keywords.some((k) => k.toLowerCase().includes(normalizedSearch)),
      );
    }

    return results;
  }, [normalizedSearch, selectedCategory, isSearching]);

  const filteredCategories = useMemo(() => {
    if (isSearching) {
      return [];
    }

    if (selectedCategory) {
      return emojiByCategory.filter((c) => c.name === selectedCategory);
    }

    return emojiByCategory;
  }, [isSearching, selectedCategory]);

  return {
    filteredEmoji,
    filteredCategories,
    hasNoResults: filteredEmoji.length === 0,
    isSearching,
  };
}
