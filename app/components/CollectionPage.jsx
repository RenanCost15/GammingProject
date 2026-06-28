'use client';

import { useEffect, useMemo, useState } from 'react';
import CollectionCard from './CollectionCard';
import EmptyState from './EmptyState';
import PageHero from './PageHero';
import { fetchCollection } from '../../lib/rawg';
import { useAppSettings } from './AppProviders';

const endpointBySection = {
  creators: '/creators',
  developers: '/developers',
  platforms: '/platforms',
  publishers: '/publishers',
};

export default function CollectionPage({ section }) {
  const { t } = useAppSettings();
  const endpoint = useMemo(() => endpointBySection[section], [section]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!endpoint) {
      setError('Seção inválida.');
      setLoading(false);
      return undefined;
    }

    const controller = new AbortController();
    let isActive = true;

    async function loadCollection() {
      setLoading(true);
      setError('');

      try {
        const response = await fetchCollection(endpoint, { page_size: '12' }, { signal: controller.signal });
        if (isActive) setItems(response);
      } catch (err) {
        if (err.name !== 'AbortError' && isActive) {
          setItems([]);
          setError(err.message || t(`sections.${section}.unavailable`));
        }
      } finally {
        if (isActive) setLoading(false);
      }
    }

    loadCollection();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [endpoint, section, t]);

  if (error) return <EmptyState title={t(`sections.${section}.unavailable`)} message={error} />;

  return (
    <div className="page-shell">
      <PageHero content={`sections.${section}`} />
      <section className="container-pro">
        {loading && (
          <p className="mb-8 text-center text-lg font-bold text-smoke">{t('games.loadingGames')}</p>
        )}
        {!loading && items.length === 0 && (
          <p className="mb-8 text-center text-lg font-bold text-smoke">{t(`sections.${section}.empty`)}</p>
        )}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <CollectionCard
              key={item.id}
              title={item.name}
              image={item.image || item.image_background}
              count={item.games_count}
              items={[...(item.positions || []), ...(item.games || [])]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
