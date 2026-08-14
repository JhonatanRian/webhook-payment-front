import { describe, it, expect, vi } from 'vitest';
import { render, screen, userEvent } from '@/test/test-utils';
import { Button } from '../Button';

describe('Button UI component', () => {
  it('should render button with children and handle click', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clique Aqui</Button>);

    const button = screen.getByRole('button', { name: /clique aqui/i });
    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should show loading spinner and disable button when isLoading is true', () => {
    render(<Button isLoading>Processando</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('should render left and right icons', () => {
    render(
      <Button
        leftIcon={<span data-testid="left-icon">L</span>}
        rightIcon={<span data-testid="right-icon">R</span>}
      >
        Texto
      </Button>
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });
});
