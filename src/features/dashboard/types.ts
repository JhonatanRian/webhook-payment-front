import { Invoice } from '../invoices/types';
import { TransferRecord } from '../transfers/types';
import { SchedulerStatus } from '../scheduler/types';

export interface DashboardStats {
  totalInvoicesCount: number;
  creditedInvoicesCount: number;
  createdInvoicesCount: number;
  totalInvoicedCents: number;
  totalCreditedCents: number;
  totalTransferredCents: number;
  conversionRate: number;
  activeCycle: number;
  scheduler: SchedulerStatus | null;
  recentInvoices: Invoice[];
  recentTransfers: TransferRecord[];
}

export interface DashboardSummaryResponse {
  total_invoiced_cents: number;
  total_invoices_count: number;
  total_credited_cents: number;
  total_credited_count: number;
  total_liquidated_cents: number;
  total_liquidated_count: number;
  conversion_rate_percentage: number;
}
