import database from "../../config/database.js";
import config from "../../config/config.js";

export const updatePlaylistVisibility = (req, res) => {
    const { visibility, playlistId } = req.body;

    const query = `
    UPDATE playlists
    SET Visible = ?
    WHERE ID = ?
  `;

  database.query(query, [visibility, playlistId], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log('Updated Playlist!');
    res.status(200).json({ message: "Successfully Updated Visibility of Playlist" });
  });
};
