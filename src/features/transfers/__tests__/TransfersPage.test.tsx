import { describe, it, expect } from 'vitest';
import { screen, renderWithProviders, waitFor } from '@/test/test-utils';
import { TransfersPage } from '../TransfersPage';
import { mockTransfers } from '@/mocks/data';

describe('TransfersPage component', () => {
  it('should render TransfersPage and list records in table', async () => {
    renderWithProviders(<TransfersPage />);

    expect(screen.getByText('Transferências de Liquidação')).toBeInTheDocument();

    await waitFor(() => {
      const items = screen.getAllByText(mockTransfers[0].target_name);
      expect(items.length).toBeGreaterThan(0);
    });
  });
});
