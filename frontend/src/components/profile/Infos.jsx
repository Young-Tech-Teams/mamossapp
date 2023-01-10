import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom"; 
import styled from 'styled-components';
import axios from 'axios';
import { API_USER_URL } from '../../utils/APIRoutes';
import { API_RIB_URL } from '../../utils/APIRoutes';

const MyInfos = ({ setShowInfoModal }) => {
   
   const token = JSON.parse(localStorage.getItem("token"));
   const location = useLocation();
   const [isClient, setIsClient] = useState(false);
   const [isLivreur, setIsLivreur] = useState(false);
   const [isAdmin, setIsAdmin] = useState(false);
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [data, setData] = useState([]);
   const [ribs, setRibs] = useState([]);

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

   const fetchCurrentUserRIB = () => {
      const config = {
         method: 'get',
         url: `${API_RIB_URL}list-all`,
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
            setRibs(response.data);
         })
         .catch((err) => {
            console.log(err);
         })
      }
   
      useEffect(() => {
         fetchCurrentUserRIB();
      // eslint-disable-next-line
   }, []);

  // Check if user is client
  const checkIfClient = async() => {
   const response = await axios.get(`${API_USER_URL}client`, {
     headers: {
       "x-access-token": token
     },
   });
   setIsClient(response.data)
 }

 // Check if user is livreur
 const checkIfLivreur = async() => {
   const response = await axios.get(`${API_USER_URL}livreur`, {
     headers: {
       "x-access-token": token
     },
   });
   setIsLivreur(response.data);
 }

   // Check if user is admin
   const checkIfAdmin = async() => {
     const response = await axios.get(`${API_USER_URL}admin`, {
       headers: {
         "x-access-token": token
       },
     });
     setIsAdmin(response.data);
   }

 useEffect(() => {
   if (token) {
     checkIfClient();
     setIsLoggedIn(true);
   } else {
     setIsClient(false);
     setIsLoggedIn(false);
   }
 }, [location, token]);

 useEffect(() => {
   if (token) {
     checkIfLivreur();
     setIsLoggedIn(true);
   } else {
     setIsLivreur(false);
     setIsLoggedIn(false);
   }
 }, [location, token]);

 useEffect(() => {
   if (token) {
     checkIfAdmin();
     setIsLoggedIn(true);
   } else {
     setIsAdmin(false);
     setIsLoggedIn(false);
   }
 }, [location, token]);

 const listRibs = ribs?.map((rib) => (
   <div key={rib.id} className="d-grid">
   {rib.id !== "" ? ( 
      <>
      <div className="name">
         {rib.account_holder ? rib.account_holder : ""}
      </div>
      <div className="bank">
         {rib.bank_name ? rib.bank_name : "Prénom"}
      </div>
      <div className="rib">
          {rib.rib_num ? rib.rib_num : "Nom"}
         {rib.iban_num ? rib.iban_num : "Date"}
         {rib.bic_code ? rib.bic_code : "Date"}
      </div>
      </>            
      ) : <></>
   }
</div>
 ))

  return (
     <InfoContainer id="infos" className="infos-container mg-2">
         <p className="text-center mb-md">Bonjour {data.firstname}</p>
         <div className="user-info d-grid col-2 gap-2 ">
            <div className="left d-flex gap-2">
               <div className="avatar">
                  <img src="" alt="Avatar" />
               </div>
               <div className="bio">
                  <div className="fullname">
                     <span>{data.firstname ? data.firstname : "Prénom"}</span>
                     <hr />
                     <span>{data.lastname ? data.lastname : "Nom"}</span>
                  </div>
                  <div className="mail">
                     <span>{data.email ? data.email : "Votre email"}</span>
                  </div>
                  <div className="more">
                     <span>{data.age ? data.age : "Age"}</span>
                     <hr />
                     <span>{data.gender ? data.gender : "Sexe"}</span>
                  </div>
                  <div className="created">
                     <span>Mamossien depuis {data.createdAt ? data.createdAt : "??/??/??"}</span>
                  </div>
            </div>
         </div>
         <div className="right">
            <div className="allergies">
               {isClient && (
                  <>
                     <p>Allergies</p>
                  </>
               )}
            </div>
            <div className="rib d-grid gap-1">
               {isLivreur && (
                  <>
                     {listRibs}
                  </>
               )}
            </div>
            <div className="rib d-grid gap-1">
               {isAdmin && (
                  <>
                     Courses
                  </>
               )}
            </div>
         </div>
      </div>
    </InfoContainer>
  )
}

const InfoContainer = styled.div``

export default MyInfos