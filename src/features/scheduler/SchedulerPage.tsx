import { useState } from 'react';
import { useSchedulerStatus, useTriggerCycle } from './api';
import { CycleProgressRing } from './components/CycleProgressRing';
import { NextRunCountdown } from './components/NextRunCountdown';
import { ModeSwitch } from './components/ModeSwitch';
import { ResetDialog } from './components/ResetDialog';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Clock, Play, RotateCcw, ShieldCheck, Zap } from 'lucide-react';

export function SchedulerPage() {
  const { data: status, isLoading } = useSchedulerStatus();
  const triggerCycleMutation = useTriggerCycle();
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zoho-slate-border dark:border-zoho-slate-darkBorder">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Clock className="w-5 h-5 text-zoho-blue" />
            <span>Agendador de Ciclos 24 Horas</span>
          </h1>
          <p className="text-xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted mt-0.5">
            Automação periódica de emissão de lotes Pix e orquestração de liquidações Stark Bank.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            onClick={() => setIsResetDialogOpen(true)}
          >
            Resetar Ciclos
          </Button>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<Play className="w-3.5 h-3.5 fill-white" />}
            isLoading={triggerCycleMutation.isPending}
            onClick={() => triggerCycleMutation.mutate()}
          >
            Disparar Ciclo Manual
          </Button>
        </div>
      </div>

      {isLoading || !status ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="h-40 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
          <div className="h-40 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Main Top Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <NextRunCountdown
              nextRunTime={status.next_run_time}
              isRunning={status.is_running}
            />
            <ModeSwitch currentMode={status.mode} />
          </div>

          {/* 8-Cycle Visual Progress */}
          <CycleProgressRing status={status} />

          {/* Architecture Pipeline Explanation */}
          <Card padding="md" className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-100 uppercase tracking-wider font-mono flex items-center gap-2">
              <Zap className="w-4 h-4 text-zoho-blue" />
              <span>Como Funciona o Ciclo de 24 Horas</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-zoho-slate-border dark:border-zoho-slate-darkBorder">
                <span className="font-semibold text-slate-800 dark:text-slate-100 block mb-1 font-mono">
                  1. Emissão de Cobranças Pix
                </span>
                <p className="text-2xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted leading-relaxed">
                  A cada 3 horas, um lote com 8 a 12 faturas Pix aleatórias é emitido via Stark Bank SDK e assinado com chave privada ECDSA.
                </p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-zoho-slate-border dark:border-zoho-slate-darkBorder">
                <span className="font-semibold text-slate-800 dark:text-slate-100 block mb-1 font-mono">
                  2. Webhook & Validação Criptográfica
                </span>
                <p className="text-2xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted leading-relaxed">
                  Quando o pagador quita a fatura no Sandbox, a Stark Bank envia um webhook assinado digitalmente (`Digital-Signature`).
                </p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-zoho-slate-border dark:border-zoho-slate-darkBorder">
                <span className="font-semibold text-slate-800 dark:text-slate-100 block mb-1 font-mono">
                  3. Liquidação Automática
                </span>
                <p className="text-2xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted leading-relaxed">
                  Ao receber o evento `invoice/credited`, o backend dispara imediatamente uma transferência Pix para a conta Stark da empresa.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 text-2xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Garantia de Idempotência & RFC 7807 Error Handling Ativos</span>
            </div>
          </Card>
        </div>
      )}

      {/* Reset Confirmation Dialog */}
      <ResetDialog
        isOpen={isResetDialogOpen}
        onClose={() => setIsResetDialogOpen(false)}
      />
    </div>
  );
}
