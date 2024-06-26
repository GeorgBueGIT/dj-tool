import React, { useState, useEffect } from "react";
import { Input } from "antd";
import Alert from "../Components/Alert";
import { useNavigate } from "react-router-dom";
import { getSpotifyAccessToken } from "../../utils/Spotify/GetAccessToken";
import { getUserPlaylists } from "../../utils/Spotify/GetUserPlaylists";
import { getSongsFromPlaylist } from "../../utils/Spotify/GetSongsFromPlaylist";
import { getCurrentDate } from "../../utils/GetCurrentDate";
import { useAuth } from "../../Auth/AuthProvider";

export default function ImportSpotify() {
  const navigate = useNavigate();
  const [spotifyAccessToken, setSpotifyAccessToken] = useState("");
  const [spotifyUserId, setSpotifyUserId] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [playlistTracks, setPlaylistTracks] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState({});

  useEffect(() => {
    const fetchAccessToken = async () => {
      const accessToken = await getSpotifyAccessToken();
      setSpotifyAccessToken(accessToken);
    };
    fetchAccessToken();
  }, []);

  const [userId, setUserId] = useState(null);

  const user = useAuth();

  useEffect(() => {
    setUserId(user.user.id);
  }, [user]);

  const fetchUserPlaylist = async () => {
    setPlaylists(await getUserPlaylists(spotifyUserId, spotifyAccessToken));
  };

  const importPlaylist = async (id) => {
    const response = await getSongsFromPlaylist(id, spotifyAccessToken);
    setSelectedPlaylist(response);

    const playlistsTracksCSV = response.tracks.items
      .map((track) => track.track.id)
      .join(", ");

    setPlaylistTracks(playlistsTracksCSV);
  };

  const insertSpotifyPlaylist = async () => {
    const requestBody = {
      title: selectedPlaylist.name,
      description: selectedPlaylist.description,
      imageSrc: selectedPlaylist.images[0].url,
      songs: playlistTracks,
      userId: userId,
      date: getCurrentDate(),
      visible: 1
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

  useEffect(() => {
    if (playlistTracks) {
      insertSpotifyPlaylist();
    }
  }, [playlistTracks, insertSpotifyPlaylist]);

  return (
    <div
      className="import-spotify-playlist d-flex justify-content-center vh-100"
      id="import-spotify-playlist"
    >
      <Alert showAlert={showAlert} msg={"Couldn't import Playlist!"} />
      <div className="mh-100 my-5 w-50 page-color position-relative d-flex flex-column justify-content-center align-items-center">
        <Input
          placeholder="Your Spotify User-ID ..."
          className="mb-3 title-input text-center"
          value={spotifyUserId}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              fetchUserPlaylist();
            }
          }}
          onChange={(event) => setSpotifyUserId(event.target.value)}
        />
        <div className="row mh-100 overflow-scroll">
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
