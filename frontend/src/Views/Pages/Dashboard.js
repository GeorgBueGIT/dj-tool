import React, { useState, useEffect, useRef } from "react";
import TrendingPlaylists from "../Components/Dashboard/TrendingPlaylists";
import YourPlaylists from "../Components/Dashboard/YourPlaylists";
import Profile from "../Components/Dashboard/Profile";
import Header from "../Partials/Header";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons";

export default function FrontPage() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderRef = useRef(null);

  const pages = [
    <TrendingPlaylists headerHeight={headerHeight} />,
    <YourPlaylists headerHeight={headerHeight} />,
    <Profile headerHeight={headerHeight} />,
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
      <Slider ref={sliderRef} {...settings}>
        {pages.map((page, index) => (
          <div key={index}>
            <RenderPage key={index} page={page} headerHeight={headerHeight} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

function RenderPage({ page, headerHeight }) {
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
