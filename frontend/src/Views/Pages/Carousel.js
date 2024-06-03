import React, { useState, useEffect } from 'react';
import TrendingPlaylists from '../Partials/TrendingPlaylists';
import YourPlaylists from '../Partials/YourPlaylists';
import Profile from '../Partials/Profile';
import Header from '../Partials/Header';

import WallPaper1 from '../../WallPaper1.png';
import WallPaper2 from '../../WallPaper2.jpg';
import WallPaper3 from '../../WallPaper3.jpg';

import Slider from "react-slick";


export default function Carousel() {

    const [headerHeight, setHeaderHeight] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);

    const pages = [<TrendingPlaylists/>, <YourPlaylists/>, <Profile status='active'/>];

    const wallpapers = [WallPaper1, WallPaper2, WallPaper3];


    useEffect(() => {
        const header = document.querySelector('.header');
        if (header) {
          const height = header.offsetHeight;
          setHeaderHeight(height);
        }
      }, []);

    function SampleNextArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div onClick={onClick} className='nav-right d-flex justify-content-end'></div>
      );
    }
    
    function SamplePrevArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div onClick={onClick} className='nav-left'></div>
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
        beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex)
      };

      return (
        <div className='carousel-page position-relative' id="carousel">
          <Header activeLink={currentSlide}/>
          <Slider {...settings}>
            {pages.map((page, index) => (
              <div>
                <RenderPage key={index} page={page} wallpaper={wallpapers[index]} headerHeight={headerHeight}/>
              </div>
            ))}
          </Slider>
        </div>
      );
    };

  function RenderPage({ page, wallpaper, headerHeight }) {
    return (
      <div className="carousel-container">
        <div className="front-page-wrapper w-100 page-color" >
          <img className="position-fixed wallpaper" src={wallpaper} alt="Wallpaper" />
          <div className='px-5 pb-5 h-100' style={{paddingTop: headerHeight + "px"}}>
            <div className='row d-flex align-items-center h-100'>
              {page}
            </div>
          </div>
        </div>
      </div>
    );
  }