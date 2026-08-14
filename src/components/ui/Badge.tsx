import React from 'react';
import { cn } from '@/utils/cn';

export type BadgeVariant =
  | 'created'
  | 'credited'
  | 'success'
  | 'processing'
  | 'failed'
  | 'expired'
  | 'canceled'
  | 'blue'
  | 'neutral'
  | 'active'
  | 'inactive';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant | string;
  size?: 'sm' | 'md';
  dot?: boolean;
  children: React.ReactNode;
}

export function Badge({
  variant = 'neutral',
  size = 'sm',
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'credited':
      case 'success':
      case 'healthy':
      case 'completed':
      case 'active':
        return 'bg-zoho-success-bg dark:bg-zoho-success-darkBg text-zoho-success-text dark:text-zoho-success-darkText border-zoho-success-border dark:border-zoho-success-darkBorder';

      case 'processing':
      case 'created':
      case 'pending':
      case 'recurring':
        return 'bg-zoho-warning-bg dark:bg-zoho-warning-darkBg text-zoho-warning-text dark:text-zoho-warning-darkText border-zoho-warning-border dark:border-zoho-warning-darkBorder';

      case 'failed':
      case 'expired':
      case 'canceled':
      case 'error':
        return 'bg-zoho-danger-bg dark:bg-zoho-danger-darkBg text-zoho-danger-text dark:text-zoho-danger-darkText border-zoho-danger-border dark:border-zoho-danger-darkBorder';

      case 'blue':
      case 'running':
      case 'once':
        return 'bg-blue-50 dark:bg-blue-950/40 text-zoho-blue dark:text-blue-400 border-blue-200 dark:border-blue-800/60';

      case 'neutral':
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  const getDotColor = () => {
    switch (variant) {
      case 'credited':
      case 'success':
      case 'healthy':
      case 'completed':
      case 'active':
        return 'bg-emerald-500';
      case 'processing':
      case 'created':
      case 'pending':
      case 'recurring':
        return 'bg-amber-500';
      case 'failed':
      case 'expired':
      case 'canceled':
      case 'error':
        return 'bg-rose-500';
      case 'blue':
      case 'running':
      case 'once':
        return 'bg-zoho-blue';
      default:
        return 'bg-slate-400';
    }
  };

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-2xs' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full border tracking-wide uppercase font-mono transition-colors',
        getVariantStyles(),
        sizeClasses,
        className
      )}
      {...props}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full inline-block shrink-0', getDotColor())} />}
      {children}
    </span>
  );
}
