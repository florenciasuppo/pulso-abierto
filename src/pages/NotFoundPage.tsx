import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>Error 404</h1>
      <h2>Página no encontrada</h2>
      <p>La dirección ingresada no coincide con ninguna sección de la aplicación.</p>
      <Link to="/" style={{ fontSize: '18px', display: 'inline-block', marginTop: '16px' }}>
        Ir a la Página Principal
      </Link>
    </div>
  );
}