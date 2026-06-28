const CACHE_PREFIX = 'redcore:v3:';
const CACHE_INDEX_KEY = `${CACHE_PREFIX}index`;
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 horas
const MAX_CACHE_ITEMS = 80;
const SEARCH_HISTORY_KEY = `${CACHE_PREFIX}search-history`;

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function normalizeKey(key) {
  return `${CACHE_PREFIX}${key}`;
}

function readIndex() {
  if (!isBrowser()) return [];

  try {
    return JSON.parse(window.localStorage.getItem(CACHE_INDEX_KEY) || '[]');
  } catch {
    return [];
  }
}

function writeIndex(index) {
  if (!isBrowser()) return;
  window.localStorage.setItem(CACHE_INDEX_KEY, JSON.stringify(index.slice(0, MAX_CACHE_ITEMS)));
}

function touchIndex(key) {
  const now = Date.now();
  const index = readIndex().filter((item) => item.key !== key);
  index.unshift({ key, updatedAt: now });

  const overflow = index.slice(MAX_CACHE_ITEMS);
  overflow.forEach((item) => window.localStorage.removeItem(normalizeKey(item.key)));

  writeIndex(index);
}

export function createGamesCacheKey(filters = {}) {
  const params = new URLSearchParams({
    sName: filters.sName || '',
    sDates: filters.sDates || '1900-01-01,9999-12-31',
    sOrdering: filters.sOrdering || '-rating',
    sPage: String(filters.sPage || 1),
    sPageSize: String(filters.sPageSize || 16),
    sGenres: filters.sGenres || '',
    sPlatforms: filters.sPlatforms || '',
    sMetacritic: filters.sMetacritic || '',
  });

  return `games:${params.toString()}`;
}

export function readCache(key) {
  if (!isBrowser()) return null;

  try {
    const raw = window.localStorage.getItem(normalizeKey(key));
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    const expired = Date.now() - parsed.updatedAt > CACHE_TTL;

    if (expired) {
      window.localStorage.removeItem(normalizeKey(key));
      return null;
    }

    touchIndex(key);
    return parsed;
  } catch {
    return null;
  }
}

export function writeCache(key, payload) {
  if (!isBrowser()) return;

  try {
    window.localStorage.setItem(
      normalizeKey(key),
      JSON.stringify({ payload, updatedAt: Date.now() })
    );
    touchIndex(key);
  } catch {
    compactCache();
  }
}

export function compactCache() {
  if (!isBrowser()) return;
  const index = readIndex();
  const removable = index.slice(Math.ceil(MAX_CACHE_ITEMS / 2));
  removable.forEach((item) => window.localStorage.removeItem(normalizeKey(item.key)));
  writeIndex(index.slice(0, Math.ceil(MAX_CACHE_ITEMS / 2)));
}

export function getCacheStats() {
  const index = readIndex();
  return {
    entries: index.length,
    lastUpdate: index[0]?.updatedAt || null,
  };
}

export function clearRedcoreCache() {
  if (!isBrowser()) return;
  readIndex().forEach((item) => window.localStorage.removeItem(normalizeKey(item.key)));
  window.localStorage.removeItem(CACHE_INDEX_KEY);
  window.localStorage.removeItem(SEARCH_HISTORY_KEY);
}

export function readSearchHistory() {
  if (!isBrowser()) return [];

  try {
    return JSON.parse(window.localStorage.getItem(SEARCH_HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveSearchTerm(term) {
  if (!isBrowser()) return;
  const normalized = term.trim();
  if (normalized.length < 2) return;

  const history = readSearchHistory().filter((item) => item.toLowerCase() !== normalized.toLowerCase());
  history.unshift(normalized);
  window.localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history.slice(0, 6)));
}
