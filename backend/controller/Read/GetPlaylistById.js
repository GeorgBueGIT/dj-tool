import database from "../../config/database.js";
import config from "../../config/config.js";

export const getPlaylistById = async (req, res) => {
  const { playlistId } = req.query;

  try {

    const query = "SELECT * FROM playlists WHERE ID = ?";

    database.query(query, [playlistId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error fetching Playlist:", error);
    return res.status(500).json({ error: "Error fetching Playlist" });
  }
};
