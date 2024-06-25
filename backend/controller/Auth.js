import database from "../config/database.js";
import config from "../config/config.js";
import jwt from "jsonwebtoken";

export const login = (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ?";

  database.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];

    if (user.Password === password) {
      const token = jwt.sign({ id: user.ID }, "your-secret-key", {
        expiresIn: "1h",
      });

      res.status(200).json({
        message: "Login successful",
        user: { id: user.ID, username: user.Username },
        token,
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  });
};
