import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { ChangeModeRequest } from './types';
import { toast } from 'sonner';
import { INVOICES_QUERY_KEY, BATCHES_QUERY_KEY } from '../invoices/api';
import { TRANSFERS_QUERY_KEY } from '../transfers/api';

export const SCHEDULER_QUERY_KEY = ['scheduler'];
export const HEALTH_QUERY_KEY = ['health'];

export function useSchedulerStatus() {
  return useQuery({
    queryKey: SCHEDULER_QUERY_KEY,
    queryFn: () => api.scheduler.getStatus(),
  });
}

export function useHealthCheck() {
  return useQuery({
    queryKey: HEALTH_QUERY_KEY,
    queryFn: () => api.health.check(),
    refetchInterval: 30000,
  });
}

export function useTriggerCycle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.scheduler.triggerCycle(),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: SCHEDULER_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: INVOICES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: BATCHES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: TRANSFERS_QUERY_KEY });
      toast.success('Ciclo manual disparado com sucesso!', {
        description: data.message || 'Lote emitido e agendador atualizado.',
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error('Erro ao disparar ciclo manual', {
        description: error.message || 'Falha ao executar o ciclo sob demanda.',
      });
    },
  });
}

export function useChangeMode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ChangeModeRequest) => api.scheduler.changeMode(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: SCHEDULER_QUERY_KEY });
      toast.success(`Modo alterado para ${data.mode === 'recurring' ? 'Recorrente (24h)' : 'Único (Once)'}!`);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error('Erro ao alterar modo do agendador', {
        description: error.message,
      });
    },
  });
}

export function useResetCycles() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.scheduler.reset(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SCHEDULER_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: INVOICES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: BATCHES_QUERY_KEY });
      toast.success('Histórico e contadores resetados!', {
        description: 'Os 8 ciclos de 24 horas foram redefinidos para o estado inicial.',
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error('Erro ao resetar agendador', {
        description: error.message,
      });
    },
  });
}
