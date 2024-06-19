const CLIENT_ID = "804a923520d3482cb30a284d8cec3412";
const CLIENT_SECRET = "c1e44df2d5aa46b2841f849f9cbc3a96";

export const getSpotifyAccessToken = async () => {
  const authParameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
    },
    body: "grant_type=client_credentials",
  };

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", authParameters);
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error fetching Spotify access token:", error);
    return null;
  }
};
