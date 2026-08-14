import { describe, it, expect } from 'vitest';
import { cn } from '../cn';

describe('cn utility', () => {
  it('should merge class names properly and resolve Tailwind conflicts', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
  });

  it('should handle conditionals and undefined values', () => {
    const isActive = true;
    const isHidden = false;
    expect(cn('base-class', isActive && 'is-active', isHidden && 'is-hidden', undefined, null)).toBe(
      'base-class is-active'
    );
  });
});
