import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/APIRoutes';

const InfoModal = ({ setShowModal }) => {

  const token = JSON.parse(localStorage.getItem("token"));
  
   const [values, setValues] = useState({
      firstname: "",
      lastname: "",
      email: "",
      // password: "",
      age: "",
      gender: ""
   })

   const fetchCurrentUserInfo = () => {
      var config = {
        method: 'get',
        url: `${API_BASE_URL}/user-infos`,
        headers: localStorage.getItem("token") ? {
          "Access-Control-Allow-Origin": "*",
          "x-access-token": token,
        } : {
          "Access-Control-Allow-Origin": "*",
        }
      }
  
      axios.defaults.withCredentials = true;
  
      axios(config)
      .then((response) => {
         console.log(response);
         console.log("It worked!");
         setValues.firstname(response.data.firstname);
         setValues.lastname(response.data.lastname);
         setValues.email(response.data.email);
         setValues.age(response.data.age);
         setValues.gender(response.data.gender);
      })
      .catch((err) => {
         console.log(err);
      })
   }
      
      useEffect(() => {
        fetchCurrentUserInfo();
      }, []);


   // var config = {
   //    method: 'put',
   //    url: `${API_BASE_URL}/user-update`,
   //    headers: localStorage.getItem("token") ? {
   //       "Access-Control-Allow-Origin": "*",
   //       "x-access-token": token,
   //    } : {
   //       "Access-Control-Allow-Origin": "*"
   //    }
   // }

   // axios.defaults.withCredetials = true;

   // axios(config)
   // .then((response) => {
   //    setValues
   // })

   const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
   }

  return (
    <div>
      
    </div>
  )
}

export default InfoModal