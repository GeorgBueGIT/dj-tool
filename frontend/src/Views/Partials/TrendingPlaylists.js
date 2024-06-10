import React from 'react';
import PlaylistTile from '../Components/PlaylistTile';

function TrendingPlaylists({ headerHeight }) {
  return (

    <div className='col-10 h-100 offset-1 trending-playlists-page'>
      <div className='row h-100 d-flex align-items-center'>
            <div className='col-12 col-lg-6 text-center text-lg-start mb-4 mb-lg-0'>
                <h2 className='mb-3'> Inspire yourself - Trending Playlists </h2>
                <h3> Most Hyped Playlists this week </h3>
            </div>
            <div className='col-12 col-lg-6 h-100' style={{ paddingTop: headerHeight + "px" }}>
                <div className='content-frame mh-100 w-100'>
                  <PlaylistTile/>
                  <PlaylistTile/>
                  <PlaylistTile/>
                  <PlaylistTile/>
                  <PlaylistTile/>
                </div>
            </div>
        </div>
    </div>        
  );
}

export default TrendingPlaylists;
