import type { EmojiCardProps } from './EmojiCard.types';

/** Individual emoji tile displaying the character and name */
export function EmojiCard({ emoji, name, onCopy }: EmojiCardProps) {
  return (
    <button
      type="button"
      onClick={() => {
        onCopy(emoji);
      }}
      className="flex cursor-pointer flex-col items-center gap-1 rounded-lg p-2 transition-colors hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:hover:bg-gray-800"
      aria-label={`${name}, click to copy`}
      title={name}
    >
      <span className="text-5xl leading-none" role="img" aria-hidden="true">
        {emoji}
      </span>
      <span className="line-clamp-1 max-w-full text-xs text-gray-600 dark:text-gray-400">
        {name}
      </span>
    </button>
  );
}
