import React, { useState, useEffect } from "react";
import { useAuth } from "../../Auth/AuthProvider";
import { Spin } from "antd";
import PlaylistTile from "../Components/PlaylistTile";
import ProfileDescription from "../Components/ProfileDescription";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";

export default function ViewProfile() {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ID = searchParams.get("ID");

  const [playlistsData, setPlaylistsData] = useState([]);
  const [canFollow, setCanFollow] = useState(true);

  const user = useAuth();

  useEffect(() => {
    setUserId(user.user.id);
    setUserName(user.user.username);
  }, [user]);

  useEffect(() => {
    if (ID == userId) {
      setCanFollow(false);
    }
  }, [userId]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/getUserPlaylists?userId=${ID}`,
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

  const renderPlaylistTiles = () => {
    if (playlistsData.length === 0) {
      return (
        <div className="mt-5 w-100 d-flex align-items-center justify-content-center mb-5">
          <Spin />
        </div>
      );
    }

    return playlistsData.map((playlist, index) => (
      <PlaylistTile
        key={index}
        title={playlist.Title}
        imageSrc={playlist.Cover}
        username={userName}
        showUsername={false}
        onClick={() => viewPlaylist(playlist.ID)}
      />
    ));
  };

  const goBack = () => {
    navigate("/Dashboard");
  };

  return (
    <div
      className="vh100 d-flex align-items-center justify-content-center"
      id="edit-profile"
    >
      <div className="px-5">
        <div className="row vh100 py-6">
          <div className="col-2 h-100">
            <div onClick={goBack} className="position-fixed back">
              <FontAwesomeIcon
                className="px-3"
                fontSize={"32px"}
                icon={faBackward}
              />
            </div>
          </div>
          <div className="col-8 h-100">
            <div className="content-frame mh-100 w-100">
              <ProfileDescription userId={ID} currentUserId={userId} canFollow={canFollow}/>
              {renderPlaylistTiles()}
            </div>
          </div>{" "}
          <div className="col-2 h-100"></div>
        </div>
      </div>
    </div>
  );
}
