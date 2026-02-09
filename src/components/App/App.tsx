import { useCallback, useState } from 'react';
import { EmojiGrid } from 'src/components/EmojiGrid';
import { NoResults } from 'src/components/NoResults';
import { SearchBar } from 'src/components/SearchBar';
import { useCopyToClipboard } from 'src/hooks/useCopyToClipboard';
import { useEmojiSearch } from 'src/hooks/useEmojiSearch';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const { filteredEmoji, filteredCategories, hasNoResults, isSearching } =
    useEmojiSearch(searchTerm, null);
  const { copyToClipboard } = useCopyToClipboard();

  const handleEmojiClick = useCallback(
    (emoji: string) => {
      void copyToClipboard(emoji);
    },
    [copyToClipboard],
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <header className="border-b border-gray-200 bg-white px-4 py-4 dark:border-gray-700 dark:bg-gray-900">
        <h1 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
          Emoji Finder
        </h1>
      </header>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <main>
        {hasNoResults ? (
          <NoResults searchTerm={searchTerm} />
        ) : (
          <EmojiGrid
            filteredEmoji={filteredEmoji}
            filteredCategories={filteredCategories}
            isSearching={isSearching}
            onEmojiClick={handleEmojiClick}
          />
        )}
      </main>
    </div>
  );
}
