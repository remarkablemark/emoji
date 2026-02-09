import { render, screen } from '@testing-library/react';

import { CopyToast } from './CopyToast';

describe('CopyToast', () => {
  it('displays the copied emoji', () => {
    render(<CopyToast emoji="😀" isVisible={true} />);
    expect(screen.getByText('Copied 😀!')).toBeInTheDocument();
  });

  it('has role status for accessibility', () => {
    render(<CopyToast emoji="😀" isVisible={true} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('is visible when isVisible is true', () => {
    render(<CopyToast emoji="😀" isVisible={true} />);
    expect(screen.getByRole('status')).toHaveClass('opacity-100');
  });

  it('is hidden when isVisible is false', () => {
    render(<CopyToast emoji="😀" isVisible={false} />);
    expect(screen.getByRole('status')).toHaveClass('opacity-0');
  });
});
