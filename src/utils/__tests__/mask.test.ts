import { describe, it, expect } from 'vitest';
import {
  maskTaxId,
  formatFullTaxId,
  truncateId,
  formatBankAccount,
} from '../mask';

describe('mask utils', () => {
  describe('maskTaxId', () => {
    it('should mask CPF keeping first 3 and last 2 digits', () => {
      expect(maskTaxId('12345678900')).toBe('123.***.***-00');
      expect(maskTaxId('123.456.789-00')).toBe('123.***.***-00');
    });

    it('should mask CNPJ keeping first 2 and branch/verification digits', () => {
      expect(maskTaxId('12345678000199')).toBe('12.***.***/0001-99');
      expect(maskTaxId('12.345.678/0001-99')).toBe('12.***.***/0001-99');
    });

    it('should handle invalid or irregular lengths', () => {
      expect(maskTaxId('12345678')).toBe('123***78');
      expect(maskTaxId('123')).toBe('123');
      expect(maskTaxId(null)).toBe('-');
      expect(maskTaxId(undefined)).toBe('-');
    });
  });

  describe('formatFullTaxId', () => {
    it('should format full CPF without masking', () => {
      expect(formatFullTaxId('12345678900')).toBe('123.456.789-00');
    });

    it('should format full CNPJ without masking', () => {
      expect(formatFullTaxId('12345678000199')).toBe('12.345.678/0001-99');
    });

    it('should return raw value for null, undefined or irregular length', () => {
      expect(formatFullTaxId(null)).toBe('-');
      expect(formatFullTaxId('123')).toBe('123');
    });
  });

  describe('truncateId', () => {
    it('should truncate long ID keeping start and end characters', () => {
      expect(truncateId('5849201938472910', 6, 4)).toBe('584920...2910');
      expect(truncateId('inv_01j9a8b1c2d3e4f5a6b7c8d9e0', 4, 4)).toBe('inv_...d9e0');
    });

    it('should not truncate IDs shorter than start + end', () => {
      expect(truncateId('short-id', 6, 4)).toBe('short-id');
    });

    it('should handle null or undefined', () => {
      expect(truncateId(null)).toBe('-');
      expect(truncateId(undefined)).toBe('-');
    });
  });

  describe('formatBankAccount', () => {
    it('should return formatted bank account string', () => {
      expect(formatBankAccount('6341103083192320')).toBe('6341103083192320');
      expect(formatBankAccount(null)).toBe('-');
    });
  });
});
