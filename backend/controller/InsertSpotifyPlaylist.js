import database from "../config/database.js";
import config from "../config/config.js";

export const insertSpotifyPlaylist = (req, res) => {
  const { title, description, imageSrc, songs } = req.body;

  const query = "INSERT INTO playlists (Title, Description, Author_ID, Cover, Songs_Sorted) VALUES (?, ?, ?, ?, ?)";

  database.query(query, [title, description, 1, imageSrc, songs], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log("Inserted Playlist!");
    res.status(200).json({ message: "Succesfully Inserted Playlist" });
  });
};
