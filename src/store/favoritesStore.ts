import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FavoritesStore = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
};

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set) => ({
      favorites: [],
      toggleFavorite: (id: string) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favId) => favId !== id)
            : [...state.favorites, id],
        })),
    }),
    {
      name: 'pulso-abierto-favoritos',
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);