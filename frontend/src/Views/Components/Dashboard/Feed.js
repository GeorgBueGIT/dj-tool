import React, { useState, useEffect } from "react";
import PlaylistTile from "../PlaylistTile";
import { useNavigate } from "react-router-dom";
import { getUsernameById } from "../../../utils/Database/GetUsernameById";
import { MehOutlined } from "@ant-design/icons";
import { Spin } from "antd";

function Feed({ headerHeight, userId, userName }) {
  const [playlistsData, setPlaylistsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/get-recent-followed-playlists?userId=${userId}`,
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
    navigate(`/View-playlist?ID=${ID}`);
  };

  const viewProfile = (ID) => {
    navigate(`/View-Profile?ID=${ID}`);
  };

  const renderPlaylistTiles = () => {
    if (loading) {
      return (
        <div className="h-100 w-100 d-flex align-items-center justify-content-center">
          <Spin />
        </div>
      );
    }

    if (playlistsData.length === 0) {
      return (
        <div className="h-100 w-100 d-flex align-items-center justify-content-center">
          <b className="no-entries"> <MehOutlined className="me-3" />  It seems like you dont follow anyone yet!  </b>
        </div>
      );
    }

    return playlistsData.map((playlist, index) => (
      <PlaylistTile
        key={index}
        title={playlist.Title}
        description={playlist.Description}
        imageSrc={playlist.Cover}
        username={playlist.Author_ID}
        tags={playlist.Tags}
        onClick={() => viewPlaylist(playlist.ID)}
        onClickUser={() => viewProfile(playlist.Author_ID)}
      />
    ));
  };

  return (
    <div
      className="col-10 h-100 offset-1 trending-playlists-page"
      id="trending-playlists"
    >
      <div className="row vh100 d-flex align-items-center">
        <div className="col-12 col-lg-6 text-center text-lg-start mb-4 mb-lg-0">
          <h2 className="mb-3"> Follower Feed </h2>
          <h3> See what they made recently </h3>
        </div>
        <div
          className="col-12 col-lg-6 h-100 pb-5 d-flex align-items-center"
          style={{ paddingTop: headerHeight + "px" }}
        >
          <div className="content-frame h-100 w-100">
            {renderPlaylistTiles()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
