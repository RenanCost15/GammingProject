import { fetchGameDetails } from '../../actions/gameActions';
import GameDetailsView from '../../components/GameDetailsView';

export default async function GameDetails({ params }) {
  const { id } = await params;
  const gameData = await fetchGameDetails(id);
  return <GameDetailsView gameData={gameData} />;
}
