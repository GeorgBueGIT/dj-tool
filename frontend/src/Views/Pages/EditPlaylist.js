import React, { useState, useEffect, useRef } from "react";
import { Input } from "antd";
import SongList from "../Components/SongList";
import { Spin } from "antd";
import Alert from "../Components/Alert";
import { useNavigate, useLocation } from "react-router-dom";
import ImageCrop from "../Components/ImageCrop";
import Recommendations from "../Components/Recommendations";
import { getSpotifyAccessToken } from "../../utils/Spotify/GetAccessToken";
import { getPlaylistDetails } from "../../utils/Database/GetPlaylistDetails";
import { getSong } from "../../utils/Spotify/GetSong";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faReply, faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { getCurrentDate } from "../../utils/GetCurrentDate";
import { autoSort } from "../../utils/AutoSort";
const { TextArea } = Input;

export default function CreatePlaylist() {
  const navigate = useNavigate();
  const [spotifyAccessToken, setSpotifyAccessToken] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [addedSongsIdsArray, setAddedSongsIdsArray] = useState([]);
  const songListRef = useRef(null);

  const [descriptionTags, setDescriptionTags] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ID = searchParams.get("ID");

  const [playlistDetailsObj, setPlaylistDetailsObj] = useState(null);

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

  const [coverHeight, setCoverHeight] = useState();

  useEffect(() => {
    const timer = setTimeout(() => {
      updateCoverHeight();
    }, 500);
  }, []);

  const updateCoverHeight = () => {
    const inputCombo = document.querySelector(".input-combo");
    if (inputCombo) {
      const height = inputCombo.clientHeight;
      setCoverHeight(height);
    }
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const ImageCropRef = useRef(null);

  useEffect(() => {
    const setPlaylistObj = async () => {
      setPlaylistDetailsObj(await getPlaylistDetails(ID));
    };
    setPlaylistObj();
  }, [ID]);

  useEffect(() => {
    if (playlistDetailsObj) {
      setTitle(playlistDetailsObj[0].Title);
      setDescription(playlistDetailsObj[0].Description);
      setImageUrl(playlistDetailsObj[0].Cover);
      setAddedSongsIdsArray(playlistDetailsObj[0].Songs_Sorted.split(", "));
      if (playlistDetailsObj[0].Tags)
        setSelectedTags(playlistDetailsObj[0].Tags.split(", ").map(Number));
    }
  }, [playlistDetailsObj]);

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

    console.log("Title: " + title);
    console.log("Descripiton: " + description);
    console.log("Tags: " + selectedTags.map((tag) => tag).join(", "));

    const requestBody = {
      title: title,
      tags: selectedTags.map((tag) => tag).join(", "),
      playlistId: ID,
      date: getCurrentDate(),
    };

    if (description) {
      requestBody.description = description;
    }

    if (imageUrl) {
      requestBody.playlistCoverLink = imageUrl;
    } else {
      const result = await ImageCropRef.current.uploadImage();
      if (result) {
        requestBody.playlistCoverLink =
          "http://localhost:3001/" + result.filePath;
      }
    }

    const sortedIds = await songListRef.current.getCurrentSongIdsSorted();
    if (sortedIds) {
      requestBody.sortedSongIds = sortedIds;
    }

    const response = await fetch("http://localhost:3001/api/update-playlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();

    // Handle response based on status code
    if (response.status === 200) {
      console.log("Playlist Updated Successfully!");
      navigate("/Dashboard");
    } else {
      console.log("Failed to update playlist:", responseData.error);
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

  const removeSong = (id) => {
    console.log("Removing ID:" + id);
    setAddedSongsIdsArray((prevArray) =>
      prevArray.filter((songId) => songId !== id)
    );
  };

  const addRecommendation = (id) => {
    console.log("Add Recommendation:" + id);
    setAddedSongsIdsArray((prevArray) => [...prevArray, id]);
  };

  const handleAutoSort = async () => {
    setAddedSongsIdsArray(
      await autoSort(addedSongsIdsArray, spotifyAccessToken)
    );
  };

  return (
    <div
      className="create-playlist d-flex justify-content-center overflow-hidden"
      id="create-playlist-page"
    >
      {playlistDetailsObj && spotifyAccessToken && (
        <>
          <Alert showAlert={showAlert} msg={"Three Tags max!"} />
          <div
            className="vh100 w-100 page-color position-relative justify-content-center"
            id="edit-playlist"
          >
            <div className="px-5">
              <div className="row vh100 py-6">
                <div className="col-2 h-100">
                  <div onClick={goBack} className="position-fixed back">
                    <FontAwesomeIcon
                      className="px-3"
                      fontSize={"32px"}
                      icon={faReply}
                    />
                  </div>
                </div>
                <div className="col-8 playlist-frame h-100">
                  <div className="playlist-frame-header mw-100 mb-3 p-2 pt-4 d-flex justify-content-between">
                    <div className="me-3 input-combo">
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
                    {coverHeight && (
                      <ImageCrop
                        ref={ImageCropRef}
                        imgSrc={imageUrl}
                        coverHeight={coverHeight}
                      />
                    )}
                  </div>

                  <div className="description-tags d-flex flex-wrap justify-content-center mb-5">
                    <h4 className="w-100 fw-bold text-center f-blackops">
                      {" "}
                      Choose 3 Tags{" "}
                    </h4>
                    {renderDescriptionTags()}
                  </div>

                  <div className="search mb-5 d-flex flex-row w-100">
                    <Input
                      placeholder="Add Track by Name ..."
                      className="search-input w-fill me-3"
                      value={searchInput}
                      onKeyPress={(event) => {
                        if (event.key === "Enter") {
                          addSong();
                        }
                      }}
                      onChange={(event) => setSearchInput(event.target.value)}
                    />
                  <div className="auto-sort px-3 py-2 d-flex flex-row align-items-center" onClick={handleAutoSort}><FontAwesomeIcon
                      className="pe-2"
                      fontSize={"32px"}
                      icon={faBarsStaggered}
                    />
                    <b className="text-nowrap">                     Autosort </b>
                  </div>
                  </div>

                  <div className="songs">
                    {spotifyAccessToken && addedSongsIdsArray && (
                      <SongList
                        ref={songListRef}
                        addedSongsIdsArray={addedSongsIdsArray}
                        spotifyAccessToken={spotifyAccessToken}
                        allowRemove={true}
                        removeSong={removeSong}
                      />
                    )}
                  </div>

                  <div className="recommendations">
                    {spotifyAccessToken && addedSongsIdsArray && (
                      <Recommendations
                        addedSongsIdsArray={addedSongsIdsArray}
                        spotifyAccessToken={spotifyAccessToken}
                        addRecommendation={addRecommendation}
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
        </>
      )}
    </div>
  );
}
