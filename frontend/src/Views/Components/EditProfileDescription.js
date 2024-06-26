import React, { useEffect, useState, useRef, forwardRef } from "react";
import { Input } from "antd";
import ImageCrop from "../Components/ImageCrop";
const { TextArea } = Input;

const EditProfileDescription = forwardRef((props, ref) => {
  const [userDetails, setUserDetails] = useState([]);
  const [description, setDescription] = useState();
  const [userName, setUserName] = useState();

  useEffect(() => {
    props.getTextAreaValue(description);
  }, [description]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/get-user-details?userId=${props.userId}`,
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
  }, [props.userId]);

  useEffect(() => {
    setDescription(userDetails[0]?.Profile_Description);
    setUserName(userDetails[0]?.Username);
  }, [userDetails]);

  return (
    <div className="profile-description pt-0 pb-2" id="profile-description">
      {userDetails && (
        <>
          <div className="profile-image-crop">
            <ImageCrop ref={ref} ratio={21/9} />
          </div>

          <div className="px-3">
            <div className="d-flex align-items-center justify-content-between pb-3">
              <Input
                placeholder="Profile Name"
                className="my-3 title-input"
                value={userName}
                disabled
              />
            </div>
            <TextArea
              placeholder="Profile Description"
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
});

export default EditProfileDescription;
