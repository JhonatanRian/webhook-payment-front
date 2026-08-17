import { Card } from '@/components/ui/Card';
import { formatCentsToBRL } from '@/utils/currency';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Layers } from 'lucide-react';
import { DashboardSummaryResponse } from '@/features/dashboard/types';

interface MoneyFlowCardProps {
  summary?: DashboardSummaryResponse | null;
}

export function MoneyFlowCard({ summary }: MoneyFlowCardProps) {
  const totalInvoiced = summary?.total_invoiced_cents ?? 0;
  const totalInvoicesCount = summary?.total_invoices_count ?? 0;
  const totalCredited = summary?.total_credited_cents ?? 0;
  const totalCreditedCount = summary?.total_credited_count ?? 0;
  const totalLiquidated = summary?.total_liquidated_cents ?? 0;
  const totalLiquidatedCount = summary?.total_liquidated_count ?? 0;

  return (
    <Card padding="md" className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-100 uppercase tracking-wider font-mono flex items-center gap-2">
            <Zap className="w-4 h-4 text-zoho-blue" />
            <span>Fluxo de Liquidação e Orquestração Webhook</span>
          </h4>
          <p className="text-2xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted mt-0.5">
            Rastreamento de ponta a ponta do ciclo de cobrança e repasse instantâneo
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-2xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Assinado com ECDSA</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative">
        {/* Step 1: Emissão */}
        <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-zoho-slate-border dark:border-zoho-slate-darkBorder space-y-2 relative">
          <div className="flex items-center justify-between">
            <span className="text-2xs font-bold font-mono text-zoho-blue dark:text-blue-400 uppercase">
              1. Emissão Pix
            </span>
            <Layers className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-lg font-bold font-mono text-slate-900 dark:text-white">
            {formatCentsToBRL(totalInvoiced)}
          </div>
          <p className="text-2xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted">
            {totalInvoicesCount} faturas geradas nos ciclos
          </p>
        </div>

        {/* Step 2: Webhook Creditado */}
        <div className="p-3.5 rounded-lg bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xs font-bold font-mono text-amber-700 dark:text-amber-400 uppercase">
              2. Webhook Stark
            </span>
            <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-lg font-bold font-mono text-slate-900 dark:text-white">
            {formatCentsToBRL(totalCredited)}
          </div>
          <p className="text-2xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted">
            {totalCreditedCount} créditos confirmados via webhook
          </p>
        </div>

        {/* Step 3: Transferência Stark */}
        <div className="p-3.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-900/50 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xs font-bold font-mono text-emerald-700 dark:text-emerald-400 uppercase">
              3. Liquidação Conta
            </span>
            <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">
            {formatCentsToBRL(totalLiquidated)}
          </div>
          <p className="text-2xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted">
            {totalLiquidatedCount} repasse{totalLiquidatedCount !== 1 ? 's' : ''} efetuado{totalLiquidatedCount !== 1 ? 's' : ''} com sucesso
          </p>
        </div>
      </div>
    </Card>
  );
}

