import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
// eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "../components/navbar/Navbar";
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import EditUser from '../components/admin/edit-user';

const Pages = () => {
   const navigate = useNavigate();

   const token = JSON.parse(localStorage.getItem("token"));
   // eslint-disable-next-line
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
            <Route path="/edit-user/:id" element={<EditUser />}/>
            {/* {isLoggedIn ? ( */}
               <Route path="/mon-compte" element={<Profile />} />
            {/* ) : <></> } */}
         </Routes>
      </>
   )
}

export default Pages