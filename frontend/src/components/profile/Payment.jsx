import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { API_PAYMENT_URL } from '../../utils/APIRoutes';

const MyPayments = ({ setShowModal }) => {
   
   const token = JSON.parse(localStorage.getItem("token"));
   const [data, setData] = useState({
      lastname: "",
      firstname: "",
      card_number: "",
      card_exp_date: "",
      card_crypto: "",
   })

   const fetchCurrentUserInfo = () => {
      const config = {
      method: 'get',
      url: `${API_PAYMENT_URL}list/6`,
      headers: localStorage.getItem("token") ? {
         "Access-Control-Allow-Origin": ["https://localhost:3000", "https://www.app.mamossa.com/"],
         "x-access-token": token,
      } : {
         "Access-Control-Allow-Origin": ["https://localhost:3000", "https://www.app.mamossa.com/"],
      }
      }

      axios.defaults.withCredentials = true;

      axios(config)
      .then((response) => {
         console.log(response);
         console.log("It worked!");
         setData({
            "lastname": response.data.lastname,
            "firstname": response.data.firstname,
            "card_number": response.data.card_number,
            "card_exp_date": response.data.card_exp_date,
            "card_crypto": response.data.card_crypto,
         })
      })
      .catch((err) => {
         console.log(err);
      })
   }

   useEffect(() => {
   fetchCurrentUserInfo();
   // eslint-disable-next-line
   }, []);

  return (
    <AddressContainer id="address" className="address-container">
         <div className="user-info d-flex">
            <div className="bio">
               <div className="name">
                  <span>{data.lastname ? data.lastname : "Nom"} {data.firstname ? data.firstname :"Prénom"}</span>
               </div>
               <div className="age gender">
                  <span>{data.card_number ? data.card_number : "Numéro de carte"}</span>
                  <hr />
                  <span>
                     {data.card_exp_date ? data.card_exp_date : "Expiration"}, {data.card_crypto ? data.card_crypto : "Numéro crpt"}
                  </span>
                  <hr />
               </div>
            </div>
         </div>
    </AddressContainer>
  )
}

const AddressContainer = styled.div``

export default MyPayments