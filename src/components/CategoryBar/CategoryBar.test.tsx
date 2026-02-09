import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CategoryBar } from './CategoryBar';

const mockCategories = [
  'Smileys & Emotion',
  'Animals & Nature',
  'Food & Drink',
];

describe('CategoryBar', () => {
  it('renders an "All" button and category buttons', () => {
    render(
      <CategoryBar
        categories={mockCategories}
        selectedCategory={null}
        onSelectCategory={vi.fn()}
      />,
    );
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Smileys & Emotion' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Animals & Nature' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Food & Drink' }),
    ).toBeInTheDocument();
  });

  it('marks "All" as pressed when no category is selected', () => {
    render(
      <CategoryBar
        categories={mockCategories}
        selectedCategory={null}
        onSelectCategory={vi.fn()}
      />,
    );
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(
      screen.getByRole('button', { name: 'Smileys & Emotion' }),
    ).toHaveAttribute('aria-pressed', 'false');
  });

  it('marks the selected category as pressed', () => {
    render(
      <CategoryBar
        categories={mockCategories}
        selectedCategory="Animals & Nature"
        onSelectCategory={vi.fn()}
      />,
    );
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
    expect(
      screen.getByRole('button', { name: 'Animals & Nature' }),
    ).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onSelectCategory with null when "All" is clicked', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    render(
      <CategoryBar
        categories={mockCategories}
        selectedCategory="Smileys & Emotion"
        onSelectCategory={handleSelect}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'All' }));
    expect(handleSelect).toHaveBeenCalledWith(null);
  });

  it('calls onSelectCategory with category name when a category is clicked', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    render(
      <CategoryBar
        categories={mockCategories}
        selectedCategory={null}
        onSelectCategory={handleSelect}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Food & Drink' }));
    expect(handleSelect).toHaveBeenCalledWith('Food & Drink');
  });

  it('has navigation landmark for accessibility', () => {
    render(
      <CategoryBar
        categories={mockCategories}
        selectedCategory={null}
        onSelectCategory={vi.fn()}
      />,
    );
    expect(
      screen.getByRole('navigation', { name: 'Emoji categories' }),
    ).toBeInTheDocument();
  });
});
