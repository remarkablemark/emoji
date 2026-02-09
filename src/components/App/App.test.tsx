import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '.';

vi.mock('src/data/emoji', () => {
  const allEmoji = [
    {
      emoji: '😀',
      name: 'grinning face',
      slug: 'grinning_face',
      group: 'Smileys & Emotion',
      keywords: ['happy', 'grin'],
    },
    {
      emoji: '❤️',
      name: 'red heart',
      slug: 'red_heart',
      group: 'Smileys & Emotion',
      keywords: ['love'],
    },
    {
      emoji: '🐶',
      name: 'dog face',
      slug: 'dog_face',
      group: 'Animals & Nature',
      keywords: ['dog', 'pet'],
    },
    {
      emoji: '🍕',
      name: 'pizza',
      slug: 'pizza',
      group: 'Food & Drink',
      keywords: ['food'],
    },
  ];
  const categoryNames = [
    'Smileys & Emotion',
    'Animals & Nature',
    'Food & Drink',
  ];
  const emojiByCategory = categoryNames.map((name) => ({
    name,
    emoji: allEmoji.filter((e) => e.group === name),
  }));
  return { allEmoji, categoryNames, emojiByCategory };
});

describe('App component', () => {
  it('renders the heading and search bar', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Emoji Finder' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('displays emoji grouped by category by default', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { level: 2, name: 'Smileys & Emotion' }),
    ).toBeInTheDocument();
    expect(screen.getByText('😀')).toBeInTheDocument();
  });

  it('filters emoji when user types a search term', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByRole('searchbox'), 'grinning');
    expect(screen.getByText('😀')).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { level: 2, name: 'Smileys & Emotion' }),
    ).not.toBeInTheDocument();
  });

  it('shows no results message for nonsense search', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByRole('searchbox'), 'xyznonexistent');
    expect(screen.getByText('No emoji found')).toBeInTheDocument();
  });

  it('restores all emoji when search is cleared', async () => {
    const user = userEvent.setup();
    render(<App />);

    const searchbox = screen.getByRole('searchbox');
    await user.type(searchbox, 'grinning');
    expect(
      screen.queryByRole('heading', { level: 2, name: 'Smileys & Emotion' }),
    ).not.toBeInTheDocument();

    await user.clear(searchbox);
    expect(
      screen.getByRole('heading', { level: 2, name: 'Smileys & Emotion' }),
    ).toBeInTheDocument();
  });

  it('renders the category bar', () => {
    render(<App />);
    expect(
      screen.getByRole('navigation', { name: 'Emoji categories' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
  });

  it('filters emoji by category when a category is selected', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Animals & Nature' }));
    expect(
      screen.getByRole('heading', { level: 2, name: 'Animals & Nature' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { level: 2, name: 'Smileys & Emotion' }),
    ).not.toBeInTheDocument();
  });

  it('shows all categories when "All" is clicked after filtering', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Animals & Nature' }));
    expect(
      screen.queryByRole('heading', { level: 2, name: 'Smileys & Emotion' }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'All' }));
    expect(
      screen.getByRole('heading', { level: 2, name: 'Smileys & Emotion' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Animals & Nature' }),
    ).toBeInTheDocument();
  });

  it('combines category filter with search keyword', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Animals & Nature' }));
    await user.type(screen.getByRole('searchbox'), 'dog');

    expect(screen.getByText('🐶')).toBeInTheDocument();
    expect(screen.queryByText('😀')).not.toBeInTheDocument();
  });
});
