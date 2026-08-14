import { useState } from 'react';
import { InvoiceTable } from './components/InvoiceTable';
import { InvoiceBatchList } from './components/InvoiceBatchList';
import { IssueBatchModal } from './components/IssueBatchModal';
import { Button } from '@/components/ui/Button';
import { Plus, Receipt, Layers } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';

export function InvoicesPage() {
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'batches'>('all');

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zoho-slate-border dark:border-zoho-slate-darkBorder">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Receipt className="w-5 h-5 text-zoho-blue" />
            <span>Faturas Pix & Lotes</span>
          </h1>
          <p className="text-xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted mt-0.5">
            Gerenciamento e rastreamento de cobranças dinâmicas emitidas via Stark Bank SDK.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsIssueModalOpen(true)}
          >
            Emitir Novo Lote
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs.Root value={activeTab} onValueChange={(val) => setActiveTab(val as 'all' | 'batches')}>
        <Tabs.List className="flex items-center gap-1 border-b border-zoho-slate-border dark:border-zoho-slate-darkBorder pb-px mb-4">
          <Tabs.Trigger
            value="all"
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium border-b-2 transition-all outline-none ${
              activeTab === 'all'
                ? 'border-zoho-blue text-zoho-blue font-semibold dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>Todas as Faturas</span>
          </Tabs.Trigger>

          <Tabs.Trigger
            value="batches"
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium border-b-2 transition-all outline-none ${
              activeTab === 'batches'
                ? 'border-zoho-blue text-zoho-blue font-semibold dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Lotes Emitidos</span>
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="all" className="outline-none">
          <InvoiceTable />
        </Tabs.Content>

        <Tabs.Content value="batches" className="outline-none">
          <InvoiceBatchList />
        </Tabs.Content>
      </Tabs.Root>

      {/* Modal de emissão */}
      <IssueBatchModal
        isOpen={isIssueModalOpen}
        onClose={() => setIsIssueModalOpen(false)}
      />
    </div>
  );
}
