import { describe, it, expect } from 'vitest';
import { screen, renderWithProviders } from '@/test/test-utils';
import { Sidebar } from '../Sidebar';

describe('Sidebar component', () => {
  it('should render navigation links', () => {
    renderWithProviders(<Sidebar isOpen={true} />);

    expect(screen.getByText('Stark Webhook')).toBeInTheDocument();
    expect(screen.getByText('Visão Geral')).toBeInTheDocument();
    expect(screen.getByText('Faturas Pix')).toBeInTheDocument();
    expect(screen.getByText('Transferências')).toBeInTheDocument();
    expect(screen.getByText('Agendador 24h')).toBeInTheDocument();
  });
});
