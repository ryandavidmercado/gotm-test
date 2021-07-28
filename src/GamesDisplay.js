import styles from "./GamesDisplay.module.css";

function GamesDisplay({ games }) {
  if (!games.length) return null;
  return (
    <div style={{ display: "flex" }} className={styles.gamesContainer}>
      {games.map((game, index) => (
        <div key={game.id} className={styles.game}>
          <img src={game.image} alt={game.name} />
          <ul>
            <li>System: {game.system}</li>
            <li>Developer: {game.developer}</li>
            <li>Publisher: {game.publisher}</li>
            <li>Votes: {game.voteCount}</li>
          </ul>
          <p>{game.synopsis}</p>
        </div>
      ))}
    </div>
  );
}

export default GamesDisplay;
