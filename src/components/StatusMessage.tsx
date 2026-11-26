type StatusMessageProps = {
  type: 'loading' | 'empty' | 'error';
  message?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
};

export function StatusMessage({ type, message, onRetry, isRetrying = false }: StatusMessageProps) {
  if (type === 'loading') {
    return <p role="status">Cargando información de las criptomonedas...</p>;
  }

  if (type === 'empty') {
    return <p role="status">{message || 'No se encontraron resultados que coincidan con la búsqueda.'}</p>;
  }

  if (type === 'error') {
    return (
      <div role="alert" style={{ color: '#b91c1c', backgroundColor: '#fef2f2', border: '1px solid #f87171', padding: '12px', borderRadius: '6px' }}>
        <p>{message || 'Ocurrió un error al cargar los datos.'}</p>
        {onRetry && (
          <button type="button" onClick={onRetry} disabled={isRetrying} style={{ marginTop: '8px' }}>
            {isRetrying ? 'Reintentando...' : 'Reintentar consulta'}
          </button>
        )}
      </div>
    );
  }

  return null;
}