import database from "../../config/database.js";

export const deleteProfile = (req, res) => {
    const { userId } = req.query;

    const query = `
    DELETE FROM users
    WHERE ID = ?
  `;

  database.query(query, [userId], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log('Deleted Profile!');
    res.status(200).json({ message: "Successfully Deleted Profile" });
  });
};
