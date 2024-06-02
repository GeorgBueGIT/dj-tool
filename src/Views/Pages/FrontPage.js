import React, { useState, useEffect } from 'react';
import Header from '../Partials/Header';
import SongList from '../Components/SongList';
import Wallpaper from '../../LoginWallpaper.jpg';
import SpotifyLogin from '../../Views/Components/SpotifyLogin';
import RecentSpotifyPlaylistsView from '../Components/RecentSpotifyPlaylistsView';
import RecentPlaylistsView from '../Components/RecentPlaylistsView';


function FrontPage() {

  const [headerHeight, setHeaderHeight] = useState(0);
  const [token, setToken] = useState("");

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
      <div style={frontPageStyle} className='container'>
        <div className='frontpage-overview-container container'>
          <div className='row'>
            <div className='col-12'>
              <SpotifyLogin setToken={setToken}/>
            </div>
            <div className='col-md-6 col-12'>
              <RecentSpotifyPlaylistsView token={token}/>
            </div>
            <div className='col-md-6 col-12'>
              <RecentPlaylistsView/>
            </div>
          </div>
        </div>    
      </div>
      
    </div>
  );
}

export default FrontPage;
