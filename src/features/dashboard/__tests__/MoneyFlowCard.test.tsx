import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { MoneyFlowCard } from '../components/MoneyFlowCard';
import { mockInvoices, mockTransfers } from '@/mocks/data';
import { TransferRecord } from '@/features/transfers/types';

describe('MoneyFlowCard component', () => {
  it('should render the 3 pipeline steps: Emissão, Webhook, Liquidação', () => {
    render(<MoneyFlowCard invoices={mockInvoices} transfers={mockTransfers} />);

    expect(screen.getByText('1. Emissão Pix')).toBeInTheDocument();
    expect(screen.getByText('2. Webhook Stark')).toBeInTheDocument();
    expect(screen.getByText('3. Liquidação Conta')).toBeInTheDocument();
  });

  it('should only sum successful transfers in Step 3', () => {
    const customTransfers: TransferRecord[] = [
      {
        id: 'trf-ok',
        stark_transfer_id: 'stark-ok',
        stark_invoice_id: 'inv-1',
        event_id: 'evt-1',
        amount: 25000,
        fee: 0,
        net_amount: 25000, // R$ 250,00
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
        id: 'trf-pending',
        stark_transfer_id: 'stark-pending',
        stark_invoice_id: 'inv-2',
        event_id: 'evt-2',
        amount: 75000,
        fee: 0,
        net_amount: 75000, // R$ 750,00 (não deve somar)
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

    render(<MoneyFlowCard invoices={[]} transfers={customTransfers} />);

    expect(screen.getByText('R$ 250,00')).toBeInTheDocument();
    expect(screen.getByText('1 repasse efetuado com sucesso')).toBeInTheDocument();
  });
});

