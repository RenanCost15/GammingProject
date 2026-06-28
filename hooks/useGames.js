import { useEffect, useMemo, useState } from 'react';
import { fetchCollection } from '../lib/rawg';

export default function useGames(filters = {}) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestParams = useMemo(() => ({
    search: filters.sName || '',
    dates: filters.sDates || '1900-01-01,9999-12-31',
    ordering: filters.sOrdering || '-rating',
    page: String(filters.sPage || 1),
    page_size: String(filters.sPageSize || 16),
    genres: filters.sGenres || '',
    platforms: filters.sPlatforms || '',
    metacritic: filters.sMetacritic || '',
  }), [filters]);

  const requestKey = useMemo(() => new URLSearchParams(requestParams).toString(), [requestParams]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadGames() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchCollection('/games', requestParams, { signal: controller.signal });
        setGames(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setGames([]);
        }
      } finally {
        setLoading(false);
      }
    }

    loadGames();
    return () => controller.abort();
  }, [requestKey, requestParams]);

  return { games, loading, error };
}
