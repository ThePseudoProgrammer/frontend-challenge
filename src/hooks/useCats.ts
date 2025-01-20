import { useState, useEffect } from 'react';
import axios from 'axios';
import { Cat } from '../types/types';

const API_KEY = 'live_3PSM6KSSE1Vwad3vnDGItBog6jnwNlWug50qs6Pv6N8r5j3YrcFUbLHQenUZgrYF';
const API_URL = 'https://api.thecatapi.com/v1';

export const useCats = (page: number = 1) => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setCats([]);
    setHasMore(true);
  }, []);

  useEffect(() => {
    const fetchCats = async () => {
      if (!hasMore) return;
      
      setLoading(true);
      try {
        const response = await axios.get<Cat[]>(`${API_URL}/images/search`, {
          headers: {
            'x-api-key': API_KEY
          },
          params: {
            limit: 10,
            page: page - 1
          }
        });

        const newCats = response.data;
        
        if (newCats.length === 0) {
          setHasMore(false);
        } else {
          setCats(prevCats => {
            const existingIds = new Set(prevCats.map(cat => cat.id));
            const uniqueCats = newCats.filter((newCat: Cat) => !existingIds.has(newCat.id));
            return [...prevCats, ...uniqueCats];
          });
        }
      } catch (err) {
        setError('Ошибка при загрузке котиков');
        console.error('Error fetching cats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCats();
  }, [page]);

  return { cats, loading, error, hasMore };
}; 