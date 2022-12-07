import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
// eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "../components/navbar/Navbar";
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';

const Pages = () => {
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
      // eslint-disable-next-line
    }, [token]); 
  

   return (
      <>
         <NavBar />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/inscription" element={<Register />}/>
            {/* {isLoggedIn ? ( */}
               <Route path="/mon-compte" element={<Profile />} />
            {/* ) : <></> } */}
         </Routes>
      </>
   )
}

export default Pages