import { describe, it, expect } from 'vitest';
import { screen, userEvent, renderWithProviders, waitFor } from '@/test/test-utils';
import { SchedulerPage } from '../SchedulerPage';

describe('SchedulerPage component', () => {
  it('should render SchedulerPage and cycle controls', async () => {
    renderWithProviders(<SchedulerPage />);

    expect(screen.getByText('Agendador de Ciclos 24 Horas')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Progresso da Janela de 24 Horas')).toBeInTheDocument();
      expect(screen.getByText('Modo de Operação do Agendador')).toBeInTheDocument();
    });

    const resetBtn = screen.getByRole('button', { name: /resetar ciclos/i });
    await userEvent.click(resetBtn);

    expect(screen.getByText('Resetar Ciclos do Agendador')).toBeInTheDocument();
  });
});
