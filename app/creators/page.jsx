import CollectionPage from '../components/CollectionPage';
import { fetchCollection } from '../../lib/rawg';

export const dynamic = 'force-dynamic';

export default async function Creators() {
  let items = [];
  let error = '';

  try {
    items = await fetchCollection('/creators', { page_size: '12' });
  } catch (err) {
    error = err.message;
  }

  return <CollectionPage section="creators" items={items} error={error} />;
}
