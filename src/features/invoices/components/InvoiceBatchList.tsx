import { useState } from 'react';
import { useInvoiceBatches } from '../api';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Pagination } from '@/components/ui/Pagination';
import { formatDateTime } from '@/utils/date';
import { Layers, Calendar, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { InvoiceBatch } from '../types';

export function InvoiceBatchList() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const { data, isLoading } = useInvoiceBatches({ page, size });
  const [expandedBatchId, setExpandedBatchId] = useState<string | null>(null);

  const toggleBatch = (id: string) => {
    setExpandedBatchId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-20 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse border border-zoho-slate-border dark:border-zoho-slate-darkBorder"
            />
          ))}
        </div>
      ) : !data?.items || data.items.length === 0 ? (
        <Card padding="lg" className="text-center py-12 text-zoho-slate-muted dark:text-zoho-slate-darkMuted">
          Nenhum lote de faturas registrado ainda. Dispare um ciclo ou emita um novo lote.
        </Card>
      ) : (
        <div className="space-y-3">
          {data.items.map((batch: InvoiceBatch) => {
            const isExpanded = expandedBatchId === batch.id;
            return (
              <Card
                key={batch.id}
                padding="none"
                className="overflow-hidden transition-all duration-150"
              >
                <div
                  onClick={() => toggleBatch(batch.id)}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-zoho-blue border border-blue-100 dark:border-blue-900/50 shrink-0">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-slate-800 dark:text-slate-100">
                          Lote Ciclo #{batch.cycle_index}
                        </span>
                        <Badge variant="blue" size="sm">
                          {batch.invoice_count} faturas
                        </Badge>
                        <Badge variant="success" size="sm">
                          {batch.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-2xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted font-mono">
                        <span>ID: {batch.id}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-sans">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {formatDateTime(batch.created)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <Button variant="ghost" size="xs" className="gap-1 text-slate-500">
                      <span>{isExpanded ? 'Ocultar faturas' : 'Ver faturas'}</span>
                      <ChevronRight
                        className={`w-3.5 h-3.5 transition-transform ${
                          isExpanded ? 'rotate-90' : ''
                        }`}
                      />
                    </Button>
                  </div>
                </div>

                {/* Expanded Invoices List */}
                {isExpanded && (
                  <div className="p-4 bg-slate-50/80 dark:bg-slate-900/60 border-t border-zoho-slate-border dark:border-zoho-slate-darkBorder space-y-2 animate-fade-in">
                    <div className="text-2xs font-semibold uppercase tracking-wider text-zoho-slate-muted dark:text-zoho-slate-darkMuted font-mono">
                      Faturas Geradas neste Lote ({batch.invoices?.length || 0})
                    </div>
                    {batch.invoices && batch.invoices.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {batch.invoices.map((inv) => (
                          <div
                            key={inv.id}
                            className="bg-white dark:bg-slate-800 p-2.5 rounded border border-zoho-slate-border dark:border-zoho-slate-darkBorder flex items-center justify-between text-xs"
                          >
                            <div>
                              <span className="font-medium text-slate-800 dark:text-slate-200 block">
                                {inv.name}
                              </span>
                              <span className="text-2xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted font-mono">
                                Stark ID: {inv.stark_invoice_id || 'Pendente'}
                              </span>
                            </div>
                            <div className="text-right">
                              <Badge variant={inv.status} size="sm">
                                {inv.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted">
                        Nenhum detalhe adicional carregado para este lote.
                      </p>
                    )}
                  </div>
                )}
              </Card>
            );
          })}

          <Pagination
            currentPage={data.page}
            totalPages={data.pages}
            totalItems={data.total}
            pageSize={data.size}
            onPageChange={setPage}
            onPageSizeChange={(newSize) => {
              setSize(newSize);
              setPage(1);
            }}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
}
