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
