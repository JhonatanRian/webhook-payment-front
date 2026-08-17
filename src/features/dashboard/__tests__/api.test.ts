import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useDashboardSummary } from '../api';
import { createWrapper } from '@/test/test-utils';

describe('dashboard query hooks', () => {
  it('useDashboardSummary should return aggregated metrics', async () => {
    const { result } = renderHook(() => useDashboardSummary(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
    expect(typeof result.current.data?.total_invoiced_cents).toBe('number');
    expect(typeof result.current.data?.total_invoices_count).toBe('number');
    expect(typeof result.current.data?.total_credited_cents).toBe('number');
    expect(typeof result.current.data?.total_credited_count).toBe('number');
    expect(typeof result.current.data?.total_liquidated_cents).toBe('number');
    expect(typeof result.current.data?.total_liquidated_count).toBe('number');
    expect(typeof result.current.data?.conversion_rate_percentage).toBe('number');
  });
});
