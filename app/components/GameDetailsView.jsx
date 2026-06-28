'use client';

import Link from 'next/link';
import { FiCalendar, FiClock, FiCode, FiExternalLink, FiMonitor, FiStar, FiTag, FiUsers } from 'react-icons/fi';
import { useAppSettings } from './AppProviders';
import { buildImageFallback } from '../../lib/rawg';

function names(values = []) {
  return values.map((value) => value?.name).filter(Boolean).join(', ');
}

function plainText(value = '') {
  return String(value)
    .replace(/<br\s*\/?>(\s*)/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

export default function GameDetailsView({ gameData }) {
  const { language, t } = useAppSettings();

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
  const additionalCover = gameData.background_image_additional || cover;
  const genres = names(gameData.genres) || t('common.notInformed');
  const platforms = names(gameData.platforms?.map((item) => item.platform)) || t('common.notInformed');
  const developers = names(gameData.developers) || t('common.notInformed');
  const publishers = names(gameData.publishers) || t('common.notInformed');
  const tags = (gameData.tags || []).slice(0, 14);
  const screenshots = (gameData.screenshots || []).filter((item) => item?.image).slice(0, 8);
  const requirements = (gameData.platforms || [])
    .map((item) => ({ platform: item?.platform?.name, data: item?.requirements }))
    .filter((item) => item.platform && (item.data?.minimum || item.data?.recommended))
    .slice(0, 4);
  const locale = language === 'pt-BR' ? 'pt-BR' : 'en-US';
  const formatNumber = (value) => (Number.isFinite(Number(value)) ? new Intl.NumberFormat(locale).format(Number(value)) : '—');
  const formatDate = (value) => {
    if (!value) return t('common.notInformed');
    const date = new Date(value);
    return Number.isNaN(date.valueOf()) ? value : new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(date);
  };

  const info = [
    { icon: FiCalendar, label: t('details.released'), value: formatDate(gameData.released) },
    { icon: FiStar, label: t('details.rating'), value: gameData.rating ?? '—' },
    { icon: FiStar, label: t('details.metacritic'), value: gameData.metacritic ?? '—' },
    { icon: FiClock, label: t('details.playtime'), value: gameData.playtime ? `${gameData.playtime} ${t('details.hours')}` : '—' },
    { icon: FiTag, label: t('details.esrb'), value: gameData.esrb_rating?.name || t('common.notInformed') },
    { icon: FiUsers, label: t('details.ratingsCount'), value: formatNumber(gameData.ratings_count) },
    { icon: FiUsers, label: t('details.addedByUsers'), value: formatNumber(gameData.added) },
    { icon: FiCalendar, label: t('details.updated'), value: formatDate(gameData.updated) },
  ];

  return (
    <div className="page-shell">
      <section className="container-pro">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-graphite shadow-card">
          <div
            className="relative min-h-[25rem] bg-cover bg-center sm:min-h-[31rem]"
            style={{ backgroundImage: `linear-gradient(90deg, rgba(5,5,5,.94) 0%, rgba(5,5,5,.54) 48%, rgba(5,5,5,.18) 100%), linear-gradient(to top, rgba(5,5,5,.92), transparent 62%), url(${cover})` }}
          >
            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10 lg:p-14">
              <p className="section-eyebrow">{t('details.eyebrow')}</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-6xl">{gameData.name}</h1>
              <div className="mt-6 flex flex-wrap gap-3">
                {gameData.website && (
                  <a href={gameData.website} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    {t('details.website')} <FiExternalLink className="ml-2" />
                  </a>
                )}
                <Link href="/games" className="btn-secondary">{t('details.backGames')}</Link>
              </div>
            </div>
          </div>

          <div className="grid gap-9 p-7 sm:p-10 lg:grid-cols-[1.45fr_.9fr] lg:p-14">
            <div className="space-y-9">
              <section>
                <p className="text-base leading-8 text-smoke">{gameData.description_raw || t('details.noDescription')}</p>
              </section>

              <section className="detail-section">
                <div className="detail-section-heading"><FiMonitor /><h2>{t('details.platforms')}</h2></div>
                <p className="text-sm leading-7 text-ash">{platforms}</p>
              </section>

              <section className="detail-section">
                <div className="detail-section-heading"><FiUsers /><h2>{t('details.developers')}</h2></div>
                <p className="text-sm leading-7 text-ash">{developers}</p>
              </section>

              <section className="detail-section">
                <div className="detail-section-heading"><FiCode /><h2>{t('details.publishers')}</h2></div>
                <p className="text-sm leading-7 text-ash">{publishers}</p>
              </section>

              <section className="detail-section">
                <div className="detail-section-heading"><FiTag /><h2>{t('details.genres')}</h2></div>
                <p className="text-sm leading-7 text-ash">{genres}</p>
              </section>

              {tags.length > 0 && (
                <section className="detail-section">
                  <div className="detail-section-heading"><FiTag /><h2>{t('details.tags')}</h2></div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => <span key={tag.id || tag.slug || tag.name} className="detail-chip">{tag.name}</span>)}
                  </div>
                </section>
              )}
            </div>

            <aside className="detail-info-grid h-fit">
              {info.map(({ icon: Icon, label, value }) => (
                <div className="detail-info-card" key={label}>
                  <Icon />
                  <div>
                    <p>{label}</p>
                    <strong>{value}</strong>
                  </div>
                </div>
              ))}
            </aside>
          </div>
        </div>

        <section className="mt-10">
          <div className="mb-5">
            <p className="section-eyebrow">{t('details.screenshots')}</p>
            <h2 className="mt-2 text-3xl font-black text-frost">{gameData.name}</h2>
          </div>
          {screenshots.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[{ image: additionalCover, id: 'cover' }, ...screenshots].slice(0, 6).map((item, index) => (
                <a key={item.id || item.image} href={item.image} target="_blank" rel="noopener noreferrer" className="game-gallery-image" aria-label={`${gameData.name} — imagem ${index + 1}`}>
                  <span style={{ backgroundImage: `url(${item.image})` }} />
                </a>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl surface-subtle text-sm text-smoke">{t('details.noScreenshots')}</div>
          )}
        </section>

        <section className="mt-10">
          <div className="mb-5">
            <p className="section-eyebrow">{t('details.requirements')}</p>
            <h2 className="mt-2 text-3xl font-black text-frost">{gameData.name}</h2>
          </div>
          {requirements.length > 0 ? (
            <div className="grid gap-4 lg:grid-cols-2">
              {requirements.map(({ platform, data }) => (
                <article key={platform} className="requirement-card">
                  <h3>{platform}</h3>
                  {data.minimum && <Requirement label={t('details.minimum')} value={data.minimum} />}
                  {data.recommended && <Requirement label={t('details.recommended')} value={data.recommended} />}
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl surface-subtle text-sm text-smoke">{t('details.noRequirements')}</div>
          )}
        </section>
      </section>
    </div>
  );
}

function Requirement({ label, value }) {
  return (
    <div className="mt-5">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-crimson">{label}</p>
      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-smoke">{plainText(value)}</p>
    </div>
  );
}
