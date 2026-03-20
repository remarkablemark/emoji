import { render, screen } from '@testing-library/react';

import { CopyToast } from './CopyToast';

describe('CopyToast', () => {
  it('displays the copied emoji', () => {
    render(<CopyToast emoji="😀" />);
    expect(screen.getByText('Copied 😀')).toBeInTheDocument();
  });

  it('has role status for accessibility', () => {
    render(<CopyToast emoji="😀" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('announces the copied emoji in the status message', () => {
    render(<CopyToast emoji="😀" />);
    expect(screen.getByRole('status')).toHaveTextContent('Copied 😀');
  });
});
