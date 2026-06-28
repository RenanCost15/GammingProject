import { useEffect, useState } from 'react';
import { rawgFetch } from '../lib/rawg';

export default function useGameDetails(id) {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return undefined;

    const controller = new AbortController();

    async function loadGame() {
      setLoading(true);
      setError(null);

      try {
        const data = await rawgFetch(`/games/${encodeURIComponent(id)}`, {}, { signal: controller.signal });
        setGame(data);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadGame();
    return () => controller.abort();
  }, [id]);

  return { game, loading, error };
}
