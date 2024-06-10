import React from 'react';
import PlaylistTile from '../Components/PlaylistTile';
import ProfileDescription from '../Components/ProfileDescription';

function Profile({ headerHeight }) {

    return (
        <div className='col-10 h-100 offset-1 profile-page'>
            <div className='row h-100 d-flex align-items-center'>
                <div className='col-12 col-lg-6 text-center text-lg-start mb-4 mb-lg-0'>
                    <h2 className='mb-3'> Your Profile </h2>
                    <h3> See what other people see </h3>   
                </div>
                <div className='col-12 col-lg-6 h-100'  style={{ paddingTop: headerHeight + "px" }}>
                    <div className='content-frame mh-100 w-100 py-3'>
                    <ProfileDescription/>
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

export default Profile;
