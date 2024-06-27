import React, { useState, useEffect } from "react";
import { getGenreById } from "../../utils/GetGenreById";
import { getUsernameById } from "../../utils/Database/GetUsernameById";
import {
  LockOutlined,
  GlobalOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

export default function PlaylistTile({
  playlistId,
  title = "Empty Title",
  description = "Empty Description",
  imageSrc = "",
  username,
  tags = "",
  onClick,
  showUsername = true,
  onClickUser,
  toggleVisibility,
  onDelete,
}) {
  const [tagFormatted, setTagFormatted] = useState("");
  const [userName, setUserName] = useState(username);
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    if (tags) {
      const splitArray = tags.split(", ");
      const formattedTags = splitArray.map((tag) => `#${getGenreById(tag)}`);
      setTagFormatted(formattedTags.join(", "));
    }
  }, [tags]);

  const getTheExcerpt = (text, limit = 15) => {
    if (text.length > limit) {
      return text.slice(0, limit) + "...";
    }
    return text;
  };

  const handleUserClick = (event) => {
    event.stopPropagation();
    onClickUser();
  };

  const handleToggleVisabilityClick = (event) => {
    event.stopPropagation();
    toggleVisibility(!isPublic);
    setIsPublic(!isPublic);
  };

  const handlePlaylistDeleteClick = (event) => {
    event.stopPropagation();
    onDelete();
  };

  useEffect(() => {
    const convertToUsername = async () => {
      setUserName(await getUsernameById(userName));
    };
    if (typeof userName === "number") {
      convertToUsername();
    }
  }, []);

  useEffect(() => {
    const checkIfPublic = async () => {
      if (playlistId) {
        try {
          const response = await fetch(
            `http://localhost:3001/api/is-playlist-public?playlistId=${playlistId}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );

          const data = await response.json();
          setIsPublic(data.visible);
        } catch (error) {
          console.error("Error Checking for if followed:", error);
        }
      }
    };

    checkIfPublic();
  }, []);

  return (
    <div className="playlist-tile m-3 p-3" id="playlist-tile" onClick={onClick}>
      <div className="row h-100">
        <div className="col-3 mh-100 d-flex align-items-center">
          <img
            className="playlist-cover"
            src={imageSrc}
            width={"100%"}
            alt="playlist-cover"
          />
        </div>
        <div className="col-9">
          <div className="row d-flex align-content-between h-100">
            <div className="col-12">
              <div className="playlist-headline-combo p-0">
                <div className="d-flex flex-row justify-content-between align-items-center px-0 mx-0">
                  <h3 className="my-0 py-0"> {title} </h3>
                  {toggleVisibility && onDelete && (
                    <div className="playlist-interaction">
                      {isPublic ? (
                        <GlobalOutlined onClick={handleToggleVisabilityClick} />
                      ) : (
                        <LockOutlined onClick={handleToggleVisabilityClick} />
                      )}
                      <DeleteOutlined onClick={handlePlaylistDeleteClick} />
                    </div>
                  )}
                </div>

                <p className="mb-1"> {tagFormatted} </p>
              </div>
            </div>
            <div className="col-12 row">
              <div className="col">
                <p> {getTheExcerpt(description)} </p>
              </div>
              {showUsername && (
                <div className="col d-flex justify-content-end">
                  <div className="username-container px-2 py-1 text-center">
                    <b onClick={handleUserClick}> @{userName} </b>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
