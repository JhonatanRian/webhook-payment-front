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
      expect(screen.getByText('Fluxo de Liquidação e Orquestração Webhook')).toBeInTheDocument();
      expect(screen.getByText('Últimas Faturas Pix')).toBeInTheDocument();
      expect(screen.getByText('Últimas Transferências de Repasse')).toBeInTheDocument();
    });
  });
});

