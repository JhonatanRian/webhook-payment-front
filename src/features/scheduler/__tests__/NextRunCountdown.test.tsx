import { describe, it, expect } from 'vitest';
import { screen, userEvent, renderWithProviders } from '@/test/test-utils';
import { NextRunCountdown } from '../components/NextRunCountdown';

describe('NextRunCountdown component', () => {
  it('should render countdown and handle execute now click', async () => {
    const futureTime = new Date(Date.now() + 1000 * 60 * 60).toISOString();
    renderWithProviders(<NextRunCountdown nextRunTime={futureTime} isRunning={true} />);

    expect(screen.getByText('Próxima Execução Automática')).toBeInTheDocument();
    expect(screen.getByText('Agendador Ativo')).toBeInTheDocument();

    const triggerBtn = screen.getByRole('button', { name: /executar agora/i });
    await userEvent.click(triggerBtn);
  });

  it('should handle null nextRunTime', () => {
    renderWithProviders(<NextRunCountdown nextRunTime={null} isRunning={false} />);
    expect(screen.getByText('--:--:--')).toBeInTheDocument();
    expect(screen.getByText('Pausado')).toBeInTheDocument();
  });
});
