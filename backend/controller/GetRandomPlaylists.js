import database from "../config/database.js";
import config from "../config/config.js";

export const getRandomPlaylists = async (req, res) => {
  try {

    const query = `
    SELECT playlists.*, users.username 
    FROM playlists 
    JOIN users ON playlists.Author_ID = users.ID 
    ORDER BY RAND() 
    LIMIT 10`;

    database.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error fetching random playlists:", error);
    return res.status(500).json({ error: "Error fetching random playlists" });
  }
};