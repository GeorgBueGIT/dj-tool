export const getSeveralTrackDetailsById = async (
  trackIdsArray,
  accessToken
) => {
  const batchSize = 20;
  const batches = [];
  for (let i = 0; i < trackIdsArray.length; i += batchSize) {
    const batchIds = trackIdsArray.slice(i, i + batchSize);
    batches.push(batchIds);
  }

  const trackListDetails = [];
  for (let batch of batches) {
    const queryParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    const trackListFormatted = () => {
      return batch.join(",");
    };

    try {
      const response = await fetch(
        "https://api.spotify.com/v1/tracks?ids=" + trackListFormatted(),
        queryParameters
      );
      const data = await response.json();
      trackListDetails.push(...data.tracks);
    } catch (error) {
      console.error("Error fetching Spotify access token:", error);
      return null;
    }
  }
  return trackListDetails;
};
