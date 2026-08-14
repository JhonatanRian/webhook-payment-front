import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { formatDateTime, formatSecondsToCountdown } from '@/utils/date';
import { Clock, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useTriggerCycle } from '../api';

interface NextRunCountdownProps {
  nextRunTime: string | null;
  isRunning: boolean;
}

export function NextRunCountdown({ nextRunTime, isRunning }: NextRunCountdownProps) {
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const triggerCycleMutation = useTriggerCycle();

  useEffect(() => {
    if (!nextRunTime) {
      setSecondsLeft(0);
      return;
    }

    const updateDiff = () => {
      const target = new Date(nextRunTime).getTime();
      const now = Date.now();
      const diff = Math.max(0, Math.floor((target - now) / 1000));
      setSecondsLeft(diff);
    };

    updateDiff();
    const interval = setInterval(updateDiff, 1000);
    return () => clearInterval(interval);
  }, [nextRunTime]);

  return (
    <Card padding="md" className="flex flex-col justify-between">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-2xs font-semibold uppercase tracking-wider text-zoho-slate-muted dark:text-zoho-slate-darkMuted font-mono flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-zoho-blue" />
            <span>Próxima Execução Automática</span>
          </span>
          <span className="inline-flex items-center gap-1 text-2xs font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 text-zoho-blue dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            {isRunning ? 'Agendador Ativo' : 'Pausado'}
          </span>
        </div>

        <div className="py-3 text-center sm:text-left">
          <div className="text-3xl sm:text-4xl font-bold font-mono text-slate-900 dark:text-white tracking-tight">
            {nextRunTime ? formatSecondsToCountdown(secondsLeft) : '--:--:--'}
          </div>
          <div className="text-2xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted font-mono mt-1">
            Programado para: {formatDateTime(nextRunTime)}
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-zoho-slate-border dark:border-zoho-slate-darkBorder flex items-center justify-between gap-2">
        <span className="text-2xs text-slate-500">
          Antecipar ciclo sem aguardar o temporizador:
        </span>
        <Button
          variant="outline"
          size="xs"
          leftIcon={<PlayCircle className="w-3.5 h-3.5 text-zoho-blue" />}
          isLoading={triggerCycleMutation.isPending}
          onClick={() => triggerCycleMutation.mutate()}
        >
          Executar Agora
        </Button>
      </div>
    </Card>
  );
}
