import React, { useState, useEffect } from "react";
import { getGenreById } from "../../utils/GetGenreById";
import { getUsernameById } from "../../utils/Database/GetUsernameById";

export default function PlaylistTile({
  title = "Empty Title",
  description = "Empty Description",
  imageSrc = "",
  username,
  tags = "",
  onClick,
  showUsername = true,
  onClickUser,
}) {
  const [tagFormatted, setTagFormatted] = useState("");
  const [userName, setUserName] = useState(username);

  useEffect(() => {
    if (tags) {
      const splitArray = tags.split(", ");
      const formattedTags = splitArray.map((tag) => `#${getGenreById(tag)}`);
      setTagFormatted(formattedTags.join(", "));
    }
  }, [tags]);

  const getTheExcerpt = (text, limit = 20) => {
    if (text.length > limit) {
      return text.slice(0, limit) + "...";
    }
    return text;
  };

  const handleUserClick = (event) => {
    event.stopPropagation();
    onClickUser();
  };

  useEffect(() => {
    const convertToUsername = async () => {
      setUserName(await getUsernameById(userName));
    };
    if (typeof userName === "number") {
      convertToUsername();
    }
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
                <h3 className="my-0 py-0"> {title} </h3>
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
            {/* <div className="playlist-stats col-12 d-flex justify-content-between align-items-end">
              <div className="fit-content pe-3 mb-0">
                <div className="custom-progress-outer mb-2">
                  <div className="custom-progress-inner" style={{ width: '60px', transform: 'translateX(100%)'}}></div>
                </div> 123 - 144 BPM
              </div>
              <div className="fit-content mb-0">
                {" "}
                <Progress steps={5} percent={87} size={[15, 25]} /> <br /> 87
                Energy{" "}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
