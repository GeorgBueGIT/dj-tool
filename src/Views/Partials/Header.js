function Header({activeLink}) {

  const navLinks = () => {
    const links = ["Inspiration", "Your Playlists", "Profile"];
    const renderedLinks = [];

    for(var i = 0; i < links.length; i++){
      if (i === activeLink) {
        renderedLinks.push(
          <div key={i} className="nav-active-box px-3">
            <a>{links[i]}</a>
          </div>
        );
      } else {
        renderedLinks.push(
          <a key={i}>{links[i]}</a>
        );
      }
    }

    return renderedLinks;
  }


    return (
      <div className="header w-100 fixed-to-top" id ="header">
        <div className="container">
          <div className="row">

            <div className="col-1">
              <div className="white-box"></div>
            </div>

            <div className="col-4 px-5">
              <div className="nav-links h-100 d-flex align-items-center justify-content-between">
                {navLinks()}
              </div>
            </div>

            <div className="col-2 offset-5">
              <div className="user-menu h-100 d-flex align-items-center justify-content-end">
                <div className="white-box-small"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
  
  export default Header;
  