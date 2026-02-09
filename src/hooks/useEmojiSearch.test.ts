import { renderHook } from '@testing-library/react';
import { allEmoji, emojiByCategory } from 'src/data/emoji';

import { useEmojiSearch } from './useEmojiSearch';

describe('useEmojiSearch', () => {
  describe('default state (no search, no category)', () => {
    it('returns all emoji when no search term or category is set', () => {
      const { result } = renderHook(() => useEmojiSearch('', null));
      expect(result.current.filteredEmoji).toHaveLength(allEmoji.length);
      expect(result.current.isSearching).toBe(false);
      expect(result.current.hasNoResults).toBe(false);
    });

    it('returns all categories when not searching', () => {
      const { result } = renderHook(() => useEmojiSearch('', null));
      expect(result.current.filteredCategories).toHaveLength(
        emojiByCategory.length,
      );
    });
  });

  describe('search by keyword', () => {
    it('filters emoji by name substring match', () => {
      const { result } = renderHook(() => useEmojiSearch('grinning', null));
      expect(result.current.filteredEmoji.length).toBeGreaterThan(0);
      expect(result.current.isSearching).toBe(true);
      for (const emoji of result.current.filteredEmoji) {
        const nameMatch = emoji.name.toLowerCase().includes('grinning');
        const keywordMatch = emoji.keywords.some((k) =>
          k.toLowerCase().includes('grinning'),
        );
        expect(nameMatch || keywordMatch).toBe(true);
      }
    });

    it('is case-insensitive', () => {
      const { result: lower } = renderHook(() => useEmojiSearch('smile', null));
      const { result: upper } = renderHook(() => useEmojiSearch('SMILE', null));
      expect(lower.current.filteredEmoji).toEqual(upper.current.filteredEmoji);
    });

    it('trims whitespace from search term', () => {
      const { result: trimmed } = renderHook(() =>
        useEmojiSearch('  heart  ', null),
      );
      const { result: clean } = renderHook(() => useEmojiSearch('heart', null));
      expect(trimmed.current.filteredEmoji).toEqual(
        clean.current.filteredEmoji,
      );
    });

    it('returns empty categories when searching', () => {
      const { result } = renderHook(() => useEmojiSearch('smile', null));
      expect(result.current.filteredCategories).toHaveLength(0);
    });

    it('returns hasNoResults true for nonsense search', () => {
      const { result } = renderHook(() =>
        useEmojiSearch('xyznonexistent', null),
      );
      expect(result.current.filteredEmoji).toHaveLength(0);
      expect(result.current.hasNoResults).toBe(true);
    });

    it('matches against keywords from emojilib', () => {
      const { result } = renderHook(() => useEmojiSearch('happy', null));
      expect(result.current.filteredEmoji.length).toBeGreaterThan(0);
      expect(result.current.isSearching).toBe(true);
    });
  });

  describe('filter by category', () => {
    it('filters emoji to selected category', () => {
      const { result } = renderHook(() =>
        useEmojiSearch('', 'Animals & Nature'),
      );
      expect(result.current.filteredEmoji.length).toBeGreaterThan(0);
      for (const emoji of result.current.filteredEmoji) {
        expect(emoji.group).toBe('Animals & Nature');
      }
    });

    it('returns only the selected category in filteredCategories', () => {
      const { result } = renderHook(() => useEmojiSearch('', 'Food & Drink'));
      expect(result.current.filteredCategories).toHaveLength(1);
      expect(result.current.filteredCategories[0].name).toBe('Food & Drink');
    });
  });

  describe('combined search + category', () => {
    it('filters by both search term and category', () => {
      const { result } = renderHook(() =>
        useEmojiSearch('cat', 'Animals & Nature'),
      );
      expect(result.current.filteredEmoji.length).toBeGreaterThan(0);
      for (const emoji of result.current.filteredEmoji) {
        expect(emoji.group).toBe('Animals & Nature');
        const nameMatch = emoji.name.toLowerCase().includes('cat');
        const keywordMatch = emoji.keywords.some((k) =>
          k.toLowerCase().includes('cat'),
        );
        expect(nameMatch || keywordMatch).toBe(true);
      }
    });
  });
});
