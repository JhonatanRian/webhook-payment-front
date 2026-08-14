import { describe, it, expect, vi } from 'vitest';
import { screen, userEvent, renderWithProviders } from '@/test/test-utils';
import { IssueBatchModal } from '../components/IssueBatchModal';

describe('IssueBatchModal component', () => {
  it('should render modal and allow submitting batch issuance in default random mode', async () => {
    const handleClose = vi.fn();
    renderWithProviders(<IssueBatchModal isOpen={true} onClose={handleClose} />);

    expect(screen.getByText('Emitir Lote de Faturas Pix')).toBeInTheDocument();
    expect(screen.getByText('Aleatório Padrão (8 a 12)')).toBeInTheDocument();

    const submitBtn = screen.getByRole('button', { name: /emitir lote agora/i });
    await userEvent.click(submitBtn);

    expect(handleClose).toHaveBeenCalled();
  });

  it('should allow switching to custom quantity mode and sliding count', async () => {
    const handleClose = vi.fn();
    renderWithProviders(<IssueBatchModal isOpen={true} onClose={handleClose} />);

    const customModeBtn = screen.getByText('Quantidade Customizada');
    await userEvent.click(customModeBtn);

    expect(screen.getByText(/Quantidade de faturas/i)).toBeInTheDocument();
    const slider = screen.getByLabelText(/quantidade de faturas/i);
    expect(slider).toBeInTheDocument();

    const submitBtn = screen.getByRole('button', { name: /emitir lote agora/i });
    await userEvent.click(submitBtn);

    expect(handleClose).toHaveBeenCalled();
  });
});
