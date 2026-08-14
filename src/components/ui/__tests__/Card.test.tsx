import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription } from '../Card';

describe('Card UI component', () => {
  it('should render Card with header, title and description', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Título do Card</CardTitle>
          <CardDescription>Descrição do Card</CardDescription>
        </CardHeader>
        <p>Conteúdo Principal</p>
      </Card>
    );

    expect(screen.getByText('Título do Card')).toBeInTheDocument();
    expect(screen.getByText('Descrição do Card')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo Principal')).toBeInTheDocument();
  });
});
