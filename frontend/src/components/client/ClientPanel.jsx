import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom"; 
import styled from 'styled-components';
import axios from 'axios';
import { API_ORDERS_URL } from '../../utils/APIRoutes';
import MyInfos from '../profile/Infos';
import Modal from '../profile/InfoModal';
import MyAddress from './Address';
import MyPayments from './Payment';

const ClientPanel = () => {
   
   const token = JSON.parse(localStorage.getItem("token"));
   const location = useLocation();
   const [data, setData] = useState([]);

   const fetchAllUsers = () => {
      const config = {
      method: 'get',
      url: `${API_ORDERS_URL}get-all`,
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
   fetchAllUsers();
   // eslint-disable-next-line
   }, []);

   return (
      <>
         <div className="client-panel d-grid gap-2">
            <div className="addresses">
               <h2 className="mb-sm">Mes addresses</h2>
               <Link to="/créer-adresse/" className="btn-edit">Créer</Link>
               <MyAddress />
            </div>
            <div className="payments">
               <h2 className="mb-sm">Mes moyens de paiements</h2>
               <Link to="/enregistrer-carte/" className="btn-edit">Créer</Link>
               <MyPayments />
            </div>
         </div>
      </>
   )
}

const InfoContainer = styled.div``

export default ClientPanel