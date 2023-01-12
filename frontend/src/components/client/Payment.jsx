import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { API_PAYMENT_URL } from '../../utils/APIRoutes';
import { Link } from 'react-router-dom';

const MyPayments = ({ setShowModal }) => {
   
   const token = JSON.parse(localStorage.getItem("token"));
   const [data, setData] = useState([])

   const fetchCurrentUserInfo = () => {
      const config = {
      method: 'get',
      url: `${API_PAYMENT_URL}list-all`,
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
         setData(response.data);
      })
      .catch((err) => {
         console.log(err);
      })
   }

   useEffect(() => {
   fetchCurrentUserInfo();
   // eslint-disable-next-line
   }, []);

   const listAllPayments = data?.map((payment) => (
      <div key={payment.id} className="gap-1">
         {payment.name !== "" ? (
            <>
               <div className="name">
                  {payment.lastname ? payment.lastname : "Nom"} {payment.firstname ? payment.firstname : "Prénom"}
               </div>
               <div className="card_num">
                  N° de carte : {payment.card_number ? payment.card_number : "Numéro de carte"}
               </div>
               <div className="exp_date">
                  Date d'expiration : {parseInt(payment.card_exp_date) ? parseInt(payment.card_exp_date) : "Date d'expiration"}
               </div>
               <div className="card_crypto">
                  Cryptogramme : {payment.card_crypto ? payment.card_crypto : "Cryptogramme"}
               </div>
               <Link to={`/supprimer-payment/${payment.id}`} className="btn-edit">Gérer</Link>
            </>
         ) : <></>
         }
      </div>
   ))

  return (
    <AddressContainer className="d-grid gap-1">
      {listAllPayments}
    </AddressContainer>
  )
}

const AddressContainer = styled.div``

export default MyPayments