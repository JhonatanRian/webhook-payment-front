import { useState } from 'react';
import { TransferRecord, TransferStatus } from '../types';
import { useTransfers } from '../api';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';
import { Pagination } from '@/components/ui/Pagination';
import { Button } from '@/components/ui/Button';
import { TransferDetailDrawer } from './TransferDetailDrawer';
import { formatCentsToBRL } from '@/utils/currency';
import { formatDateTime } from '@/utils/date';
import { maskTaxId, truncateId } from '@/utils/mask';
import { exportToCsv, exportToJson } from '@/utils/export';
import { Search, Download, Eye, FileSpreadsheet, Code } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export function TransferTable() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(20);
  const [status, setStatus] = useState<TransferStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransfer, setSelectedTransfer] = useState<TransferRecord | null>(null);

  const { data, isLoading } = useTransfers({
    page,
    size,
    status,
    search: searchTerm,
  });

  const handleExportCsv = () => {
    if (!data?.items || data.items.length === 0) return;
    exportToCsv(
      data.items,
      `transferencias_liquidacao_${new Date().toISOString().slice(0, 10)}`,
      [
        { key: 'id', header: 'ID Interno' },
        { key: 'stark_transfer_id', header: 'Stark Transfer ID' },
        { key: 'target_name', header: 'Favorecido' },
        { key: 'target_tax_id', header: 'CNPJ/CPF' },
        { key: 'net_amount', header: 'Valor Líquido (R$)', transform: (v) => formatCentsToBRL(v) },
        { key: 'target_account', header: 'Conta Destino' },
        { key: 'status', header: 'Status' },
        { key: 'created', header: 'Data Liquidação', transform: (v) => formatDateTime(v) },
      ]
    );
  };

  const handleExportJson = () => {
    if (!data?.items || data.items.length === 0) return;
    exportToJson(data.items, `transferencias_liquidacao_${new Date().toISOString().slice(0, 10)}`);
  };

  const columns: Column<TransferRecord>[] = [
    {
      key: 'status',
      header: 'Status',
      width: '120px',
      render: (transfer) => (
        <Badge variant={transfer.status} dot>
          {transfer.status}
        </Badge>
      ),
    },
    {
      key: 'target_name',
      header: 'Favorecido / Conta',
      render: (transfer) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-800 dark:text-slate-100">{transfer.target_name}</span>
          <span className="text-2xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted font-mono">
            {maskTaxId(transfer.target_tax_id)} • Ag {transfer.target_branch} Cc {transfer.target_account}
          </span>
        </div>
      ),
    },
    {
      key: 'net_amount',
      header: 'Valor Líquido',
      align: 'right',
      width: '130px',
      render: (transfer) => (
        <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
          {formatCentsToBRL(transfer.net_amount)}
        </span>
      ),
    },
    {
      key: 'stark_transfer_id',
      header: 'Stark ID',
      width: '150px',
      render: (transfer) => (
        <span
          className="font-mono text-2xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted"
          title={transfer.stark_transfer_id || 'Pendente'}
        >
          {truncateId(transfer.stark_transfer_id, 6, 4)}
        </span>
      ),
    },
    {
      key: 'created',
      header: 'Liquidado em',
      width: '160px',
      render: (transfer) => (
        <span className="text-2xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted">
          {formatDateTime(transfer.created)}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      width: '60px',
      align: 'right',
      render: (transfer) => (
        <Button
          variant="ghost"
          size="xs"
          className="h-7 w-7 p-0 opacity-80 group-hover:opacity-100 text-slate-400 hover:text-zoho-blue"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedTransfer(transfer);
          }}
          aria-label="Ver detalhes da transferência"
        >
          <Eye className="w-3.5 h-3.5" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-3">
      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <div className="flex flex-1 items-center gap-2 max-w-md">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar por favorecido, conta ou ID Stark..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-zoho-slate-darkCard border border-zoho-slate-border dark:border-zoho-slate-darkBorder rounded-md text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-zoho-blue"
            />
          </div>

          {/* Status Filter */}
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as TransferStatus | 'all');
              setPage(1);
            }}
            className="px-2.5 py-1.5 text-xs bg-white dark:bg-zoho-slate-darkCard border border-zoho-slate-border dark:border-zoho-slate-darkBorder rounded-md text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-zoho-blue"
          >
            <option value="all">Todos os status</option>
            <option value="success">Sucesso (Liquidado)</option>
            <option value="processing">Processando</option>
            <option value="failed">Falha</option>
          </select>
        </div>

        {/* Export Dropdown */}
        <div className="flex items-center gap-2">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button
                variant="outline"
                size="xs"
                leftIcon={<Download className="w-3.5 h-3.5" />}
                disabled={!data?.items || data.items.length === 0}
              >
                Exportar
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="z-50 min-w-36 bg-white dark:bg-zoho-slate-darkCard rounded-md shadow-zoho-dropdown border border-zoho-slate-border dark:border-zoho-slate-darkBorder p-1 text-xs animate-fade-in"
                sideOffset={5}
                align="end"
              >
                <DropdownMenu.Item
                  onClick={handleExportCsv}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer outline-none"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Baixar CSV</span>
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onClick={handleExportJson}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer outline-none"
                >
                  <Code className="w-3.5 h-3.5 text-zoho-blue" />
                  <span>Baixar JSON</span>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>

      {/* Main Table */}
      <DataTable
        columns={columns}
        data={data?.items || []}
        isLoading={isLoading}
        emptyMessage="Nenhuma transferência encontrada com os filtros atuais."
        onRowClick={(item) => setSelectedTransfer(item)}
        keyExtractor={(item) => item.id}
      />

      {/* Pagination Footer */}
      {data && (
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
      )}

      {/* Slide-over Detail Drawer */}
      <TransferDetailDrawer
        transfer={selectedTransfer}
        onClose={() => setSelectedTransfer(null)}
      />
    </div>
  );
}
