import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { API_BASE_URL } from '../utils/APIRoutes';

const InfoModal = ({ setShowModal }) => {

  const token = JSON.parse(localStorage.getItem("token"));
  
   const [values, setValues] = usesState({
      firstname: "",
      lastname: "",
      email: "",
      // password: "",
      age: "",
      gender: ""
   })

   const 

   

   const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
   }

  return (
    <div>
      
    </div>
  )
}

export default InfoModal