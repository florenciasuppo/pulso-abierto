import { afterEach, describe, expect, test, vi } from 'vitest';
import { fetchCryptoData } from './cryptoService';

describe('cryptoService - fetchCryptoData', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('normaliza y devuelve datos tipados ante una respuesta HTTP 200 exitosa', async () => {
    const mockRawApiResponse = [
      {
        id: 'bitcoin',
        symbol: 'btc',
        name: 'Bitcoin',
        image: 'https://assets.coingecko.com/btc.png',
        current_price: '80498',
        price_change_percentage_24h: 4.64,
        extra_unused_field: 'dato_ignorado',
      },
    ];

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockRawApiResponse,
      })
    );

    const result = await fetchCryptoData('bitcoin');

    expect(result).toEqual([
      {
        id: 'bitcoin',
        symbol: 'btc',
        name: 'Bitcoin',
        image: 'https://assets.coingecko.com/btc.png',
        current_price: 80498,
        price_change_percentage_24h: 4.64,
      },
    ]);
  });

  test('lanza un error identificable cuando la respuesta HTTP tiene ok: false', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      })
    );

    await expect(fetchCryptoData()).rejects.toThrow('Error al consultar la API (HTTP 500)');
  });
});
