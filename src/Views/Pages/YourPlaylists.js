import React, { useState, useEffect } from 'react';
import PlaylistTile from '../Components/PlaylistTile';
import Spotify from '../../resources/Logos/Spotify.png';
import Soundcloud from '../../resources/Logos/Soundcloud.jpg';

function TrendingPlaylists() {
  return (
    <>
            <div className='col-5 offset-1'>
                <h2 className='mb-3'> Edit your Playlists </h2>
                <h3> Or Create a new one </h3>
                <div className='add-playlists-wrapper d-flex gap-4 mt-5'>
                    <div className='create-new d-flex justify-content-center align-items-center'> + </div>
                    <div className='import-spotify-playlist d-flex justify-content-center align-items-center'>
                        <img src={Spotify} width={'50%'}/>
                    </div>
                    <div className='import-soundcloud-playlist d-flex justify-content-center align-items-center'>
                        <img src={Soundcloud} width={'50%'}/>
                    </div>
                </div>
            </div>
            <div className='col-5 h-100'>
                <div className='content-frame mh-100 w-100 py-3'>
                  <PlaylistTile/>
                  <PlaylistTile/>
                  <PlaylistTile/>
                  <PlaylistTile/>
                  <PlaylistTile/>
                </div>
            </div>
            </>
  );
}

export default TrendingPlaylists;
