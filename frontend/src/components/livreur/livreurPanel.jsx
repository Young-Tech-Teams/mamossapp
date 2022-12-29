import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { API_ORDERS_URL } from '../../utils/APIRoutes';

const LivreurPanel = () => {
   
   const token = JSON.parse(localStorage.getItem("token"));
   const [data, setData] = useState([])

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

   const listOrders = data?.map((order) => ( 
      <div key={order.id} className="d-flex gap-1">
         {order.roleId !== "" ? ( 
            <>
            <div className="order_num">
               #{order.order_num ? order.order_num : "#"}
            </div>
            <div className="name">
               {order.firstname ? order.firstname : "Prénom"} {order.lastname ? order.lastname : "Nom"}
            </div>
            <div className="date">
               {order.date ? order.date : "Date"}
            </div>
            </>            
            ) : <></>
         }
      </div>
   ))

   return (
      <>
         {listOrders}
      </>
   )
}

const InfoContainer = styled.div``

export default LivreurPanel