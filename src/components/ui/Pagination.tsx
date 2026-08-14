import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  isLoading?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  isLoading = false,
}: PaginationProps) {
  if (totalItems === 0) return null;

  const start = Math.min((currentPage - 1) * pageSize + 1, totalItems);
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-3 py-2.5 bg-slate-50/50 dark:bg-slate-900/40 border-t border-zoho-slate-border dark:border-zoho-slate-darkBorder text-xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted">
      <div className="flex items-center gap-2">
        <span>
          Mostrando <strong className="font-semibold text-slate-700 dark:text-slate-200">{start}</strong> a{' '}
          <strong className="font-semibold text-slate-700 dark:text-slate-200">{end}</strong> de{' '}
          <strong className="font-semibold text-slate-700 dark:text-slate-200">{totalItems}</strong> registros
        </span>

        {onPageSizeChange && (
          <div className="flex items-center gap-1.5 ml-3">
            <span className="text-2xs uppercase tracking-wider font-mono">Por pág:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              disabled={isLoading}
              className="px-2 py-0.5 text-xs bg-white dark:bg-slate-800 border border-zoho-slate-border dark:border-zoho-slate-darkBorder rounded text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-zoho-blue"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-2xs font-mono mr-2">
          Pág. <strong>{currentPage}</strong> de <strong>{Math.max(1, totalPages)}</strong>
        </span>

        <Button
          variant="outline"
          size="xs"
          disabled={currentPage <= 1 || isLoading}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Página anterior"
          className="h-7 w-7 p-0"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </Button>

        <Button
          variant="outline"
          size="xs"
          disabled={currentPage >= totalPages || isLoading}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Próxima página"
          className="h-7 w-7 p-0"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}
