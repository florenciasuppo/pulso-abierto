import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { HomePage } from './HomePage';
import * as cryptoService from '../services/cryptoService';
import { useFavoritesStore } from '../store/favoritesStore';
import type { CryptoCurrency } from '../types/crypto';

const sampleCryptos: CryptoCurrency[] = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: 'https://example.com/btc.png',
    current_price: 80500,
    price_change_percentage_24h: 4.64,
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    image: 'https://example.com/eth.png',
    current_price: 2421,
    price_change_percentage_24h: -1.2,
  },
];

describe('HomePage - Consulta de datos, errores y recuperación', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
    useFavoritesStore.setState({ favorites: [] });
  });

  test('muestra el estado de carga seguido del listado exitoso de criptomonedas', async () => {
    vi.spyOn(cryptoService, 'fetchCryptoData').mockResolvedValueOnce(sampleCryptos);

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toHaveTextContent(/cargando información/i);

    expect(await screen.findByRole('heading', { name: /bitcoin \(btc\)/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /ethereum \(eth\)/i })).toBeInTheDocument();
    expect(screen.getByText(/resultados encontrados:/i).parentElement).toHaveTextContent('2');
  });

  test('muestra mensaje de ausencia de resultados cuando la API devuelve una lista vacía', async () => {
    vi.spyOn(cryptoService, 'fetchCryptoData').mockResolvedValueOnce([]);

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(await screen.findByText(/no se encontraron resultados/i)).toBeInTheDocument();
  });

  test('muestra un mensaje comprensible ante un error y permite reintentar la consulta con éxito', async () => {
    const user = userEvent.setup();
    const fetchSpy = vi
      .spyOn(cryptoService, 'fetchCryptoData')
      .mockRejectedValueOnce(new Error('Error al consultar la API (HTTP 503)'))
      .mockResolvedValueOnce(sampleCryptos);

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/HTTP 503/i);

    const retryButton = screen.getByRole('button', { name: /reintentar consulta/i });
    await user.click(retryButton);

    expect(await screen.findByRole('heading', { name: /bitcoin \(btc\)/i })).toBeInTheDocument();
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });
});