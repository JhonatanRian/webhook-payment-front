import { describe, it, expect } from 'vitest';
import { render, screen, userEvent } from '@/test/test-utils';
import { ThemeToggle } from '../ThemeToggle';

describe('ThemeToggle UI component', () => {
  it('should toggle theme from light to dark on click', async () => {
    localStorage.setItem('app-theme', 'light');
    render(<ThemeToggle />);

    const button = screen.getByRole('button', { name: /alternar tema/i });
    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    expect(localStorage.getItem('app-theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    await userEvent.click(button);
    expect(localStorage.getItem('app-theme')).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
