import { useState, useEffect } from 'react';
import { Cat } from '../types/types';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Cat[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteCats');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const addToFavorites = (cat: Cat) => {
    const newFavorites = [...favorites, cat];
    setFavorites(newFavorites);
    localStorage.setItem('favoriteCats', JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (catId: string) => {
    const newFavorites = favorites.filter(cat => cat.id !== catId);
    setFavorites(newFavorites);
    localStorage.setItem('favoriteCats', JSON.stringify(newFavorites));
  };

  const isFavorite = (catId: string) => {
    return favorites.some(cat => cat.id === catId);
  };

  return { favorites, addToFavorites, removeFromFavorites, isFavorite };
}; 