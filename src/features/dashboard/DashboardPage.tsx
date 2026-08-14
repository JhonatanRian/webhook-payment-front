import { useState } from 'react';
import { useInvoices } from '@/features/invoices/api';
import { useTransfers } from '@/features/transfers/api';
import { useSchedulerStatus, useTriggerCycle } from '@/features/scheduler/api';
import { StatsOverview } from './components/StatsOverview';
import { MoneyFlowCard } from './components/MoneyFlowCard';
import { RecentActivityFeed } from './components/RecentActivityFeed';
import { IssueBatchModal } from '@/features/invoices/components/IssueBatchModal';
import { Button } from '@/components/ui/Button';
import { LayoutDashboard, Plus, Play } from 'lucide-react';
import { Invoice } from '../invoices/types';
import { TransferRecord } from '../transfers/types';

export function DashboardPage() {
  const { data: invoicesData, isLoading: isInvoicesLoading } = useInvoices({ page: 1, size: 50 });
  const { data: transfersData, isLoading: isTransfersLoading } = useTransfers({ page: 1, size: 50 });
  const { data: schedulerStatus } = useSchedulerStatus();
  const triggerCycleMutation = useTriggerCycle();

  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);

  const invoices = (invoicesData?.items || []) as unknown as Invoice[];
  const transfers = (transfersData?.items || []) as unknown as TransferRecord[];
  const isLoading = isInvoicesLoading || isTransfersLoading;

  return (
    <div className="space-y-6">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zoho-slate-border dark:border-zoho-slate-darkBorder">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-zoho-blue" />
            <span>Visão Geral do Sistema</span>
          </h1>
          <p className="text-xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted mt-0.5">
            Monitoramento consolidado de emissões Pix, liquidações e automação de 24 horas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            onClick={() => setIsIssueModalOpen(true)}
          >
            Emitir Lote
          </Button>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<Play className="w-3.5 h-3.5 fill-white" />}
            isLoading={triggerCycleMutation.isPending}
            onClick={() => triggerCycleMutation.mutate()}
          >
            Disparar Ciclo
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-24 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
            ))}
          </div>
          <div className="h-44 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
          <div className="h-60 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
        </div>
      ) : (
        <div className="space-y-5">
          {/* Key Metrics / KPI */}
          <StatsOverview
            invoices={invoices}
            transfers={transfers}
            scheduler={schedulerStatus || null}
            totalInvoicesCount={invoicesData?.total}
          />

          {/* Money Flow Pipeline */}
          <MoneyFlowCard invoices={invoices} transfers={transfers} />

          {/* Live Recent Feeds */}
          <RecentActivityFeed invoices={invoices} transfers={transfers} />
        </div>
      )}

      {/* Manual Issue Batch Modal */}
      <IssueBatchModal
        isOpen={isIssueModalOpen}
        onClose={() => setIsIssueModalOpen(false)}
      />
    </div>
  );
}
