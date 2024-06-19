import database from "../config/database.js";
import config from "../config/config.js";
import getUserIdByName from "../helper/getUserIdByName.js";

export const userplaylists = async (req, res) => {
  const { username } = req.query;

  try {
    const userId = await getUserIdByName(username);

    const query = "SELECT * FROM playlists WHERE Author_ID = ?";

    // const query = `
    // SELECT playlists.*, users.username 
    // FROM playlists 
    // JOIN users ON playlists.Author_ID = users.ID 
    // WHERE playlists.Author_ID = ?`;

    database.query(query, [userId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error fetching user ID:", error);
    return res.status(500).json({ error: "Error fetching user ID" });
  }
};
