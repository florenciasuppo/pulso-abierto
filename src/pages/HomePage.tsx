import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { CryptoCurrency } from '../types/crypto';
import { fetchCryptoData } from '../services/cryptoService';
import { SearchForm } from '../components/SearchForm';
import { CryptoCard } from '../components/CryptoCard';
import { StatusMessage } from '../components/StatusMessage';

export function HomePage() {
  const [cryptos, setCryptos] = useState<CryptoCurrency[]>([]);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  const [filterText, setFilterText] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'positive' | 'negative'>('all');
  

  const loadData = () => {
    setStatus('loading');
    setErrorMessage('');
    fetchCryptoData()
      .then((data) => {
        setCryptos(data);
        setStatus('success');
      })
      .catch((err: Error) => {
        setErrorMessage(err.message || 'Error al conectar con la API');
        setStatus('error');
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearch = (text: string, category: string) => {
    setFilterText(text);
    setFilterCategory(category as 'all' | 'positive' | 'negative');
  };

  const filteredCryptos = cryptos.filter((coin) => {
    const matchesText = coin.name.toLowerCase().includes(filterText.toLowerCase()) ||
                        coin.symbol.toLowerCase().includes(filterText.toLowerCase());

    if (!matchesText) return false;

    if (filterCategory === 'positive') return coin.price_change_percentage_24h >= 0;
    if (filterCategory === 'negative') return coin.price_change_percentage_24h < 0;
    return true;
  });

  const totalResults = filteredCryptos.length;

  return (
    <section>
      <h2>Consulta de Criptomonedas</h2>

      <SearchForm onSearch={handleSearch} />

      {status === 'loading' && <StatusMessage type="loading" />}
      {status === 'error' && <StatusMessage type="error" message={errorMessage} onRetry={loadData} />}

      {status === 'success' && (
        <>
          <p><strong>Resultados encontrados:</strong> {totalResults}</p>

          

          {totalResults === 0 ? (
            <StatusMessage type="empty" />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
              {filteredCryptos.map((coin) => (
                <div key={coin.id}>
                  <CryptoCard crypto={coin} />
                  <Link to={`/criptomonedas/${coin.id}`} style={{ display: 'inline-block', marginTop: '4px' }}>
                    Ver detalle completo →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}