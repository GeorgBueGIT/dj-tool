import React, { useEffect, useState } from "react";

function ProfileDescription({ userId, currentUserId, canFollow = false }) {
  const [userDetails, setUserDetails] = useState([]);
  const [isFollowed, setIsFollowed] = useState(true);

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

    const checkIfFollowed = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/is-follower`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            follower: currentUserId,
            followed: userId,
          }),
        });

        const data = await response.json();
        setIsFollowed(data.follows);

      } catch (error) {
        console.error("Error Checking for if followed:", error);
      }
    }

    checkIfFollowed();
    fetchProfile();
  }, [userId, currentUserId]);


  const followHandler = async () => {
    if (isFollowed === false) {
      try {
        const response = await fetch(`http://localhost:3001/api/follow-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            follower: currentUserId,
            followed: userId,
          }),
        });

        await response.json();

        if (response.ok) {
          setIsFollowed(true);
        }
      } catch (error) {
        console.error("Error Following User:", error);
      }
    } else {
      try {
        const response = await fetch(
          `http://localhost:3001/api/unfollow-user`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              follower: currentUserId,
              followed: userId,
            }),
          }
        );

        await response.json();

        if (response.ok) {
          setIsFollowed(false);
        }
      } catch (error) {
        console.error("Error unfollowing User:", error);
      }
    }
  };

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
              <h3 className="m-0 mt-2 pe-3"> {userDetails[0]?.Username} </h3>
              {/* <b> DE </b> */}
              {canFollow && (
                <div
                  className={`follow-button px-2 py-1 ${
                    isFollowed ? "followed" : "follow"
                  }`}
                  onClick={() => followHandler()}
                >
                  {isFollowed ? <>Followed</> : <>Follow</>}
                </div>
              )}
            </div>

            <b className="description">{userDetails[0]?.Profile_Description}</b>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfileDescription;
