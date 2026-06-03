'use client';

import { buildImageFallback } from '../../lib/rawg';
import { useAppSettings } from './AppProviders';

export default function CollectionCard({ title, image, countLabel, count, items = [] }) {
  const { t } = useAppSettings();
  const safeImage = image || buildImageFallback(title);

  return (
    <article className="card-pro group">
      <div
        className="h-64 bg-cover bg-center transition duration-500 group-hover:scale-105"
        style={{ backgroundImage: `linear-gradient(to top, rgba(5,5,5,.92), rgba(5,5,5,.12)), url(${safeImage})` }}
      />
      <div className="space-y-5 p-6">
        <div>
          <h2 className="truncate text-2xl font-black text-frost">{title}</h2>
          <p className="mt-2 text-sm font-bold uppercase tracking-widest text-smoke">{countLabel || t('common.totalGames')}</p>
          <p className="text-3xl font-black text-crimson">{count ?? '—'}</p>
        </div>

        {items.length > 0 && (
          <div>
            <h3 className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-ash">{t('common.highlights')}</h3>
            <ul className="space-y-2">
              {items.slice(0, 4).map((item) => (
                <li key={item.id || item.name} className="truncate rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm font-semibold text-smoke">
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
