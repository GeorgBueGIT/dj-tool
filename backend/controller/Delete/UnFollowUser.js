import database from "../../config/database.js";

export const unFollowUser = async (req, res) => {
  const { follower, followed } = req.body;

  try {
    // Check if relationship already exists
    let query = `
      SELECT COUNT(*) AS follow_exists
      FROM followers
      WHERE follower_id = ? AND followed_id = ?;
    `;
    let result = await queryDatabase(query, [follower, followed]);
    if (result[0].follow_exists === 0) {
      return res.status(400).json({ message: "User does not follow the specified user." });
    }

    // Delete relationship
    query = `
      DELETE FROM followers
      WHERE follower_id = ? AND followed_id = ?;
    `;
    await queryDatabase(query, [follower, followed]);

    res.status(200).json({ message: "Successfully unfollowed the user." });
  } catch (error) {
    console.error("Error unfollowing user:", error);
    res.status(500).json({ error: "Error unfollowing user." });
  }
};

// Helper-Funktion zum Promisify der Datenbankabfragen
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
