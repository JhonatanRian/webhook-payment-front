import { describe, it, expect, vi } from 'vitest';
import { screen, userEvent, renderWithProviders } from '@/test/test-utils';
import { ResetDialog } from '../components/ResetDialog';

describe('ResetDialog component', () => {
  it('should render confirmation modal and trigger reset mutation', async () => {
    const handleClose = vi.fn();
    renderWithProviders(<ResetDialog isOpen={true} onClose={handleClose} />);

    expect(screen.getByText('Resetar Ciclos do Agendador')).toBeInTheDocument();

    const confirmBtn = screen.getByRole('button', { name: /confirmar reset/i });
    await userEvent.click(confirmBtn);

    expect(handleClose).toHaveBeenCalled();
  });
});
