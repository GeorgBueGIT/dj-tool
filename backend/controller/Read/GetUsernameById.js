import database from "../../config/database.js";

export const getUsernameById = async (req, res) => {
  const { userId } = req.query;

  try {
    const query = "SELECT Username FROM users WHERE ID = ?";

    database.query(query, [userId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ Username: results[0].Username });
    });
  } catch (error) {
    console.error("Error fetching Username:", error);
    return res.status(500).json({ error: "Error fetching Username" });
  }
};
