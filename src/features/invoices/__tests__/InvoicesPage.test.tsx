import { describe, it, expect } from 'vitest';
import { screen, userEvent, renderWithProviders, waitFor } from '@/test/test-utils';
import { InvoicesPage } from '../InvoicesPage';

describe('InvoicesPage component', () => {
  it('should render InvoicesPage with tabs and open issue batch modal', async () => {
    renderWithProviders(<InvoicesPage />);

    expect(screen.getByText('Faturas Pix & Lotes')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /todas as faturas/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /lotes emitidos/i })).toBeInTheDocument();

    const emitBtn = screen.getByRole('button', { name: /emitir novo lote/i });
    await userEvent.click(emitBtn);

    await waitFor(() => {
      expect(screen.getByText('Emitir Lote de Faturas Pix')).toBeInTheDocument();
    });
  });

  it('should switch between tabs', async () => {
    renderWithProviders(<InvoicesPage />);

    const batchesTab = screen.getByRole('tab', { name: /lotes emitidos/i });
    await userEvent.click(batchesTab);

    expect(batchesTab).toHaveAttribute('data-state', 'active');
  });
});
