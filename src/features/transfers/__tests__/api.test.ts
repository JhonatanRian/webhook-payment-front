import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useTransfers } from '../api';
import { createWrapper } from '@/test/test-utils';

describe('transfers query hooks', () => {
  it('useTransfers should return paginated list of transfer records', async () => {
    const { result } = renderHook(() => useTransfers({ page: 1, size: 10 }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.items).toBeDefined();
    expect(result.current.data?.items.length).toBeGreaterThan(0);
  });
});
