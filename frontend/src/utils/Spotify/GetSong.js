export const getSong = async (seachQuery = 'Industry Bootleg', accessToken = 'BQC7p7_HrXXQLtYMpMhsxHHvunSril3cAuCejaUCkeGmBFBJmMxY5XHXG8bfjz_aoMJQhNB-ADB42BiuW49YbbmrFQDRkJlS0e0hYXhCgpjOC18enKI') => {
  
  const songSearchParameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + accessToken,
    }
  };

  try {
    const response = await fetch("https://api.spotify.com/v1/search?q=" + seachQuery + '&type=track&limit=1', songSearchParameters);
    const data = await response.json();
    return data.tracks.items[0]?.id;
  } catch (error) {
    console.error("Error fetching Spotify access token:", error);
    return null;
  }
};
