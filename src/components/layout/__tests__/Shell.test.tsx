import { describe, it, expect } from 'vitest';
import { screen, renderWithProviders } from '@/test/test-utils';
import { Shell } from '../Shell';

describe('Shell layout component', () => {
  it('should render Shell layout with sidebar, header and main outlet container', () => {
    renderWithProviders(<Shell />);

    expect(screen.getByText('Stark Webhook')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /disparar ciclo/i })).toBeInTheDocument();
  });
});
