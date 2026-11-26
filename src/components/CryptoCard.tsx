import type { CryptoCurrency } from '../types/crypto';
import { useFavoritesStore } from '../store/favoritesStore';
import { formatPercentage, formatUsdPrice } from '../utils/formatters';

type CryptoCardProps = {
  crypto: CryptoCurrency;
};

export function CryptoCard({ crypto }: CryptoCardProps) {
  const isFavorite = useFavoritesStore((state) => state.favorites.includes(crypto.id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <article
      className="tarjeta"
      style={{
        border: isFavorite ? '2px solid #f59e0b' : '1px solid #ccc',
        backgroundColor: isFavorite ? '#fffbeb' : '#ffffff',
        padding: '16px',
        margin: '8px 0',
        borderRadius: '8px',
      }}
    >
      <img src={crypto.image} alt={crypto.name} width="32" height="32" />
      <h3>
        {crypto.name} ({crypto.symbol.toUpperCase()})
      </h3>
      <p>Precio: {formatUsdPrice(crypto.current_price)}</p>
      <p style={{ color: crypto.price_change_percentage_24h >= 0 ? 'green' : 'red' }}>
        Variación 24h: {formatPercentage(crypto.price_change_percentage_24h)}
      </p>
      <button
        type="button"
        onClick={() => toggleFavorite(crypto.id)}
        aria-pressed={isFavorite}
      >
        {isFavorite ? '★ Quitar de favoritos' : '☆ Agregar a favoritos'}
      </button>
    </article>
  );
}