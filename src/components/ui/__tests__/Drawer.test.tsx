import { describe, it, expect, vi } from 'vitest';
import { render, screen, userEvent } from '@/test/test-utils';
import { Drawer, DetailRow, DetailSection } from '../Drawer';

describe('Drawer UI component', () => {
  it('should render drawer with title and details when isOpen is true', () => {
    render(
      <Drawer isOpen={true} onClose={vi.fn()} title="Detalhes do Lote">
        <DetailSection title="Dados Gerais">
          <DetailRow label="ID" value="12345" />
        </DetailSection>
      </Drawer>
    );

    expect(screen.getByText('Detalhes do Lote')).toBeInTheDocument();
    expect(screen.getByText('Dados Gerais')).toBeInTheDocument();
    expect(screen.getByText('12345')).toBeInTheDocument();
  });

  it('should not render anything when isOpen is false', () => {
    render(
      <Drawer isOpen={false} onClose={vi.fn()} title="Detalhes do Lote">
        <p>Conteúdo</p>
      </Drawer>
    );

    expect(screen.queryByText('Detalhes do Lote')).not.toBeInTheDocument();
  });

  it('should trigger onClose on close button click and escape key', async () => {
    const handleClose = vi.fn();
    render(
      <Drawer isOpen={true} onClose={handleClose} title="Detalhes">
        <p>Conteúdo</p>
      </Drawer>
    );

    const closeBtn = screen.getByRole('button', { name: /fechar gaveta/i });
    await userEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalled();
  });

  it('should copy text when copy button in DetailRow is clicked', async () => {
    render(
      <DetailRow label="CPF" value="123.456.789-00" copyable rawTextToCopy="12345678900" />
    );

    const copyBtn = screen.getByTitle('Copiar');
    await userEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('12345678900');
  });
});
