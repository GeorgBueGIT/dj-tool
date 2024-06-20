import React from "react";
import ProfileBannerTest from "../../resources/Images/ProfileBannerTest.jpg";

function ProfileDescription() {
  return (
    <div className="profile-description pt-0 pb-2" id="profile-description">
      <img
        className="profile-banner"
        alt="profile banner"
        src={ProfileBannerTest}
        width={"100%"}
      />
      <div className="px-3">
        <div className="d-flex align-items-end pb-3">
          <h3 className="m-0 mt-2 pe-3"> DJ Ötzi </h3>
          <b> DE </b>
        </div>

        <b className="description">
          {" "}
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et
        </b>
      </div>
    </div>
  );
}

export default ProfileDescription;
