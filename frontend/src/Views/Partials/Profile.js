import React, { useState, useEffect } from "react";
import PlaylistTile from "../Components/PlaylistTile";
import ProfileDescription from "../Components/ProfileDescription";
import {Spin} from "antd";

function Profile({ headerHeight }) {
  const [playlistsData, setPlaylistsData] = useState([]);
  const username = 'Root';

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
        return <div className="mt-5 w-100 d-flex align-items-center justify-content-center"><Spin /></div>;
    }

    return playlistsData.map((playlist, index) => (
        <PlaylistTile key={index} title={playlist.Title} />
    ));
  };

  return (
    <div className="col-10 h-100 offset-1 profile-page">
      <div className="row h-100 d-flex align-items-center">
        <div className="col-12 col-lg-6 text-center text-lg-start mb-4 mb-lg-0">
          <h2 className="mb-3"> Your Profile </h2>
          <h3> See what other people see </h3>
        </div>
        <div
          className="col-12 col-lg-6 h-100"
          style={{ paddingTop: headerHeight + "px" }}
        >
          <div className="content-frame mh-100 w-100 py-3">
            <ProfileDescription />
            {renderPlaylistTiles()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
