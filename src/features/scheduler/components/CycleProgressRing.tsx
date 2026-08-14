import { SchedulerStatus } from '../types';
import { Card } from '@/components/ui/Card';
import { CheckCircle2, Clock } from 'lucide-react';

interface CycleProgressRingProps {
  status: SchedulerStatus;
}

export function CycleProgressRing({ status }: CycleProgressRingProps) {
  const totalCompleted = status.scheduled_cycles_completed + status.manual_triggers_completed;
  const max = status.max_cycles || 8;
  const percentage = Math.min(100, Math.round((totalCompleted / max) * 100));

  return (
    <Card padding="md" className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-100 uppercase tracking-wider font-mono">
            Progresso da Janela de 24 Horas
          </h4>
          <p className="text-2xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted">
            8 ciclos programados (1 lote a cada 3 horas)
          </p>
        </div>
        <span className="text-sm font-bold font-mono text-zoho-blue dark:text-blue-400">
          {percentage}%
        </span>
      </div>

      {/* 8-Segment Cycle Bar */}
      <div className="grid grid-cols-8 gap-1.5">
        {Array.from({ length: max }).map((_, idx) => {
          const cycleNumber = idx + 1;
          const isDone = cycleNumber <= totalCompleted;
          const isCurrent = cycleNumber === totalCompleted + 1 && status.is_running;

          return (
            <div
              key={idx}
              className={`h-10 rounded-md flex flex-col items-center justify-center border transition-all duration-200 ${
                isDone
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700/60 text-emerald-600 dark:text-emerald-400 font-semibold'
                  : isCurrent
                  ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-400 dark:border-blue-700 text-zoho-blue dark:text-blue-400 animate-pulse'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-zoho-slate-border dark:border-zoho-slate-darkBorder text-slate-400'
              }`}
              title={`Ciclo #${cycleNumber} (${(cycleNumber - 1) * 3}h -> ${cycleNumber * 3}h)`}
            >
              <span className="text-2xs font-mono">#{cycleNumber}</span>
              {isDone ? (
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              ) : isCurrent ? (
                <Clock className="w-3 h-3 text-zoho-blue animate-spin" />
              ) : (
                <span className="text-2xs text-slate-300 dark:text-slate-600 font-mono">3h</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend & Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-zoho-slate-border dark:border-zoho-slate-darkBorder text-xs">
        <div>
          <span className="text-2xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted font-mono uppercase block">
            Automáticos
          </span>
          <span className="font-semibold font-mono text-slate-800 dark:text-slate-100">
            {status.scheduled_cycles_completed} / {max}
          </span>
        </div>

        <div>
          <span className="text-2xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted font-mono uppercase block">
            Manuais
          </span>
          <span className="font-semibold font-mono text-zoho-blue dark:text-blue-400">
            {status.manual_triggers_completed}
          </span>
        </div>

        <div>
          <span className="text-2xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted font-mono uppercase block">
            Restantes
          </span>
          <span className="font-semibold font-mono text-amber-600 dark:text-amber-400">
            {status.remaining_cycles}
          </span>
        </div>

        <div>
          <span className="text-2xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted font-mono uppercase block">
            Intervalo
          </span>
          <span className="font-semibold font-mono text-slate-800 dark:text-slate-100">
            {status.interval_minutes} min (3h)
          </span>
        </div>
      </div>
    </Card>
  );
}
