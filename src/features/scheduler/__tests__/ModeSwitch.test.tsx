import { describe, it, expect } from 'vitest';
import { screen, userEvent, renderWithProviders } from '@/test/test-utils';
import { ModeSwitch } from '../components/ModeSwitch';

describe('ModeSwitch component', () => {
  it('should render mode options and allow changing mode', async () => {
    renderWithProviders(<ModeSwitch currentMode="recurring" />);

    expect(screen.getByText('Modo de Operação do Agendador')).toBeInTheDocument();
    expect(screen.getByText('Recorrente (24h)')).toBeInTheDocument();
    expect(screen.getByText('Ciclo Único (Once)')).toBeInTheDocument();

    const onceBtn = screen.getByRole('button', { name: /ciclo único/i });
    await userEvent.click(onceBtn);
  });
});
