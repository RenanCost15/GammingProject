import { useEffect, useMemo, useState } from 'react';

export default function useGames(filters = {}) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const queryString = useMemo(() => new URLSearchParams(filters).toString(), [filters]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadGames() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/games?${queryString}`, { signal: controller.signal });
        const data = await response.json();

        if (!response.ok || data?.error) {
          throw new Error(data?.error || 'Unable to fetch games.');
        }

        setGames(Array.isArray(data) ? data : []);
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
  }, [queryString]);

  return { games, loading, error };
}
