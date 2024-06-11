import React, { useState, useEffect, useRef } from "react";
import { Input } from "antd";
import SongList from "../Components/SongList";
import { CameraFilled } from "@ant-design/icons";
import Uploady, { useItemFinishListener } from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
const { TextArea } = Input;

export default function CreatePlaylist() {
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadButtonHeight, setUploadButtonHeight] = useState(0);
  const uploadButtonRef = useRef(null);

  useEffect(() => {
    if (uploadButtonRef.current) {
      setUploadButtonHeight(uploadButtonRef.current.clientHeight);
    }
  }, [uploadButtonRef.current]);

  useEffect(() => {
    console.log(uploadButtonHeight);
  }, [uploadButtonHeight]);

  const UploadListener = () => {
    useItemFinishListener((item) => {
      if (item.uploadResponse?.data?.filePath) {
        const filePath = item.uploadResponse.data.filePath;
        setImageUrl(`http://localhost:3001/${filePath}`);
      }
    });
  };

  return (
    <div className="create-playlist" id="create-playlist-page">
      <div className="vh100 w-100 page-color position-relative">
        <div className="px-5 pb-5 h-100">
          <div className="row d-flex align-items-center h-100">
            <div className="col-2">
              <a href="/Home" className="position-fixed back">
                {" "}
                Back{" "}
              </a>
            </div>
            <div className="col-8 playlist-frame my-5">
              <div className="playlist-frame-header mb-5 p-2 pt-4 d-flex justify-content-between">
                <div className="me-3">
                  <Input
                    placeholder="Playlist title"
                    className="mb-3 title-input"
                  />
                  <TextArea
                    placeholder="Playlist Description"
                    className="description-input"
                    autoSize={{ minRows: 2, maxRows: 6 }}
                  />
                </div>
                <Uploady destination={{ url: "http://localhost:3001/upload" }}>
                  <UploadListener />
                  <UploadButton className="upload-button" id="upload-button" style={{ backgroundImage: `url(${imageUrl})` }}>
                    <div
                      className="add-playlist-thumbnail d-flex align-items-center justify-content-center"
                      style={{ width: `${uploadButtonHeight}px`, backgroundImage: `url(${imageUrl})`}}
                      ref={uploadButtonRef}
                    >
                      <CameraFilled
                        style={{ fontSize: "64px", color: "black" }}
                      />
                    </div>
                  </UploadButton>
                </Uploady>
              </div>

              <div className="search mb-5">
                <Input
                  placeholder="Search for a song ..."
                  className="search-input"
                />
              </div>

              <div className="songs">
                {/* <SongList /> */}
              </div>
            </div>
            <div className="col-2">
              <a href="/Home" className="position-fixed save">
                {" "}
                Save Changes{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
