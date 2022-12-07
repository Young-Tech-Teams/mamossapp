import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { API_ADDRESS_URL } from '../../utils/APIRoutes';

const MyAddress = ({ setShowModal }) => {
   
   const token = JSON.parse(localStorage.getItem("token"));
   const [data, setData] = useState({
      name: "",
      street: "",
      street_num: "",
      floor: "",
      door: "",
      building: "",
      code: "",
      zip_code: "",
      city: "",
      country: ""
   })

   const fetchCurrentUserInfo = () => {
      const config = {
      method: 'get',
      url: `${API_ADDRESS_URL}list/1`,
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
           "name": response.data.name,
           "street": response.data.street,
           "street_num": response.data.street_num,
           "floor": response.data.floor,
           "door": response.data.door,
           "building": response.data.building,
           "code": response.data.code,
           "zip_code": response.data.zip_code,
           "city": response.data.city,
           "country": response.data.country
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
                  <span>{data.name ? data.name : "Nom d'adresse"}</span>
                  <hr />
                  <span>{data.street_num ? data.street_num : "Numéro de rue"}, {data.street ? data.street : "Rue"},</span>
               </div>
               <div className="age gender">
                  <span>
                     {data.building ? data.building : "Bâtiment"}, {data.door ? data.door : "Numéro de porte"}, {data.floor ? data.floor : "Étage"}
                  </span>
                  <hr />
               </div>
               <div className="created">
                  <span>{data.zip_code ? data.zip_code : "??"}, {data.city ? data.city : "Ville"}, {data.country ? data.country : "Pays"}</span>
               </div>
            </div>
         </div>
    </AddressContainer>
  )
}

const AddressContainer = styled.div``

export default MyAddress