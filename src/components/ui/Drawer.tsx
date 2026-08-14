import React, { useEffect } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { cn } from '@/utils/cn';
import { toast } from 'sonner';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
}

export function Drawer({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  width = 'max-w-lg',
}: DrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className={cn(
            'w-screen bg-white dark:bg-zoho-slate-darkCard shadow-zoho-drawer border-l border-zoho-slate-border dark:border-zoho-slate-darkBorder flex flex-col animate-slide-in-right',
            width
          )}
        >
          {/* Header */}
          <div className="flex items-start justify-between px-5 py-4 border-b border-zoho-slate-border dark:border-zoho-slate-darkBorder bg-slate-50/70 dark:bg-slate-900/50">
            <div>
              <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                {title}
              </h2>
              {subtitle && (
                <div className="text-2xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted mt-0.5">
                  {subtitle}
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Fechar gaveta"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm">{children}</div>

          {/* Footer */}
          {footer && (
            <div className="px-5 py-3 border-t border-zoho-slate-border dark:border-zoho-slate-darkBorder bg-slate-50/60 dark:bg-slate-900/40 flex items-center justify-end gap-2">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface DetailRowProps {
  label: string;
  value: React.ReactNode;
  copyable?: boolean;
  rawTextToCopy?: string;
  className?: string;
}

export function DetailRow({
  label,
  value,
  copyable = false,
  rawTextToCopy,
  className,
}: DetailRowProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    const text = rawTextToCopy || (typeof value === 'string' ? value : '');
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Copiado para a área de transferência!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={cn(
        'flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/80 last:border-0 text-xs',
        className
      )}
    >
      <span className="text-zoho-slate-muted dark:text-zoho-slate-darkMuted font-medium font-sans">
        {label}
      </span>
      <div className="flex items-center gap-1.5 font-mono text-slate-800 dark:text-slate-100">
        <span className="select-all text-right">{value}</span>
        {copyable && (
          <button
            type="button"
            onClick={handleCopy}
            className="p-1 rounded text-slate-400 hover:text-zoho-blue hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
            title="Copiar"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>
    </div>
  );
}

export function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h4 className="text-2xs font-semibold uppercase tracking-wider text-zoho-slate-muted dark:text-zoho-slate-darkMuted font-mono">
        {title}
      </h4>
      <div className="bg-slate-50 dark:bg-slate-900/60 rounded-lg p-3 border border-zoho-slate-border dark:border-zoho-slate-darkBorder">
        {children}
      </div>
    </div>
  );
}
