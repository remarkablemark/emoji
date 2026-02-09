import type { CategoryBarProps } from './CategoryBar.types';

/** Horizontally scrollable category navigation bar */
export function CategoryBar({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryBarProps) {
  return (
    <nav
      aria-label="Emoji categories"
      className="overflow-x-auto border-b border-gray-200 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-900"
    >
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            onSelectCategory(null);
          }}
          className={`shrink-0 cursor-pointer rounded-full px-3 py-1 text-sm font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none ${
            selectedCategory === null
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
          aria-pressed={selectedCategory === null}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => {
              onSelectCategory(category);
            }}
            className={`shrink-0 cursor-pointer rounded-full px-3 py-1 text-sm font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
            aria-pressed={selectedCategory === category}
          >
            {category}
          </button>
        ))}
      </div>
    </nav>
  );
}
