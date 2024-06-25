import React, { useState, useEffect, useRef } from "react";
import TrendingPlaylists from "../Components/Dashboard/TrendingPlaylists";
import YourPlaylists from "../Components/Dashboard/YourPlaylists";
import Feed from "../Components/Dashboard/Feed";
import Profile from "../Components/Dashboard/Profile";
import Header from "../Partials/Header";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../Auth/AuthProvider";
import { Spin } from "antd";

export default function FrontPage() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);

  const user = useAuth();

  useEffect(() => {
    setUserId(user.user.id);
    setUserName(user.user.username);
  }, [user]);

  const pages = [
    <TrendingPlaylists headerHeight={headerHeight} />,
    <Feed headerHeight={headerHeight} userId={userId} userName={userName} />,
    <YourPlaylists headerHeight={headerHeight} userId={userId} userName={userName} />,
    <Profile headerHeight={headerHeight} userId={userId} userName={userName} />,
  ];

  useEffect(() => {
    const header = document.querySelector(".header");
    if (header) {
      const height = header.offsetHeight;
      setHeaderHeight(height);
    }
  }, []);

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div onClick={onClick} className="nav-right">
        {" "}
        <FontAwesomeIcon className="px-3" fontSize={"32px"} icon={faForward} />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div onClick={onClick} className="nav-left">
        <FontAwesomeIcon className="px-3" fontSize={"32px"} icon={faBackward} />
      </div>
    );
  }

  var settings = {
    dots: false,
    infinite: true,
    speed: 750,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  const navToSlide = (slideNr) => {
    setCurrentSlide(slideNr);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(slideNr);
    }
  };

  return (
    <div className="carousel-page position-relative" id="carousel">
      <Header activeLink={currentSlide} navToSlide={navToSlide} />
      {userId ? (
        <>
          <Slider ref={sliderRef} {...settings}>
            {pages.map((page, index) => (
              <div key={index}>
                <RenderPage
                  key={index}
                  page={page}
                  headerHeight={headerHeight}
                />
              </div>
            ))}
          </Slider>
        </>
      ) : (
        <div
          data-testid="app-spinner"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spin size="large" />
        </div>
      )}
    </div>
  );
}

function RenderPage({ page }) {
  return (
    <div className="carousel-container">
      <div className="front-page-wrapper w-100 page-color">
        <div className="px-5 pb-5 h-100">
          <div className="row d-flex align-items-center h-100">{page}</div>
        </div>
      </div>
    </div>
  );
}