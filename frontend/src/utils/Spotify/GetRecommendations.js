export const getPlaylistRecommendation = async (
    trackIdsArray,
    accessToken
  ) => {
    const totalRecommendations= 5;
    const batchSize = 5;
    const batches = [];
    for (let i = 0; i < trackIdsArray.length; i += batchSize) {
      const batchIds = trackIdsArray.slice(i, i + batchSize);
      batches.push(batchIds);
    }

    const limitPerBatch = Math.ceil(totalRecommendations / batches.length);

    while (batches.length > totalRecommendations) {
      const randomIndex = Math.floor(Math.random() * batches.length);
      batches.splice(randomIndex, 1);
    }
  
    const recommendations = [];
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
          `https://api.spotify.com/v1/recommendations?limit=${limitPerBatch}&seed_tracks=${trackListFormatted()}`,
          queryParameters
        );
        const data = await response.json();
        recommendations.push(...data.tracks);
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    return recommendations;
  };
  