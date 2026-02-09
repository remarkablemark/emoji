import type { EmojiCardProps } from './EmojiCard.types';

/** Individual emoji tile displaying the character, name, and a Copy button */
export function EmojiCard({ emoji, name, onCopy }: EmojiCardProps) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
      <button
        type="button"
        onClick={() => {
          onCopy(emoji);
        }}
        className="cursor-pointer text-5xl leading-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
        aria-label={`${name}, click to copy`}
        title={name}
      >
        <span role="img" aria-hidden="true">
          {emoji}
        </span>
      </button>
      <span className="line-clamp-1 max-w-full text-xs text-gray-600 dark:text-gray-400">
        {name}
      </span>
      <button
        type="button"
        onClick={() => {
          onCopy(emoji);
        }}
        className="cursor-pointer rounded px-2 py-0.5 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-blue-400 dark:hover:bg-blue-900/30"
        aria-label={`Copy ${name}`}
      >
        Copy
      </button>
    </div>
  );
}
