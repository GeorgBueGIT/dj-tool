import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'

function GetFromSpotify({setToken}) {

    const CLIENT_ID = "804a923520d3482cb30a284d8cec3412"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setLocalToken] = useState("");

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)
        setLocalToken(token)

    }, [])

    const logout = () => {
        setToken("")
        setLocalToken("")
        window.localStorage.removeItem("token")
    }

  return (
    <div id="spotify-login" className='d-flex justify-content-center mb-3 mt-2'>
            {!token ?
                <Button href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`} id="signInButton" type="primary" className='d-flex'>
                    <FontAwesomeIcon 
                        icon={faSpotify}
                        style={{ height: "24px", color: "#1DB954", marginRight: "8px"}} 
                    /> Login
                </Button>
            :  
                <Button onClick={logout} type="primary" className='d-flex'>
                    <FontAwesomeIcon 
                        icon={faSpotify}
                        style={{ height: "24px", color: "#1DB954", marginRight: "8px"}} 
                    /> Logout 
                </Button>
            }
    </div>
  );
}

export default GetFromSpotify;
