import database from "../../config/database.js";


export const insertPlaylist = (req, res) => {
    const { title, description, visible, date, tags, authorId, playlistCoverLink, sortedSongIds } = req.body;

  const query = "INSERT INTO playlists (Title, Description, visible, Last_Edited, Tags, Author_ID, Cover, Songs_Sorted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  database.query(query, [title, description, visible, date, tags, authorId, playlistCoverLink, sortedSongIds], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log('Inserted new Playlist!');
    res.status(200).json({ message: "Succesfully Inserted Playlist" });
  });
};
