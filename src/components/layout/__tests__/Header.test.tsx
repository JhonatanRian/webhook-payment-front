import { describe, it, expect, vi } from 'vitest';
import { screen, userEvent, renderWithProviders, waitFor } from '@/test/test-utils';
import { Header } from '../Header';

describe('Header component', () => {
  it('should render header with health status, pulse timer and theme toggle', async () => {
    renderWithProviders(<Header onOpenSidebar={vi.fn()} />);

    expect(screen.getByRole('button', { name: /disparar ciclo/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /alternar tema/i })).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/api online/i)).toBeInTheDocument();
    });
  });

  it('should trigger onOpenSidebar when mobile menu button is clicked', async () => {
    const handleOpenSidebar = vi.fn();
    renderWithProviders(<Header onOpenSidebar={handleOpenSidebar} />);

    const menuBtn = screen.getByRole('button', { name: /abrir menu/i });
    await userEvent.click(menuBtn);

    expect(handleOpenSidebar).toHaveBeenCalled();
  });
});
