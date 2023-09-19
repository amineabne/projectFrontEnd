import React, { useEffect, useState } from 'react';
import {  Routes, Route } from 'react-router-dom';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/Home';

import VendreBillets from './components/VendreBillets';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import User from './components/User';
import SignIn from './components/SignIn'; 
import Login from './components/login';
import Tickets from './components/Tickets';


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
              onClick={() => setCurrentRoute("Tickets")}
              className={currentRoute === "Tickets" ? "btn btn-outline-info ms-1" : 'btn btn-outline-info ms-1'}
              to="/Tickets"
            >
              Tickets
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setCurrentRoute("login")}
              className={currentRoute === "login" ? "btn btn-outline-info ms-1" : 'btn btn-outline-info ms-1'}
              to="/login"
            >
              login
            </NavLink>
          </li>
          
          
          <li>
            <NavLink
              onClick={() => setCurrentRoute("VendreBillets")}
              className={currentRoute === "VendreBillets" ? "btn btn-outline-info ms-1" : 'btn btn-outline-info ms-1'}
              to="/VendreBillets"
            >
              VendreBillets
            </NavLink>
          </li>
        </ul>
      </nav>
      <div>
      <SignIn />
   
    </div>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Tickets" element={<Tickets />} />
        <Route path="/VendreBillets" element={<VendreBillets />} />
        <Route path="/User" element={<User />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
