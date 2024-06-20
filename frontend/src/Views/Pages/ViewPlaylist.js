import React, { useState, useEffect, useRef } from "react";
import { Input } from "antd";
import SongList from "../Components/SongList";
import { Spin } from "antd";
import Alert from "../Components/Alert";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ImageCrop from "../Components/ImageCrop";
import { getSpotifyAccessToken } from "../../utils/Spotify/GetAccessToken";
import { getPlaylistDetails } from "../../utils/Database/GetPlaylistDetails";
import { getSong } from "../../utils/Spotify/GetSong";
const { TextArea } = Input;

export default function ViewPlaylist() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ID = searchParams.get("ID");

  const [playlistDetailsObj, setPlaylistDetailsObj] = useState(null);
  const [spotifyAccessToken, setSpotifyAccessToken] = useState("");

  useEffect(() => {
    const fetchAccessToken = async () => {
      const accessToken = await getSpotifyAccessToken();
      setSpotifyAccessToken(accessToken);
      console.log("Fetched AccessToken: " + accessToken);
    };
    fetchAccessToken();
  }, []);

  useEffect(() => {
    const setPlaylistObj = async () => {
      setPlaylistDetailsObj(await getPlaylistDetails(ID));
    };
    setPlaylistObj();
  }, []);

  return (
    <div
      className="create-playlist d-flex justify-content-center overflow-hidden"
      id="create-playlist-page"
    >
      {playlistDetailsObj && spotifyAccessToken &&(
        <div
          className="vh100 w-100 pageüä-color position-relative justify-content-center"
          id="view-playlist"
        >
          <div className="px-5">
            <div className="row vh100 d-flex align-items-center py-6">
              <div className="col-2 h-100">
                <a href="/Dashboard" className="position-fixed back">
                  {" "}
                  Back{" "}
                </a>
              </div>
              <div className="col-8 playlist-frame mh-100">
                <div className="playlist-frame-header mb-5 p-2 pt-4 d-flex justify-content-between">
                  <div className="me-3">
                    <Input
                      placeholder="Empty title"
                      className="mb-3 title-input"
                      value={playlistDetailsObj[0].Title}
                      disabled
                    />
                    <TextArea
                      placeholder="Empty Description"
                      className="description-input"
                      autoSize={{ minRows: 2, maxRows: 6 }}
                      value={playlistDetailsObj[0].Description}
                      disabled
                    />
                  </div>
                  <div
                    className="playlist-cover d-flex align-items-center justify-content-center"
                    style={{
                      backgroundImage: `url(${playlistDetailsObj[0].Cover})`,
                    }}
                  ></div>
                </div>

                <div className="songs">
            
                  <SongList
                    addedSongsIdsArray={playlistDetailsObj[0].Songs_Sorted.split(', ')}
                    spotifyAccessToken={spotifyAccessToken}
                    allowSort={false}
                  />
              </div>


              
              </div>
              <div className="col-2 h-100"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
