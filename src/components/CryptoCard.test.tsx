import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test } from 'vitest';
import { CryptoCard } from './CryptoCard';
import { useFavoritesStore } from '../store/favoritesStore';
import type { CryptoCurrency } from '../types/crypto';

const mockBitcoin: CryptoCurrency = {
  id: 'bitcoin',
  symbol: 'btc',
  name: 'Bitcoin',
  image: 'https://example.com/btc.png',
  current_price: 80500,
  price_change_percentage_24h: 4.64,
};

describe('CryptoCard - Gestión de favoritos', () => {
  beforeEach(() => {
    localStorage.clear();
    useFavoritesStore.setState({ favorites: [] });
  });

  test('permite marcar y desmarcar una criptomoneda como favorita reflejando el cambio en la interfaz', async () => {
    const user = userEvent.setup();
    render(<CryptoCard crypto={mockBitcoin} />);

    const addButton = screen.getByRole('button', { name: /agregar a favoritos/i });
    expect(addButton).toHaveAttribute('aria-pressed', 'false');

    await user.click(addButton);

    const removeButton = screen.getByRole('button', { name: /quitar de favoritos/i });
    expect(removeButton).toHaveAttribute('aria-pressed', 'true');

    await user.click(removeButton);

    expect(screen.getByRole('button', { name: /agregar a favoritos/i })).toHaveAttribute('aria-pressed', 'false');
  });
});