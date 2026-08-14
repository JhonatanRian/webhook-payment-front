import { Invoice } from '../types';
import { Drawer, DetailRow, DetailSection } from '@/components/ui/Drawer';
import { Badge } from '@/components/ui/Badge';
import { formatCentsToBRL } from '@/utils/currency';
import { formatDateTime } from '@/utils/date';
import { formatFullTaxId } from '@/utils/mask';
import { Button } from '@/components/ui/Button';
import { exportToJson } from '@/utils/export';
import { Download } from 'lucide-react';

interface InvoiceDetailDrawerProps {
  invoice: Invoice | null;
  onClose: () => void;
}

export function InvoiceDetailDrawer({ invoice, onClose }: InvoiceDetailDrawerProps) {
  if (!invoice) return null;

  return (
    <Drawer
      isOpen={!!invoice}
      onClose={onClose}
      title={
        <span className="flex items-center gap-2">
          <span>Detalhes da Fatura</span>
          <Badge variant={invoice.status} dot>
            {invoice.status}
          </Badge>
        </span>
      }
      subtitle={<span>ID Interno: {invoice.id}</span>}
      footer={
        <>
          <Button
            variant="outline"
            size="xs"
            leftIcon={<Download className="w-3 h-3" />}
            onClick={() => exportToJson([invoice], `invoice_${invoice.id}`)}
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
        {/* Financial Summary Highlight */}
        <div className="p-4 rounded-lg bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-center">
          <div className="text-2xs text-zoho-slate-muted dark:text-zoho-slate-darkMuted uppercase font-mono tracking-wider">
            Valor da Cobrança Pix
          </div>
          <div className="text-2xl font-bold text-zoho-blue dark:text-blue-400 mt-1">
            {formatCentsToBRL(invoice.amount)}
          </div>
        </div>

        {/* Section: Pagador & Destinatário */}
        <DetailSection title="Dados do Pagador">
          <DetailRow label="Nome Completo" value={invoice.name} />
          <DetailRow
            label="CPF / CNPJ"
            value={formatFullTaxId(invoice.tax_id)}
            copyable
            rawTextToCopy={invoice.tax_id}
          />
        </DetailSection>

        {/* Section: Identificadores e Integração Stark Bank */}
        <DetailSection title="Rastreabilidade & IDs">
          <DetailRow
            label="Stark Invoice ID"
            value={invoice.stark_invoice_id || 'Não emitido'}
            copyable={!!invoice.stark_invoice_id}
            rawTextToCopy={invoice.stark_invoice_id || ''}
          />
          <DetailRow
            label="Lote de Origem"
            value={invoice.batch_id || 'Emissão avulsa'}
            copyable={!!invoice.batch_id}
            rawTextToCopy={invoice.batch_id || ''}
          />
          <DetailRow label="Data de Criação" value={formatDateTime(invoice.created)} />
        </DetailSection>

        {/* Section: Payload Bruto */}
        <DetailSection title="Payload JSON Bruto">
          <pre className="text-2xs bg-slate-900 text-slate-100 p-3 rounded-md overflow-x-auto font-mono max-h-48">
            {JSON.stringify(invoice, null, 2)}
          </pre>
        </DetailSection>
      </div>
    </Drawer>
  );
}
