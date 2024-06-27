import { Dropdown, Space } from "antd";
import { useAuth } from "../../Auth/AuthProvider";
import { useState } from "react";

function Header({ activeLink, navToSlide }) {
  const navLinks = () => {
    const links = ["Inspiration", "Feed", "Your Playlists", "Profile"];
    const renderedLinks = [];

    for (var i = 0; i < links.length; i++) {
      (function (index) {
        if (index === activeLink) {
          renderedLinks.push(
            <div key={index} className="nav-active-box">
              <a>{links[index]}</a>
            </div>
          );
        } else {
          renderedLinks.push(
            <a onClick={() => navToSlide(index)} key={index}>
              {links[index]}
            </a>
          );
        }
      })(i);
    }

    return renderedLinks;
  };

  const auth = useAuth();
  const onSignOut = async () => {
    auth.logOut();
  };

  const onDeleteAccount = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/delete-profile?userId=${auth.user.id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      await response.json();
      auth.logOut();
    } catch (error) {
      console.error("Error Deleting User:", error);
    }
  };

  const [showDeletePopUp, setShowDeletePopUp] = useState(false);

  const onDeletePopUp = () => {
    if (showDeletePopUp) {
      return (
        <div className="popup vh100 vw-100 position-absolute d-flex justify-content-center align-items-center">
          <div className="popup-modal d-flex flex-column p-3">
            <b> Are u Sure? </b>
            <div className="d-flex flex-row gap-3 pt-2 text-center w-100">
              <div className="w-50 decide-button px-3 py-2" onClick={onDeleteAccount}> Yes </div>
              <div className="w-50 decide-button-dark px-3 py-2" onClick={() => setShowDeletePopUp(false)}> No </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const items = [
    {
      key: "1",
      label: <a onClick={onSignOut}>Sign Out</a>,
    },
    {
      key: "2",
      label: <a onClick={setShowDeletePopUp}>Delete Account</a>,
    },
  ];

  return (
    <div className="header w-100 fixed-to-top" id="header">
      {onDeletePopUp()}
      <div className="container">
        <div className="row">
          <div className="col-1">
            <div className="white-box"></div>
          </div>

          <div className="col-9 px-4">
            <div className="nav-links h-100 d-flex align-items-center justify-content-start gap-5">
              {navLinks()}
            </div>
          </div>

          <div className="col-2">
            <div className="user-menu h-100 d-flex align-items-center justify-content-end">
              <Dropdown
                menu={{
                  items,
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <div className="white-box-small"></div>
                  </Space>
                </a>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
