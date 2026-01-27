'use server';

import { cache } from 'react';

export const fetchGames = cache(async (filters) => {
  const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY || "931f29a2e2594596ae17eff8a97ef3f4";
  const BASE_URL = "https://api.rawg.io/api/games";

  const queryString = new URLSearchParams({
    key: apiKey,
    search: filters.sName || '',
    dates: filters.sDates || '1900-01-01 / 9999-12-31',
    ordering: filters.sOrdering || '',
    page: filters.sPage || 1,
    page_size: 12,
  }).toString();

  const url = `${BASE_URL}?${queryString}`;

  try {
    const response = await fetch(url, { method: "GET", next: { revalidate: 3600 } });
    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Erro ao buscar jogos:", error);
    return { error: error.message };
  }
});

export async function fetchGameDetails(id) {
  const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY || "931f29a2e2594596ae17eff8a97ef3f4";
  const BASE_URL = `https://api.rawg.io/api/games/${id}`;

  try {
    const response = await fetch(`${BASE_URL}?key=${apiKey}`, { method: "GET", next: { revalidate: 3600 } });
    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching game details:", error);
    return { error: error.message };
  }
}