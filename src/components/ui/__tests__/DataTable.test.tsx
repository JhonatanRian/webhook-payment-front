import { describe, it, expect, vi } from 'vitest';
import { render, screen, userEvent } from '@/test/test-utils';
import { DataTable, Column } from '../DataTable';

interface SampleItem {
  id: string;
  name: string;
  amount: number;
}

describe('DataTable UI component', () => {
  const columns: Column<SampleItem>[] = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Nome' },
    { key: 'amount', header: 'Valor', align: 'right', render: (item) => `R$ ${item.amount}` },
  ];

  const data: SampleItem[] = [
    { id: '1', name: 'Lucas Silva', amount: 150 },
    { id: '2', name: 'Maria Souza', amount: 300 },
  ];

  it('should render table headers and data rows correctly', () => {
    render(<DataTable columns={columns} data={data} />);

    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Valor')).toBeInTheDocument();
    expect(screen.getByText('Lucas Silva')).toBeInTheDocument();
    expect(screen.getByText('R$ 150')).toBeInTheDocument();
  });

  it('should display emptyMessage when data is empty', () => {
    render(<DataTable columns={columns} data={[]} emptyMessage="Sem dados cadastrados." />);
    expect(screen.getByText('Sem dados cadastrados.')).toBeInTheDocument();
  });

  it('should trigger onRowClick when row is clicked', async () => {
    const handleRowClick = vi.fn();
    render(<DataTable columns={columns} data={data} onRowClick={handleRowClick} />);

    const row = screen.getByText('Lucas Silva');
    await userEvent.click(row);

    expect(handleRowClick).toHaveBeenCalledWith(data[0]);
  });
});
