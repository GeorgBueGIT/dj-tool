import database from "../../config/database.js";
import config from "../../config/config.js";
import getUserIdByName from "../../helper/getUserIdByName.js";

export const userplaylists = async (req, res) => {
  const { userId, hidePrivate } = req.query;

  // Convert the hidePrivate parameter to a boolean
  const hidePrivateValue = hidePrivate === 'true';
  const hidePrivateQueryParam = typeof hidePrivate === 'undefined' ? false : hidePrivateValue;

  try {
    let query;
    let params;

    // Build the query based on the hidePrivate parameter
    if (hidePrivateQueryParam) {
      // Show only public playlists
      query = "SELECT * FROM playlists WHERE Author_ID = ? AND Visible = true ORDER BY Last_Edited DESC";
      params = [userId];
    } else {
      // Show all playlists (both public and private)
      query = "SELECT * FROM playlists WHERE Author_ID = ? ORDER BY Last_Edited DESC";
      params = [userId];
    }

    database.query(query, params, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error fetching user playlists:", error);
    return res.status(500).json({ error: "Error fetching user playlists" });
  }
};
