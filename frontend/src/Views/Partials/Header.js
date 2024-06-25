import { Dropdown, Space } from "antd";
import { useAuth } from "../../Auth/AuthProvider";

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

  const items = [
    {
      key: "1",
      label: (
        <a onClick={onSignOut}>
          Sign Out
        </a>
      ),
    },
  ];

  return (
    <div className="header w-100 fixed-to-top" id="header">
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
                    <div className="white-box-small">
                    </div>
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
