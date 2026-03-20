import { act, renderHook } from '@testing-library/react';

import { useCopyToClipboard } from './useCopyToClipboard';

const mockWriteText = vi.fn<(text: string) => Promise<void>>();

describe('useCopyToClipboard', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockWriteText.mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('initializes with no copied emoji and no toast', () => {
    const { result } = renderHook(() => useCopyToClipboard());
    expect(result.current.copiedEmoji).toBeNull();
    expect(result.current.copyError).toBeNull();
  });

  it('copies emoji to clipboard and shows toast', async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current.copyToClipboard('😀');
    });

    expect(mockWriteText).toHaveBeenCalledWith('😀');
    expect(result.current.copiedEmoji).toBe('😀');
    expect(result.current.copyError).toBeNull();
  });

  it('hides toast after 1500ms', async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current.copyToClipboard('😀');
    });

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(result.current.copiedEmoji).toBeNull();
  });

  it('sets error when clipboard write fails', async () => {
    mockWriteText.mockRejectedValueOnce(new Error('Permission denied'));

    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current.copyToClipboard('😀');
    });

    expect(result.current.copyError).toBe(
      'Failed to copy. Please check clipboard permissions.',
    );
    expect(result.current.copiedEmoji).toBeNull();
  });

  it('clears previous toast when copying a new emoji', async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current.copyToClipboard('😀');
    });

    expect(result.current.copiedEmoji).toBe('😀');

    await act(async () => {
      await result.current.copyToClipboard('❤️');
    });

    expect(result.current.copiedEmoji).toBe('❤️');
  });

  it('clears error on successful copy after failure', async () => {
    mockWriteText.mockRejectedValueOnce(new Error('Permission denied'));

    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current.copyToClipboard('😀');
    });

    expect(result.current.copyError).toBe(
      'Failed to copy. Please check clipboard permissions.',
    );

    mockWriteText.mockResolvedValueOnce(undefined);

    await act(async () => {
      await result.current.copyToClipboard('😀');
    });

    expect(result.current.copyError).toBeNull();
    expect(result.current.copiedEmoji).toBe('😀');
  });
});
