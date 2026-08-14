import { describe, it, expect, vi } from 'vitest';
import { screen, userEvent, renderWithProviders, waitFor } from '@/test/test-utils';
import { InvoiceTable } from '../components/InvoiceTable';
import { mockInvoices } from '@/mocks/data';
import * as exportUtils from '@/utils/export';

describe('InvoiceTable component', () => {
  it('should render table with search box, status filters and rows', async () => {
    renderWithProviders(<InvoiceTable />);

    expect(screen.getByPlaceholderText(/buscar por pagador/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(mockInvoices[0].name)).toBeInTheDocument();
    });
  });

  it('should filter invoices by search term and status select', async () => {
    renderWithProviders(<InvoiceTable />);

    const searchInput = screen.getByPlaceholderText(/buscar por pagador/i);
    await userEvent.type(searchInput, mockInvoices[0].name);

    await waitFor(() => {
      expect(screen.getByText(mockInvoices[0].name)).toBeInTheDocument();
    });

    const statusSelect = screen.getAllByRole('combobox')[0];
    await userEvent.selectOptions(statusSelect, 'credited');

    await waitFor(() => {
      expect(screen.getByText(mockInvoices[0].name)).toBeInTheDocument();
    });
  });

  it('should open detail drawer when row is clicked', async () => {
    renderWithProviders(<InvoiceTable />);

    await waitFor(() => {
      expect(screen.getByText(mockInvoices[0].name)).toBeInTheDocument();
    });

    const rowName = screen.getByText(mockInvoices[0].name);
    await userEvent.click(rowName);

    await waitFor(() => {
      expect(screen.getByText('Detalhes da Fatura')).toBeInTheDocument();
    });
  });

  it('should trigger export to CSV and JSON', async () => {
    const csvSpy = vi.spyOn(exportUtils, 'exportToCsv');
    const jsonSpy = vi.spyOn(exportUtils, 'exportToJson');

    renderWithProviders(<InvoiceTable />);

    await waitFor(() => {
      expect(screen.getByText(mockInvoices[0].name)).toBeInTheDocument();
    });

    const exportBtn = screen.getByRole('button', { name: /exportar/i });
    await userEvent.click(exportBtn);

    const csvOption = screen.getByText(/baixar csv/i);
    await userEvent.click(csvOption);
    expect(csvSpy).toHaveBeenCalled();

    await userEvent.click(exportBtn);
    const jsonOption = screen.getByText(/baixar json/i);
    await userEvent.click(jsonOption);
    expect(jsonSpy).toHaveBeenCalled();
  });
});
