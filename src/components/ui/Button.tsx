import React from 'react';
import { cn } from '@/utils/cn';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'subtle';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'sm',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const getVariantStyles = () => {
      switch (variant) {
        case 'primary':
          return 'bg-zoho-orange text-white hover:bg-zoho-orange-hover focus-visible:ring-zoho-orange shadow-zoho-sm active:bg-zoho-orange-dark';
        case 'secondary':
          return 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700';
        case 'outline':
          return 'bg-transparent border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60';
        case 'danger':
          return 'bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-500 shadow-zoho-sm';
        case 'subtle':
          return 'bg-orange-50 dark:bg-orange-950/30 text-zoho-orange dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/40 border border-orange-200/60 dark:border-orange-800/40';
        case 'ghost':
        default:
          return 'bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800';
      }
    };

    const getSizeStyles = () => {
      switch (size) {
        case 'xs':
          return 'px-2 py-1 text-2xs rounded gap-1';
        case 'sm':
          return 'px-2.5 py-1.5 text-xs font-medium rounded-md gap-1.5';
        case 'md':
          return 'px-3.5 py-2 text-sm font-medium rounded-md gap-2';
        case 'lg':
          return 'px-4 py-2.5 text-base font-medium rounded-lg gap-2';
      }
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center transition-all duration-150 select-none font-sans outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]',
          getVariantStyles(),
          getSizeStyles(),
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
