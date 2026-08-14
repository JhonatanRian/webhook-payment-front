import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Receipt,
  ArrowRightLeft,
  Clock,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { cn } from '@/utils/cn';

const navigation = [
  { name: 'Visão Geral', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Faturas Pix', href: '/invoices', icon: Receipt },
  { name: 'Transferências', href: '/transfers', icon: ArrowRightLeft },
  { name: 'Agendador 24h', href: '/scheduler', icon: Clock },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-screen w-56 bg-white dark:bg-zoho-slate-darkCard border-r border-zoho-slate-border dark:border-zoho-slate-darkBorder flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Brand Header */}
        <div className="h-12 flex items-center justify-between px-4 border-b border-zoho-slate-border dark:border-zoho-slate-darkBorder bg-slate-50/50 dark:bg-slate-900/30">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-zoho-orange flex items-center justify-center text-white shadow-zoho-sm">
              <Zap className="w-3.5 h-3.5 fill-white" />
            </div>
            <div>
              <span className="font-bold text-sm text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                Stark Webhook
              </span>
              <span className="text-2xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted font-mono block">
                Liquidação 24h
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-3 px-2.5 space-y-0.5 overflow-y-auto">
          <div className="px-2.5 pb-1.5 text-2xs font-semibold uppercase tracking-wider text-zoho-slate-muted dark:text-zoho-slate-darkMuted font-mono">
            Navegação Principal
          </div>
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-all duration-150 group',
                    isActive
                      ? 'bg-zoho-blue-light dark:bg-blue-950/50 text-zoho-blue dark:text-blue-400 font-semibold shadow-2xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={cn(
                        'w-3.5 h-3.5 transition-colors',
                        isActive
                          ? 'text-zoho-blue dark:text-blue-400'
                          : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'
                      )}
                    />
                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Footer Info / Security Badge */}
        <div className="p-2.5 border-t border-zoho-slate-border dark:border-zoho-slate-darkBorder bg-slate-50/50 dark:bg-slate-900/30">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-2 border border-zoho-slate-border dark:border-zoho-slate-darkBorder flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div className="text-2xs">
              <span className="font-semibold text-slate-800 dark:text-slate-100 block">Stark Bank SDK</span>
              <span className="text-zoho-slate-muted dark:text-zoho-slate-darkMuted">ECDSA + Webhook HMAC</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
