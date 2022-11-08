import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "../components/Navbar";
import Login from './Login';
import Register from './Register';

const Home = () => {
   return (
      <>
         <NavBar />
         <Routes>
            <Route path="/register" element={<Register />}/>
            <Route path="/login" element={<Login />} />
            {/* <Route path="/" element={<Chat />} /> */}
         </Routes>
      </>
   )
}

export default Home