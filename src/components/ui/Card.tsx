import React from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'flat' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({
  variant = 'default',
  padding = 'md',
  className,
  children,
  ...props
}: CardProps) {
  const getPaddingStyles = () => {
    switch (padding) {
      case 'none':
        return 'p-0';
      case 'sm':
        return 'p-3';
      case 'lg':
        return 'p-6';
      case 'md':
      default:
        return 'p-4 sm:p-5';
    }
  };

  return (
    <div
      className={cn(
        'bg-zoho-slate-card dark:bg-zoho-slate-darkCard border border-zoho-slate-border dark:border-zoho-slate-darkBorder rounded-lg transition-colors',
        variant === 'default' && 'shadow-zoho-card',
        getPaddingStyles(),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center justify-between pb-3 mb-3 border-b border-zoho-slate-border dark:border-zoho-slate-darkBorder', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-sm font-semibold text-slate-800 dark:text-slate-100 tracking-tight', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted mt-0.5', className)}
      {...props}
    >
      {children}
    </p>
  );
}
