import type { SearchBarProps } from './SearchBar.types';

/** Search input field for filtering emoji by keyword */
export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="sticky top-0 z-10 bg-white px-4 py-3 dark:bg-gray-900">
      <label htmlFor="emoji-search" className="sr-only">
        Search emoji
      </label>
      <input
        id="emoji-search"
        type="search"
        placeholder="Search emoji..."
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.value);
        }}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
        autoComplete="off"
      />
    </div>
  );
}
