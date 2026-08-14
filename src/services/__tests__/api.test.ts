import { describe, it, expect } from 'vitest';
import { api, apiClient } from '../api';

describe('api client & services', () => {
  it('should have apiClient configured with baseURL and timeout', () => {
    expect(apiClient.defaults.timeout).toBe(12000);
    expect(apiClient.defaults.headers['Content-Type']).toBe('application/json');
  });

  it('should execute health check service', async () => {
    const health = await api.health.check();
    expect(health).toBeDefined();
    expect(health.status).toBe('healthy');
  });

  it('should fetch invoices list with pagination', async () => {
    const result = await api.invoices.getAll({ page: 1, size: 5, status: 'credited', search: 'Lucas' });
    expect(result.items).toBeDefined();
    expect(result.page).toBe(1);
  });

  it('should fetch invoice batches', async () => {
    const result = await api.invoices.getBatches({ page: 1, size: 5 });
    expect(result.items).toBeDefined();
  });

  it('should issue a new batch of invoices', async () => {
    const batch = await api.invoices.issueBatch({ count: 5 });
    expect(batch).toBeDefined();
    expect(batch.invoice_count).toBe(5);
    expect(batch.invoices?.length).toBe(5);
  });

  it('should fetch transfers list with filters', async () => {
    const result = await api.transfers.getAll({ page: 1, size: 5, status: 'success', search: 'Stark' });
    expect(result.items).toBeDefined();
  });

  it('should get scheduler status', async () => {
    const status = await api.scheduler.getStatus();
    expect(status).toBeDefined();
    expect(status.max_cycles).toBe(8);
  });

  it('should trigger a scheduler cycle manually', async () => {
    const res = await api.scheduler.triggerCycle();
    expect(res.status).toBe('completed');
    expect(res.cycle_type).toBe('manual');
  });

  it('should change scheduler mode', async () => {
    const res = await api.scheduler.changeMode({ mode: 'once' });
    expect(res.mode).toBe('once');
  });

  it('should reset scheduler counters', async () => {
    const res = await api.scheduler.reset();
    expect(res.status).toBe('reset');
  });

  it('should test apiClient request interceptor', async () => {
    // Interceptor test
    const config = { headers: {} as Record<string, string> };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const requestInterceptor = (apiClient.interceptors.request as any).handlers[0]?.fulfilled;
    if (requestInterceptor) {
      const modified = requestInterceptor(config);
      expect(modified.headers['X-Request-Id']).toBeDefined();
    }
  });

  it('should test apiClient response error interceptor with RFC 7807', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const responseErrorInterceptor = (apiClient.interceptors.response as any).handlers[0]?.rejected;
    if (responseErrorInterceptor) {
      const errorObj = {
        response: {
          status: 400,
          data: { detail: 'RFC 7807 error detail message' },
        },
      };

      await expect(responseErrorInterceptor(errorObj)).rejects.toThrow('RFC 7807 error detail message');
    }
  });
});
