import React, { useState, useEffect } from 'react';
import TrendingPlaylists from './TrendingPlaylists';
import YourPlaylists from './YourPlaylists';
import Profile from './Profile';
import Header from '../Partials/Header';

import WallPaper1 from '../../WallPaper1.png';
import WallPaper2 from '../../WallPaper2.jpg';
import WallPaper3 from '../../WallPaper3.jpg';


const Carousel = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [currentWallPaper, setCurrentWallPaper] = useState(WallPaper1);
    const [currentPageName, setCurrentPageName] = useState("TrendingPlaylists");
    const [headerHeight, setHeaderHeight] = useState(0);

    const pages = [<TrendingPlaylists/>, <YourPlaylists/>, <Profile status='active'/>];
    const pageNames = ["TrendingPlaylists", "YourPlaylists", "Profile"];

    const wallpapers = [WallPaper1, WallPaper2, WallPaper3];
  
    const nextPage = () => {
      setCurrentPage((prevPage) => (prevPage + 1) % pages.length);
      setCurrentWallPaper(wallpapers[(currentPage + 1) % wallpapers.length]);
      setCurrentPageName(pageNames[(currentPage + 1) % pageNames.length]);
    };
  
    const prevPage = () => {
      setCurrentPage((prevPage) => (prevPage - 1 + pages.length) % pages.length);
      setCurrentWallPaper(wallpapers[(currentPage - 1 + wallpapers.length) % wallpapers.length]);
      setCurrentPageName(pageNames[(currentPage - 1 + pageNames.length) % pageNames.length]);
    };

    useEffect(() => {
        const header = document.querySelector('.header');
        if (header) {
          const height = header.offsetHeight;
          setHeaderHeight(height);
        }
      }, []);

    return (
        <div className="carousel-container" id="carousel">
            <div className={` front-page-wrapper w-100  page-color ${currentPageName}`}>
                <img className="position-fixed wallpaper" src={currentWallPaper} alt="Wallpaper"/>
                <Header activeLink={currentPage} /> 
                <div className='px-5 pb-5 h-100' style={{paddingTop: headerHeight + "px"}}>
                    <div className='row d-flex align-items-center h-100'>
                        <div onClick={prevPage} className='nav-left col-1'></div>
                            {pages[currentPage]}
                        <div onClick={nextPage} className='nav-right col-1 d-flex justify-content-end'></div>
                    </div>
                </div>
            </div>
        </div>
    );
  };
  
  export default Carousel;