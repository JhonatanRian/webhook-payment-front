import { describe, it, expect, vi } from 'vitest';
import { render, screen, userEvent } from '@/test/test-utils';
import { InvoiceDetailDrawer } from '../components/InvoiceDetailDrawer';
import { mockInvoices } from '@/mocks/data';
import * as exportUtils from '@/utils/export';

describe('InvoiceDetailDrawer component', () => {
  it('should render invoice details and trigger export JSON', async () => {
    const jsonSpy = vi.spyOn(exportUtils, 'exportToJson');
    render(<InvoiceDetailDrawer invoice={mockInvoices[0]} onClose={vi.fn()} />);

    expect(screen.getByText('Detalhes da Fatura')).toBeInTheDocument();
    expect(screen.getByText('Valor da Cobrança Pix')).toBeInTheDocument();
    expect(screen.getByText(mockInvoices[0].name)).toBeInTheDocument();

    const exportBtn = screen.getByRole('button', { name: /exportar json/i });
    await userEvent.click(exportBtn);

    expect(jsonSpy).toHaveBeenCalled();
  });

  it('should return null when invoice is null', () => {
    const { container } = render(<InvoiceDetailDrawer invoice={null} onClose={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });
});
