import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',

      // ✅ Apenas arquivos essenciais incluídos na auditoria de cobertura
      include: [
        'src/utils/**/*.{ts,tsx}',
        'src/services/**/*.{ts,tsx}',
        'src/features/**/api.ts',
        'src/features/**/components/**/*.{ts,tsx}',
        'src/features/**/*Page.tsx',
        'src/components/ui/**/*.{ts,tsx}',
        'src/components/layout/**/*.{ts,tsx}',
      ],

      // 🚫 Arquivos ignorados (boilerplate, tipos puros, mocks estáticos e configs)
      exclude: [
        'node_modules/**',
        'dist/**',
        'src/main.tsx',
        'src/vite-env.d.ts',
        'src/**/types.ts',
        'src/types/**',
        'src/mocks/**',
        'src/test/**',
        '**/*.d.ts',
        '**/*.config.{js,ts}',
        '**/index.ts',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
      ],

      // 🎯 Metas de qualidade
      thresholds: {
        lines: 75,
        functions: 75,
        branches: 70,
        statements: 75,
      },
    },
  },
});
