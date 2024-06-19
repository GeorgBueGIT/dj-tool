import React, { useState, useEffect } from "react";
import PlaylistTile from "../PlaylistTile";
import Spotify from "../../../resources/Logos/Spotify.png";
import Soundcloud from "../../../resources/Logos/Soundcloud.jpg";
import { getUsernameById } from "../../../utils/Database/GetUsernameById";
import {Spin} from "antd";

function YourPlaylists({ headerHeight }) {
  const [playlistsData, setPlaylistsData] = useState([]);

  const username = "Root";

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/getUserPlaylists?username=${username}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await response.json();
        setPlaylistsData(data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };
    fetchPlaylists();
  }, []);

  const renderPlaylistTiles = () => {
    if (playlistsData.length === 0) {
      return (
        <div className="mt-5 w-100 d-flex align-items-center justify-content-center">
          <Spin />
        </div>
      );
    }

    return playlistsData.map((playlist, index) => (
      <PlaylistTile
        key={index}
        title={playlist.Title}
        imageSrc={playlist.Cover}
        username={username}
      />
    ));
  };

  return (
    <div
      className="col-10 h-100 offset-1 your-playlists-page"
      id="your-playlists"
    >
      <div className="row h-100 d-flex align-items-center">
        <div className="col-12 col-lg-6 text-center text-lg-start mb-4 mb-lg-0">
          <h2 className="mb-3"> Edit your Playlists </h2>
          <h3> Or Create a new one </h3>
          <div className="add-playlists-wrapper d-flex gap-4 mt-5">
            <a href="/Create">
              <div className="create-new d-flex justify-content-center align-items-center">
                {" "}
                +{" "}
              </div>
            </a>
            <a href="/Import-Spotify">
              <div className="import-spotify-playlist d-flex justify-content-center align-items-center">
                <img src={Spotify} width={"50%"} alt="spotify-logo" />
              </div>
            </a>
            <a href="/Import-Soundcloud">
              <div className="import-soundcloud-playlist d-flex justify-content-center align-items-center">
                <img src={Soundcloud} width={"50%"} alt="soundcloud-logo" />
              </div>
            </a>
          </div>
        </div>
        <div
          className="col-12 col-lg-6 h-100"
          style={{ paddingTop: headerHeight + "px" }}
        >
          <div className="content-frame mh-100 w-100 py-3">
            {renderPlaylistTiles()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourPlaylists;
