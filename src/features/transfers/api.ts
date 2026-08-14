import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { TransferFilters } from './types';

export const TRANSFERS_QUERY_KEY = ['transfers'];

export function useTransfers(filters: TransferFilters = {}) {
  return useQuery({
    queryKey: [...TRANSFERS_QUERY_KEY, filters],
    queryFn: () => api.transfers.getAll(filters),
  });
}
