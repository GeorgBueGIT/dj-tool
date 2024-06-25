import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Views/Pages/Dashboard";
import Access from "./Views/Pages/Access";
import CreatePlaylist from "./Views/Pages/CreatePlaylist";
import ImportSpotify from "./Views/Pages/ImportSpotify";
import ViewPlaylist from "./Views/Pages/ViewPlaylist";
import ViewProfile from "./Views/Pages/ViewProfile";
import EditPlaylist from "./Views/Pages/EditPlaylist";
import EditProfile from "./Views/Pages/EditProfile";
import AuthProvider from "./Auth/AuthProvider";
import PrivateRoute from "./Auth/PrivateRoutes";
import { Spin } from "antd";
import "./app.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    // Event Listener für window.onload
    window.addEventListener("load", handleLoad);

    // Cleanup function
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div
          data-testid="app-spinner"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<Access />} />
              <Route element={<PrivateRoute />}>
                <Route exact path="/Dashboard" element={<Dashboard />} />
                <Route exact path="/Create" element={<CreatePlaylist />} />
                <Route exact path="/Import-Spotify" element={<ImportSpotify />} />
                <Route exact path="/View-Playlist" element={<ViewPlaylist />} />
                <Route exact path="/View-Profile" element={<ViewProfile />} />
                <Route exact path="/Edit-Playlist" element={<EditPlaylist />} />
                <Route exact path="/Edit-Profile" element={<EditProfile />} />
              </Route>
            </Routes>
          </AuthProvider>
        </Router>
      )}
      {!loading && (
        <div data-testid="app-content">
          {/* Content after loading, you can add specific elements here */}
        </div>
      )}
    </div>
  );
}

export default App;
