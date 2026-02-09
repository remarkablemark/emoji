import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '.';

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
    expect(screen.getByText('Smileys & Emotion')).toBeInTheDocument();
    expect(screen.getByText('😀')).toBeInTheDocument();
  });

  it('filters emoji when user types a search term', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByRole('searchbox'), 'grinning');
    expect(screen.getByText('😀')).toBeInTheDocument();
    expect(screen.queryByText('Smileys & Emotion')).not.toBeInTheDocument();
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
    expect(screen.queryByText('Smileys & Emotion')).not.toBeInTheDocument();

    await user.clear(searchbox);
    expect(screen.getByText('Smileys & Emotion')).toBeInTheDocument();
  });
});
