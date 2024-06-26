import database from "../../config/database.js";

export const isPlaylistPublic = async (req, res) => {
  const { playlistId } = req.query;

  try {
    // Query to check if the playlist is public (Visible)
    const query = `
      SELECT Visible
      FROM playlists
      WHERE ID = ?;
    `;
    const result = await queryDatabase(query, [playlistId]);

    // If the playlist exists, return the value of Visible
    if (result.length > 0) {
      return res.status(200).json({ visible: result[0].Visible });
    } else {
      return res.status(404).json({ error: "Playlist not found." });
    }
  } catch (error) {
    console.error("Error checking playlist visibility:", error);
    res.status(500).json({ error: "Error checking playlist visibility." });
  }
};

// Helper function to promisify the database queries
const queryDatabase = (query, params) => {
  return new Promise((resolve, reject) => {
    database.query(query, params, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};
