import React, { useState, useRef, useCallback } from 'react';
import { useCats } from '../hooks/useCats';
import { useFavorites } from '../hooks/useFavorites';
import { Cat } from '../types/types';

const AllCats: React.FC = () => {
  const [page, setPage] = useState(1);
  const { cats, loading, error, hasMore } = useCats(page);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const observer = useRef<IntersectionObserver | null>(null);

  const lastCatElementRef = useCallback((node: HTMLLIElement) => {
    if (loading || !hasMore) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prev => prev + 1);
      }
    }, {
      rootMargin: '100px'
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const handleToggleFavorite = useCallback((cat: Cat) => {
    if (isFavorite(cat.id)) {
      removeFromFavorites(cat.id);
    } else {
      addToFavorites(cat);
    }
  }, [addToFavorites, removeFromFavorites, isFavorite]);

  return (
    <section className="hero">
      <div className="Section_container__Ezv7a">
        <h2 className="Section_hidden__D3TlL">Список котиков</h2>
        <ul className="CatsList_cats__NdB6l">
          {cats.map((cat, index) => (
            <li 
              key={`${cat.id}-${index}`}
              ref={cats.length === index + 1 ? lastCatElementRef : undefined}
              className="CatItem_cat__pzyth"
            >
              <img 
                className="CatItem_image__ybJEx" 
                src={cat.url} 
                alt="Изображение котика"
                loading="lazy"
              />
              <button 
                className={`CatItem_button__7k4Kb ${
                  isFavorite(cat.id) ? 'CatItem_button__7k4Kb_active' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleFavorite(cat);
                }}
                type="button"
                aria-label="Лайкнуть котика"
                title="Лайкнуть котика"
              />
            </li>
          ))}
        </ul>
        {loading && <div className="loading">... загружаем еще котиков ...</div>}
        {error && <div className="error-message">{error}</div>}
        {!hasMore && <div className="no-more">Больше котиков нет 😢</div>}
      </div>
    </section>
  );
};

export default React.memo(AllCats); 