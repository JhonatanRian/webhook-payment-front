import { describe, it, expect, vi } from 'vitest';
import { screen, userEvent, fireEvent, renderWithProviders, waitFor } from '@/test/test-utils';
import { TransferTable } from '../components/TransferTable';
import { mockTransfers } from '@/mocks/data';
import * as exportUtils from '@/utils/export';

describe('TransferTable component', () => {
  it('should render transfers table and allow row click for drawer', async () => {
    renderWithProviders(<TransferTable />);

    await waitFor(() => {
      const items = screen.getAllByText(mockTransfers[0].target_name);
      expect(items.length).toBeGreaterThan(0);
    });

    const rows = screen.getAllByText(mockTransfers[0].target_name);
    await userEvent.click(rows[0]);

    await waitFor(() => {
      expect(screen.getByText('Transferência de Liquidação')).toBeInTheDocument();
    });
  });

  it('should filter transfers by search term and status select', async () => {
    renderWithProviders(<TransferTable />);

    const searchInput = screen.getByPlaceholderText(/buscar por favorecido/i);
    fireEvent.change(searchInput, { target: { value: 'Stark' } });

    await waitFor(() => {
      const items = screen.getAllByText(mockTransfers[0].target_name);
      expect(items.length).toBeGreaterThan(0);
    });

    const statusSelect = screen.getAllByRole('combobox')[0];
    await userEvent.selectOptions(statusSelect, 'success');

    await waitFor(() => {
      const items = screen.getAllByText(mockTransfers[0].target_name);
      expect(items.length).toBeGreaterThan(0);
    });
  });

  it('should trigger export to CSV and JSON', async () => {
    const csvSpy = vi.spyOn(exportUtils, 'exportToCsv');
    const jsonSpy = vi.spyOn(exportUtils, 'exportToJson');

    renderWithProviders(<TransferTable />);

    await waitFor(() => {
      const items = screen.getAllByText(mockTransfers[0].target_name);
      expect(items.length).toBeGreaterThan(0);
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
