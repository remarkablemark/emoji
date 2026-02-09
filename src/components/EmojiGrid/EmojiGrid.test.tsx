import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { EmojiGrid } from './EmojiGrid';

const mockEmoji = [
  {
    emoji: '😀',
    name: 'grinning face',
    slug: 'grinning_face',
    group: 'Smileys & Emotion',
    keywords: [],
  },
  {
    emoji: '🐶',
    name: 'dog face',
    slug: 'dog_face',
    group: 'Animals & Nature',
    keywords: [],
  },
];

const mockCategories = [
  {
    name: 'Smileys & Emotion',
    emoji: [
      {
        emoji: '😀',
        name: 'grinning face',
        slug: 'grinning_face',
        group: 'Smileys & Emotion',
        keywords: [],
      },
    ],
  },
  {
    name: 'Animals & Nature',
    emoji: [
      {
        emoji: '🐶',
        name: 'dog face',
        slug: 'dog_face',
        group: 'Animals & Nature',
        keywords: [],
      },
    ],
  },
];

describe('EmojiGrid', () => {
  describe('search mode (isSearching=true)', () => {
    it('renders a flat grid of emoji', () => {
      render(
        <EmojiGrid
          filteredEmoji={mockEmoji}
          filteredCategories={[]}
          isSearching={true}
          onEmojiClick={vi.fn()}
        />,
      );
      expect(screen.getByText('😀')).toBeInTheDocument();
      expect(screen.getByText('🐶')).toBeInTheDocument();
    });

    it('has search results aria label', () => {
      render(
        <EmojiGrid
          filteredEmoji={mockEmoji}
          filteredCategories={[]}
          isSearching={true}
          onEmojiClick={vi.fn()}
        />,
      );
      expect(
        screen.getByRole('grid', { name: 'Search results' }),
      ).toBeInTheDocument();
    });

    it('does not render category headers', () => {
      render(
        <EmojiGrid
          filteredEmoji={mockEmoji}
          filteredCategories={[]}
          isSearching={true}
          onEmojiClick={vi.fn()}
        />,
      );
      expect(screen.queryByText('Smileys & Emotion')).not.toBeInTheDocument();
    });

    it('calls onEmojiClick when an emoji is clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <EmojiGrid
          filteredEmoji={mockEmoji}
          filteredCategories={[]}
          isSearching={true}
          onEmojiClick={handleClick}
        />,
      );

      await user.click(
        screen.getByRole('button', { name: 'grinning face, click to copy' }),
      );
      expect(handleClick).toHaveBeenCalledWith('😀');
    });
  });

  describe('browse mode (isSearching=false)', () => {
    it('renders emoji grouped by category with headers', () => {
      render(
        <EmojiGrid
          filteredEmoji={[]}
          filteredCategories={mockCategories}
          isSearching={false}
          onEmojiClick={vi.fn()}
        />,
      );
      expect(screen.getByText('Smileys & Emotion')).toBeInTheDocument();
      expect(screen.getByText('Animals & Nature')).toBeInTheDocument();
      expect(screen.getByText('😀')).toBeInTheDocument();
      expect(screen.getByText('🐶')).toBeInTheDocument();
    });

    it('has category aria labels on sections', () => {
      render(
        <EmojiGrid
          filteredEmoji={[]}
          filteredCategories={mockCategories}
          isSearching={false}
          onEmojiClick={vi.fn()}
        />,
      );
      expect(
        screen.getByRole('region', { name: 'Smileys & Emotion' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('region', { name: 'Animals & Nature' }),
      ).toBeInTheDocument();
    });
  });
});
