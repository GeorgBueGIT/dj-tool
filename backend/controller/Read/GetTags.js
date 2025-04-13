import database from "../../config/database.js";

import getUserIdByName from "../../helper/getUserIdByName.js";

export const getAllTags = async (req, res) => {

  try {

    const query = "SELECT Name FROM tags";

    database.query(query, [], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error fetching Tags:", error);
    return res.status(500).json({ error: "Error fetching Tags" });
  }
};
