import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { InvoiceFilters, IssueBatchRequest } from './types';
import { toast } from 'sonner';
import { DASHBOARD_SUMMARY_QUERY_KEY } from '@/features/dashboard/api';

export const INVOICES_QUERY_KEY = ['invoices'];
export const BATCHES_QUERY_KEY = ['invoice-batches'];

export function useInvoices(filters: InvoiceFilters = {}) {
  return useQuery({
    queryKey: [...INVOICES_QUERY_KEY, filters],
    queryFn: () => api.invoices.getAll(filters),
  });
}

export function useInvoiceBatches(params: { page?: number; size?: number } = {}) {
  return useQuery({
    queryKey: [...BATCHES_QUERY_KEY, params],
    queryFn: () => api.invoices.getBatches(params),
  });
}

export function useIssueBatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data?: IssueBatchRequest) => api.invoices.issueBatch(data),
    onSuccess: (newBatch) => {
      queryClient.invalidateQueries({ queryKey: INVOICES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: BATCHES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['scheduler'] });
      queryClient.invalidateQueries({ queryKey: DASHBOARD_SUMMARY_QUERY_KEY });
      toast.success('Lote de faturas emitido com sucesso!', {
        description: `${newBatch.invoice_count} faturas geradas no Ciclo #${newBatch.cycle_index}.`,
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error('Erro ao emitir lote de faturas', {
        description: error.message || 'Falha na comunicação com o servidor.',
      });
    },
  });
}
