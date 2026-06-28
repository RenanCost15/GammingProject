'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import GameDetailsView from '../components/GameDetailsView';
import { rawgFetch } from '../../lib/rawg';
import { useAppSettings } from '../components/AppProviders';

export default function GamePage() {
  return (
    <Suspense fallback={<GameDetailsLoading />}>
      <GameDetailsContent />
    </Suspense>
  );
}

function GameDetailsContent() {
  const { t } = useAppSettings();
  const searchParams = useSearchParams();
  const gameId = searchParams.get('id');
  const [gameData, setGameData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!gameId) {
      setError(t('details.tryAgain'));
      setLoading(false);
      return undefined;
    }

    const controller = new AbortController();
    let isActive = true;

    async function loadGame() {
      setLoading(true);
      setError('');

      try {
        const data = await rawgFetch(`/games/${encodeURIComponent(gameId)}`, {}, { signal: controller.signal });
        if (isActive) setGameData(data);
      } catch (err) {
        if (err.name !== 'AbortError' && isActive) {
          setError(err.message || t('details.tryAgain'));
        }
      } finally {
        if (isActive) setLoading(false);
      }
    }

    loadGame();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [gameId, t]);

  if (loading) return <GameDetailsLoading />;

  return <GameDetailsView gameData={error ? { error } : gameData} />;
}

function GameDetailsLoading() {
  const { t } = useAppSettings();

  return (
    <div className="page-shell flex items-center justify-center">
      <p className="text-lg font-bold text-smoke">{t('games.loadingGames')}</p>
    </div>
  );
}
