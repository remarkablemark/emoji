/** Empty state message when no emoji match the search term */
export function NoResults({ searchTerm }: { searchTerm: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-4xl">🔍</p>
      <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">
        No emoji found
      </p>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        No results for &quot;{searchTerm}&quot;. Try a different keyword.
      </p>
    </div>
  );
}
