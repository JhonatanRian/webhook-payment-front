import { mockInvoices, mockBatches, mockTransfers, mockSchedulerStatus } from './data';
import { Page, HealthCheckResponse } from '@/types/api';
import { Invoice, InvoiceBatch } from '@/features/invoices/types';
import { TransferRecord } from '@/features/transfers/types';
import { SchedulerStatus, TriggerCycleResponse } from '@/features/scheduler/types';
import { DashboardSummaryResponse } from '@/features/dashboard/types';

// In-memory state for mock mutation support
let currentInvoices = [...mockInvoices];
let currentBatches = [...mockBatches];
let currentTransfers = [...mockTransfers];
let currentScheduler: SchedulerStatus = { ...mockSchedulerStatus };

export const mockApi = {
  getHealth: async (): Promise<HealthCheckResponse> => {
    return { status: 'healthy', version: '1.0.0', timestamp: new Date().toISOString(), database: true };
  },

  getInvoices: async (params?: { page?: number; size?: number; status?: string; search?: string }): Promise<Page<Invoice>> => {
    const page = Number(params?.page) || 1;
    const size = Number(params?.size) || 20;
    const status = params?.status;
    const search = params?.search?.toLowerCase();

    let filtered = [...currentInvoices];

    if (status && status !== 'all') {
      filtered = filtered.filter((i) => i.status === status);
    }

    if (search) {
      filtered = filtered.filter(
        (i) =>
          i.name.toLowerCase().includes(search) ||
          i.tax_id.includes(search) ||
          (i.stark_invoice_id && i.stark_invoice_id.includes(search)) ||
          i.id.toLowerCase().includes(search)
      );
    }

    const total = filtered.length;
    const pages = Math.ceil(total / size) || 1;
    const start = (page - 1) * size;
    const items = filtered.slice(start, start + size);

    return {
      items,
      total,
      page,
      size,
      pages,
      has_next: page < pages,
      has_previous: page > 1,
    };
  },

  getBatches: async (params?: { page?: number; size?: number }): Promise<Page<InvoiceBatch>> => {
    const page = Number(params?.page) || 1;
    const size = Number(params?.size) || 20;
    const total = currentBatches.length;
    const pages = Math.ceil(total / size) || 1;
    const start = (page - 1) * size;
    const items = currentBatches.slice(start, start + size);

    return {
      items,
      total,
      page,
      size,
      pages,
      has_next: page < pages,
      has_previous: page > 1,
    };
  },

  issueBatch: async (count = 10): Promise<InvoiceBatch> => {
    const batchId = `batch_${Date.now()}`;
    const newInvoices: Invoice[] = [];

    const names = [
      'Thiago Martins',
      'Larissa Fonseca',
      'Rafael Guimarães',
      'Renata Silveira',
      'Bruno Nogueira',
      'Juliana Peixoto',
      'Gustavo Meireles',
      'Patrícia Farias',
    ];

    for (let i = 0; i < count; i++) {
      const randomAmount = Math.floor(Math.random() * 50000) + 5000;
      const invoice: Invoice = {
        id: `inv_${Date.now()}_${i}`,
        stark_invoice_id: `${Math.floor(1000000000000000 + Math.random() * 9000000000000000)}`,
        batch_id: batchId,
        amount: randomAmount,
        tax_id: `${Math.floor(10000000000 + Math.random() * 90000000000)}`,
        name: names[i % names.length],
        status: 'created',
        created: new Date().toISOString(),
      };
      newInvoices.push(invoice);
    }

    const newBatch: InvoiceBatch = {
      id: batchId,
      cycle_index: currentScheduler.scheduled_cycles_completed + currentScheduler.manual_triggers_completed + 1,
      invoice_count: count,
      status: 'completed',
      created: new Date().toISOString(),
      invoices: newInvoices,
    };

    currentInvoices = [...newInvoices, ...currentInvoices];
    currentBatches = [newBatch, ...currentBatches];

    return newBatch;
  },

  getTransfers: async (params?: { page?: number; size?: number; status?: string; search?: string }): Promise<Page<TransferRecord>> => {
    const page = Number(params?.page) || 1;
    const size = Number(params?.size) || 20;
    const status = params?.status;
    const search = params?.search?.toLowerCase();

    let filtered = [...currentTransfers];

    if (status && status !== 'all') {
      filtered = filtered.filter((t) => t.status === status);
    }

    if (search) {
      filtered = filtered.filter(
        (t) =>
          t.target_name.toLowerCase().includes(search) ||
          t.target_tax_id.includes(search) ||
          (t.stark_transfer_id && t.stark_transfer_id.includes(search)) ||
          (t.stark_invoice_id && t.stark_invoice_id.includes(search)) ||
          t.id.toLowerCase().includes(search)
      );
    }

    const total = filtered.length;
    const pages = Math.ceil(total / size) || 1;
    const start = (page - 1) * size;
    const items = filtered.slice(start, start + size);

    return {
      items,
      total,
      page,
      size,
      pages,
      has_next: page < pages,
      has_previous: page > 1,
    };
  },

  getSchedulerStatus: async (): Promise<SchedulerStatus> => {
    return { ...currentScheduler };
  },

  triggerSchedulerCycle: async (): Promise<TriggerCycleResponse> => {
    currentScheduler = {
      ...currentScheduler,
      manual_triggers_completed: currentScheduler.manual_triggers_completed + 1,
      remaining_cycles: Math.max(0, currentScheduler.remaining_cycles - 1),
      next_run_time: new Date(Date.now() + 1000 * 60 * 180).toISOString(),
    };
    await mockApi.issueBatch(Math.floor(Math.random() * 5) + 8);
    return { message: 'Ciclo manual executado com sucesso.', cycle_type: 'manual', status: 'completed' };
  },

  changeSchedulerMode: async (mode: 'once' | 'recurring') => {
    currentScheduler = {
      ...currentScheduler,
      mode,
    };
    return currentScheduler;
  },

  resetScheduler: async () => {
    currentScheduler = {
      scheduled_cycles_completed: 0,
      manual_triggers_completed: 0,
      max_cycles: 8,
      interval_minutes: 180,
      remaining_cycles: 8,
      mode: 'recurring',
      is_running: true,
      next_run_time: new Date(Date.now() + 1000 * 60 * 180).toISOString(),
    };
    return { message: 'Contadores do agendador resetados com sucesso.', status: 'reset' };
  },

  getDashboardSummary: async (): Promise<DashboardSummaryResponse> => {
    const totalInvoicedCents = currentInvoices.reduce((acc, curr) => acc + (curr.amount || 0), 0);
    const totalInvoicesCount = currentInvoices.length;

    const creditedInvoices = currentInvoices.filter((i) => i.status === 'credited');
    const totalCreditedCents = creditedInvoices.reduce((acc, curr) => acc + (curr.amount || 0), 0);
    const totalCreditedCount = creditedInvoices.length;

    const successTransfers = currentTransfers.filter((t) => t.status === 'success');
    const totalLiquidatedCents = successTransfers.reduce((acc, curr) => acc + (curr.net_amount || 0), 0);
    const totalLiquidatedCount = successTransfers.length;

    const conversionRatePercentage = totalInvoicesCount > 0
      ? Number(((totalCreditedCount / totalInvoicesCount) * 100).toFixed(2))
      : 0;

    return {
      total_invoiced_cents: totalInvoicedCents,
      total_invoices_count: totalInvoicesCount,
      total_credited_cents: totalCreditedCents,
      total_credited_count: totalCreditedCount,
      total_liquidated_cents: totalLiquidatedCents,
      total_liquidated_count: totalLiquidatedCount,
      conversion_rate_percentage: conversionRatePercentage,
    };
  },
};
