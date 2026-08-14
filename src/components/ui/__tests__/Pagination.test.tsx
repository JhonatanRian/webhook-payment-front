import { describe, it, expect, vi } from 'vitest';
import { render, screen, userEvent } from '@/test/test-utils';
import { Pagination } from '../Pagination';

describe('Pagination UI component', () => {
  it('should render items range and total count', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        totalItems={100}
        pageSize={20}
        onPageChange={vi.fn()}
      />
    );

    expect(screen.getByText(/mostrando/i)).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('should trigger onPageChange when next button is clicked', async () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        totalItems={100}
        pageSize={20}
        onPageChange={handlePageChange}
      />
    );

    const nextBtn = screen.getByRole('button', { name: /próxima página/i });
    await userEvent.click(nextBtn);

    expect(handlePageChange).toHaveBeenCalledWith(2);
  });

  it('should trigger onPageSizeChange when select value changes', async () => {
    const handlePageSizeChange = vi.fn();
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        totalItems={100}
        pageSize={20}
        onPageChange={vi.fn()}
        onPageSizeChange={handlePageSizeChange}
      />
    );

    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, '50');

    expect(handlePageSizeChange).toHaveBeenCalledWith(50);
  });

  it('should return null when totalItems is 0', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        totalPages={0}
        totalItems={0}
        pageSize={20}
        onPageChange={vi.fn()}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should disable previous button on first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        totalItems={100}
        pageSize={20}
        onPageChange={vi.fn()}
      />
    );

    const prevBtn = screen.getByRole('button', { name: /página anterior/i });
    expect(prevBtn).toBeDisabled();
  });
});
