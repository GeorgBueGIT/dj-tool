import React, { useEffect, useState } from "react";
import { Input } from "antd";
const { TextArea } = Input;

function EditProfileDescription({ userId }) {
  const [userDetails, setUserDetails] = useState([]);
  const [description, setDescription] = useState();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/get-user-details?userId=${userId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        console.error("Error fetching User Details:", error);
      }
    };

    fetchProfile();
  }, [userId]);

    useEffect(() => {
        setDescription(userDetails[0]?.Profile_Description);
    }, [userDetails]);

  return (
    <div className="profile-description pt-0 pb-2" id="profile-description">
      {userDetails && (
        <>
          <img
            className="profile-banner"
            alt="profile banner"
            src={
              userDetails[0]?.Profile_Cover
                ? userDetails[0].Profile_Cover
                : "https://mvz-bietigheim.de/wp-content/uploads/2017/05/placeholder-image10.jpg"
            }
            width={"100%"}
          />
          <div className="px-3">
            <div className="d-flex align-items-center justify-content-between pb-3">
              <Input
                placeholder="Playlist title"
                className="my-3 title-input"
                value={userDetails[0]?.Username}
                disabled
              />
            </div>
            <TextArea
              placeholder="Playlist Description"
              className="description-input"
              autoSize={{ minRows: 2, maxRows: 6 }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default EditProfileDescription;
