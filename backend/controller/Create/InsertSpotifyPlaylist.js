import database from "../../config/database.js";
import config from "../../config/config.js";

export const insertSpotifyPlaylist = (req, res) => {
  const { title, description, date, imageSrc, songs, userId } = req.body;

  const query = "INSERT INTO playlists (Title, Description, Last_Edited, Author_ID, Cover, Songs_Sorted) VALUES (?, ?, ?, ?, ?, ?)";

  database.query(query, [title, description, date, userId, imageSrc, songs], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log("Inserted Playlist from Spotify!");
    res.status(200).json({ message: "Succesfully Inserted Playlist" });
  });
};
