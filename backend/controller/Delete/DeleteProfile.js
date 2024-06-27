import database from "../../config/database.js";

export const deleteProfile = (req, res) => {
    const { userId } = req.query;

    const deletePlaylistsQuery = `
        DELETE FROM playlists
        WHERE Author_ID = ?
    `;

    const deleteUserQuery = `
        DELETE FROM users
        WHERE ID = ?
    `;

    database.query(deletePlaylistsQuery, [userId], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        database.query(deleteUserQuery, [userId], (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            console.log('Deleted Profile and associated playlists!');
            res.status(200).json({ message: "Successfully Deleted Profile and associated playlists" });
        });
    });
};
