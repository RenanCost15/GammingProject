import CollectionPage from '../components/CollectionPage';
import { fetchCollection } from '../../lib/rawg';

export const dynamic = 'force-dynamic';

export default async function Platforms() {
  let items = [];
  let error = '';

  try {
    items = await fetchCollection('/platforms', { page_size: '12' });
  } catch (err) {
    error = err.message;
  }

  return <CollectionPage section="platforms" items={items} error={error} />;
}
