'use server';

import { fetchCollection, rawgFetch } from '../../lib/rawg';

export async function fetchGames(filters = {}) {
  try {
    return await fetchCollection('/games', {
      search: filters.sName || '',
      dates: filters.sDates || '1900-01-01,9999-12-31',
      ordering: filters.sOrdering || '-rating',
      page: String(filters.sPage || 1),
      page_size: filters.sPageSize || '16',
      genres: filters.sGenres || '',
      platforms: filters.sPlatforms || '',
      metacritic: filters.sMetacritic || '',
    });
  } catch (error) {
    console.error('Erro ao buscar jogos:', error);
    return { error: error.message };
  }
}

export async function fetchGameDetails(id) {
  try {
    return await rawgFetch(`/games/${id}`);
  } catch (error) {
    console.error('Erro ao buscar detalhes do jogo:', error);
    return { error: error.message };
  }
}
