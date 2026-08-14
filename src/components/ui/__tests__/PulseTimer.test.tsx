import { describe, it, expect, vi } from 'vitest';
import { screen, userEvent, renderWithProviders } from '@/test/test-utils';
import { PulseTimer } from '../PulseTimer';

describe('PulseTimer UI component', () => {
  it('should render pulse timer with initial countdown seconds', () => {
    renderWithProviders(<PulseTimer intervalSeconds={60} />);
    expect(screen.getByText('Sync')).toBeInTheDocument();
    expect(screen.getByText('60s')).toBeInTheDocument();
  });

  it('should allow manual refresh on button click', async () => {
    const { queryClient } = renderWithProviders(<PulseTimer intervalSeconds={60} />);
    const refetchSpy = vi.spyOn(queryClient, 'refetchQueries');

    const refreshBtn = screen.getByTitle('Atualizar agora');
    await userEvent.click(refreshBtn);

    expect(refetchSpy).toHaveBeenCalled();
  });
});
