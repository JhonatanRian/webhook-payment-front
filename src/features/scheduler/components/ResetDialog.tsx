import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useResetCycles } from '../api';
import { AlertTriangle } from 'lucide-react';

interface ResetDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResetDialog({ isOpen, onClose }: ResetDialogProps) {
  const resetMutation = useResetCycles();

  const handleReset = async () => {
    await resetMutation.mutateAsync();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <span className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
          <AlertTriangle className="w-4 h-4" />
          <span>Resetar Ciclos do Agendador</span>
        </span>
      }
      description="Esta ação redefinirá a contagem de ciclos de 24 horas no banco de dados."
      footer={
        <>
          <Button variant="secondary" size="xs" onClick={onClose} disabled={resetMutation.isPending}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            size="xs"
            isLoading={resetMutation.isPending}
            onClick={handleReset}
          >
            Confirmar Reset
          </Button>
        </>
      }
    >
      <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
        <p>
          Ao confirmar, os seguintes parâmetros serão reinicializados:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-500 dark:text-slate-400 font-mono text-2xs">
          <li>Contador de ciclos automáticos completados = 0</li>
          <li>Contador de ciclos manuais = 0</li>
          <li>Ciclos restantes = 8 (24h)</li>
          <li>Status de execução e agendamento recalculados</li>
        </ul>
        <p className="font-medium text-slate-700 dark:text-slate-200">
          Faturas e transferências já liquidadas não serão apagadas.
        </p>
      </div>
    </Modal>
  );
}
