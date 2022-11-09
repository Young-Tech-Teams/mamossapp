import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "../components/Navbar";
import Login from './Login';
import Register from './Register';
import Accueil from './Accueil';

const Home = () => {
   const navigate = useNavigate();

   const token = JSON.parse(localStorage.getItem("token"));
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   useEffect(() => {
      if (token) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
        navigate("/connexion");
      }
    }, [token]);
  

   return (
      <>
         <NavBar />
         <Routes>
            <Route path="/inscription" element={<Register />}/>
            <Route path="/connexion" element={<Login />} />
            <Route path="/" element={<Accueil />} />
         </Routes>
      </>
   )
}

export default Home