import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { StatsOverview } from '../components/StatsOverview';
import { mockInvoices, mockTransfers, mockSchedulerStatus } from '@/mocks/data';

describe('StatsOverview component', () => {
  it('should render 4 KPI cards with calculated metrics', () => {
    render(
      <StatsOverview
        invoices={mockInvoices}
        transfers={mockTransfers}
        scheduler={mockSchedulerStatus}
        totalInvoicesCount={mockInvoices.length}
      />
    );

    expect(screen.getByText('Total Emitido Pix')).toBeInTheDocument();
    expect(screen.getByText('Total Liquidado')).toBeInTheDocument();
    expect(screen.getByText('Faturas Creditadas')).toBeInTheDocument();
    expect(screen.getByText('Janela 24h')).toBeInTheDocument();
  });
});
