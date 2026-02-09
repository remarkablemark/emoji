/** Props for the EmojiCard component */
export interface EmojiCardProps {
  /** The Unicode emoji character */
  emoji: string;
  /** Human-readable name of the emoji */
  name: string;
  /** Callback when the emoji is clicked */
  onCopy: (emoji: string) => void;
}
