import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { EmojiCard } from './EmojiCard';

describe('EmojiCard', () => {
  const defaultProps = {
    emoji: '😀',
    name: 'grinning face',
    onCopy: vi.fn(),
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the emoji character', () => {
    render(<EmojiCard {...defaultProps} />);
    expect(screen.getByText('😀')).toBeInTheDocument();
  });

  it('renders the emoji name', () => {
    render(<EmojiCard {...defaultProps} />);
    expect(screen.getByText('grinning face')).toBeInTheDocument();
  });

  it('has an accessible label', () => {
    render(<EmojiCard {...defaultProps} />);
    expect(
      screen.getByRole('button', { name: 'grinning face, click to copy' }),
    ).toBeInTheDocument();
  });

  it('calls onCopy with the emoji when clicked', async () => {
    const user = userEvent.setup();
    render(<EmojiCard {...defaultProps} />);

    await user.click(screen.getByRole('button'));
    expect(defaultProps.onCopy).toHaveBeenCalledWith('😀');
  });

  it('is focusable via keyboard', () => {
    render(<EmojiCard {...defaultProps} />);
    const button = screen.getByRole('button');
    button.focus();
    expect(button).toHaveFocus();
  });
});
