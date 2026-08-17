import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { MoneyFlowCard } from '../components/MoneyFlowCard';
import { mockDashboardSummary } from '@/mocks/data';

describe('MoneyFlowCard component', () => {
  it('should render the 3 pipeline steps with summary values', () => {
    render(<MoneyFlowCard summary={mockDashboardSummary} />);

    expect(screen.getByText('1. Emissão Pix')).toBeInTheDocument();
    expect(screen.getByText('R$ 12.819,17')).toBeInTheDocument();
    expect(screen.getByText('157 faturas geradas nos ciclos')).toBeInTheDocument();

    expect(screen.getByText('2. Webhook Stark')).toBeInTheDocument();
    expect(screen.getByText('R$ 11.378,28')).toBeInTheDocument();
    expect(screen.getByText('44 créditos confirmados via webhook')).toBeInTheDocument();

    expect(screen.getByText('3. Liquidação Conta')).toBeInTheDocument();
    expect(screen.getByText('R$ 13.009,87')).toBeInTheDocument();
    expect(screen.getByText('50 repasses efetuados com sucesso')).toBeInTheDocument();
  });

  it('should handle null summary gracefully with default zeros', () => {
    render(<MoneyFlowCard summary={null} />);

    expect(screen.getAllByText('R$ 0,00').length).toBe(3);
    expect(screen.getByText('0 faturas geradas nos ciclos')).toBeInTheDocument();
    expect(screen.getByText('0 créditos confirmados via webhook')).toBeInTheDocument();
    expect(screen.getByText('0 repasses efetuados com sucesso')).toBeInTheDocument();
  });
});


