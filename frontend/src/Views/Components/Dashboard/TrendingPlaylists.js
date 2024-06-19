import React, { useState, useEffect } from "react";
import PlaylistTile from "../PlaylistTile";
import { DownCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

function TrendingPlaylists({ headerHeight }) {
  const [playlistsData, setPlaylistsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/get-random-playlists`,
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


  const viewPlaylist = (ID) => {
    console.log("ID: " + ID);
    navigate(`/View-playlist?ID=${ID}`);
  }

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
        description={playlist.Description}
        imageSrc={playlist.Cover}
        username={playlist.username}
        tags={playlist.Tags}
        onClick={() => viewPlaylist(playlist.ID)}
      />
    ));
  };

  return (
    <div className="col-10 h-100 offset-1 trending-playlists-page">
      <div className="row h-100 d-flex align-items-center">
        <div className="col-12 col-lg-6 text-center text-lg-start mb-4 mb-lg-0">
          <h2 className="mb-3"> Inspire yourself - Trending Playlists </h2>
          <h3> Most Hyped Playlists this week </h3>
        </div>
        <div
          className="col-12 col-lg-6 h-100"
          style={{ paddingTop: headerHeight + "px" }}
        >
          <div className="content-frame mh-100 w-100">
            <div className="w-100 p-3 row">
              <div className="col">
                <p>
                  {" "}
                  <DownCircleFilled /> Date
                </p>
              </div>
              <div className="col">
                <p>Random</p>
              </div>
            </div>
            {renderPlaylistTiles()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrendingPlaylists;
