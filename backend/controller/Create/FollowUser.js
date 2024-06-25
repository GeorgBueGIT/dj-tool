import database from "../../config/database.js";

export const followUser = async (req, res) => {
  const { follower, followed } = req.body;

  try {
    // Check if relationship already exists
    let query = `
      SELECT COUNT(*) AS follow_exists
      FROM followers
      WHERE follower_id = ? AND followed_id = ?;
    `;
    let result = await queryDatabase(query, [follower, followed]);
    if (result[0].follow_exists > 0) {
      return res.status(400).json({ message: "User already follows the specified user." });
    }

    // Insert new relationship
    query = `
      INSERT INTO followers (follower_id, followed_id)
      VALUES (?, ?);
    `;
    await queryDatabase(query, [follower, followed]);

    res.status(200).json({ message: "Successfully followed the user." });
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ error: "Error following user." });
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
