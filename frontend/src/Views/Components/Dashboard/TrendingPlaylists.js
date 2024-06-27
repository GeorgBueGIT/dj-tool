import React, { useState, useEffect } from "react";
import PlaylistTile from "../PlaylistTile";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice, faTag } from "@fortawesome/free-solid-svg-icons";
import { getGenreById } from "../../../utils/GetGenreById";
import { MehOutlined } from "@ant-design/icons";
import { Spin } from "antd";

function TrendingPlaylists({ headerHeight }) {
  const [playlistsData, setPlaylistsData] = useState([]);
  const [randomize, setRandomize] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [filterTag, setFilterTag] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/get-random-playlists?tagId=${filterTag}`,
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
  }, [randomize, filterTag]);

  const viewPlaylist = (ID) => {
    navigate(`/View-playlist?ID=${ID}`);
  };

  const viewProfile = (ID) => {
    navigate(`/View-Profile?ID=${ID}`);
  };

  const renderPlaylistTiles = () => {
    if (playlistsData.length === 0) {
      return (
        <div className="h-100 w-100 d-flex align-items-center justify-content-center">
          <b className="no-entries"> <MehOutlined className="me-3 my-3" /> No playlists found! </b>
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
        onClickUser={() => viewProfile(playlist.Author_ID)}
      />
    ));
  };

  const [descriptionTags, setDescriptionTags] = useState([]);

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
      return (
        <div
          key={index}
          onClick={() => {
            if (filterTag === index) {
              setFilterTag("");
            } else {
              setFilterTag(index);
            }
            setShowTags(false);
          }}
          className={`description-tag-container background-color-transition px-3 py-1 m-1 ${
            index === filterTag ? "selected-tag" : ""
          }`}
        >
          {tag.Name}
        </div>
      );
    });
  };

  return (
    <div
      className="col-10 h-100 offset-1 trending-playlists-page"
      id="trending-playlists"
    >
      <div className="row vh100 d-flex align-items-center">
        <div className="col-12 col-lg-6 text-center text-lg-start mb-4 mb-lg-0">
          <h2 className="mb-3"> Inspire yourself - Random Playlists </h2>
          <h3> See what other Users created </h3>
        </div>
        <div
          className="col-12 col-lg-6 h-100 pb-5"
          style={{ paddingTop: headerHeight + "px" }}
        >
          <div className="content-frame mh-100 w-100">
            <div className="w-100 px-1 pt-3 row">
              <div className="col">
                <div
                  className="filter-button d-flex align-items-center py-2 px-0 ms-2"
                  onClick={() => setShowTags(!showTags)}
                >
                  <FontAwesomeIcon
                    className="px-3"
                    fontSize={"32px"}
                    icon={faTag}
                  />
                  <b>
                    {filterTag ? getGenreById(filterTag) : "Filter by Tag"}{" "}
                  </b>
                </div>
              </div>
              <div
                className="filter-button randomizer-button d-flex align-items-center justify-content-center py-2 px-0"
                onClick={() => {
                  setFilterTag("");
                  setRandomize(!randomize);
                  setShowTags(false);
                }}
              >
                <FontAwesomeIcon className="" fontSize={"32px"} icon={faDice} />
              </div>
            </div>
            <div
              className={`description-tags w-100 d-flex flex-wrap justify-content-center ${
                showTags ? "expanded" : ""
              }`}
            >
              {renderDescriptionTags()}
            </div>
            {renderPlaylistTiles()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrendingPlaylists;
