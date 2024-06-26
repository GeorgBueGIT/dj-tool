export const getSeveralAudioFeatures = async (trackIdsArray, accessToken) => {
  const batchSize = 20; // Choose an appropriate batch size
  const batches = [];
  for (let i = 0; i < trackIdsArray.length; i += batchSize) {
    const batchIds = trackIdsArray.slice(i, i + batchSize);
    batches.push(batchIds);
  }

  const trackListAudioFeatures = [];
  for (let batch of batches) {
    const queryParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    const trackListFormatted = batch.join(",");
    try {
      const response = await fetch(
        "https://api.spotify.com/v1/audio-features?ids=" + trackListFormatted,
        queryParameters
      );
      const data = await response.json();
      trackListAudioFeatures.push(...data.audio_features);
    } catch (error) {
      console.error("Error fetching Spotify audio features:", error);
      return null;
    }
  }
  return trackListAudioFeatures;
};
