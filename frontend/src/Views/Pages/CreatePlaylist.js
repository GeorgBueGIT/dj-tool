import React, { useState, useEffect, useRef } from "react";
import { Input } from "antd";
import SongList from "../Components/SongList";
import { Spin } from "antd";
import Alert from "../Components/Alert";
import { useNavigate } from "react-router-dom";
import ImageCrop from "../Components/ImageCrop";
import { getSpotifyAccessToken } from "../../utils/Spotify/GetAccessToken";
import { getSong } from "../../utils/Spotify/GetSong";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faBackward } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../Auth/AuthProvider";
import { getCurrentDate } from "../../utils/GetCurrentDate";
const { TextArea } = Input;

export default function CreatePlaylist() {
  const navigate = useNavigate();
  const [spotifyAccessToken, setSpotifyAccessToken] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [addedSongsIdsArray, setAddedSongsIdsArray] = useState([]);
  const songListRef = useRef(null);

  const [userId, setUserId] = useState(null);

  const user = useAuth();

  useEffect(() => {
    setUserId(user.user.id);
  }, [user]);

  const [descriptionTags, setDescriptionTags] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/getAllTags`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        setDescriptionTags(data);
      } catch (error) {
        console.error("Error fetching Tags:", error);
      }
    };
    fetchTags();
  }, []);

  const renderDescriptionTags = () => {
    if (descriptionTags.length === 0) {
      return (
        <div className="mt-5 w-100 d-flex align-items-center justify-content-center">
          <Spin />
        </div>
      );
    }

    return descriptionTags.map((tag, index) => {
      const isSelected = selectedTags.includes(index);
      return (
        <div
          key={index}
          onClick={() => toggleTagSelection(index)}
          className={`description-tag-container background-color-transition px-3 py-1 m-1 ${
            isSelected ? "selected-tag" : ""
          }`}
        >
          {tag.Name}
        </div>
      );
    });
  };

  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTagSelection = (tagIndex) => {
    if (selectedTags.includes(tagIndex)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== tagIndex));
    } else {
      if (selectedTags.length >= 3) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        return;
      }

      setSelectedTags([...selectedTags, tagIndex]);
    }
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const ImageCropRef = useRef(null);

  const goBack = () => {
    navigate("/Dashboard");
  };

  const onSavePlaylist = async () => {
    if (title === "") {
      console.log("Empty Title is not Allowed!");
      return;
    }
    if (selectedTags.length < 1) {
      console.log("U need to select atleast 1 tag!");
      return;
    }

    const requestBody = {
      authorId: userId,
      title: title,
      tags: selectedTags.map((tag) => tag).join(", "), // Assuming selectedTags is an array of objects with an 'id' property
      date: getCurrentDate(),
      visible: 1
    };

    if (description) {
      requestBody.description = description;
    }

    const result = await ImageCropRef.current.uploadImage();
    if (result) {
      requestBody.playlistCoverLink =
        "http://localhost:3001/" + result.filePath;
    }

    const sortedIds = await songListRef.current.getCurrentSongIdsSorted();
    if (sortedIds) {
      requestBody.sortedSongIds = sortedIds;
    }

    const response = await fetch("http://localhost:3001/api/insert-playlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();

    // Handle response based on status code
    if (response.status === 200) {
      console.log("Playlist Inserted Successfully!");
      navigate("/Dashboard");
    } else {
      console.log("Failed to insert playlist:", responseData.error);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  useEffect(() => {
    const fetchAccessToken = async () => {
      const accessToken = await getSpotifyAccessToken();
      setSpotifyAccessToken(accessToken);
    };
    fetchAccessToken();
  }, []);

  const addSong = async () => {
    const newSong = await getSong(searchInput, spotifyAccessToken);

    if (newSong) {
      setAddedSongsIdsArray([
        ...addedSongsIdsArray,
        newSong,
      ]);
    }

    setSearchInput("");
  };

  return (
    <div
      className="create-playlist d-flex justify-content-center overflow-hidden"
      id="create-playlist-page"
    >
      <Alert showAlert={showAlert} msg={"Three Tags max!"} />
      <div className="vh100 w-100 page-color position-relative justify-content-center">
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
            <div className="col-8 playlist-frame h-100">
              <div className="playlist-frame-header mb-5 p-2 pt-4 d-flex justify-content-between">
                <div className="me-3">
                  <Input
                    placeholder="Playlist title"
                    className="mb-3 title-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <TextArea
                    placeholder="Playlist Description"
                    className="description-input"
                    autoSize={{ minRows: 2, maxRows: 6 }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <ImageCrop ref={ImageCropRef} />
              </div>

              <div className="description-tags d-flex flex-wrap justify-content-center mb-5">
                <h4 className="w-100 fw-bold text-center"> Choose 3 Tags </h4>
                {renderDescriptionTags()}
              </div>

              <div className="search mb-5">
                <Input
                  placeholder="Add Track by Name ..."
                  className="search-input"
                  value={searchInput}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      addSong();
                    }
                  }}
                  onChange={(event) => setSearchInput(event.target.value)}
                />
              </div>

              <div className="songs">
                {spotifyAccessToken && addedSongsIdsArray && (
                  <SongList
                    ref={songListRef}
                    addedSongsIdsArray={addedSongsIdsArray}
                    spotifyAccessToken={spotifyAccessToken}
                  />
                )}
              </div>
            </div>
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
    </div>
  );
}
