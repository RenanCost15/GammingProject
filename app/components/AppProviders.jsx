'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const translations = {
  'pt-BR': {
    nav: {
      home: 'Início', games: 'Jogos', creators: 'Criadores', developers: 'Desenvolvedoras', platforms: 'Plataformas', publishers: 'Publicadoras', about: 'Sobre',
    },
    controls: {
      language: 'Idioma', theme: 'Tema', dark: 'Escuro', light: 'Claro', portuguese: 'Português', english: 'Inglês',
    },
    common: {
      status: 'Status', backHome: 'Voltar ao início', noDataTitle: 'Nenhum dado encontrado', noDataMessage: 'Tente alterar os filtros ou verificar a configuração da API.', totalGames: 'Total de jogos', highlights: 'Destaques', notInformed: 'Não informado', game: 'Jogo', loadingContent: 'Carregando conteúdo…',
    },
    home: {
      badge: 'Catálogo de jogos', titleA: 'Descubra jogos, pessoas e', titleHighlight: 'universos', titleB: 'que movem a indústria.', description: 'Pesquise títulos, consulte informações detalhadas e explore criadores, estúdios, plataformas e publicadoras usando dados da RAWG.', start: 'Explorar jogos', details: 'Sobre o projeto', exploreEyebrow: 'Explorar', exploreTitle: 'Navegue pelo catálogo', exploreDescription: 'Acesse diretamente as áreas que organizam os dados do ecossistema gamer.', gamesText: 'Busque títulos, filtre resultados e consulte dados de lançamento, nota e plataformas.', creatorsText: 'Conheça profissionais ligados ao desenvolvimento de jogos e seus destaques.', developersText: 'Explore estúdios e equipes responsáveis por grandes catálogos.', platformsText: 'Veja os ecossistemas onde os jogos são distribuídos e jogados.', openSection: 'Abrir seção',
    },
    about: {
      eyebrow: 'Sobre o projeto', titleA: 'RedCore Games foi redesenhado para parecer um', titleHighlight: 'produto acadêmico completo', description: 'A plataforma conecta usuários a jogos, criadores, desenvolvedoras, plataformas e publicadoras por meio de uma interface moderna. O redesign prioriza identidade visual, consistência, responsividade, organização de código e uma apresentação final mais forte para a disciplina de Programação Web.', pillars: [{ title: 'Objetivo', text: 'Fornecer uma interface centralizada e visualmente atrativa para explorar jogos e entidades relevantes do mercado usando dados da API RAWG.' }, { title: 'Tecnologias', text: 'Next.js App Router, React, Tailwind CSS, consumo de API, layout responsivo, cache local e componentes reutilizáveis.' }, { title: 'Valor acadêmico', text: 'O projeto demonstra roteamento, consumo de API, componentização, gestão de estado, refinamento de UX, internacionalização e consistência de interface.' }], developer: 'Desenvolvedor', developerText: 'Único desenvolvedor responsável pela implementação do projeto, refinamento da interface, integração com API e entrega acadêmica final.', viewGames: 'Ver jogos', backHome: 'Voltar ao início',
    },
    sections: {
      creators: { unavailable: 'Criadores indisponíveis', empty: 'Nenhum criador encontrado', eyebrow: 'Pessoas da indústria', title: 'Conheça grandes', highlight: 'criadores', description: 'Uma visão selecionada de profissionais conectados a grandes jogos, incluindo funções e títulos em destaque.' },
      developers: { unavailable: 'Desenvolvedoras indisponíveis', empty: 'Nenhuma desenvolvedora encontrada', eyebrow: 'Estúdios', title: 'Explore grandes', highlight: 'desenvolvedoras', description: 'Navegue por estúdios e equipes de desenvolvimento com volume de catálogo e lançamentos em destaque.' },
      platforms: { unavailable: 'Plataformas indisponíveis', empty: 'Nenhuma plataforma encontrada', eyebrow: 'Hardware e ecossistemas', title: 'Navegue por', highlight: 'plataformas', description: 'Veja os ecossistemas onde os jogos são publicados, incluindo tamanho de catálogo e títulos representativos.' },
      publishers: { unavailable: 'Publicadoras indisponíveis', empty: 'Nenhuma publicadora encontrada', eyebrow: 'Mercado de publicação', title: 'Descubra grandes', highlight: 'publicadoras', description: 'Analise publicadoras, volume de catálogo e jogos mais associados a cada marca.' },
    },
    games: {
      intelligence: 'Biblioteca de jogos', titleA: 'Encontre o seu próximo', titleHighlight: 'jogo', description: 'Pesquise por título, combine filtros de plataforma, período, gênero e nota do Metacritic para descobrir jogos de acordo com o que procura.', cacheQueries: 'consultas em cache', lastUpdate: 'última atualização', noCache: 'sem cache ativo', loadingCatalog: 'Carregando catálogo...', gamesThisPage: 'jogos nesta página', filterPanel: 'Painel de busca avançada', clearFilters: 'Limpar filtros', cleanCache: 'Limpar cache', searchPlaceholder: 'Buscar jogo, franquia ou palavra-chave...', allPlatforms: 'Todas as plataformas', period: 'Período de lançamento', useCustomRange: 'Usar intervalo personalizado', startDate: 'Data inicial', endDate: 'Data final', metacriticPlaceholder: 'Metacritic, ex.: 80,100', perPage: 'por página', page: 'Página', recentSearches: 'Buscas recentes:', currentSource: 'Fonte atual:', localCache: 'cache local instantâneo', api: 'RAWG API', prefetching: 'pré-carregando próximas páginas...', loadingGames: 'Carregando jogos...', noResults: 'Nenhum jogo encontrado para os filtros selecionados.', released: 'Lançamento', platforms: 'Plataformas', details: 'Ver detalhes', previous: 'Página anterior', next: 'Próxima página', error: 'Não foi possível carregar os jogos.', allCatalog: 'Todo o catálogo', allCatalogHint: 'Sem limitar o ano de lançamento', currentYear: 'Lançados em {year}', currentYearHint: 'Jogos publicados neste ano', last5: 'Últimos 5 anos', last5Hint: 'Recorte moderno para tendências atuais', modern: 'Era moderna', modernHint: 'PS4/Xbox One em diante', classics: 'Clássicos', classicsHint: 'Jogos históricos e gerações antigas', future: 'Futuros lançamentos', futureHint: 'Próximos jogos cadastrados', custom: 'Personalizado', customHint: 'Escolha início e fim manualmente', noLimit: 'sem limite', rangeTo: 'até', allGenres: 'Todos', action: 'Ação', rpg: 'RPG', racing: 'Corrida', shooter: 'Shooter', strategy: 'Estratégia', bestRating: 'Melhor avaliação', newest: 'Mais recentes', popular: 'Mais populares', nameAZ: 'Nome A-Z', lowerRating: 'Menor avaliação',
    },
    details: { errorEyebrow: 'Erro', unavailable: 'Detalhes do jogo indisponíveis', tryAgain: 'Tente novamente mais tarde.', backGames: 'Voltar aos jogos', eyebrow: 'Detalhes do jogo', noDescription: 'Nenhuma descrição disponível.', released: 'Lançamento', rating: 'Avaliação RAWG', genres: 'Gêneros', platforms: 'Plataformas', website: 'Site oficial', metacritic: 'Metacritic', playtime: 'Tempo médio', esrb: 'Classificação etária', developers: 'Desenvolvedoras', publishers: 'Publicadoras', tags: 'Características', screenshots: 'Galeria', requirements: 'Requisitos de sistema', ratingsCount: 'Avaliações', addedByUsers: 'Adicionado por usuários', updated: 'Atualizado em', hours: 'horas', minimum: 'Mínimo', recommended: 'Recomendado', noScreenshots: 'A RAWG não retornou imagens adicionais para este jogo.', noRequirements: 'Não há requisitos de sistema disponíveis para as plataformas listadas.', },
    footer: { rights: 'Todos os direitos reservados.', developed: 'Desenvolvido e desenhado exclusivamente por', },
  },
  en: {
    nav: { home: 'Home', games: 'Games', creators: 'Creators', developers: 'Developers', platforms: 'Platforms', publishers: 'Publishers', about: 'About' },
    controls: { language: 'Language', theme: 'Theme', dark: 'Dark', light: 'Light', portuguese: 'Portuguese', english: 'English' },
    common: { status: 'Status', backHome: 'Back to home', noDataTitle: 'No data found', noDataMessage: 'Try changing the filters or checking the API configuration.', totalGames: 'Total games', highlights: 'Highlights', notInformed: 'Not informed', game: 'Game', loadingContent: 'Loading content…' },
    home: { badge: 'Game catalog', titleA: 'Discover games, people and', titleHighlight: 'universes', titleB: 'that move the industry.', description: 'Search titles, inspect detailed information and explore creators, studios, platforms and publishers using RAWG data.', start: 'Explore games', details: 'About the project', exploreEyebrow: 'Explore', exploreTitle: 'Browse the catalog', exploreDescription: 'Go directly to the areas that organize the gaming ecosystem data.', gamesText: 'Search titles, filter results and inspect release, rating and platform information.', creatorsText: 'Meet professionals connected to game development and their highlights.', developersText: 'Explore studios and teams behind major catalogs.', platformsText: 'See the ecosystems where games are distributed and played.', openSection: 'Open section' },
    about: { eyebrow: 'About the project', titleA: 'RedCore Games was redesigned to look like a', titleHighlight: 'complete academic product', description: 'This platform connects users to games, creators, developers, platforms and publishers through a modern interface. The redesign prioritizes visual identity, consistency, responsiveness, code organization and a stronger final presentation for the Web Programming discipline.', pillars: [{ title: 'Objective', text: 'Provide a centralized and visually attractive interface for exploring games and relevant market entities through RAWG API data.' }, { title: 'Technologies', text: 'Next.js App Router, React, Tailwind CSS, API consumption, responsive layout, local cache and reusable UI components.' }, { title: 'Academic value', text: 'The project demonstrates routing, API consumption, componentization, state management, UX refinement, internationalization and interface consistency.' }], developer: 'Developer', developerText: 'Sole developer responsible for the project implementation, interface refinement, API integration and final academic delivery.', viewGames: 'View games', backHome: 'Back to home' },
    sections: { creators: { unavailable: 'Creators unavailable', empty: 'No creators found', eyebrow: 'Industry people', title: 'Meet influential', highlight: 'creators', description: 'A curated view of professionals connected to major games, including their roles and highlighted titles.' }, developers: { unavailable: 'Developers unavailable', empty: 'No developers found', eyebrow: 'Studios', title: 'Explore top', highlight: 'developers', description: 'Browse game studios and development teams with their catalog size and highlighted releases.' }, platforms: { unavailable: 'Platforms unavailable', empty: 'No platforms found', eyebrow: 'Hardware and ecosystems', title: 'Navigate gaming', highlight: 'platforms', description: 'See the ecosystems where games are published, including catalog size and representative titles.' }, publishers: { unavailable: 'Publishers unavailable', empty: 'No publishers found', eyebrow: 'Publishing market', title: 'Discover major', highlight: 'publishers', description: 'Review publishers, their catalog volume and the games most associated with each brand.' } },
    games: { intelligence: 'Game library', titleA: 'Find your next', titleHighlight: 'game', description: 'Search by title, combine platform, period, genre and Metacritic filters to discover games that match what you are looking for.', cacheQueries: 'cached queries', lastUpdate: 'last update', noCache: 'no active cache', loadingCatalog: 'Loading catalog...', gamesThisPage: 'games on this page', filterPanel: 'Advanced search panel', clearFilters: 'Clear filters', cleanCache: 'Clear cache', searchPlaceholder: 'Search game, franchise or keyword...', allPlatforms: 'All platforms', period: 'Release period', useCustomRange: 'Use custom range', startDate: 'Start date', endDate: 'End date', metacriticPlaceholder: 'Metacritic, e.g.: 80,100', perPage: 'per page', page: 'Page', recentSearches: 'Recent searches:', currentSource: 'Current source:', localCache: 'instant local cache', api: 'RAWG API', prefetching: 'prefetching next pages...', loadingGames: 'Loading games...', noResults: 'No games found for the selected filters.', released: 'Released', platforms: 'Platforms', details: 'View details', previous: 'Previous page', next: 'Next page', error: 'Could not load games.', allCatalog: 'Full catalog', allCatalogHint: 'No release year limit', currentYear: 'Released in {year}', currentYearHint: 'Games published this year', last5: 'Last 5 years', last5Hint: 'Modern cut for current trends', modern: 'Modern era', modernHint: 'PS4/Xbox One onward', classics: 'Classics', classicsHint: 'Historic games and older generations', future: 'Future releases', futureHint: 'Upcoming registered games', custom: 'Custom', customHint: 'Choose start and end manually', noLimit: 'no limit', rangeTo: 'to', allGenres: 'All', action: 'Action', rpg: 'RPG', racing: 'Racing', shooter: 'Shooter', strategy: 'Strategy', bestRating: 'Best rating', newest: 'Newest', popular: 'Most popular', nameAZ: 'Name A-Z', lowerRating: 'Lower rating' },
    details: { errorEyebrow: 'Error', unavailable: 'Game details unavailable', tryAgain: 'Try again later.', backGames: 'Back to games', eyebrow: 'Game details', noDescription: 'No description available.', released: 'Released', rating: 'RAWG rating', genres: 'Genres', platforms: 'Platforms', website: 'Official website', metacritic: 'Metacritic', playtime: 'Average playtime', esrb: 'Age rating', developers: 'Developers', publishers: 'Publishers', tags: 'Features', screenshots: 'Gallery', requirements: 'System requirements', ratingsCount: 'Ratings', addedByUsers: 'Added by users', updated: 'Updated on', hours: 'hours', minimum: 'Minimum', recommended: 'Recommended', noScreenshots: 'RAWG did not return additional images for this game.', noRequirements: 'No system requirements are available for the listed platforms.' },
    footer: { rights: 'All rights reserved.', developed: 'Developed and designed exclusively by' },
  },
};

const AppContext = createContext(null);

function getNestedValue(dictionary, key) {
  return key.split('.').reduce((value, segment) => value?.[segment], dictionary);
}

function interpolate(value, params = {}) {
  if (typeof value !== 'string') return value;
  return Object.entries(params).reduce((text, [key, paramValue]) => text.replaceAll(`{${key}}`, String(paramValue)), value);
}

export function AppProviders({ children }) {
  const [language, setLanguage] = useState('pt-BR');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('redcore:language');
    const storedTheme = localStorage.getItem('redcore:theme');
    if (storedLanguage && translations[storedLanguage]) setLanguage(storedLanguage);
    if (storedTheme === 'light' || storedTheme === 'dark') setTheme(storedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('lang', language === 'pt-BR' ? 'pt-BR' : 'en');
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('redcore:language', language);
    localStorage.setItem('redcore:theme', theme);
  }, [language, theme]);

  const value = useMemo(() => ({
    language,
    theme,
    setLanguage,
    setTheme,
    t(key, params) {
      const primary = getNestedValue(translations[language], key);
      const fallback = getNestedValue(translations['pt-BR'], key) ?? key;
      return interpolate(primary ?? fallback, params);
    },
  }), [language, theme]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppSettings() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppSettings deve ser usado dentro de AppProviders.');
  return context;
}
