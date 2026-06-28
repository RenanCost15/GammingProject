'use client';

import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { buildImageFallback } from '../../lib/rawg';
import { useAppSettings } from './AppProviders';

export default function CollectionCard({ title, image, countLabel, count, items = [] }) {
  const { t } = useAppSettings();
  const [isOpen, setIsOpen] = useState(false);
  const safeImage = image || buildImageFallback(title);
  const visibleItems = isOpen ? items : items.slice(0, 3);

  return (
    <article className={`card-pro group ${isOpen ? 'ring-1 ring-crimson/35' : ''}`}>
      <div
        className="h-64 bg-cover bg-center transition duration-700 ease-out group-hover:scale-110"
        style={{ backgroundImage: `linear-gradient(to top, rgba(5,5,5,.92), rgba(5,5,5,.12)), url(${safeImage})` }}
      />

      <div className="space-y-5 p-6">
        <div>
          <div className="flex items-start justify-between gap-4">
            <h2 className="line-clamp-2 text-2xl font-black text-frost transition duration-500 group-hover:text-crimson">{title}</h2>
            <button
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-crimson/30 bg-crimson/10 text-crimson transition duration-500 focus:outline-none focus:ring-2 focus:ring-crimson ${isOpen ? 'rotate-180 bg-crimson text-white' : 'hover:-translate-y-1 hover:bg-crimson hover:text-white'}`}
              aria-expanded={isOpen}
              aria-label={isOpen ? `Recolher informações de ${title}` : `Expandir informações de ${title}`}
            >
              <FiChevronDown />
            </button>
          </div>
          <p className="mt-3 text-sm font-bold uppercase tracking-widest text-smoke">{countLabel || t('common.totalGames')}</p>
          <p className="text-3xl font-black text-crimson">{count ?? '—'}</p>
        </div>

        {items.length > 0 && (
          <div className={`transition-all duration-500 ${isOpen ? 'max-h-[23rem] opacity-100' : 'max-h-32 opacity-95'}`}>
            <h3 className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-ash">{t('common.highlights')}</h3>
            <ul className={`redcore-scrollbar space-y-2 ${isOpen ? 'max-h-64 overflow-y-auto pr-2' : ''}`}>
              {visibleItems.map((item) => (
                <li key={item.id || item.name} className="truncate rounded-xl chip-soft text-sm font-semibold text-smoke transition duration-300 hover:border-crimson/40 hover:text-ash">
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
