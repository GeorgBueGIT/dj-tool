import database from "../config/database.js";
import config from "../config/config.js";

export const getUsernameById = async (req, res) => {
  const { userId } = req.query;

  try {

    const query = "SELECT Username FROM users WHERE ID = ?";

    database.query(query, [userId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error fetching Username:", error);
    return res.status(500).json({ error: "Error fetching Username" });
  }
};
