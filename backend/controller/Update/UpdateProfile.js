import database from "../../config/database.js";

export const updateProfile = (req, res) => {
  const { description, userId, playlistCoverLink } = req.body;

  let query;
  let params;
  if (playlistCoverLink) {
    query = `
    UPDATE users
    SET Profile_Description = ?, Profile_Cover = ?
    WHERE ID = ?
  `;
    params = [description, playlistCoverLink, userId];
  } else {
    query = `
            UPDATE users
            SET Profile_Description = ?
            WHERE ID = ?
          `;
    params = [description, userId];
  }

  database.query(query, params, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log("Updated Profile!");
    res.status(200).json({ message: "Successfully Updated Profile" });
  });
};
