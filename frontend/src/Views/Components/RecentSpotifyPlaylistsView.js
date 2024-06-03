import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RecentSpotifyPlaylistsView({token}) {

const url = "https://api.spotify.com/v1/me/playlists?limit=6";
const [playlists, setPlaylists] = useState([]);

const fetchInfo = () => {
    if (!token) {
        return;
    }
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    return fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => {
        setPlaylists(data.items);
    })
    .catch(error => {
        console.error('Error fetching playlists:', error);
    });
};

useEffect(() => {
    fetchInfo();
}, [token]);

const renderPlaylists = () => {
    if (playlists) {
        return playlists.map(items => (
        <div key={items.id} className='col-4 d-flex flex-column playlist px-2'>
            <b> {items.name} </b>
            <img width={"100%"} src={items.images[0].url} alt="playlist-thumbnail"/>
        </div>
        ))
    }
}

  return (
    <div id="recent-spotify-playlists" className='d-flex row w-100 m-0'>
        <h2 className='px-2'> Import your Spotify Playlists </h2>
        {renderPlaylists()}
    </div>
  );
}

export default RecentSpotifyPlaylistsView;
