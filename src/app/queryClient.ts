import { QueryClient } from '@tanstack/react-query';

const POLLING_INTERVAL = Number(import.meta.env.VITE_POLLING_INTERVAL_MS) || 60_000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: POLLING_INTERVAL, // Refetch automático a cada 60 segundos
      refetchIntervalInBackground: false,
      staleTime: 30_000,                 // Considera dados frescos por 30s
      refetchOnWindowFocus: true,        // Atualiza ao focar na aba
      retry: 2,
    },
  },
});
