import React, {
  useEffect,
  useState
} from "react";
import { Spin } from "antd";
import { getSeveralAudioFeatures } from "../../utils/Spotify/GetSeveralAudioFeatures";
import { getPlaylistRecommendation } from "../../utils/Spotify/GetRecommendations";

import Song from "./SongTile";

export default function Recommendations({
  addedSongsIdsArray,
  spotifyAccessToken,
  addRecommendation,
}) {
  const [recommendations, setRecommendations] = useState(null);
  const [recommendationDetails, setRecommendationDetails] = useState(null);
  const [updatingRecommendations, setUpdatingRecommendations] = useState(false);

  useEffect(() => {
    const getRecommendations = async () => {
      setRecommendations(
        await getPlaylistRecommendation(addedSongsIdsArray, spotifyAccessToken)
      );
      setUpdatingRecommendations(false);
    };
    getRecommendations();
  }, [updatingRecommendations, addedSongsIdsArray, spotifyAccessToken]);

  useEffect(() => {
    const getRecommendationDetails = async () => {
      if (recommendations) {
        const trackIds = recommendations.map((track) => track.id);
        setRecommendationDetails(
          await getSeveralAudioFeatures(trackIds, spotifyAccessToken)
        );
      }
    };
    getRecommendationDetails();
  }, [recommendations, spotifyAccessToken]);

  const removeRecommendation = (id) => {
    setRecommendations((prevArray) =>
      prevArray.filter((songId) => songId !== id)
    );
    setUpdatingRecommendations(true);
  };

  return (
    <div className="recommendations mb-2 mx-2" id="recommendations">
      <h3 className="ps-3 pt-3"> Recommendations </h3>
      {updatingRecommendations ? (
        <div
          data-testid="app-spinner"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <>
          {recommendations ? (
            <div className="pb-1">
              {recommendationDetails &&
                recommendations.map((song, index) => (
                  <Song
                    key={song.id}
                    songIndex={index}
                    id={song.id}
                    cover={song.album.images[0].url}
                    source={song.external_urls.spotify}
                    title={song.name}
                    artists={song.artists}
                    bpm={recommendationDetails[index]?.tempo}
                    songkey={recommendationDetails[index]?.key}
                    mode={recommendationDetails[index]?.mode}
                    duration={recommendationDetails[index]?.duration_ms}
                    danceability={recommendationDetails[index]?.danceability}
                    energy={recommendationDetails[index]?.energy}
                    addRecommendation={addRecommendation}
                    removeRecommendation={removeRecommendation}
                  />
                ))}
            </div>
          ) : (
            <div
              data-testid="app-spinner"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="pb-3"
            >
              <Spin size="large" />
            </div>
          )}
        </>
      )}
    </div>
  );
}
