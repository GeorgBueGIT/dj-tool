import database from "../../config/database.js";
import config from "../../config/config.js";

export const getRandomPlaylists = async (req, res) => {
  const { tagId } = req.query;

  try {
    let query;

    if (tagId) {
      query = `
      SELECT playlists.*, users.username
      FROM playlists
      JOIN users ON playlists.Author_ID = users.ID
      WHERE playlists.Visible = true
      AND (FIND_IN_SET('${tagId}', playlists.Tags) > 0 OR FIND_IN_SET('${tagId}', playlists.Tags) > 0)
      ORDER BY RAND()
      LIMIT 10`;
  
    } else {
      query = `
        SELECT playlists.*, users.username 
        FROM playlists 
        JOIN users ON playlists.Author_ID = users.ID
        WHERE playlists.Visible = true
        ORDER BY RAND() 
        LIMIT 10`;
    }

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
