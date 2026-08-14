/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        zoho: {
          blue: {
            DEFAULT: "#0067FF",
            hover: "#0053CC",
            light: "#EBF3FF",
            dark: "#0047B3",
          },
          slate: {
            bg: "#F8FAFC",
            card: "#FFFFFF",
            border: "#E2E8F0",
            darkBg: "#0F172A",
            darkCard: "#1E293B",
            darkBorder: "#334155",
            muted: "#64748B",
            darkMuted: "#94A3B8",
          },
          success: {
            DEFAULT: "#10B981",
            text: "#065F46",
            bg: "#ECFDF5",
            border: "#A7F3D0",
            darkBg: "rgba(16, 185, 129, 0.15)",
            darkText: "#34D399",
            darkBorder: "rgba(16, 185, 129, 0.3)",
          },
          warning: {
            DEFAULT: "#F59E0B",
            text: "#92400E",
            bg: "#FFFBEB",
            border: "#FDE68A",
            darkBg: "rgba(245, 158, 11, 0.15)",
            darkText: "#FBBF24",
            darkBorder: "rgba(245, 158, 11, 0.3)",
          },
          danger: {
            DEFAULT: "#EF4444",
            text: "#991B1B",
            bg: "#FEF2F2",
            border: "#FECACA",
            darkBg: "rgba(239, 68, 68, 0.15)",
            darkText: "#F87171",
            darkBorder: "rgba(239, 68, 68, 0.3)",
          },
        },
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '0.9375rem' }], // 11px
        'xs': ['0.75rem', { lineHeight: '1rem' }],         // 12px
        'sm': ['0.8125rem', { lineHeight: '1.15rem' }],     // 13px - Zoho Base
        'base': ['0.875rem', { lineHeight: '1.25rem' }],   // 14px
        'md': ['0.9375rem', { lineHeight: '1.35rem' }],    // 15px
        'lg': ['1.0625rem', { lineHeight: '1.5rem' }],     // 17px
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'zoho-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'zoho-card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'zoho-dropdown': '0 4px 12px -2px rgba(15, 23, 42, 0.08), 0 2px 6px -2px rgba(15, 23, 42, 0.04)',
        'zoho-drawer': '-4px 0 24px rgba(0, 0, 0, 0.08)',
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.85)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'pulse-dot': 'pulseDot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in-right': 'slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 0.15s ease-out',
      },
    },
  },
  plugins: [],
};
