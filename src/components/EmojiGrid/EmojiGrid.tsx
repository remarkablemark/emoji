import { EmojiCard } from 'src/components/EmojiCard';

import type { EmojiGridProps } from './EmojiGrid.types';

/** Responsive emoji grid with category section headers */
export function EmojiGrid({
  filteredEmoji,
  filteredCategories,
  isSearching,
  onEmojiClick,
}: EmojiGridProps) {
  if (isSearching) {
    return (
      <div
        className="grid grid-cols-5 gap-2 px-4 py-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10"
        role="grid"
        aria-label="Search results"
      >
        {filteredEmoji.map((emoji) => (
          <EmojiCard
            key={emoji.slug}
            emoji={emoji.emoji}
            name={emoji.name}
            onCopy={onEmojiClick}
          />
        ))}
      </div>
    );
  }

  return (
    <div role="grid" aria-label="Emoji by category">
      {filteredCategories.map((category) => (
        <section key={category.name} aria-label={category.name}>
          <h2 className="sticky top-[60px] z-[5] bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            {category.name}
          </h2>
          <div className="grid grid-cols-5 gap-2 px-4 py-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
            {category.emoji.map((emoji) => (
              <EmojiCard
                key={emoji.slug}
                emoji={emoji.emoji}
                name={emoji.name}
                onCopy={onEmojiClick}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
