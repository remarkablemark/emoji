/** Props for the CategoryBar component */
export interface CategoryBarProps {
  /** List of category names to display */
  categories: string[];
  /** Currently selected category (null for "All") */
  selectedCategory: string | null;
  /** Callback when a category is selected */
  onSelectCategory: (category: string | null) => void;
}
