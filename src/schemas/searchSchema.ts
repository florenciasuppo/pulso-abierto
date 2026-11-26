import { z } from 'zod';

export const searchSchema = z.object({
  searchText: z
    .string()
    .trim()
    .max(50, { message: 'La búsqueda no puede superar los 50 caracteres' }),
  category: z.enum(['all', 'positive', 'negative'], {
    message: 'Selecciona un filtro válido',
  }),
});

export type SearchFormData = z.infer<typeof searchSchema>;