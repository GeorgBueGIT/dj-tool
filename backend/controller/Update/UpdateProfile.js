import database from "../../config/database.js";

export const updateProfile = (req, res) => {
    const { description, userId } = req.body;

    const query = `
    UPDATE users
    SET Profile_Description = ?
    WHERE ID = ?
  `;

  database.query(query, [description, userId], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log('Updated Profile!');
    res.status(200).json({ message: "Successfully Updated Profile" });
  });
};
