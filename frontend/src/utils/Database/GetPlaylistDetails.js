export const getPlaylistDetails = async (playlistId) => {
    try {
        const response = await fetch(
          `http://localhost:3001/api/get-playlist-by-id?playlistId=${playlistId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
};
