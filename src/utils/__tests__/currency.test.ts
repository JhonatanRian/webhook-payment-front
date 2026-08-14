import { describe, it, expect } from 'vitest';
import { formatCentsToBRL, centsToDecimal } from '../currency';

describe('currency utils', () => {
  describe('formatCentsToBRL', () => {
    it('should format cents into Brazilian Real (BRL) string', () => {
      const result = formatCentsToBRL(15000);
      // Normalized match for non-breaking spaces in Intl formatting
      expect(result.replace(/\u00a0/g, ' ')).toBe('R$ 150,00');
    });

    it('should format zero cents correctly', () => {
      const result = formatCentsToBRL(0);
      expect(result.replace(/\u00a0/g, ' ')).toBe('R$ 0,00');
    });

    it('should format fractional cents correctly', () => {
      const result = formatCentsToBRL(99);
      expect(result.replace(/\u00a0/g, ' ')).toBe('R$ 0,99');
    });

    it('should format large amounts correctly with thousands separator', () => {
      const result = formatCentsToBRL(100000000);
      expect(result.replace(/\u00a0/g, ' ')).toBe('R$ 1.000.000,00');
    });

    it('should handle null, undefined and NaN gracefully', () => {
      expect(formatCentsToBRL(null).replace(/\u00a0/g, ' ')).toBe('R$ 0,00');
      expect(formatCentsToBRL(undefined).replace(/\u00a0/g, ' ')).toBe('R$ 0,00');
      expect(formatCentsToBRL(NaN).replace(/\u00a0/g, ' ')).toBe('R$ 0,00');
    });
  });

  describe('centsToDecimal', () => {
    it('should convert cents to decimal number', () => {
      expect(centsToDecimal(15000)).toBe(150.0);
      expect(centsToDecimal(99)).toBe(0.99);
      expect(centsToDecimal(0)).toBe(0);
      expect(centsToDecimal(null)).toBe(0);
      expect(centsToDecimal(undefined)).toBe(0);
      expect(centsToDecimal(NaN)).toBe(0);
    });
  });
});
