import React from 'react';
import PlaylistTile from '../Components/PlaylistTile';
import Spotify from '../../resources/Logos/Spotify.png';
import Soundcloud from '../../resources/Logos/Soundcloud.jpg';

function YourPlaylists({ headerHeight }) {
  return (
    <div className='col-10 h-100 offset-1 your-playlists-page' id="your-playlists">
        <div className='row h-100 d-flex align-items-center'>
            <div className='col-12 col-lg-6 text-center text-lg-start mb-4 mb-lg-0'>
                <h2 className='mb-3'> Edit your Playlists </h2>
                <h3> Or Create a new one </h3>
                <div className='add-playlists-wrapper d-flex gap-4 mt-5'>
                    <a href="/Create">
                        <div className='create-new d-flex justify-content-center align-items-center'> + </div>
                    </a>
                    <a href="/Import-Spotify">
                        <div className='import-spotify-playlist d-flex justify-content-center align-items-center'>
                            <img src={Spotify} width={'50%'} alt='spotify-logo'/>
                        </div>
                    </a>
                    <a href="/Import-Soundcloud">
                        <div className='import-soundcloud-playlist d-flex justify-content-center align-items-center'>
                            <img src={Soundcloud} width={'50%'} alt='soundcloud-logo'/>
                        </div>
                    </a>
                </div>
            </div>
            <div className='col-12 col-lg-6 h-100'  style={{ paddingTop: headerHeight + "px" }}>
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

export default YourPlaylists;
