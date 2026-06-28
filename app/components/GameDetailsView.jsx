'use client';

import Link from 'next/link';
import { useAppSettings } from './AppProviders';
import { buildImageFallback } from '../../lib/rawg';

export default function GameDetailsView({ gameData }) {
  const { t } = useAppSettings();

  if (!gameData || gameData.error) {
    return (
      <div className="page-shell flex items-center justify-center">
        <div className="glass-panel max-w-xl rounded-3xl p-8 text-center">
          <p className="section-eyebrow">{t('details.errorEyebrow')}</p>
          <h1 className="mt-3 text-3xl font-black text-frost">{t('details.unavailable')}</h1>
          <p className="mt-4 text-smoke">{gameData?.error || t('details.tryAgain')}</p>
          <Link href="/games" className="btn-primary mt-6">{t('details.backGames')}</Link>
        </div>
      </div>
    );
  }

  const cover = gameData.background_image || buildImageFallback(gameData.name);
  const genres = gameData.genres?.map((genre) => genre.name).join(', ') || t('common.notInformed');
  const platforms = gameData.platforms?.map((item) => item.platform.name).slice(0, 6).join(', ') || t('common.notInformed');

  return (
    <div className="page-shell">
      <section className="container-pro">
        <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-graphite shadow-card lg:grid-cols-[1fr_.95fr]">
          <div
            className="min-h-[420px] bg-cover bg-center lg:min-h-[720px]"
            style={{ backgroundImage: `linear-gradient(to top, rgba(5,5,5,.92), rgba(5,5,5,.05)), url(${cover})` }}
          />

          <div className="space-y-7 p-7 sm:p-10">
            <div>
              <p className="section-eyebrow">{t('details.eyebrow')}</p>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-frost sm:text-5xl">{gameData.name}</h1>
              <p className="mt-4 leading-8 text-smoke">{gameData.description_raw || t('details.noDescription')}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Info label={t('details.released')} value={gameData.released || t('common.notInformed')} />
              <Info label={t('details.rating')} value={gameData.rating || '—'} />
              <Info label={t('details.genres')} value={genres} />
              <Info label={t('details.platforms')} value={platforms} />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              {gameData.website && (
                <a href={gameData.website} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  {t('details.website')}
                </a>
              )}
              <Link href="/games" className="btn-secondary">{t('details.backGames')}</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl surface-subtle">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-crimson">{label}</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-ash">{value}</p>
    </div>
  );
}
