const axios = require("axios").default;
const { findBestMatch } = require("string-similarity");
const languageMatch = (entry) => entry.langue === "en";
const mediaMatch = (entry, mediaType) => entry.type === mediaType;
const regionMatch = (entry) => entry.region === "us" || entry.region === "wor";
let id = 0;

const { REACT_APP_DEV_ID: devid, REACT_APP_DEV_PASSWORD: devpassword } =
  process.env;

const getGameData = (name) =>
  axios
    .get("https://www.screenscraper.fr/api2/jeuRecherche.php", {
      params: {
        devid,
        devpassword,
        softname: "test",
        output: "json",
        recherche: name,
      },
    })
    .then((res) => res.data.response.jeux)
    .then((games) => games[findGame(games, name)])
    .then(extractData)
    .catch((e) => console.error(e));

const findGame = (games, name) => {
  console.log(games);
  const gameNames = games.map((game) => game.noms[0]?.text || "");
  const { bestMatchIndex } = findBestMatch(name, gameNames);
  return bestMatchIndex;
};

const extractData = (game) => {
  if (!game) return {};
  return {
    name: game.noms?.find(regionMatch)?.text,
    system: game.systeme?.text,
    developer: game.developpeur?.text,
    publisher: game.editeur?.text,
    synopsis: game.synopsis?.find(languageMatch)?.text,
    date: game.dates?.find(regionMatch)?.text || "1994",
    image: game.medias?.find((media) => mediaMatch(media, "mixrbv2"))?.url,
    id: id++,
    voteCount: Math.floor(Math.random() * 40 + 10),
  };
};

module.exports = {
  getGameData,
};
