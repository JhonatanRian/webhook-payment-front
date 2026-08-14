import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { CycleProgressRing } from '../components/CycleProgressRing';
import { mockSchedulerStatus } from '@/mocks/data';

describe('CycleProgressRing component', () => {
  it('should render 8-cycle segment bar and progress stats', () => {
    render(<CycleProgressRing status={mockSchedulerStatus} />);

    expect(screen.getByText('Progresso da Janela de 24 Horas')).toBeInTheDocument();
    expect(screen.getByText('Automáticos')).toBeInTheDocument();
    expect(screen.getByText('Manuais')).toBeInTheDocument();
    expect(screen.getByText('Restantes')).toBeInTheDocument();
  });
});
