'use client';

import CollectionCard from './CollectionCard';
import EmptyState from './EmptyState';
import PageHero from './PageHero';
import { useAppSettings } from './AppProviders';

export default function CollectionPage({ section, items = [], error = '' }) {
  const { t } = useAppSettings();

  if (error) return <EmptyState title={t(`sections.${section}.unavailable`)} message={error} />;
  if (!items.length) return <EmptyState title={t(`sections.${section}.empty`)} />;

  return (
    <div className="page-shell">
      <PageHero content={`sections.${section}`} />
      <section className="container-pro grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <CollectionCard
            key={item.id}
            title={item.name}
            image={item.image || item.image_background}
            count={item.games_count}
            items={[...(item.positions || []), ...(item.games || [])]}
          />
        ))}
      </section>
    </div>
  );
}
