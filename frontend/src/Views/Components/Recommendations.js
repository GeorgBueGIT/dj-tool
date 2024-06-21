import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Spin } from "antd";
import { getSeveralTrackDetailsById } from "../../utils/Spotify/GetSeveralTrackDetailsById";
import { getSeveralAudioFeatures } from "../../utils/Spotify/GetSeveralAudioFeatures";
import { getPlaylistRecommendation } from "../../utils/Spotify/GetRecommendations";

import Song from "./SongTile";

export default function Recommendations({
  addedSongsIdsArray,
  spotifyAccessToken,
}) {
  const [recommendations, setRecommendations] = useState(null);
  const [recommendationDetails, setRecommendationDetails] = useState(null);
  const [itemsFeatures, setItemsFeatures] = useState([]);

  useEffect(() => {
    const getRecommendations = async () => {
      setRecommendations(
        await getPlaylistRecommendation(addedSongsIdsArray, spotifyAccessToken)
      );
    };
    getRecommendations();
  }, []);

  useEffect(() => {
    const getRecommendationDetails = async () => {
      if (recommendations) {
        const trackIds = recommendations.map(track => track.id);
        setRecommendationDetails(
          await getSeveralAudioFeatures(trackIds, spotifyAccessToken)
        );
      }
    };
    getRecommendationDetails();
  }, [recommendations]);

  return (
    <div className="recommendations mb-3">
      <b> Recommendations </b>
      {recommendations ? (
        <>
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
              />
            ))}
        </>
      ) : (
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
      )}
    </div>
  );
}
