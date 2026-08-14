import { describe, it, expect, vi } from 'vitest';
import { render, screen, userEvent } from '@/test/test-utils';
import { TransferDetailDrawer } from '../components/TransferDetailDrawer';
import { mockTransfers } from '@/mocks/data';
import * as exportUtils from '@/utils/export';

describe('TransferDetailDrawer component', () => {
  it('should render transfer recipient, bank info and trigger export JSON', async () => {
    const jsonSpy = vi.spyOn(exportUtils, 'exportToJson');
    render(<TransferDetailDrawer transfer={mockTransfers[0]} onClose={vi.fn()} />);

    expect(screen.getByText('Transferência de Liquidação')).toBeInTheDocument();
    expect(screen.getByText('Valor Líquido Liquidado (PIX)')).toBeInTheDocument();
    expect(screen.getByText(mockTransfers[0].target_name)).toBeInTheDocument();

    const exportBtn = screen.getByRole('button', { name: /exportar json/i });
    await userEvent.click(exportBtn);

    expect(jsonSpy).toHaveBeenCalled();
  });

  it('should return null when transfer is null', () => {
    const { container } = render(<TransferDetailDrawer transfer={null} onClose={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });
});
