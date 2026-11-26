import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { CryptoCurrency } from '../types/crypto';
import { fetchCryptoData } from '../services/cryptoService';
import { StatusMessage } from '../components/StatusMessage';
import { useFavoritesStore } from '../store/favoritesStore';

export function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const [crypto, setCrypto] = useState<CryptoCurrency | null>(null);
  const [status, setStatus] = useState<'loading' | 'success' | 'notFound' | 'error'>('loading');

  const isFavorite = useFavoritesStore((state) => (id ? state.favorites.includes(id) : false));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  async function loadDetail() {
    if (!id) return;
    setStatus('loading');

    try {
      const data = await fetchCryptoData();
      const found = data.find((c) => c.id.toLowerCase() === id.toLowerCase());

      if (found) {
        setCrypto(found);
        setStatus('success');
      } else {
        setStatus('notFound');
      }
    } catch {
      setStatus('error');
    }
  }

  useEffect(() => {
    loadDetail();
  }, [id]);

  if (status === 'loading') return <StatusMessage type="loading" />;

  if (status === 'error') {
    return (
      <StatusMessage
        type="error"
        message="No se pudo cargar el detalle de la criptomoneda."
        onRetry={loadDetail}
      />
    );
  }

  if (status === 'notFound' || !crypto) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h3>La criptomoneda especificada no existe.</h3>
        <p>
          No se encontró ningún registro para el identificador: <code>{id}</code>
        </p>
        <Link to="/">← Volver al listado principal</Link>
      </div>
    );
  }

  return (
    <article style={{ border: '1px solid #ccc', padding: '24px', borderRadius: '8px', maxWidth: '500px', margin: '20px auto' }}>
      <Link to="/">← Volver al inicio</Link>
      <header style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
        <img src={crypto.image} alt={crypto.name} width="48" height="48" />
        <h2>
          {crypto.name} ({crypto.symbol.toUpperCase()})
        </h2>
      </header>
      <main style={{ marginTop: '16px' }}>
        <p>
          <strong>Identificador:</strong> {crypto.id}
        </p>
        <p>
          <strong>Precio actual:</strong> USD ${crypto.current_price.toLocaleString()}
        </p>
        <p style={{ color: crypto.price_change_percentage_24h >= 0 ? 'green' : 'red' }}>
          <strong>Variación 24 horas:</strong> {crypto.price_change_percentage_24h.toFixed(2)}%
        </p>

        <div style={{ marginTop: '20px' }}>
          <button
            type="button"
            onClick={() => toggleFavorite(crypto.id)}
            aria-pressed={isFavorite}
          >
            {isFavorite ? '★ Quitar de favoritos' : '☆ Agregar a favoritos'}
          </button>
        </div>
      </main>
    </article>
  );
}