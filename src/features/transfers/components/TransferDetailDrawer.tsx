import { TransferRecord } from '../types';
import { Drawer, DetailRow, DetailSection } from '@/components/ui/Drawer';
import { Badge } from '@/components/ui/Badge';
import { formatCentsToBRL } from '@/utils/currency';
import { formatDateTime } from '@/utils/date';
import { formatFullTaxId } from '@/utils/mask';
import { Button } from '@/components/ui/Button';
import { exportToJson } from '@/utils/export';
import { Download, ArrowRightLeft } from 'lucide-react';

interface TransferDetailDrawerProps {
  transfer: TransferRecord | null;
  onClose: () => void;
}

export function TransferDetailDrawer({ transfer, onClose }: TransferDetailDrawerProps) {
  if (!transfer) return null;

  return (
    <Drawer
      isOpen={!!transfer}
      onClose={onClose}
      title={
        <span className="flex items-center gap-2">
          <ArrowRightLeft className="w-4 h-4 text-zoho-blue" />
          <span>Transferência de Liquidação</span>
          <Badge variant={transfer.status} dot>
            {transfer.status}
          </Badge>
        </span>
      }
      subtitle={<span>ID Interno: {transfer.id}</span>}
      footer={
        <>
          <Button
            variant="outline"
            size="xs"
            leftIcon={<Download className="w-3 h-3" />}
            onClick={() => exportToJson([transfer], `transfer_${transfer.id}`)}
          >
            Exportar JSON
          </Button>
          <Button variant="secondary" size="xs" onClick={onClose}>
            Fechar
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {/* Financial Flow Highlight */}
        <div className="p-4 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 text-center">
          <div className="text-2xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted uppercase font-mono tracking-wider">
            Valor Líquido Liquidado (PIX)
          </div>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            {formatCentsToBRL(transfer.net_amount)}
          </div>
          <div className="text-2xs text-slate-500 mt-1 font-mono">
            Bruto: {formatCentsToBRL(transfer.amount)} | Taxa: {formatCentsToBRL(transfer.fee)}
          </div>
        </div>

        {/* Section: Conta de Destino */}
        <DetailSection title="Destinatário & Dados Bancários">
          <DetailRow label="Favorecido" value={transfer.target_name} />
          <DetailRow
            label="CNPJ / CPF"
            value={formatFullTaxId(transfer.target_tax_id)}
            copyable
            rawTextToCopy={transfer.target_tax_id}
          />
          <DetailRow label="Banco Destino" value={`ISPB / Código: ${transfer.target_bank_code}`} />
          <DetailRow label="Agência" value={transfer.target_branch} />
          <DetailRow
            label="Conta Corrente"
            value={transfer.target_account}
            copyable
            rawTextToCopy={transfer.target_account}
          />
          <DetailRow label="Tipo de Conta" value={transfer.target_account_type} />
        </DetailSection>

        {/* Section: Rastreabilidade Webhook & Stark */}
        <DetailSection title="Rastreabilidade Stark Bank">
          <DetailRow
            label="Stark Transfer ID"
            value={transfer.stark_transfer_id || 'Não emitido'}
            copyable={!!transfer.stark_transfer_id}
            rawTextToCopy={transfer.stark_transfer_id || ''}
          />
          <DetailRow
            label="Stark Invoice ID Origem"
            value={transfer.stark_invoice_id || '-'}
            copyable={!!transfer.stark_invoice_id}
            rawTextToCopy={transfer.stark_invoice_id || ''}
          />
          <DetailRow
            label="Webhook Event ID"
            value={transfer.event_id || '-'}
            copyable={!!transfer.event_id}
            rawTextToCopy={transfer.event_id || ''}
          />
          <DetailRow label="Data da Liquidação" value={formatDateTime(transfer.created)} />
        </DetailSection>

        {/* Section: Payload Bruto */}
        <DetailSection title="Payload JSON Bruto">
          <pre className="text-2xs bg-slate-900 text-slate-100 p-3 rounded-md overflow-x-auto font-mono max-h-48">
            {JSON.stringify(transfer, null, 2)}
          </pre>
        </DetailSection>
      </div>
    </Drawer>
  );
}
