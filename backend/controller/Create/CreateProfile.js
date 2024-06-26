import database from "../../config/database.js";

export const createProfile = (req, res) => {
    const { description, userId, playlistCoverLink } = req.body;

    const query = `
    UPDATE users
    SET Profile_Description = ?, Initial_Login = ?, Profile_Cover = ?
    WHERE ID = ?
  `;

  database.query(query, [description, 0, playlistCoverLink, userId], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log('Updated Profile!');
    res.status(200).json({ message: "Successfully Updated Profile" });
  });
};
