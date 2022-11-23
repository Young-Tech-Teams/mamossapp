import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { API_USER_URL } from '../../utils/APIRoutes';

const InfoModal = ({ setShowModal }) => {
   
   const token = JSON.parse(localStorage.getItem("token"));
   const [data, setData] = useState({
      firstname: "",
      lastname: "",
      email: "",
      age: "",
      gender: "",
      createdAt: ""
   })

   const fetchCurrentUserInfo = () => {
      const config = {
      method: 'get',
      url: `${API_USER_URL}infos`,
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
         setData({
            ["firstname"]: response.data.firstname,
            ["lastname"]: response.data.lastname,
            ["email"]: response.data.email,
            ["age"]: response.data.age,
            ["gender"]: response.data.gender,
            ["createdAt"]: response.data.createdAt
         })
      })
      .catch((err) => {
         console.log(err);
      })
   }

   useEffect(() => {
   fetchCurrentUserInfo();
   }, []);

  return (
    <Modal id="info-modal" className="info-modal">
      <FormContainer>
      <Form onSubmit={onSubmit} id="form">
         <p>Bonjour {data.firstname}</p>
         <div>
         <div className="tabs">
         <div className="delivery">
            <a href="/mes-commandes">Commander un repas</a>
         </div>
         </div>

         <div className="user-info d-flex">
         <div className="avatar">
            <img src="" alt="Avatar" />
         </div>
         <div className="bio">
            <div className="name">
               <span>{data.firstname ? data.firstname : "Prénom"}</span>
               <hr />
               <span>{data.lastname ? data.lastname : "Nom"}</span>
            </div>
            <div className="mail">
               <span>{data.email ? data.email : "Votre email"}</span>
            </div>
            <div className="age gender">
               <span>{data.age ? data.age : "Age"}</span>
               <hr />
               <span>{data.gender ? data.gender : "Sexe"}</span>
            </div>
            <div className="created">
               <span>Mamossien depuis {data.createdAt ? data.createdAt : "??/??/??"}</span>
            </div>
         </div>
        </Form>
      </FormContainer>
    </Modal>
  )
}

const Modal = styled.div``
const FormContainer = styled.div``
const Form = styled.form``
const Input = styled.input``

export default InfoModal