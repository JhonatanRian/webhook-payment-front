import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { StatsOverview } from '../components/StatsOverview';
import { mockInvoices, mockTransfers, mockSchedulerStatus } from '@/mocks/data';
import { TransferRecord } from '@/features/transfers/types';

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

  it('should only compute transfers with status success in Total Liquidado', () => {
    const mixedTransfers: TransferRecord[] = [
      {
        id: 'trf-1',
        stark_transfer_id: 'stark-1',
        stark_invoice_id: 'inv-1',
        event_id: 'evt-1',
        amount: 10000,
        fee: 0,
        net_amount: 10000, // R$ 100,00
        target_bank_code: '20018183',
        target_branch: '0001',
        target_account: '123',
        target_name: 'Stark Bank S.A.',
        target_tax_id: '20018183000180',
        target_account_type: 'payment',
        status: 'success',
        created: new Date().toISOString(),
      },
      {
        id: 'trf-2',
        stark_transfer_id: 'stark-2',
        stark_invoice_id: 'inv-2',
        event_id: 'evt-2',
        amount: 50000,
        fee: 0,
        net_amount: 50000, // R$ 500,00 (não deve ser somado)
        target_bank_code: '20018183',
        target_branch: '0001',
        target_account: '123',
        target_name: 'Stark Bank S.A.',
        target_tax_id: '20018183000180',
        target_account_type: 'payment',
        status: 'created',
        created: new Date().toISOString(),
      },
    ];

    render(
      <StatsOverview
        invoices={[]}
        transfers={mixedTransfers}
        scheduler={null}
      />
    );

    // Deve exibir apenas R$ 100,00 liquidado (e não R$ 600,00)
    expect(screen.getByText('R$ 100,00')).toBeInTheDocument();
    expect(screen.getByText('1 de 2 liquidadas')).toBeInTheDocument();
  });
});

