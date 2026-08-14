import { describe, it, expect, vi } from 'vitest';
import { render, screen, userEvent } from '@/test/test-utils';
import { Modal } from '../Modal';

describe('Modal UI component', () => {
  it('should render modal when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Título do Modal" description="Descrição teste">
        <p>Corpo do Modal</p>
      </Modal>
    );

    expect(screen.getByText('Título do Modal')).toBeInTheDocument();
    expect(screen.getByText('Descrição teste')).toBeInTheDocument();
    expect(screen.getByText('Corpo do Modal')).toBeInTheDocument();
  });

  it('should not render modal when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()} title="Título do Modal">
        <p>Corpo</p>
      </Modal>
    );

    expect(screen.queryByText('Título do Modal')).not.toBeInTheDocument();
  });

  it('should trigger onClose when close button is clicked', async () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Título do Modal">
        <p>Corpo</p>
      </Modal>
    );

    const closeBtn = screen.getByRole('button', { name: /fechar modal/i });
    await userEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalled();
  });
});
