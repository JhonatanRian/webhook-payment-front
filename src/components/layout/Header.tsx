import { Menu, Play, Activity } from 'lucide-react';
import { PulseTimer } from '../ui/PulseTimer';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useHealthCheck, useSchedulerStatus, useTriggerCycle } from '@/features/scheduler/api';

interface HeaderProps {
  onOpenSidebar: () => void;
}

export function Header({ onOpenSidebar }: HeaderProps) {
  const { data: health } = useHealthCheck();
  const { data: scheduler } = useSchedulerStatus();
  const triggerCycleMutation = useTriggerCycle();

  const isHealthy = health?.status === 'healthy' || health?.status === 'ok';

  return (
    <header className="sticky top-0 z-30 h-11 bg-white/95 dark:bg-zoho-slate-darkCard/95 backdrop-blur-md border-b border-zoho-slate-border dark:border-zoho-slate-darkBorder px-3 sm:px-5 flex items-center justify-between transition-colors">
      {/* Left: Mobile Toggle & Status */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="p-1.5 -ml-1.5 rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
          aria-label="Abrir menu de navegação"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Health status badge */}
        <div className="hidden sm:flex items-center gap-2">
          <Badge
            variant={isHealthy ? 'success' : 'failed'}
            size="sm"
            dot
            title="Status da API Backend"
          >
            <Activity className="w-3 h-3 mr-0.5 inline" />
            {isHealthy ? 'API Online' : 'API Indisponível'}
          </Badge>
        </div>

        {/* Scheduler Quick Status Pill */}
        {scheduler && (
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 rounded-full border border-zoho-slate-border dark:border-zoho-slate-darkBorder text-2xs text-slate-700 dark:text-slate-300 font-mono">
            <span className="text-zoho-blue font-semibold">
              Auto {scheduler.scheduled_cycles_completed}/{scheduler.max_cycles}
            </span>
            {scheduler.manual_triggers_completed > 0 && (
              <>
                <span className="text-slate-300 dark:text-slate-600">·</span>
                <span className="text-zoho-orange dark:text-orange-400 font-semibold">
                  {scheduler.manual_triggers_completed} manual{scheduler.manual_triggers_completed > 1 ? 'is' : ''}
                </span>
              </>
            )}
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className="text-zoho-slate-muted dark:text-zoho-slate-darkMuted uppercase">
              {scheduler.mode === 'recurring' ? '24h Recorrente' : 'Modo Único'}
            </span>
          </div>
        )}
      </div>

      {/* Right: Actions, Pulse Timer, Theme Toggle */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Quick trigger cycle button */}
        <Button
          variant="primary"
          size="xs"
          leftIcon={<Play className="w-3 h-3 fill-white" />}
          isLoading={triggerCycleMutation.isPending}
          onClick={() => triggerCycleMutation.mutate()}
          className="hidden sm:inline-flex"
        >
          Disparar Ciclo
        </Button>

        {/* 60s Live Polling Indicator */}
        <PulseTimer intervalSeconds={60} />

        <div className="h-5 w-px bg-zoho-slate-border dark:bg-zoho-slate-darkBorder" />

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
}
