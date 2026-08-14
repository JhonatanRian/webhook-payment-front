import React from 'react';
import { cn } from '@/utils/cn';

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (item: T, index: number) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
  keyExtractor?: (item: T, index: number) => string | number;
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  isLoading = false,
  emptyMessage = 'Nenhum registro encontrado.',
  onRowClick,
  keyExtractor = (_, index) => index,
  className,
}: DataTableProps<T>) {
  const getAlignClass = (align?: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      case 'left':
      default:
        return 'text-left';
    }
  };

  return (
    <div className={cn('w-full overflow-x-auto rounded-lg border border-zoho-slate-border dark:border-zoho-slate-darkBorder bg-white dark:bg-zoho-slate-darkCard', className)}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zoho-slate-border dark:border-zoho-slate-darkBorder bg-slate-50/80 dark:bg-slate-900/60 text-2xs font-semibold uppercase tracking-wider text-zoho-slate-muted dark:text-zoho-slate-darkMuted font-mono">
            {columns.map((col, idx) => (
              <th
                key={idx}
                style={{ width: col.width }}
                className={cn('py-2.5 px-3 select-none', getAlignClass(col.align), col.className)}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zoho-slate-border/70 dark:divide-zoho-slate-darkBorder/70 text-sm text-slate-700 dark:text-slate-200 font-sans">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, rIdx) => (
              <tr key={rIdx} className="animate-pulse">
                {columns.map((_, cIdx) => (
                  <td key={cIdx} className="py-3 px-3">
                    <div className="h-3.5 bg-slate-200 dark:bg-slate-700/60 rounded w-4/5" />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-12 text-center text-xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, rowIdx) => (
              <tr
                key={keyExtractor(item, rowIdx)}
                onClick={() => onRowClick?.(item)}
                className={cn(
                  'transition-colors duration-100 group',
                  onRowClick && 'cursor-pointer hover:bg-blue-50/50 dark:hover:bg-slate-800/60'
                )}
              >
                {columns.map((col, colIdx) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const cellValue = (item as any)[col.key];
                  return (
                    <td
                      key={colIdx}
                      className={cn(
                        'py-2.5 px-3 text-xs sm:text-sm font-normal align-middle leading-normal',
                        getAlignClass(col.align),
                        col.className
                      )}
                    >
                      {col.render ? col.render(item, rowIdx) : (cellValue as React.ReactNode)}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
