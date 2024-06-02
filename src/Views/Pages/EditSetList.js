import React, { useState, useEffect } from 'react';
import Header from '../Partials/Header';
import SongList from '../Components/SongList';
import Wallpaper from '../../LoginWallpaper.jpg';

function EditSetList() {

  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.querySelector('.header');
    if (header) {
      const height = header.offsetHeight;
      setHeaderHeight(height);
    }
  }, []);

  const frontPageStyle = {
    paddingTop: `${headerHeight}px`,
  };

  return (
    <div className="front-page h-100 w-100">
      <img className="position-fixed wallpaper" src={Wallpaper} alt="Wallpaper" />
      <Header/>
      <div style={frontPageStyle}>
        <SongList />
      </div>
      
    </div>
  );
}

export default EditSetList;
