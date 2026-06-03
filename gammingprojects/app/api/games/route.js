import { fetchGames } from '../../actions/gameActions';

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const result = await fetchGames({
    sName: searchParams.get('sName') || '',
    sDates: searchParams.get('sDates') || '1900-01-01,9999-12-31',
    sOrdering: searchParams.get('sOrdering') || '-rating',
    sPage: searchParams.get('sPage') || 1,
    sPageSize: searchParams.get('sPageSize') || '16',
    sGenres: searchParams.get('sGenres') || '',
    sPlatforms: searchParams.get('sPlatforms') || '',
    sMetacritic: searchParams.get('sMetacritic') || '',
  });

  const status = result?.error ? 500 : 200;

  return Response.json(result, { status });
}
