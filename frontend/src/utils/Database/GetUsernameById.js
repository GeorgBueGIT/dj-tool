export const getUsernameById = async (userId) => {
    try {
        const response = await fetch(
          `http://localhost:3001/api/get-username-by-id?userId=${userId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await response.json();
        return data.Username;
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
};
