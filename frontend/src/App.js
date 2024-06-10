import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FrontPage from './Views/Pages/FrontPage';
import Start from './Views/Pages/Start';
import CreatePlaylist from './Views/Pages/CreatePlaylist';
import ImportSpotify from './Views/Pages/ImportSpotify';
import {Spin} from "antd";
import "./app.css";


import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  // const fetchData = async () => {
  //   const res = await fetch("http://localhost:3001/");
  //   console.log(res);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    // Event Listener für window.onload
    window.addEventListener('load', handleLoad);

    // Cleanup function
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);


  return (
    <div className="App">
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Spin size="large" />
        </div>
      ) : (
      <Router>
        <Routes>
          <Route exact path="/" element={<Start/>}/>
          <Route exact path="/Home" element={<FrontPage/>}/>
          <Route exact path="/Create" element={<CreatePlaylist/>}/>
          <Route exact path="/Import-Spotify" element={<ImportSpotify/>}/>
        </Routes>
      </Router>
      )}
    </div>
  );
}

export default App;
