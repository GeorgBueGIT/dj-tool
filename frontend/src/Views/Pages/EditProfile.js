import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../Auth/AuthProvider";
import { Spin } from "antd";
import PlaylistTile from "../Components/PlaylistTile";
import EditProfileDescription from "../Components/EditProfileDescription";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faReply } from "@fortawesome/free-solid-svg-icons";

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
    fetchPlaylists();
  }, [userId]);

  const fetchPlaylists = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/getUserPlaylists?userId=${userId}&hidePrivate=${false}`,
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

  const deletePlaylist = async (ID) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/delete-playlist?playlistId=${ID}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      await response.json();
      fetchPlaylists();
    } catch (error) {
      console.error("Error Deleting playlist:", error);
    }
  };

  const toggleVisibility = async (ID, visibility) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/update-playlist-visibility`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            visibility: visibility,
            playlistId: ID,
          }),
        }
      );

      await response.json();
    } catch (error) {
      console.error("Error Changing Visibility:", error);
    }
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
        playlistId={playlist.ID}
        title={playlist.Title}
        imageSrc={playlist.Cover}
        tags={playlist.Tags}
        username={userName}
        showUsername={false}
        toggleVisibility={(visibility) =>
          toggleVisibility(playlist.ID, visibility)
        }
        onDelete={() => deletePlaylist(playlist.ID)}
      />
    ));
  };

  const [textAreaValue, SetTextAreaValue] = useState(null);

  const getTextAreaValue = (value) => {
    SetTextAreaValue(value);
  };

  const goBack = () => {
    navigate("/Dashboard");
  };

  const onSavePlaylist = async () => {
    let requestBody = {
      description: textAreaValue,
      userId: userId,
    };

    const result = await ImageCropRef.current.uploadImage();
    if (result) {
      requestBody.playlistCoverLink =
        "http://localhost:3001/" + result.filePath;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/update-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      await response.json();
    } catch (error) {
      console.error("Error Updating Profile:", error);
    }
    navigate("/Dashboard");
  };

  const ImageCropRef = useRef(null);

  return (
    <div
      className="vh100 vw100 d-flex align-items-center justify-content-center"
      id="edit-profile"
    >
      <div className="row vh100 w-100 py-6">
        <div className="col-2 h-100">
          <div onClick={goBack} className="position-fixed back">
            <FontAwesomeIcon
              className="px-3"
              fontSize={"32px"}
              icon={faReply}
            />
          </div>
        </div>
        <div className="col-8 h-100">
          <div className="content-frame mh-100 w-100">
            <EditProfileDescription
              userId={userId}
              getTextAreaValue={getTextAreaValue}
              imgSrc={playlistsData.Profile_Cover}
              ref={ImageCropRef}
            />
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
  );
}
