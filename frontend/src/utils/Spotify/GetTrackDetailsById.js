export const getTrackDetailsById = async (trackIdsArray = ["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"], accessToken = 'BQBoB-FDRsNH27K1CpDLdk2i_gaLWqBaumbV0FlWJ9jHTVyqNnTf1bloAJk0WNtSmWOIHAI5XUmfCJr7nExufMcufYf5iXtG-8cqC85qvnwkKHDsKPE') => {
  
    const queryParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + accessToken,
      }
    };

    const trackListFormatted = () => {
      return trackIdsArray.join(',');
    };
  
    try {
      const response = await fetch("https://api.spotify.com/v1/tracks?ids=" + trackListFormatted(), queryParameters);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching Spotify access token:", error);
      return null;
    }
  };
  