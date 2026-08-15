export type TransferStatus = 'created' | 'pending' | 'processing' | 'success' | 'failed' | 'canceled';

export interface TransferRecord {
  id: string;
  stark_transfer_id: string | null;
  stark_invoice_id: string | null;
  event_id: string | null;
  amount: number;      // Bruto (centavos)
  fee: number;         // Taxa (centavos)
  net_amount: number;  // Líquido transferido (centavos)
  target_bank_code: string;
  target_branch: string;
  target_account: string;
  target_name: string;
  target_tax_id: string;
  target_account_type: string;
  status: TransferStatus;
  created: string;
}

export interface TransferFilters {
  page?: number;
  size?: number;
  status?: TransferStatus | 'all';
  search?: string;
}
