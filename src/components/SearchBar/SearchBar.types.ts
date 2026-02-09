/** Props for the SearchBar component */
export interface SearchBarProps {
  /** Current search input value */
  value: string;
  /** Callback when the search input changes */
  onChange: (value: string) => void;
}
