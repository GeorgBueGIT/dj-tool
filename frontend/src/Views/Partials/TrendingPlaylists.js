import React, { useState, useEffect } from 'react';
import PlaylistTile from '../Components/PlaylistTile';

function TrendingPlaylists() {
  return (

    <div className='col-10 h-100 offset-1 trending-playlists-page'>
      <div className='row h-100 d-flex align-items-center'>
            <div className='col-6'>
                <h2 className='mb-3'> Inspire yourself - Trending Playlists </h2>
                <h3> Most Hyped Playlists this week </h3>
            </div>
            <div className='col-6 h-100'>
                <div className='content-frame mh-100 w-100 py-3'>
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
