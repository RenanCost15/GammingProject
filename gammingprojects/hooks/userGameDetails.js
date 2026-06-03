import { useEffect, useState } from 'react';

export default function useGameDetails(id) {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    async function loadGame() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/games/${id}`, { signal: controller.signal });
        const data = await response.json();

        if (!response.ok || data?.error) {
          throw new Error(data?.error || 'Unable to fetch game details.');
        }

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
