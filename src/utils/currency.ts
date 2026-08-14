/**
 * Formata valor em centavos para Real brasileiro (BRL).
 * Exemplo: 15000 -> "R$ 150,00"
 */
export function formatCentsToBRL(cents: number | null | undefined): string {
  if (cents === null || cents === undefined || isNaN(cents)) {
    return 'R$ 0,00';
  }

  const valueInReais = cents / 100;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valueInReais);
}

/**
 * Converte valor em centavos para número decimal em Reais.
 * Exemplo: 15000 -> 150.00
 */
export function centsToDecimal(cents: number | null | undefined): number {
  if (!cents || isNaN(cents)) return 0;
  return cents / 100;
}
