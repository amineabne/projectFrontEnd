import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Billets from './components/Billets';
import NewBillet from './components/NewBillet';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import User from './components/User';

function App() {
  const [currentRoute, setCurrentRoute] = useState();
  useEffect(()=>{
    const path=window.location.pathname.toLocaleLowerCase();
    setCurrentRoute(path.slice(1,path.length));

  },[]);


  

  return (
    <BrowserRouter>
      <nav className="m-1 p-1 border border-info">
        <ul className="nav nav-pills">
          <li>
            <NavLink
              onClick={() => setCurrentRoute("home")}
              className={currentRoute === "home" ? "btn btn-outline-info ms-1" : 'btn btn-outline-info ms-1'}
              to="/home"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setCurrentRoute("User")}
              className={currentRoute === "User" ? "btn btn-outline-info ms-1" : 'btn btn-outline-info ms-1'}
              to="/User"
            >
              Registration
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setCurrentRoute("billets")}
              className={currentRoute === "billets" ? "btn btn-outline-info ms-1" : 'btn btn-outline-info ms-1'}
              to="/billets"
            >
              Billets
            </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Billets" element={<Billets />} />
        <Route path="/NewBillet" element={<NewBillet />} />
        <Route path="/User" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
