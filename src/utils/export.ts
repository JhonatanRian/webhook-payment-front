export interface ExportColumn<T> {
  key: string;
  header: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform?: (value: any, item: T) => string | number;
}

/**
 * Dispara o download de um arquivo no navegador
 */
export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Exporta array de objetos para CSV com suporte a colunas customizadas e formatação
 */
export function exportToCsv<T>(
  data: T[],
  filename: string,
  columns?: ExportColumn<T>[]
) {
  if (!data || data.length === 0) {
    throw new Error('Nenhum dado disponível para exportação.');
  }

  let headers: string[] = [];
  let rows: string[][] = [];

  if (columns && columns.length > 0) {
    headers = columns.map((c) => `"${c.header.replace(/"/g, '""')}"`);
    rows = data.map((item) => {
      return columns.map((col) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rawVal = (item as any)[col.key];
        const val = col.transform ? col.transform(rawVal, item) : rawVal;
        const stringVal = val === null || val === undefined ? '' : String(val);
        return `"${stringVal.replace(/"/g, '""')}"`;
      });
    });
  } else {
    // Pegar chaves do primeiro objeto
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const keys = Object.keys(data[0] as any);
    headers = keys.map((k) => `"${k.replace(/"/g, '""')}"`);
    rows = data.map((item) => {
      return keys.map((k) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const val = (item as any)[k];
        const stringVal = val === null || val === undefined ? '' : String(val);
        return `"${stringVal.replace(/"/g, '""')}"`;
      });
    });
  }

  // BOM para garantir correta abertura de acentos no Excel
  const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\r\n');
  const safeFilename = filename.endsWith('.csv') ? filename : `${filename}.csv`;

  downloadFile(csvContent, safeFilename, 'text/csv');
}

/**
 * Exporta array de objetos para arquivo JSON formatado
 */
export function exportToJson<T>(data: T[], filename: string) {
  if (!data || data.length === 0) {
    throw new Error('Nenhum dado disponível para exportação.');
  }

  const jsonContent = JSON.stringify(data, null, 2);
  const safeFilename = filename.endsWith('.json') ? filename : `${filename}.json`;

  downloadFile(jsonContent, safeFilename, 'application/json');
}
