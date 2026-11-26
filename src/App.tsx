import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { DetailPage } from './pages/DetailPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { useFavoritesStore } from './store/favoritesStore';

export default function App() {
  const favoritesCount = useFavoritesStore((state) => state.favorites.length);

  return (
    <BrowserRouter>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
        <header style={{ borderBottom: '2px solid #0056b3', paddingBottom: '12px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <h1 style={{ margin: 0, color: '#0056b3' }}>Pulso Abierto - Control de Criptomonedas</h1>
            <span
              aria-label="Cantidad de favoritos"
              style={{
                backgroundColor: '#fef3c7',
                color: '#92400e',
                padding: '6px 12px',
                borderRadius: '16px',
                fontWeight: 'bold',
                fontSize: '14px',
              }}
            >
              ★ Favoritos guardados: {favoritesCount}
            </span>
          </div>
          <nav style={{ marginTop: '8px' }}>
            <Link to="/" style={{ marginRight: '16px', fontWeight: 'bold' }}>
              Inicio
            </Link>
          </nav>
        </header>

        <main role="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/criptomonedas/:id" element={<DetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <footer style={{ marginTop: '40px', paddingTop: '16px', borderTop: '1px solid #ccc', fontSize: '14px', textAlign: 'center', color: '#666' }}>
          <p>Pulso Abierto &copy; Actividad 3 - Estado Global, Servicios y Calidad</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}