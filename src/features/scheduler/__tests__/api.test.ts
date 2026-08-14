import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import {
  useSchedulerStatus,
  useHealthCheck,
  useTriggerCycle,
  useChangeMode,
  useResetCycles,
} from '../api';
import { createWrapper } from '@/test/test-utils';

describe('scheduler query hooks', () => {
  it('useSchedulerStatus should return current status', async () => {
    const { result } = renderHook(() => useSchedulerStatus(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.max_cycles).toBe(8);
  });

  it('useHealthCheck should return healthy status', async () => {
    const { result } = renderHook(() => useHealthCheck(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.status).toBe('healthy');
  });

  it('useTriggerCycle should execute cycle mutation', async () => {
    const { result } = renderHook(() => useTriggerCycle(), {
      wrapper: createWrapper(),
    });

    const mutationPromise = result.current.mutateAsync();
    await expect(mutationPromise).resolves.toBeDefined();
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it('useChangeMode should mutate mode', async () => {
    const { result } = renderHook(() => useChangeMode(), {
      wrapper: createWrapper(),
    });

    const mutationPromise = result.current.mutateAsync({ mode: 'recurring' });
    await expect(mutationPromise).resolves.toBeDefined();
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it('useResetCycles should reset scheduler history', async () => {
    const { result } = renderHook(() => useResetCycles(), {
      wrapper: createWrapper(),
    });

    const mutationPromise = result.current.mutateAsync();
    await expect(mutationPromise).resolves.toBeDefined();
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
