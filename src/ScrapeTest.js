import { useState } from "react";
import GameDisplay from "./GamesDisplay";
import ReactLoading from "react-loading";
const { getGameData } = require("./api/");

function ScrapeTest() {
  const [games, setGames] = useState([]);
  const [form, setForm] = useState({
    game: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const game = await getGameData(form.game);
    setGames((games) => [...games, game]);
    setLoading(false);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="game"
            value={form.name}
            onChange={handleChange}
          ></input>
        </form>
      </div>
      {loading && <ReactLoading type="bubbles" />}
      <GameDisplay games={games} />
    </>
  );
}

export default ScrapeTest;
