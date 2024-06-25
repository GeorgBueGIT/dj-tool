import React, { useState, useEffect } from "react";
import { useAuth } from "../../Auth/AuthProvider";
import { Spin } from "antd";
import PlaylistTile from "../Components/PlaylistTile";
import EditProfileDescription from "../Components/EditProfileDescription";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faBackward } from "@fortawesome/free-solid-svg-icons";

export default function EditProfile() {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  const user = useAuth();

  useEffect(() => {
    setUserId(user.user.id);
    setUserName(user.user.username);
  }, [user]);

  const [playlistsData, setPlaylistsData] = useState([]);

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
      />
    ));
  };

  const goBack = () => {
    navigate("/Dashboard");
  };

  const onSavePlaylist = async () => {
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
              <EditProfileDescription userId={userId} />
              {renderPlaylistTiles()}
            </div>
          </div>{" "}
          <div className="col-2 h-100">
            <div onClick={onSavePlaylist} className="position-fixed save">
              <FontAwesomeIcon
                className="px-3"
                fontSize={"32px"}
                icon={faFloppyDisk}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
