import React, { useState, useEffect } from 'react';
import PlaylistCoverTest from '../../resources/Images/PlaylistCoverTest.jpeg';

function PlaylistTile() {
return ( 
<div className='playlist-tile my-3'>
    <div className='p-2'>
    <div className='row'>
        <div className='col-3 d-flex align-items-center'>
        <img className="playlist-cover" src={PlaylistCoverTest} width={'100%'}/>
        </div>
        <div className='col-9'>
        <div className='row'>
            <div className='col-9'>
            <div className='playlist-headline-combo p-0'>
                <h3 className='my-0 py-0'> Trap </h3>
                <p className='mb-1'> #Trap, #HipHop, #Dark </p>
            </div>
            </div>
            <div className='col-3'>
            <b> @LoremIpsum </b>
            </div>
            <div className='col-12'>
            <p> Club Worthy Trap Playlist (Featuring: Trippie Redd, Travis Scott, ...) </p>
            </div>
            <div className='col-12 d-flex'>
            <p className='fit-content pe-3'> 123 - 144 BPM </p>
            <p className='fit-content'> 87 Energy </p>
            </div>
        </div>
        </div>
    </div>
    </div>
</div>
);
}

export default PlaylistTile;