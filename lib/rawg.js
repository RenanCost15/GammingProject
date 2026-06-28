const RAWG_BASE_URL = 'https://api.rawg.io/api';

const INVALID_API_KEY_VALUES = new Set([
  '',
  'your_rawg_api_key_here',
  'sua_chave_da_rawg',
  'cole_sua_chave_aqui',
  'coloque_sua_chave_da_rawg_aqui',
  'undefined',
  'null',
]);

/**
 * O GitHub Pages é hospedagem estática: não há API route ou servidor Next.js
 * para manter a credencial privada. Por isso, a chave usada pelo front-end
 * precisa ser definida como NEXT_PUBLIC_RAWG_API_KEY durante o build.
 */
export function getRawgApiKey() {
  const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;
  const normalized = String(apiKey || '').trim();

  return normalized && !INVALID_API_KEY_VALUES.has(normalized) ? normalized : '';
}

export function buildImageFallback(seed = 'redcore') {
  const encodedSeed = encodeURIComponent(seed);
  return `https://placehold.co/900x600/0B0B0F/E50914?text=${encodedSeed}`;
}

export async function rawgFetch(endpoint, params = {}, options = {}) {
  const apiKey = getRawgApiKey();

  if (!apiKey) {
    throw new Error(
      'Chave da RAWG API não configurada. No GitHub, cadastre NEXT_PUBLIC_RAWG_API_KEY em Settings > Secrets and variables > Actions.'
    );
  }

  const searchParams = new URLSearchParams();
  searchParams.set('key', apiKey);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value));
    }
  });

  const requestOptions = {
    signal: options.signal,
  };

  const response = await fetch(`${RAWG_BASE_URL}${endpoint}?${searchParams.toString()}`, requestOptions);

  if (!response.ok) {
    let rawgMessage = '';

    try {
      const errorData = await response.json();
      rawgMessage = errorData?.error || errorData?.detail || JSON.stringify(errorData);
    } catch {
      rawgMessage = await response.text();
    }

    throw new Error(
      `RAWG API respondeu com status ${response.status}. ${rawgMessage || 'Verifique a chave e a conexão com a internet.'}`
    );
  }

  return response.json();
}

export async function fetchCollection(endpoint, params = {}, options = {}) {
  const data = await rawgFetch(endpoint, params, options);
  return data.results || [];
}
