import React from 'react';
import { Cat } from '../types/types';

interface CatCardProps {
  cat: Cat;
  isFavorite: boolean;
  onToggleFavorite: (cat: Cat) => void;
}

const CatCard: React.FC<CatCardProps> = ({ cat, isFavorite, onToggleFavorite }) => {
  return (
    <>
      <img 
        className="cat-image" 
        src={cat.url} 
        alt="Изображение котика" 
        loading="lazy" 
      />
      <button 
        className={`like-button ${isFavorite ? 'active' : ''}`}
        onClick={() => onToggleFavorite(cat)}
        type="button"
        aria-label="Лайкнуть котика"
        title="Лайкнуть котика"
      />
    </>
  );
};

export default CatCard; 