import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('renders a search input', () => {
    render(<SearchBar value="" onChange={vi.fn()} />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('displays the current value', () => {
    render(<SearchBar value="smile" onChange={vi.fn()} />);
    expect(screen.getByRole('searchbox')).toHaveValue('smile');
  });

  it('has a label for accessibility', () => {
    render(<SearchBar value="" onChange={vi.fn()} />);
    expect(screen.getByLabelText('Search emoji')).toBeInTheDocument();
  });

  it('calls onChange when user types', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<SearchBar value="" onChange={handleChange} />);

    await user.type(screen.getByRole('searchbox'), 'a');
    expect(handleChange).toHaveBeenCalledWith('a');
  });

  it('has placeholder text', () => {
    render(<SearchBar value="" onChange={vi.fn()} />);
    expect(screen.getByPlaceholderText('Search emoji...')).toBeInTheDocument();
  });
});
