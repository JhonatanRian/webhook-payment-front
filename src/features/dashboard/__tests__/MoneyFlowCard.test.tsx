import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { MoneyFlowCard } from '../components/MoneyFlowCard';
import { mockInvoices, mockTransfers } from '@/mocks/data';

describe('MoneyFlowCard component', () => {
  it('should render the 3 pipeline steps: Emissão, Webhook, Liquidação', () => {
    render(<MoneyFlowCard invoices={mockInvoices} transfers={mockTransfers} />);

    expect(screen.getByText('1. Emissão Pix')).toBeInTheDocument();
    expect(screen.getByText('2. Webhook Stark')).toBeInTheDocument();
    expect(screen.getByText('3. Liquidação Conta')).toBeInTheDocument();
  });
});
