import database from "../config/database.js";
import config from "../config/config.js";

export const register = (req, res) => {
  const { username, password } = req.body;

  const query = "INSERT INTO users (Username, Password, Initial_Login) VALUES (?, ?, ?)";

  database.query(query, [username, password, 1], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log('Inserted new User!');
    res.status(200).json({ message: "Succesfully Signed up" });
  });
};
