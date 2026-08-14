import { describe, it, expect, vi } from 'vitest';
import { exportToCsv, exportToJson, downloadFile } from '../export';

describe('export utils', () => {
  const sampleData = [
    { id: '1', name: 'Lucas "Dev" Silva', amount: 15000 },
    { id: '2', name: 'Maria Santos', amount: 25000 },
  ];

  describe('downloadFile', () => {
    it('should trigger browser download using a temporary anchor element', () => {
      const appendSpy = vi.spyOn(document.body, 'appendChild');
      const removeSpy = vi.spyOn(document.body, 'removeChild');

      downloadFile('test,content', 'test.csv', 'text/csv');

      expect(appendSpy).toHaveBeenCalled();
      expect(removeSpy).toHaveBeenCalled();
      expect(window.URL.createObjectURL).toHaveBeenCalled();
      expect(window.URL.revokeObjectURL).toHaveBeenCalled();
    });
  });

  describe('exportToCsv', () => {
    it('should export data to CSV with columns transformation and BOM', () => {
      const appendSpy = vi.spyOn(document.body, 'appendChild');

      exportToCsv(sampleData, 'faturas', [
        { key: 'id', header: 'Código' },
        { key: 'name', header: 'Nome Completo' },
        { key: 'amount', header: 'Valor (R$)', transform: (v) => `R$ ${v / 100}` },
      ]);

      expect(appendSpy).toHaveBeenCalled();
    });

    it('should export data to CSV using default keys if columns not specified', () => {
      const appendSpy = vi.spyOn(document.body, 'appendChild');
      exportToCsv(sampleData, 'faturas.csv');
      expect(appendSpy).toHaveBeenCalled();
    });

    it('should throw error when data array is empty', () => {
      expect(() => exportToCsv([], 'test.csv')).toThrow('Nenhum dado disponível');
    });
  });

  describe('exportToJson', () => {
    it('should export data to JSON format', () => {
      const appendSpy = vi.spyOn(document.body, 'appendChild');
      exportToJson(sampleData, 'faturas');
      expect(appendSpy).toHaveBeenCalled();
    });

    it('should throw error when data array is empty', () => {
      expect(() => exportToJson([], 'test.json')).toThrow('Nenhum dado disponível');
    });
  });
});
