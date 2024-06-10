import Wallpaper from '../../resources/Wallpapers/Login-Wallpaper.jpg';
import {Input} from 'antd';
import SongList from '../Components/SongList';
import SpotifyLogin from '../../Views/Components/SpotifyLogin';
import React, { useState, useEffect } from 'react';
const { TextArea } = Input;


const ImportSpotify = () => {
    const [token, setToken] = useState("");
  return (
    <div className="import-spotify-playlists" id="spotify-playlists-page">
        <div className="front-page-wrapper w-100 page-color position-relative" >
            <img className="position-fixed wallpaper" src={Wallpaper} alt="Wallpaper" />
            <div className='px-5 pb-5 h-100'>
                <div className='row d-flex align-items-center h-100'>
                    <div className='col-2'>
                        <a href="/Home" className='position-fixed back'> Back </a>
                    </div>
                    <div className='col-8 playlist-frame my-5'>
                        <SpotifyLogin setToken={setToken}/>
                        <div className='search mb-5'>
                        <Input placeholder="Search Playlist ..." className='search-input' />
                        </div>

                        <div className='songs'>
                            <SongList/>
                        </div>
                    </div>
                    <div className='col-2'>
                        <a href="/Home" className='position-fixed save'> Save Changes </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
export default ImportSpotify;

