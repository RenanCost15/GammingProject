import CollectionPage from '../components/CollectionPage';
import { fetchCollection } from '../../lib/rawg';

export const dynamic = 'force-dynamic';

export default async function Publishers() {
  let items = [];
  let error = '';

  try {
    items = await fetchCollection('/publishers', { page_size: '12' });
  } catch (err) {
    error = err.message;
  }

  return <CollectionPage section="publishers" items={items} error={error} />;
}
