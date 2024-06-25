import database from "../../config/database.js";

export const isFollower = async (req, res) => {
  const { follower, followed } = req.body;

  try {
    // Überprüfen, ob die Folge-Beziehung existiert
    const query = `
      SELECT COUNT(*) AS follow_exists
      FROM followers
      WHERE follower_id = ? AND followed_id = ?;
    `;
    const result = await queryDatabase(query, [follower, followed]);

    // Wenn die Beziehung existiert, eine positive Antwort zurückgeben
    if (result[0].follow_exists > 0) {
      return res.status(200).json({ follows: true });
    } else {
      return res.status(200).json({ follows: false });
    }
  } catch (error) {
    console.error("Error checking follow status:", error);
    res.status(500).json({ error: "Error checking follow status." });
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
