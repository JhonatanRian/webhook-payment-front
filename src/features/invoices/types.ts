export type InvoiceStatus = 'created' | 'credited' | 'expired' | 'canceled';

export interface Invoice {
  id: string;
  stark_invoice_id: string | null;
  batch_id: string | null;
  amount: number; // Em centavos (ex: 15000 = R$ 150,00)
  tax_id: string;
  name: string;
  status: InvoiceStatus;
  created: string;
}

export interface InvoiceBatch {
  id: string;
  cycle_index: number;
  invoice_count: number;
  status: string;
  created: string;
  invoices?: Invoice[];
}

export interface IssueBatchRequest {
  count?: number; // 1 a 50 (padrão aleatório 8 a 12)
}

export interface InvoiceFilters {
  page?: number;
  size?: number;
  status?: InvoiceStatus | 'all';
  search?: string;
  batch_id?: string;
}
