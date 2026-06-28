'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { FiCalendar, FiFilter, FiSearch, FiSliders, FiStar } from 'react-icons/fi';
import { buildImageFallback, fetchCollection } from '../../lib/rawg';
import { createGamesCacheKey, readCache, writeCache } from '../../lib/gameCache';
import useDebouncedValue from '../../lib/useDebouncedValue';
import { useAppSettings } from '../components/AppProviders';
import LoadingState from '../components/LoadingState';

const currentYear = new Date().getFullYear();
const today = new Date().toISOString().slice(0, 10);

const defaultFilters = {
  sName: '', sDatePreset: 'all', sDateFrom: '1900-01-01', sDateTo: '9999-12-31', sOrdering: '-rating', sPage: 1, sPageSize: 16, sGenres: '', sPlatforms: '', sMetacritic: '',
};

const datePresetConfig = [
  { key: 'allCatalog', hintKey: 'allCatalogHint', value: 'all', from: '1900-01-01', to: '9999-12-31' },
  { key: 'currentYear', hintKey: 'currentYearHint', value: 'current-year', from: `${currentYear}-01-01`, to: `${currentYear}-12-31`, params: { year: currentYear } },
  { key: 'last5', hintKey: 'last5Hint', value: 'last-5-years', from: `${currentYear - 5}-01-01`, to: `${currentYear}-12-31` },
  { key: 'modern', hintKey: 'modernHint', value: 'modern', from: '2013-01-01', to: '9999-12-31' },
  { key: 'classics', hintKey: 'classicsHint', value: 'classics', from: '1980-01-01', to: '2012-12-31' },
  { key: 'future', hintKey: 'futureHint', value: 'future', from: today, to: `${currentYear + 3}-12-31` },
  { key: 'custom', hintKey: 'customHint', value: 'custom', from: `${currentYear - 1}-01-01`, to: `${currentYear}-12-31` },
];

const quickGenreConfig = [
  { key: 'allGenres', value: '' }, { key: 'action', value: 'action' }, { key: 'rpg', value: 'role-playing-games-rpg' }, { key: 'racing', value: 'racing' }, { key: 'shooter', value: 'shooter' }, { key: 'strategy', value: 'strategy' },
];

const platformOptions = [
  { label: 'PC', value: '4' }, { label: 'PlayStation 5', value: '187' }, { label: 'Xbox Series S/X', value: '186' }, { label: 'Nintendo Switch', value: '7' },
];

const orderingConfig = [
  { key: 'bestRating', value: '-rating' }, { key: 'newest', value: '-released' }, { key: 'popular', value: '-added' }, { key: 'nameAZ', value: 'name' }, { key: 'lowerRating', value: 'rating' },
];

function normalizeDateRange(filters) {
  const from = filters.sDateFrom || '1900-01-01';
  const to = filters.sDateTo || '9999-12-31';
  return from > to ? `${to},${from}` : `${from},${to}`;
}

async function requestGames(filters, signal, fallbackMessage) {
  try {
    return await fetchCollection('/games', {
      search: filters.sName || '',
      dates: filters.sDates || normalizeDateRange(filters),
      ordering: filters.sOrdering || '-rating',
      page: String(filters.sPage || 1),
      page_size: String(filters.sPageSize || 16),
      genres: filters.sGenres || '',
      platforms: filters.sPlatforms || '',
      metacritic: filters.sMetacritic || '',
    }, { signal });
  } catch (error) {
    throw new Error(error.message || fallbackMessage);
  }
}

export default function GamesPage() {
  const { language, t } = useAppSettings();
  const [draftFilters, setDraftFilters] = useState(defaultFilters);
  const debouncedSearch = useDebouncedValue(draftFilters.sName, 450);
  const filters = useMemo(() => ({ ...draftFilters, sName: debouncedSearch.trim(), sDates: normalizeDateRange(draftFilters) }), [draftFilters, debouncedSearch]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const activeRequest = useRef(0);
  const cacheKey = useMemo(() => createGamesCacheKey(filters), [filters]);

  const datePresets = useMemo(() => datePresetConfig.map((preset) => ({ ...preset, label: t(`games.${preset.key}`, preset.params), hint: t(`games.${preset.hintKey}`) })), [t]);
  const quickGenres = useMemo(() => quickGenreConfig.map((genre) => ({ ...genre, label: t(`games.${genre.key}`) })), [t]);
  const orderingOptions = useMemo(() => orderingConfig.map((option) => ({ ...option, label: t(`games.${option.key}`) })), [t]);

  const getActiveDatePreset = useCallback((value) => datePresets.find((preset) => preset.value === value) || datePresets[0], [datePresets]);
  const formatDateLabel = useCallback((value) => {
    if (value === '9999-12-31') return t('games.noLimit');
    return new Intl.DateTimeFormat(language === 'pt-BR' ? 'pt-BR' : 'en-US', { timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`));
  }, [language, t]);

  const prefetchNextPages = useCallback(async (baseFilters) => {
    const pages = [Number(baseFilters.sPage) + 1, Number(baseFilters.sPage) + 2];
    await Promise.allSettled(pages.map(async (page) => {
      const nextFilters = { ...baseFilters, sPage: page };
      const nextKey = createGamesCacheKey(nextFilters);
      if (readCache(nextKey)) return;
      const data = await requestGames(nextFilters, undefined, t('games.error'));
      writeCache(nextKey, data);
    }));
  }, [t]);

  useEffect(() => {
    const controller = new AbortController();
    const requestId = activeRequest.current + 1;
    activeRequest.current = requestId;
    async function loadGames() {
      setError('');
      const cached = readCache(cacheKey);
      if (cached?.payload) {
        setGames(cached.payload); setLoading(false); prefetchNextPages(filters); return;
      }
      setLoading(true);
      try {
        const data = await requestGames(filters, controller.signal, t('games.error'));
        if (activeRequest.current !== requestId) return;
        setGames(data); writeCache(cacheKey, data);
        prefetchNextPages(filters);
      } catch (err) {
        if (err.name !== 'AbortError') { setError(err.message); setGames([]); }
      } finally {
        if (activeRequest.current === requestId) setLoading(false);
      }
    }
    loadGames();
    return () => controller.abort();
  }, [cacheKey, filters, prefetchNextPages, t]);

  function updateFilter(event) { const { name, value } = event.target; setDraftFilters((prev) => ({ ...prev, [name]: value, sPage: 1 })); }
  function setDatePreset(value) { const preset = getActiveDatePreset(value); setDraftFilters((prev) => ({ ...prev, sDatePreset: value, sDateFrom: preset.from, sDateTo: preset.to, sPage: 1 })); }
  function setQuickGenre(value) { setDraftFilters((prev) => ({ ...prev, sGenres: value, sPage: 1 })); }
  function nextPage() { setDraftFilters((prev) => ({ ...prev, sPage: Number(prev.sPage) + 1 })); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  function previousPage() { setDraftFilters((prev) => ({ ...prev, sPage: Math.max(1, Number(prev.sPage) - 1) })); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  function resetFilters() { setDraftFilters(defaultFilters); }
  const resultLabel = loading ? t('games.loadingCatalog') : `${games.length} ${t('games.gamesThisPage')}`;
  const activePreset = getActiveDatePreset(draftFilters.sDatePreset);

  return (
    <div className="page-shell">
      <section className="container-pro">
        <div className="mb-8 max-w-4xl">
          <p className="section-eyebrow">{t('games.intelligence')}</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-frost sm:text-6xl">{t('games.titleA')} <span className="gradient-title">{t('games.titleHighlight')}</span></h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-smoke">{t('games.description')}</p>
        </div>
        <div className="glass-panel mb-8 rounded-3xl p-5 sm:p-6">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.25em] text-crimson"><FiSliders /> {t('games.filterPanel')}</p></div><div className="flex flex-wrap gap-2"><button onClick={resetFilters} className="btn-secondary">{t('games.clearFilters')}</button></div></div>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <label className="relative"><FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-smoke" /><input type="text" name="sName" placeholder={t('games.searchPlaceholder')} value={draftFilters.sName} onChange={updateFilter} className="field-pro w-full pl-11" /></label>
            <select name="sOrdering" value={draftFilters.sOrdering} onChange={updateFilter} className="field-pro">{orderingOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>
            <select name="sPlatforms" value={draftFilters.sPlatforms} onChange={updateFilter} className="field-pro"><option value="">{t('games.allPlatforms')}</option>{platformOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>
            <select name="sDatePreset" value={draftFilters.sDatePreset} onChange={(event) => setDatePreset(event.target.value)} className="field-pro">{datePresets.map((preset) => <option key={preset.value} value={preset.value}>{preset.label}</option>)}</select>
          </div>
          <div className="mt-4 rounded-[1.75rem] surface-subtle">
            <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between"><div><p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.22em] text-crimson"><FiCalendar /> {t('games.period')}</p><p className="mt-1 text-sm text-smoke">{activePreset.hint} • {formatDateLabel(draftFilters.sDateFrom)} {t('games.rangeTo')} {formatDateLabel(draftFilters.sDateTo)}</p></div><span className="w-fit rounded-full border border-crimson/30 bg-crimson/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-ember">{activePreset.label}</span></div>
            <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr]"><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{datePresets.filter((preset) => preset.value !== 'custom').map((preset) => <button key={preset.value} type="button" onClick={() => setDatePreset(preset.value)} className={`rounded-2xl border px-3 py-3 text-left transition duration-300 ease-out ${draftFilters.sDatePreset === preset.value ? 'border-crimson bg-crimson text-white shadow-neon' : 'filter-choice'}`}><span className="block text-xs font-black uppercase tracking-wide">{preset.label}</span><span className="mt-1 block text-[11px] leading-4 opacity-80">{preset.hint}</span></button>)}</div>
              <div className="rounded-2xl surface-subtle"><button type="button" onClick={() => setDatePreset('custom')} className={`mb-3 w-full rounded-xl border px-3 py-2 text-xs font-black uppercase tracking-wide transition duration-300 ease-out ${draftFilters.sDatePreset === 'custom' ? 'border-crimson bg-crimson text-white' : 'filter-choice'}`}>{t('games.useCustomRange')}</button><div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1"><label className="space-y-2"><span className="text-xs font-black uppercase tracking-wide text-smoke">{t('games.startDate')}</span><input type="date" value={draftFilters.sDateFrom === '1900-01-01' ? '' : draftFilters.sDateFrom} min="1950-01-01" max="9999-12-31" onChange={(event) => setDraftFilters((prev) => ({ ...prev, sDatePreset: 'custom', sDateFrom: event.target.value || '1900-01-01', sPage: 1 }))} className="field-pro w-full" /></label><label className="space-y-2"><span className="text-xs font-black uppercase tracking-wide text-smoke">{t('games.endDate')}</span><input type="date" value={draftFilters.sDateTo === '9999-12-31' ? '' : draftFilters.sDateTo} min="1950-01-01" max="9999-12-31" onChange={(event) => setDraftFilters((prev) => ({ ...prev, sDatePreset: 'custom', sDateTo: event.target.value || '9999-12-31', sPage: 1 }))} className="field-pro w-full" /></label></div></div></div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr_auto]"><input type="text" name="sMetacritic" placeholder={t('games.metacriticPlaceholder')} value={draftFilters.sMetacritic} onChange={updateFilter} className="field-pro" /><select name="sPageSize" value={draftFilters.sPageSize} onChange={updateFilter} className="field-pro">{[8,16,24,32].map((size) => <option key={size} value={size}>{size} {t('games.perPage')}</option>)}</select><div className="flex items-center justify-center rounded-2xl surface-subtle px-5 text-sm font-bold text-smoke">{t('games.page')} {draftFilters.sPage}</div></div>
          <div className="mt-5 flex flex-wrap gap-2">{quickGenres.map((genre) => <button key={genre.value || 'all'} onClick={() => setQuickGenre(genre.value)} className={`rounded-full border px-4 py-2 text-xs font-black uppercase tracking-wide transition duration-300 ease-out ${draftFilters.sGenres === genre.value ? 'border-crimson bg-crimson text-white shadow-neon' : 'filter-choice'}`}>{genre.label}</button>)}</div>
        </div>
        <div className="mb-6 flex items-center rounded-3xl surface-subtle"><p className="flex items-center gap-2 text-sm font-bold text-ash"><FiFilter className="text-crimson" /> {resultLabel}</p></div>
        {loading && <LoadingState compact label={t('common.loadingContent')} />}
        {error && <p className="rounded-2xl border border-crimson/30 bg-crimson/10 p-5 text-center font-semibold text-ember">{error}</p>}
        {!loading && !error && games.length === 0 && <p className="text-center text-lg font-bold text-smoke">{t('games.noResults')}</p>}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{games.map((game) => { const cover = game.background_image || buildImageFallback(game.name); const genres = game.genres?.slice(0, 2).map((genre) => genre.name).join(' • '); const platforms = game.parent_platforms?.slice(0, 3).map((item) => item.platform.name).join(', '); return <Link key={game.id} href={`/game?id=${encodeURIComponent(String(game.id))}`} className="card-clickable card-pro group" aria-label={`${t('games.details')} ${game.name}`}><div className="h-64 bg-cover bg-center transition duration-700 ease-out group-hover:scale-110" style={{ backgroundImage: `linear-gradient(to top, rgba(5,5,5,.95), rgba(5,5,5,.08)), url(${cover})` }} /><div className="p-6"><div className="mb-3 flex items-center justify-between gap-3"><span className="rounded-full bg-crimson/15 px-3 py-1 text-xs font-black uppercase text-ember transition duration-500 group-hover:bg-crimson group-hover:text-white">{genres || t('common.game')}</span><span className="flex items-center gap-1 text-sm font-black text-crimson"><FiStar /> {game.rating || '—'}</span></div><h2 className="line-clamp-2 min-h-16 text-2xl font-black text-frost transition duration-500 group-hover:text-crimson">{game.name}</h2><p className="mt-2 text-sm font-semibold text-smoke">{t('games.released')}: <span className="text-ash">{game.released || t('common.notInformed')}</span></p><div className="expand-card-details"><div><p className="line-clamp-2 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm font-semibold text-smoke">{t('games.platforms')}: <span className="text-ash">{platforms || t('common.notInformed')}</span></p><p className="mt-3 text-xs font-black uppercase tracking-[0.22em] text-crimson">{t('games.details')}</p></div></div></div></Link>; })}</div>
        <div className="mt-10 flex items-center justify-center gap-3"><button onClick={previousPage} disabled={Number(draftFilters.sPage) === 1 || loading} className="btn-secondary disabled:cursor-not-allowed disabled:opacity-40">{t('games.previous')}</button><button onClick={nextPage} disabled={loading || games.length === 0} className="btn-primary disabled:cursor-not-allowed disabled:opacity-40">{t('games.next')}</button></div>
      </section>
    </div>
  );
}
