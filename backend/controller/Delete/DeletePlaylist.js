import database from "../../config/database.js";

export const deletePlaylist = async (req, res) => {
  const { playlistId } = req.query;

  if (!playlistId) {
    return res.status(400).json({ error: "Playlist ID is required." });
  }

  try {
    const query = "DELETE FROM playlists WHERE ID = ?";
    database.query(query, [playlistId], (err, results) => {
      if (err) {
        console.error("Error deleting playlist:", err);
        return res.status(500).json({ error: "Error deleting playlist." });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Playlist not found." });
      }

      res.status(200).json({ message: "Playlist deleted successfully." });
    });
  } catch (error) {
    console.error("Error deleting playlist:", error);
    res.status(500).json({ error: "Error deleting playlist." });
  }
};
