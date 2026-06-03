const RAWG_BASE_URL = 'https://api.rawg.io/api';

const INVALID_API_KEY_VALUES = new Set([
  '',
  'your_rawg_api_key_here',
  'sua_chave_da_rawg',
  'cole_sua_chave_aqui',
  'undefined',
  'null',
]);

export function getRawgApiKey() {
  const candidates = [
    process.env.RAWG_API_KEY,
    process.env.API_KEY,
    process.env.NEXT_PUBLIC_RAWG_API_KEY,
  ];

  return candidates.find((key) => key && !INVALID_API_KEY_VALUES.has(String(key).trim()))?.trim() || '';
}

export function buildImageFallback(seed = 'redcore') {
  const encodedSeed = encodeURIComponent(seed);
  return `https://placehold.co/900x600/0B0B0F/E50914?text=${encodedSeed}`;
}

export async function rawgFetch(endpoint, params = {}) {
  const apiKey = getRawgApiKey();

  if (!apiKey) {
    throw new Error('Chave da RAWG API não configurada. Crie um arquivo .env.local baseado no .env.example.');
  }

  const searchParams = new URLSearchParams();
  searchParams.set('key', apiKey);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value));
    }
  });

  const response = await fetch(`${RAWG_BASE_URL}${endpoint}?${searchParams.toString()}`, {
    next: { revalidate: 3600 },
  });

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

export async function fetchCollection(endpoint, params = {}) {
  const data = await rawgFetch(endpoint, params);
  return data.results || [];
}
