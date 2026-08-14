import { describe, it, expect } from 'vitest';
import {
  formatDateTime,
  formatDateOnly,
  formatTimeOnly,
  formatSecondsToCountdown,
  formatRelativeTime,
} from '../date';

describe('date utils', () => {
  const sampleIso = '2026-08-14T14:30:45.000Z';

  describe('formatDateTime', () => {
    it('should format ISO string into pt-BR date and time', () => {
      const result = formatDateTime(sampleIso);
      expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/);
      expect(result).toMatch(/\d{2}:\d{2}/);
    });

    it('should return "-" for empty or null inputs', () => {
      expect(formatDateTime(null)).toBe('-');
      expect(formatDateTime(undefined)).toBe('-');
      expect(formatDateTime('')).toBe('-');
    });

    it('should return raw input for invalid date string', () => {
      expect(formatDateTime('invalid-date')).toBe('invalid-date');
    });
  });

  describe('formatDateOnly', () => {
    it('should format date part only', () => {
      const result = formatDateOnly(sampleIso);
      expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });

    it('should return "-" for empty or null inputs', () => {
      expect(formatDateOnly(null)).toBe('-');
      expect(formatDateOnly(undefined)).toBe('-');
    });
  });

  describe('formatTimeOnly', () => {
    it('should format time only', () => {
      const result = formatTimeOnly(sampleIso);
      expect(result).toMatch(/\d{2}:\d{2}/);
    });

    it('should format time with seconds if requested', () => {
      const result = formatTimeOnly(sampleIso, true);
      expect(result).toMatch(/\d{2}:\d{2}:\d{2}/);
    });

    it('should return "-" for empty or null inputs', () => {
      expect(formatTimeOnly(null)).toBe('-');
    });
  });

  describe('formatSecondsToCountdown', () => {
    it('should format seconds into MM:SS', () => {
      expect(formatSecondsToCountdown(65)).toBe('01:05');
      expect(formatSecondsToCountdown(5)).toBe('00:05');
      expect(formatSecondsToCountdown(59)).toBe('00:59');
    });

    it('should format seconds into HH:MM:SS when >= 3600', () => {
      expect(formatSecondsToCountdown(3665)).toBe('01:01:05');
      expect(formatSecondsToCountdown(7200)).toBe('02:00:00');
    });

    it('should return 00:00 for zero or negative values', () => {
      expect(formatSecondsToCountdown(0)).toBe('00:00');
      expect(formatSecondsToCountdown(-10)).toBe('00:00');
    });
  });

  describe('formatRelativeTime', () => {
    it('should return relative time string', () => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      expect(formatRelativeTime(fiveMinutesAgo)).toContain('minuto');
    });

    it('should return "-" for null or invalid inputs', () => {
      expect(formatRelativeTime(null)).toBe('-');
      expect(formatRelativeTime(undefined)).toBe('-');
    });
  });
});
