import { useState } from 'react';
import { CategoryBar } from 'src/components/CategoryBar';
import { CopyToast } from 'src/components/CopyToast';
import { EmojiGrid } from 'src/components/EmojiGrid';
import { NoResults } from 'src/components/NoResults';
import { SearchBar } from 'src/components/SearchBar';
import { categoryNames } from 'src/data/emoji';
import { useCopyToClipboard } from 'src/hooks/useCopyToClipboard';
import { useEmojiSearch } from 'src/hooks/useEmojiSearch';

export function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { filteredEmoji, filteredCategories, hasNoResults, isSearching } =
    useEmojiSearch(searchTerm, selectedCategory);
  const { copiedEmoji, copyError, copyToClipboard } = useCopyToClipboard();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <header className="bg-white px-4 py-4 dark:bg-gray-900">
        <h1 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
          Emoji Search
        </h1>
      </header>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <CategoryBar
        categories={categoryNames}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <main>
        {copyError && (
          <div
            role="alert"
            className="mx-4 mt-2 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400"
          >
            {copyError}
          </div>
        )}

        {hasNoResults ? (
          <NoResults searchTerm={searchTerm} />
        ) : (
          <EmojiGrid
            filteredEmoji={filteredEmoji}
            filteredCategories={filteredCategories}
            isSearching={isSearching}
            onEmojiClick={(emoji: string) => {
              void copyToClipboard(emoji);
            }}
          />
        )}
      </main>

      {copiedEmoji && <CopyToast emoji={copiedEmoji} />}
    </div>
  );
}
