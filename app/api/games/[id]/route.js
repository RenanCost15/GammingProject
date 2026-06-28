import { fetchGameDetails } from '../../../actions/gameActions';

export async function GET(_request, { params }) {
  const { id } = await params;
  const result = await fetchGameDetails(id);
  const status = result?.error ? 500 : 200;

  return Response.json(result, { status });
}
