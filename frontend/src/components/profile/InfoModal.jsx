import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const InfoModal = ({ setShowModal }) => {

   const [values, setValues] = usesState({
      firstname: "",
      lastname: "",
      email: "",
      // password: "",
      age: "",
      gender: ""
   })

   const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
   }

  return (
    <div>
      
    </div>
  )
}

export default InfoModal