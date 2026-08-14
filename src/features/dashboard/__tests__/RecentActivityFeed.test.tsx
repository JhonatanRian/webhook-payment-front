import { describe, it, expect } from 'vitest';
import { screen, renderWithProviders } from '@/test/test-utils';
import { RecentActivityFeed } from '../components/RecentActivityFeed';
import { mockInvoices, mockTransfers } from '@/mocks/data';

describe('RecentActivityFeed component', () => {
  it('should render recent invoices and transfers lists', () => {
    renderWithProviders(<RecentActivityFeed invoices={mockInvoices} transfers={mockTransfers} />);

    expect(screen.getByText('Últimas Faturas Pix')).toBeInTheDocument();
    expect(screen.getByText('Últimas Transferências de Repasse')).toBeInTheDocument();
    expect(screen.getByText(mockInvoices[0].name)).toBeInTheDocument();
    expect(screen.getAllByText(mockTransfers[0].target_name)[0]).toBeInTheDocument();
  });
});
