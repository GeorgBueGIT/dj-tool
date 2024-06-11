import database from "../config/database.js";

const getUserIdByName = (username) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT ID FROM users WHERE Username = ?";
  
      database.query(query, [username], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0].ID);
        }
      });
    });
  };

export default getUserIdByName;
