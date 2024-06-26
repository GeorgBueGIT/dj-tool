import React, { useState, useEffect } from "react";
import PlaylistTile from "../PlaylistTile";
import ProfileDescription from "../ProfileDescription";
import { Spin } from "antd";
import { EditFilled, MehOutlined } from "@ant-design/icons";

function Profile({ headerHeight, userId, userName }) {
  const [playlistsData, setPlaylistsData] = useState([]);
  const [loading, setLoading] = useState(true);

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
          `http://localhost:3001/api/getUserPlaylists?userId=${userId}`,
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
  }, [userId]);

  const renderPlaylistTiles = () => {
    if (loading) {
      return (
        <div className="my-5 w-100 d-flex align-items-center justify-content-center">
          <Spin />
        </div>
      );
    }

    if (playlistsData.length === 0) {
      return (
        <div className="my-5 w-100 d-flex align-items-center justify-content-center">
          <b className="no-entries"> <MehOutlined className="me-3" />  It seems like you didnt created a playlist yet!  </b>
        </div>
      );
    }

    return playlistsData.map((playlist, index) => (
      <PlaylistTile
        key={index}
        title={playlist.Title}
        imageSrc={playlist.Cover}
        username={userName}
        description={playlist.Description}
        showUsername={false}
      />
    ));
  };

  return (
    <div className="col-10 h-100 offset-1 profile-page" id="profile">
      <div className="row vh100 d-flex align-items-center">
        <div className="col-12 col-lg-6 text-center text-lg-start mb-4 mb-lg-0">
          <h2 className="mb-3"> Your Profile </h2>
          <h3> See what other people see </h3>
          <div className="edit-profile-wrapper d-flex gap-4 mt-5">
            <a href="/Edit-Profile">
              <div className="edit d-flex justify-content-center align-items-center">
                <EditFilled />
              </div>
            </a>
          </div>
        </div>
        <div
          className="col-12 col-lg-6 h-100 d-flex pb-5 align-items-center"
          style={{ paddingTop: headerHeight + "px" }}
        >
          <div className="content-frame h-100 w-100">
            <ProfileDescription userId={userId} />
            {renderPlaylistTiles()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
