import { useCallback, useRef, useState } from 'react';

/** Result of the copy to clipboard hook */
export interface UseCopyToClipboardResult {
  /** The emoji that was just copied (null if none) */
  copiedEmoji: string | null;
  /** Error message if clipboard write failed (null if no error) */
  copyError: string | null;
  /** Whether the toast is currently visible */
  isToastVisible: boolean;
  /** Copy an emoji character to the clipboard */
  copyToClipboard: (emoji: string) => Promise<void>;
}

const TOAST_DURATION_MS = 1500;

/**
 * Manages clipboard copy operations with toast feedback state.
 * @returns Copy function and toast visibility state
 */
export function useCopyToClipboard(): UseCopyToClipboardResult {
  const [copiedEmoji, setCopiedEmoji] = useState<string | null>(null);
  const [copyError, setCopyError] = useState<string | null>(null);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copyToClipboard = useCallback(async (emoji: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setCopyError(null);

    try {
      await navigator.clipboard.writeText(emoji);
      setCopiedEmoji(emoji);
      setIsToastVisible(true);

      timeoutRef.current = setTimeout(() => {
        setIsToastVisible(false);
        setCopiedEmoji(null);
      }, TOAST_DURATION_MS);
    } catch {
      setCopyError('Failed to copy. Please check clipboard permissions.');
      setCopiedEmoji(null);
      setIsToastVisible(false);
    }
  }, []);

  return {
    copiedEmoji,
    copyError,
    isToastVisible,
    copyToClipboard,
  };
}
