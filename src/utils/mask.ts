/**
 * Aplica máscara de proteção em CPF ou CNPJ.
 * Exemplo CPF: 12345678900 -> 123.***.***-00
 * Exemplo CNPJ: 12345678000199 -> 12.***.*** / 0001-99
 */
export function maskTaxId(taxId: string | null | undefined): string {
  if (!taxId) return '-';
  const clean = taxId.replace(/\D/g, '');

  if (clean.length === 11) {
    // CPF
    return `${clean.slice(0, 3)}.***.***-${clean.slice(9)}`;
  } else if (clean.length === 14) {
    // CNPJ
    return `${clean.slice(0, 2)}.***.***/${clean.slice(8, 12)}-${clean.slice(12)}`;
  }

  // Fallback se não bater tamanho exato
  if (clean.length > 6) {
    return `${clean.slice(0, 3)}***${clean.slice(-2)}`;
  }
  return taxId;
}

/**
 * Formata CPF ou CNPJ completo (sem máscara de ocultação).
 */
export function formatFullTaxId(taxId: string | null | undefined): string {
  if (!taxId) return '-';
  const clean = taxId.replace(/\D/g, '');

  if (clean.length === 11) {
    return clean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else if (clean.length === 14) {
    return clean.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  return taxId;
}

/**
 * Encurta IDs longos mantendo início e fim.
 * Exemplo: "5839201938472910" -> "5839...2910"
 */
export function truncateId(id: string | null | undefined, start = 6, end = 4): string {
  if (!id) return '-';
  if (id.length <= start + end) return id;
  return `${id.slice(0, start)}...${id.slice(-end)}`;
}

/**
 * Formata conta bancária com dígito verificador se aplicável
 */
export function formatBankAccount(account: string | null | undefined): string {
  if (!account) return '-';
  return account;
}
