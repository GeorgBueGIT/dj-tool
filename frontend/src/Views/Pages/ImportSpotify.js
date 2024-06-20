import React, { useState, useEffect, useRef } from "react";
import { Input } from "antd";
import { Spin } from "antd";
import Alert from "../Components/Alert";
import { useNavigate } from "react-router-dom";
import { getSpotifyAccessToken } from "../../utils/Spotify/GetAccessToken";
import { getUserPlaylists } from "../../utils/Spotify/GetUserPlaylists";
import { getSongsFromPlaylist } from "../../utils/Spotify/GetSongsFromPlaylist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

export default function ImportSpotify() {
  const navigate = useNavigate();
  const [spotifyAccessToken, setSpotifyAccessToken] = useState("");
  const [userId, setUserId] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [playlistTracks, setPlaylistTracks] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState({});

  useEffect(() => {
    const fetchAccessToken = async () => {
      const accessToken = await getSpotifyAccessToken();
      setSpotifyAccessToken(accessToken);
      console.log("Fetched AccessToken: " + accessToken);
    };
    fetchAccessToken();
  }, []);

  const fetchUserPlaylist = async () => {
    setPlaylists(await getUserPlaylists(userId, spotifyAccessToken));
  };

  const importPlaylist = async (id) => {
    const response = await getSongsFromPlaylist(id, spotifyAccessToken);
    setSelectedPlaylist(response);

    const playlistsTracksCSV = response.tracks.items
      .map((track) => track.track.id)
      .join(", ");

    setPlaylistTracks(playlistsTracksCSV);
  };

  useEffect(() => {
    if (playlistTracks) {
      insertSpotifyPlaylist();
    }
  }, [playlistTracks]);

  const insertSpotifyPlaylist = async () => {
    const requestBody = {
      title: selectedPlaylist.name,
      description: selectedPlaylist.description,
      imageSrc: selectedPlaylist.images[0].url,
      songs: playlistTracks,
    };

    const response = await fetch(
      "http://localhost:3001/api/insert-spotify-playlist",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      }
    );

    const responseData = await response.json();

    // Handle response based on status code
    if (response.status === 200) {
      console.log("Playlist Inserted Successfully!");
      navigate("/Dashboard");
    } else {
      console.log("Failed to insert playlist:", responseData.error);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  return (
    <div
      className="import-spotify-playlist d-flex justify-content-center overflow-hidden"
      id="import-spotify-playlist"
    >
      <Alert showAlert={showAlert} msg={"Couldn't import Playlist!"} />
      <div className="vh100 w-50 page-color position-relative d-flex flex-column justify-content-center align-items-center">
        <Input
          placeholder="Your Spotify User-ID ..."
          className="mb-3 title-input text-center"
          value={userId}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              fetchUserPlaylist();
            }
          }}
          onChange={(event) => setUserId(event.target.value)}
        />
        <div className="row">
          {playlists &&
            playlists.map((playlist, index) => (
              <div
                className="spotify-playlist-tile col-3 d-flex flex-column pt-3"
                onClick={() => importPlaylist(playlist.id)}
                id={playlist.id}
              >
                <img className="playlist-cover" src={playlist.images[0].url} />
                <b> {playlist.name} </b>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
