import type { CryptoCurrency } from '../types/crypto';

const DEFAULT_BASE_URL = 'https://api.coingecko.com/api/v3';
const DEFAULT_COINS = 'bitcoin,ethereum,cardano,solana,ripple';

export async function fetchCryptoData(coinIds: string = DEFAULT_COINS): Promise<CryptoCurrency[]> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || DEFAULT_BASE_URL;
  const url = `${baseUrl}/coins/markets?vs_currency=usd&ids=${coinIds}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error al consultar la API (HTTP ${response.status})`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error('La respuesta de la API no tiene el formato esperado');
  }

  return data.map((item) => ({
    id: String(item.id || ''),
    symbol: String(item.symbol || ''),
    name: String(item.name || 'Sin nombre'),
    image: String(item.image || ''),
    current_price: Number(item.current_price || 0),
    price_change_percentage_24h: Number(item.price_change_percentage_24h || 0),
  }));
}