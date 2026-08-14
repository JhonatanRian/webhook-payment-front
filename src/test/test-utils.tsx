import React, { ReactElement } from 'react';
import { render, RenderOptions, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

interface AllTheProvidersProps {
  children: React.ReactNode;
}

export function createWrapper() {
  const testQueryClient = createTestQueryClient();
  return function Wrapper({ children }: AllTheProvidersProps) {
    return (
      <QueryClientProvider client={testQueryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    );
  };
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  const testQueryClient = createTestQueryClient();

  function Wrapper({ children }: AllTheProvidersProps) {
    return (
      <QueryClientProvider client={testQueryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    );
  }

  return {
    queryClient: testQueryClient,
    ...render(ui, { wrapper: Wrapper, ...options }),
  };
}

export { screen, fireEvent, waitFor, within, render, userEvent };
