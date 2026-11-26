import React, { useState } from 'react';
import { searchSchema } from '../schemas/searchSchema';

type SearchFormProps = {
  onSearch: (searchText: string, category: string) => void;
};

export function SearchForm({ onSearch }: SearchFormProps) {
  // Estados para controlar los inputs (Formulario Controlado)
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState<'all' | 'positive' | 'negative'>('all');

  // Estados para los mensajes de error de validación
  const [errors, setErrors] = useState<{ searchText?: string; category?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validamos los datos con safeParse como explica el Módulo
    const result = searchSchema.safeParse({ searchText, category });

    if (!result.success) {
      // Extraemos los errores por campo
      const fieldErrors: { searchText?: string; category?: string } = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0] === 'searchText') fieldErrors.searchText = issue.message;
        if (issue.path[0] === 'category') fieldErrors.category = issue.message;
      });
      setErrors(fieldErrors);
    } else {
      // Si todo es válido, limpiamos errores y comunicamos hacia arriba
      setErrors({});
      onSearch(result.data.searchText, result.data.category);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '16px', borderRadius: '8px' }}>
      <div style={{ marginBottom: '12px' }}>
        <label htmlFor="searchText" style={{ display: 'block', fontWeight: 'bold' }}>
          Buscar Criptomoneda:
        </label>
        <input
          id="searchText"
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Ej. Bitcoin..."
          aria-invalid={!!errors.searchText}
        />
        {errors.searchText && (
          <p style={{ color: '#d9534f', fontSize: '14px', marginTop: '4px' }}>
            ⚠ {errors.searchText}
          </p>
        )}
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label htmlFor="category" style={{ display: 'block', fontWeight: 'bold' }}>
          Filtrar por Tendencia 24h:
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as 'all' | 'positive' | 'negative')}
          aria-invalid={!!errors.category}
        >
          <option value="all">Todas las tendencias</option>
          <option value="positive">Solo en alza (+)</option>
          <option value="negative">Solo en baja (-)</option>
        </select>
        {errors.category && (
          <p style={{ color: '#d9534f', fontSize: '14px', marginTop: '4px' }}>
            ⚠ {errors.category}
          </p>
        )}
      </div>

      <button type="submit">Buscar y Filtrar</button>
    </form>
  );
}