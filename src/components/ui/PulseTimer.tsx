import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface PulseTimerProps {
  intervalSeconds?: number;
}

export function PulseTimer({ intervalSeconds = 60 }: PulseTimerProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(intervalSeconds);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          return intervalSeconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [intervalSeconds]);

  const handleManualRefresh = async () => {
    try {
      setIsRefreshing(true);
      await queryClient.refetchQueries({ type: 'active' });
      setSecondsRemaining(intervalSeconds);
      toast.info('Dados atualizados em tempo real!');
    } catch {
      toast.error('Erro ao sincronizar dados');
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const progressPercent = ((intervalSeconds - secondsRemaining) / intervalSeconds) * 100;

  return (
    <div className="flex items-center gap-2 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-md border border-zoho-slate-border dark:border-zoho-slate-darkBorder text-2xs font-mono">
      {/* Live Pulsing Dot */}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>

      {/* Progress ring/label */}
      <div className="flex items-center gap-1.5 text-zoho-slate-muted dark:text-zoho-slate-darkMuted">
        <span>Sync</span>
        <span className="font-semibold text-slate-700 dark:text-slate-200">
          {secondsRemaining}s
        </span>
      </div>

      {/* Mini Progress Bar */}
      <div className="w-8 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden hidden sm:block">
        <div
          className="h-full bg-zoho-blue transition-all duration-1000 ease-linear rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Manual sync button */}
      <button
        type="button"
        onClick={handleManualRefresh}
        disabled={isRefreshing}
        className="text-slate-400 hover:text-zoho-blue dark:hover:text-blue-400 p-0.5 rounded transition-colors"
        title="Atualizar agora"
      >
        <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-zoho-blue' : ''}`} />
      </button>
    </div>
  );
}
