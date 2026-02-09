import type { CopyToastProps } from './CopyToast.types';

/** Toast notification showing "Copied!" that fades after appearing */
export function CopyToast({ emoji, isVisible }: CopyToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-gray-900 px-4 py-2 text-white shadow-lg transition-opacity duration-300 dark:bg-white dark:text-gray-900 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      Copied {emoji}!
    </div>
  );
}
