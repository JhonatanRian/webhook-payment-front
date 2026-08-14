import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Invoice } from '@/features/invoices/types';
import { TransferRecord } from '@/features/transfers/types';
import { formatCentsToBRL } from '@/utils/currency';
import { formatRelativeTime } from '@/utils/date';
import { truncateId } from '@/utils/mask';
import { InvoiceDetailDrawer } from '@/features/invoices/components/InvoiceDetailDrawer';
import { TransferDetailDrawer } from '@/features/transfers/components/TransferDetailDrawer';
import { ArrowRight, Receipt, ArrowRightLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RecentActivityFeedProps {
  invoices: Invoice[];
  transfers: TransferRecord[];
}

export function RecentActivityFeed({ invoices, transfers }: RecentActivityFeedProps) {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [selectedTransfer, setSelectedTransfer] = useState<TransferRecord | null>(null);

  const recentInvoices = invoices.slice(0, 5);
  const recentTransfers = transfers.slice(0, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Recent Invoices Card */}
      <Card padding="none" className="overflow-hidden">
        <div className="p-3.5 bg-slate-50/70 dark:bg-slate-900/50 border-b border-zoho-slate-border dark:border-zoho-slate-darkBorder flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-zoho-blue" />
            <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-100">
              Últimas Faturas Pix
            </h4>
          </div>
          <Link to="/invoices">
            <Button variant="ghost" size="xs" rightIcon={<ArrowRight className="w-3 h-3" />}>
              Ver todas
            </Button>
          </Link>
        </div>

        <div className="divide-y divide-zoho-slate-border/60 dark:divide-zoho-slate-darkBorder/60">
          {recentInvoices.length === 0 ? (
            <div className="p-6 text-center text-xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted">
              Nenhuma fatura registrada.
            </div>
          ) : (
            recentInvoices.map((inv) => (
              <div
                key={inv.id}
                onClick={() => setSelectedInvoice(inv)}
                className="p-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors text-xs"
              >
                <div>
                  <div className="font-medium text-slate-800 dark:text-slate-100">{inv.name}</div>
                  <div className="text-2xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted font-mono">
                    ID: {truncateId(inv.stark_invoice_id || inv.id, 6, 4)} • {formatRelativeTime(inv.created)}
                  </div>
                </div>
                <div className="text-right flex items-center gap-2">
                  <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">
                    {formatCentsToBRL(inv.amount)}
                  </span>
                  <Badge variant={inv.status} size="sm" dot>
                    {inv.status}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Recent Transfers Card */}
      <Card padding="none" className="overflow-hidden">
        <div className="p-3.5 bg-slate-50/70 dark:bg-slate-900/50 border-b border-zoho-slate-border dark:border-zoho-slate-darkBorder flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-100">
              Últimas Transferências de Repasse
            </h4>
          </div>
          <Link to="/transfers">
            <Button variant="ghost" size="xs" rightIcon={<ArrowRight className="w-3 h-3" />}>
              Ver todas
            </Button>
          </Link>
        </div>

        <div className="divide-y divide-zoho-slate-border/60 dark:divide-zoho-slate-darkBorder/60">
          {recentTransfers.length === 0 ? (
            <div className="p-6 text-center text-xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted">
              Nenhuma transferência registrada.
            </div>
          ) : (
            recentTransfers.map((trf) => (
              <div
                key={trf.id}
                onClick={() => setSelectedTransfer(trf)}
                className="p-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors text-xs"
              >
                <div>
                  <div className="font-medium text-slate-800 dark:text-slate-100">{trf.target_name}</div>
                  <div className="text-2xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted font-mono">
                    Stark: {truncateId(trf.stark_transfer_id, 6, 4)} • {formatRelativeTime(trf.created)}
                  </div>
                </div>
                <div className="text-right flex items-center gap-2">
                  <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                    {formatCentsToBRL(trf.net_amount)}
                  </span>
                  <Badge variant={trf.status} size="sm" dot>
                    {trf.status}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Drawers */}
      <InvoiceDetailDrawer
        invoice={selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
      />
      <TransferDetailDrawer
        transfer={selectedTransfer}
        onClose={() => setSelectedTransfer(null)}
      />
    </div>
  );
}
