import database from "../../config/database.js";
import config from "../../config/config.js";

export const insertPlaylist = (req, res) => {
    const { title, description, date, tags, authorId, playlistCoverLink, sortedSongIds } = req.body;

  const query = "INSERT INTO playlists (Title, Description, Last_Edited, Tags, Author_ID, Cover, Songs_Sorted) VALUES (?, ?, ?, ?, ?, ?, ?)";

  database.query(query, [title, description, date, tags, authorId, playlistCoverLink, sortedSongIds], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log('Inserted new Playlist!');
    res.status(200).json({ message: "Succesfully Inserted Playlist" });
  });
};
