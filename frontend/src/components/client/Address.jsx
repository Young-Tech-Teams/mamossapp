import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { API_ADDRESS_URL } from '../../utils/APIRoutes';
import { Link } from 'react-router-dom';

const MyAddress = ({ setShowAddressModal }) => {
   
   const token = JSON.parse(localStorage.getItem("token"));
   const [data, setData] = useState([])

   const fetchCurrentUserInfo = () => {
      const config = {
      method: 'get',
      url: `${API_ADDRESS_URL}list-all`,
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

   const listAllAdresses = data?.map((addy) => (
      <div key={addy.id} className="d-grid">
         {addy.name !== "" ? (
            <>
               <div className="name">
                  {addy.name ? addy.name : "Nom d'adresse"}
               </div>
               <div className="street">
                  {addy.street_num ? addy.street_num : "Numéro de rue"}, {addy.street ? addy.street : "Rue"},
               </div>
               <div className="more">Bât {addy.building ? addy.building : "Bâtiment"}, Appt {addy.door ? addy.door : "Porte"}, Étage {addy.floor ? addy.floor : "Étage"}</div>
               <div className="code">
                  {addy.zip_code ? addy.zip_code : "Code postal"}, {addy.city ? addy.city : "Ville"}, {addy.country ? addy.country : "Pays"}
               </div>
               <Link to={`/modifier-adresse/${addy.id}`} className="btn-edit">Modifier</Link>
            </>
         ) : <></>
         }
      </div>
   ))

  return (
    <AddressContainer className="d-grid gap-1">
      {listAllAdresses}
    </AddressContainer>
  )
}

const AddressContainer = styled.div``

export default MyAddress