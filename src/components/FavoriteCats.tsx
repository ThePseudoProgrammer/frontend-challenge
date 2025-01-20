import React from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { Cat } from '../types/types';

const FavoriteCats: React.FC = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="Section_container__Ezv7a">
        <div className="empty-message">У вас пока нет любимых котиков</div>
      </div>
    );
  }

  return (
    <section className="hero">
      <div className="Section_container__Ezv7a">
        <h2 className="Section_hidden__D3TlL">Список любимых котиков</h2>
        <ul className="CatsList_cats__NdB6l">
          {favorites.map(cat => (
            <li key={cat.id} className="CatItem_cat__pzyth">
              <img 
                className="CatItem_image__ybJEx" 
                src={cat.url} 
                alt="Изображение котика"
                loading="lazy"
              />
              <button 
                className={`CatItem_button__7k4Kb CatItem_button__7k4Kb_active`}
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromFavorites(cat.id);
                }}
                type="button"
                aria-label="Убрать из любимых"
                title="Убрать из любимых"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default React.memo(FavoriteCats); 