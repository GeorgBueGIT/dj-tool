import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../Auth/AuthProvider";
import { Spin } from "antd";
import PlaylistTile from "../Components/PlaylistTile";
import EditProfileDescription from "../Components/EditProfileDescription";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faBackward } from "@fortawesome/free-solid-svg-icons";

export default function CreateProfile() {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  const user = useAuth();

  useEffect(() => {
    setUserId(user.user.id);
    setUserName(user.user.username);
  }, [user]);

  const [textAreaValue, SetTextAreaValue] = useState(null);

  const getTextAreaValue = (value) => {
    SetTextAreaValue(value);
  };

  const onSavePlaylist = async () => {

    let requestBody = {
      description: textAreaValue,
      userId: userId,
    };

    const result = await ImageCropRef.current.uploadImage();
    if (result) {
      console.log(result);
      requestBody.playlistCoverLink = "http://localhost:3001/" + result.filePath;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/create-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      await response.json();
    } catch (error) {
      console.error("Error Creating Profile:", error);
    }
    navigate("/Dashboard");
  };

  const ImageCropRef = useRef(null);

  return (
    <div
      className="vh100 d-flex align-items-center justify-content-center"
      id="edit-profile"
    >
      <div className="row vw100 vh100 py-6">
        <div className="col-2 h-100"></div>
        <div className="col-6 offset-1 h-10 d-flex align-items-center">
          <div className="content-frame mh-100 w-100">
            <EditProfileDescription
              userId={userId}
              getTextAreaValue={getTextAreaValue}
              ref={ImageCropRef}
            />
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
