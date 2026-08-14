import { describe, it, expect } from 'vitest';
import { screen, userEvent, renderWithProviders, waitFor } from '@/test/test-utils';
import { InvoiceBatchList } from '../components/InvoiceBatchList';

describe('InvoiceBatchList component', () => {
  it('should render invoice batches list and toggle expanded invoices', async () => {
    renderWithProviders(<InvoiceBatchList />);

    await waitFor(() => {
      const batchHeaders = screen.getAllByText(/Lote Ciclo #/i);
      expect(batchHeaders.length).toBeGreaterThan(0);
    });

    const toggleBtns = screen.getAllByText('Ver faturas');
    await userEvent.click(toggleBtns[0]);

    await waitFor(() => {
      expect(screen.getByText('Ocultar faturas')).toBeInTheDocument();
      expect(screen.getByText(/Faturas Geradas neste Lote/i)).toBeInTheDocument();
    });
  });
});
