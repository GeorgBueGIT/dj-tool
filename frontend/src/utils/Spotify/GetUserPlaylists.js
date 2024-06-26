export const getUserPlaylists = async (userId = '', accessToken = 'BQC7p7_HrXXQLtYMpMhsxHHvunSril3cAuCejaUCkeGmBFBJmMxY5XHXG8bfjz_aoMJQhNB-ADB42BiuW49YbbmrFQDRkJlS0e0hYXhCgpjOC18enKI') => {
  
    const parameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + accessToken,
      }
    };
  
    try {
      const response = await fetch("https://api.spotify.com/v1/users/" + userId + '/playlists?limit=20', parameters);
      const data = await response.json();
      return data.items;
    } catch (error) {
      console.error("Error fetching Spotify access token:", error);
      return null;
    }
  };
  