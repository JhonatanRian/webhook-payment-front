import { TransferTable } from './components/TransferTable';
import { ArrowRightLeft } from 'lucide-react';

export function TransfersPage() {
  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zoho-slate-border dark:border-zoho-slate-darkBorder">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-zoho-blue" />
            <span>Transferências de Liquidação</span>
          </h1>
          <p className="text-xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted mt-0.5">
            Registro detalhado de repasses e liquidações automáticas disparadas por eventos de webhook Pix.
          </p>
        </div>
      </div>

      {/* Main Table Content */}
      <TransferTable />
    </div>
  );
}
