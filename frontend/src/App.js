import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from './Views/Pages/Carousel';
import Login from './Views/Pages/Login';
import Register from './Views/Pages/Register'; 
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {

  const fetchData = async () => {
    const res = await fetch("http://localhost:3001/");
    console.log(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/Register" element={<Register/>}/>
          <Route exact path="/Home" element={<Carousel/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
