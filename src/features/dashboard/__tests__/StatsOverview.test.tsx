import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { StatsOverview } from '../components/StatsOverview';
import { mockDashboardSummary, mockSchedulerStatus } from '@/mocks/data';

describe('StatsOverview component', () => {
  it('should render 4 KPI cards with metrics from summary', () => {
    render(
      <StatsOverview
        summary={mockDashboardSummary}
        scheduler={mockSchedulerStatus}
      />
    );

    expect(screen.getByText('Total Emitido Pix')).toBeInTheDocument();
    expect(screen.getByText('R$ 12.819,17')).toBeInTheDocument();
    expect(screen.getByText('157 faturas emitidas')).toBeInTheDocument();

    expect(screen.getByText('Total Liquidado')).toBeInTheDocument();
    expect(screen.getByText('R$ 13.009,87')).toBeInTheDocument();
    expect(screen.getByText('50 liquidadas com sucesso')).toBeInTheDocument();

    expect(screen.getByText('Faturas Creditadas')).toBeInTheDocument();
    expect(screen.getByText(/44/)).toBeInTheDocument();
    expect(screen.getByText(/\(28.03% pago\)/)).toBeInTheDocument();

    expect(screen.getByText('Janela 24h')).toBeInTheDocument();
    expect(screen.getByText(/2 \/ 8/)).toBeInTheDocument();
    expect(screen.getByText('Agendador Operante')).toBeInTheDocument();
    expect(screen.getByText(/· 1 manual/)).toBeInTheDocument();
  });

  it('should handle null summary gracefully with default zeros', () => {
    render(
      <StatsOverview
        summary={null}
        scheduler={null}
      />
    );

    expect(screen.getAllByText('R$ 0,00').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('0 faturas emitidas')).toBeInTheDocument();
    expect(screen.getByText('0 liquidadas com sucesso')).toBeInTheDocument();
    expect(screen.getByText(/\(0% pago\)/)).toBeInTheDocument();
  });
});


