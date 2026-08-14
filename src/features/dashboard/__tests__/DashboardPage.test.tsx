import { describe, it, expect } from 'vitest';
import { screen, waitFor, renderWithProviders } from '@/test/test-utils';
import { DashboardPage } from '../DashboardPage';

describe('DashboardPage component', () => {
  it('should render Dashboard title and fetch stats', async () => {
    renderWithProviders(<DashboardPage />);

    expect(screen.getByText('Visão Geral do Sistema')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Total Emitido Pix')).toBeInTheDocument();
      expect(screen.getByText('Total Liquidado')).toBeInTheDocument();
    });
  });
});
