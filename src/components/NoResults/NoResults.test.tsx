import { render, screen } from '@testing-library/react';

import { NoResults } from './NoResults';

describe('NoResults', () => {
  it('displays the search term in the message', () => {
    render(<NoResults searchTerm="xyznonexistent" />);
    expect(screen.getByText(/xyznonexistent/)).toBeInTheDocument();
  });

  it('shows a no results heading', () => {
    render(<NoResults searchTerm="test" />);
    expect(screen.getByText('No emoji found')).toBeInTheDocument();
  });

  it('suggests trying a different keyword', () => {
    render(<NoResults searchTerm="test" />);
    expect(screen.getByText(/Try a different keyword/)).toBeInTheDocument();
  });
});
