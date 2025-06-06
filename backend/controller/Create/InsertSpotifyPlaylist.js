import database from "../../config/database.js";


export const insertSpotifyPlaylist = (req, res) => {
  const { title, description, date, imageSrc, songs, userId, visible } = req.body;

  const query = "INSERT INTO playlists (Title, Description, Last_Edited, Author_ID, Cover, Songs_Sorted, Visible) VALUES (?, ?, ?, ?, ?, ?, ?)";

  database.query(query, [title, description, date, userId, imageSrc, songs, visible], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log("Inserted Playlist from Spotify!");
    res.status(200).json({ message: "Succesfully Inserted Playlist" });
  });
};
