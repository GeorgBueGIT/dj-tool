import database from "../config/database.js";
import config from "../config/config.js";

export const updatePlaylist = (req, res) => {
    const { title, description, tags, playlistId, playlistCoverLink, sortedSongIds } = req.body;

    const query = `
    UPDATE playlists
    SET Title = ?, Description = ?, Tags = ?, Cover = ?, Songs_Sorted = ?
    WHERE ID = ?
  `;

  database.query(query, [title, description, tags, playlistCoverLink, sortedSongIds, playlistId], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log('Updated Playlist!');
    res.status(200).json({ message: "Successfully Updated Playlist" });
  });
};
