import database from "../../config/database.js";

export const recentFollowedPlaylists = async (req, res) => {
  const { userId } = req.query;

  try {
    // Schritt 1: Abrufen der Nutzer-IDs, denen der aktuelle Nutzer folgt
    const followQuery = `
      SELECT followed_id
      FROM followers
      WHERE follower_id = ?;
    `;
    
    const followedUsers = await queryDatabase(followQuery, [userId]);

    if (followedUsers.length === 0) {
      return res.status(200).json([]);
    }

    const followedIds = followedUsers.map(row => row.followed_id);

    // Schritt 2: Abrufen der Playlists dieser Nutzer
    const playlistQuery = `
      SELECT * FROM playlists
      WHERE Author_ID IN (?)
      ORDER BY Last_Edited DESC;`
    ;

    const playlists = await queryDatabase(playlistQuery, [followedIds]);

    res.status(200).json(playlists);
  } catch (error) {
    console.error("Error fetching Playlists:", error);
    return res.status(500).json({ error: "Error fetching Playlists" });
  }
};

// Helper function to promisify database queries
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
