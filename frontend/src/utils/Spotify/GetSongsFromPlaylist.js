export const getSongsFromPlaylist = async (playlistId = '', accessToken = 'BQC7p7_HrXXQLtYMpMhsxHHvunSril3cAuCejaUCkeGmBFBJmMxY5XHXG8bfjz_aoMJQhNB-ADB42BiuW49YbbmrFQDRkJlS0e0hYXhCgpjOC18enKI') => {
  
    const parameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + accessToken,
      }
    };
  
    try {
      const response = await fetch("https://api.spotify.com/v1/playlists/" + playlistId, parameters);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching Spotify access token:", error);
      return null;
    }
  };
  