import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useIssueBatch } from '../api';
import { Sparkles, Layers } from 'lucide-react';

interface IssueBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function IssueBatchModal({ isOpen, onClose }: IssueBatchModalProps) {
  const [count, setCount] = useState<number>(10);
  const [isRandomMode, setIsRandomMode] = useState<boolean>(true);
  const issueBatchMutation = useIssueBatch();

  const handleIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalCount = isRandomMode ? Math.floor(Math.random() * 5) + 8 : count;
    await issueBatchMutation.mutateAsync({ count: finalCount });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <span className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-zoho-blue" />
          <span>Emitir Lote de Faturas Pix</span>
        </span>
      }
      description="Gere um novo lote de cobranças com envio em massa para a Stark Bank."
      footer={
        <>
          <Button variant="secondary" size="xs" onClick={onClose} disabled={issueBatchMutation.isPending}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            size="xs"
            leftIcon={<Sparkles className="w-3.5 h-3.5" />}
            isLoading={issueBatchMutation.isPending}
            onClick={handleIssue}
          >
            Emitir Lote Agora
          </Button>
        </>
      }
    >
      <form onSubmit={handleIssue} className="space-y-4">
        {/* Toggle Mode */}
        <div className="flex rounded-lg border border-zoho-slate-border dark:border-zoho-slate-darkBorder p-1 bg-slate-50 dark:bg-slate-900/50">
          <button
            type="button"
            onClick={() => setIsRandomMode(true)}
            className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
              isRandomMode
                ? 'bg-white dark:bg-slate-800 text-zoho-blue shadow-xs font-semibold'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Aleatório Padrão (8 a 12)
          </button>
          <button
            type="button"
            onClick={() => setIsRandomMode(false)}
            className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
              !isRandomMode
                ? 'bg-white dark:bg-slate-800 text-zoho-blue shadow-xs font-semibold'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Quantidade Customizada
          </button>
        </div>

        {/* Custom Count Input */}
        {!isRandomMode && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label htmlFor="batch-count" className="font-medium text-slate-700 dark:text-slate-300">
                Quantidade de faturas:
              </label>
              <span className="font-mono font-bold text-zoho-blue">{count} faturas</span>
            </div>
            <input
              id="batch-count"
              type="range"
              min={1}
              max={50}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-zoho-blue"
            />
            <div className="flex justify-between text-2xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted font-mono">
              <span>1</span>
              <span>25</span>
              <span>50 máx</span>
            </div>
          </div>
        )}

        {/* Info Banner */}
        <div className="p-3 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded-lg text-2xs text-slate-600 dark:text-slate-300">
          <p>
            ℹ️ Cada fatura terá pagador aleatório gerado (com CPF válido), valor dinâmico entre R$ 50,00 e R$ 500,00 e registro assinado criptograficamente via Stark SDK.
          </p>
        </div>
      </form>
    </Modal>
  );
}
