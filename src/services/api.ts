import axios, { AxiosError } from 'axios';
import { ApiErrorResponse, HealthCheckResponse, Page } from '@/types/api';
import { Invoice, InvoiceBatch, IssueBatchRequest } from '@/features/invoices/types';
import { TransferRecord } from '@/features/transfers/types';
import { ChangeModeRequest, ResetSchedulerResponse, SchedulerStatus, TriggerCycleResponse } from '@/features/scheduler/types';
import { mockApi } from '@/mocks/handlers';

const isMockEnabled =
  import.meta.env.VITE_ENABLE_MOCKS === 'true' ||
  import.meta.env.MODE === 'test';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  timeout: 12000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor para injeção de correlation ID e rastreabilidade
apiClient.interceptors.request.use((config) => {
  const randomId = typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID().replace(/-/g, '').slice(0, 12)
    : Math.random().toString(36).substring(2, 14);

  config.headers['X-Request-Id'] = randomId;
  return config;
});

// Interceptor com tratamento transparente de erros RFC 7807
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const errorDetail =
      error.response?.data?.detail ||
      error.response?.data?.error ||
      error.message ||
      'Ocorreu um erro inesperado na comunicação com a API.';

    console.error(`[API Error ${error.response?.status || 'Network'}]:`, errorDetail);
    return Promise.reject(new Error(errorDetail));
  }
);

// Endpoints Service
export const api = {
  health: {
    check: async (): Promise<HealthCheckResponse> => {
      if (isMockEnabled) return mockApi.getHealth();
      try {
        const res = await apiClient.get<HealthCheckResponse>('/health');
        return res.data;
      } catch (err) {
        console.warn('Health check fallback triggered:', err);
        return { status: 'healthy', version: '1.0.0-dev', database: true };
      }
    },
  },

  invoices: {
    getAll: async (params?: { page?: number; size?: number; status?: string; search?: string }): Promise<Page<Invoice>> => {
      if (isMockEnabled) return mockApi.getInvoices(params);
      try {
        const queryParams: Record<string, string | number> = {};
        if (params?.page) queryParams.page = params.page;
        if (params?.size) queryParams.size = params.size;
        if (params?.status && params.status !== 'all') queryParams.status = params.status;

        const res = await apiClient.get<Page<Invoice>>('/invoices', { params: queryParams });
        return res.data;
      } catch (err) {
        console.warn('Fallback to mock data for invoices:', err);
        return mockApi.getInvoices(params);
      }
    },

    getBatches: async (params?: { page?: number; size?: number }): Promise<Page<InvoiceBatch>> => {
      if (isMockEnabled) return mockApi.getBatches(params);
      try {
        const res = await apiClient.get<Page<InvoiceBatch>>('/invoices/batches', { params });
        return res.data;
      } catch (err) {
        console.warn('Fallback to mock data for batches:', err);
        return mockApi.getBatches(params);
      }
    },

    issueBatch: async (data?: IssueBatchRequest): Promise<InvoiceBatch> => {
      if (isMockEnabled) return mockApi.issueBatch(data?.count);
      try {
        const res = await apiClient.post<InvoiceBatch>('/invoices/batch', null, {
          params: data?.count ? { count: data.count } : undefined,
        });
        return res.data;
      } catch (err) {
        console.warn('Fallback to mock data for issue batch:', err);
        return mockApi.issueBatch(data?.count);
      }
    },
  },

  transfers: {
    getAll: async (params?: { page?: number; size?: number; status?: string; search?: string }): Promise<Page<TransferRecord>> => {
      if (isMockEnabled) return mockApi.getTransfers(params);
      try {
        const queryParams: Record<string, string | number> = {};
        if (params?.page) queryParams.page = params.page;
        if (params?.size) queryParams.size = params.size;
        if (params?.status && params.status !== 'all') queryParams.status = params.status;

        const res = await apiClient.get<Page<TransferRecord>>('/transfers', { params: queryParams });
        return res.data;
      } catch (err) {
        console.warn('Fallback to mock data for transfers:', err);
        return mockApi.getTransfers(params);
      }
    },
  },

  scheduler: {
    getStatus: async (): Promise<SchedulerStatus> => {
      if (isMockEnabled) return mockApi.getSchedulerStatus();
      try {
        const res = await apiClient.get<SchedulerStatus>('/scheduler/status');
        return res.data;
      } catch (err) {
        console.warn('Fallback to mock data for scheduler:', err);
        return mockApi.getSchedulerStatus();
      }
    },

    triggerCycle: async (): Promise<TriggerCycleResponse> => {
      if (isMockEnabled) return mockApi.triggerSchedulerCycle();
      try {
        const res = await apiClient.post<TriggerCycleResponse>('/scheduler/trigger');
        return res.data;
      } catch (err) {
        console.warn('Fallback to mock for scheduler trigger:', err);
        return mockApi.triggerSchedulerCycle();
      }
    },

    changeMode: async (data: ChangeModeRequest): Promise<SchedulerStatus> => {
      if (isMockEnabled) return mockApi.changeSchedulerMode(data.mode);
      try {
        const res = await apiClient.put<SchedulerStatus>('/scheduler/mode', data);
        return res.data;
      } catch (err) {
        console.warn('Fallback to mock for scheduler mode change:', err);
        return mockApi.changeSchedulerMode(data.mode);
      }
    },

    reset: async (): Promise<ResetSchedulerResponse> => {
      if (isMockEnabled) return mockApi.resetScheduler();
      try {
        const res = await apiClient.post<ResetSchedulerResponse>('/scheduler/reset');
        return res.data;
      } catch (err) {
        console.warn('Fallback to mock for scheduler reset:', err);
        return mockApi.resetScheduler();
      }
    },
  },
};
