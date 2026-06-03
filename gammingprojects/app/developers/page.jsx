import CollectionPage from '../components/CollectionPage';
import { fetchCollection } from '../../lib/rawg';

export const dynamic = 'force-dynamic';

export default async function Developers() {
  let items = [];
  let error = '';

  try {
    items = await fetchCollection('/developers', { page_size: '12' });
  } catch (err) {
    error = err.message;
  }

  return <CollectionPage section="developers" items={items} error={error} />;
}
