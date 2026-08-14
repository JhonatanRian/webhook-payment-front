import { SchedulerMode } from '../types';
import { useChangeMode } from '../api';
import { Card } from '@/components/ui/Card';
import { Repeat, Zap } from 'lucide-react';

interface ModeSwitchProps {
  currentMode: SchedulerMode;
}

export function ModeSwitch({ currentMode }: ModeSwitchProps) {
  const changeModeMutation = useChangeMode();

  const handleModeSelect = (mode: SchedulerMode) => {
    if (mode !== currentMode) {
      changeModeMutation.mutate({ mode });
    }
  };

  return (
    <Card padding="md" className="space-y-3">
      <div>
        <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-100 uppercase tracking-wider font-mono">
          Modo de Operação do Agendador
        </h4>
        <p className="text-2xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted mt-0.5">
          Defina o comportamento do ciclo de emissão e liquidação.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {/* Recurring Mode */}
        <button
          type="button"
          onClick={() => handleModeSelect('recurring')}
          disabled={changeModeMutation.isPending}
          className={`p-3 rounded-lg border text-left transition-all flex items-start gap-3 ${
            currentMode === 'recurring'
              ? 'border-zoho-blue bg-blue-50/50 dark:bg-blue-950/40 shadow-xs'
              : 'border-zoho-slate-border dark:border-zoho-slate-darkBorder bg-slate-50/40 dark:bg-slate-900/30 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <div
            className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${
              currentMode === 'recurring'
                ? 'bg-zoho-blue text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
            }`}
          >
            <Repeat className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-xs text-slate-900 dark:text-white">
                Recorrente (24h)
              </span>
              {currentMode === 'recurring' && (
                <span className="text-2xs text-zoho-orange font-bold font-mono">ATIVO</span>
              )}
            </div>
            <p className="text-2xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted mt-0.5">
              Executa 8 ciclos a cada 3 horas durante o período de 24 horas.
            </p>
          </div>
        </button>

        {/* Once Mode */}
        <button
          type="button"
          onClick={() => handleModeSelect('once')}
          disabled={changeModeMutation.isPending}
          className={`p-3 rounded-lg border text-left transition-all flex items-start gap-3 ${
            currentMode === 'once'
              ? 'border-zoho-blue bg-blue-50/50 dark:bg-blue-950/40 shadow-xs'
              : 'border-zoho-slate-border dark:border-zoho-slate-darkBorder bg-slate-50/40 dark:bg-slate-900/30 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <div
            className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${
              currentMode === 'once'
                ? 'bg-zoho-blue text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-xs text-slate-900 dark:text-white">
                Ciclo Único (Once)
              </span>
              {currentMode === 'once' && (
                <span className="text-2xs text-zoho-orange font-bold font-mono">ATIVO</span>
              )}
            </div>
            <p className="text-2xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted mt-0.5">
              Dispara 1 lote único imediatamente e encerra o ciclo.
            </p>
          </div>
        </button>
      </div>
    </Card>
  );
}
