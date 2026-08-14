import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '../Badge';

describe('Badge UI component', () => {
  it('should render children text', () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('should render semantic status variant styles', () => {
    const { container } = render(<Badge variant="credited">Creditada</Badge>);
    expect(container.firstChild).toHaveClass('bg-zoho-success-bg');
  });

  it('should render dot when dot prop is true', () => {
    const { container } = render(<Badge dot variant="created">Pendente</Badge>);
    expect(container.querySelector('span.rounded-full')).toBeInTheDocument();
  });
});
