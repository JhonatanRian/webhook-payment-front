import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useInvoices, useInvoiceBatches, useIssueBatch } from '../api';
import { createWrapper } from '@/test/test-utils';

describe('invoices query hooks', () => {
  it('useInvoices should return paginated list of invoices', async () => {
    const { result } = renderHook(() => useInvoices({ page: 1, size: 10 }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.items).toBeDefined();
    expect(result.current.data?.page).toBe(1);
  });

  it('useInvoiceBatches should return list of batches', async () => {
    const { result } = renderHook(() => useInvoiceBatches({ page: 1, size: 5 }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.items).toBeDefined();
  });

  it('useIssueBatch should mutate and issue new batch', async () => {
    const { result } = renderHook(() => useIssueBatch(), {
      wrapper: createWrapper(),
    });

    const mutationPromise = result.current.mutateAsync({ count: 6 });
    await expect(mutationPromise).resolves.toBeDefined();
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
