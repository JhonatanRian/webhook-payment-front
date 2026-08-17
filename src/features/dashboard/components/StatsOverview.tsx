import { Card } from '@/components/ui/Card';
import { formatCentsToBRL } from '@/utils/currency';
import {
  TrendingUp,
  Receipt,
  ArrowRightLeft,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import { DashboardSummaryResponse } from '@/features/dashboard/types';
import { SchedulerStatus } from '@/features/scheduler/types';

interface StatsOverviewProps {
  summary?: DashboardSummaryResponse | null;
  scheduler: SchedulerStatus | null;
}

export function StatsOverview({
  summary,
  scheduler,
}: StatsOverviewProps) {
  const totalInvoiced = summary?.total_invoiced_cents ?? 0;
  const totalInvoicesCount = summary?.total_invoices_count ?? 0;
  const totalLiquidated = summary?.total_liquidated_cents ?? 0;
  const totalLiquidatedCount = summary?.total_liquidated_count ?? 0;
  const totalCreditedCount = summary?.total_credited_count ?? 0;
  const conversionRate = summary?.conversion_rate_percentage ?? 0;

  const scheduledCycles = scheduler?.scheduled_cycles_completed ?? 0;
  const manualCycles = scheduler?.manual_triggers_completed ?? 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
      {/* KPI 1: Faturamento Total Emitido */}
      <Card padding="sm" className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-2xs font-semibold uppercase tracking-wider text-zoho-slate-muted dark:text-zoho-slate-darkMuted font-mono">
            Total Emitido Pix
          </span>
          <div className="w-7 h-7 rounded-md bg-blue-50 dark:bg-blue-950/40 text-zoho-blue dark:text-blue-400 flex items-center justify-center border border-blue-100 dark:border-blue-900/40">
            <Receipt className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="text-xl font-bold font-mono text-slate-900 dark:text-white tracking-tight">
          {formatCentsToBRL(totalInvoiced)}
        </div>
        <div className="flex items-center gap-1.5 text-2xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted font-mono">
          <span>{totalInvoicesCount} faturas emitidas</span>
        </div>
      </Card>

      {/* KPI 2: Total Liquidado */}
      <Card padding="sm" className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-2xs font-semibold uppercase tracking-wider text-zoho-slate-muted dark:text-zoho-slate-darkMuted font-mono">
            Total Liquidado
          </span>
          <div className="w-7 h-7 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-100 dark:border-emerald-900/40">
            <ArrowRightLeft className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tracking-tight">
          {formatCentsToBRL(totalLiquidated)}
        </div>
        <div className="flex items-center gap-1 text-2xs text-emerald-600 dark:text-emerald-400 font-mono">
          <ArrowUpRight className="w-3 h-3" />
          <span>
            {totalLiquidatedCount} liquidada{totalLiquidatedCount !== 1 ? 's' : ''} com sucesso
          </span>
        </div>
      </Card>

      {/* KPI 3: Taxa de Conversão */}
      <Card padding="sm" className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-2xs font-semibold uppercase tracking-wider text-zoho-slate-muted dark:text-zoho-slate-darkMuted font-mono">
            Faturas Creditadas
          </span>
          <div className="w-7 h-7 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-100 dark:border-amber-900/40">
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="text-xl font-bold font-mono text-slate-900 dark:text-white tracking-tight">
          {totalCreditedCount}{' '}
          <span className="text-xs font-normal text-zoho-slate-muted dark:text-zoho-slate-darkMuted">
            ({conversionRate}% pago)
          </span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-amber-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(0, conversionRate))}%` }}
          />
        </div>
      </Card>

      {/* KPI 4: Ciclos 24h */}
      <Card padding="sm" className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-2xs font-semibold uppercase tracking-wider text-zoho-slate-muted dark:text-zoho-slate-darkMuted font-mono">
            Janela 24h
          </span>
          <div className="w-7 h-7 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center border border-zoho-slate-border dark:border-zoho-slate-darkBorder">
            <Clock className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="text-xl font-bold font-mono text-slate-900 dark:text-white tracking-tight">
          {scheduledCycles} / {scheduler?.max_cycles || 8}{' '}
          <span className="text-xs font-normal text-zoho-slate-muted dark:text-zoho-slate-darkMuted">
            auto
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-2xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
          <span className="text-zoho-slate-muted dark:text-zoho-slate-darkMuted">
            {scheduler?.is_running ? 'Agendador Operante' : 'Pausado'}
          </span>
          {manualCycles > 0 && (
            <span className="text-zoho-orange dark:text-orange-400 font-semibold ml-1">
              · {manualCycles} manual{manualCycles > 1 ? 'is' : ''}
            </span>
          )}
        </div>
      </Card>
    </div>
  );
}

