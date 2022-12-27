import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { API_USER_URL } from '../../utils/APIRoutes';

const AdminPanel = () => {
   
   const token = JSON.parse(localStorage.getItem("token"));
   const [data, setData] = useState([])

   const fetchAllUsers = () => {
      const config = {
      method: 'get',
      url: `${API_USER_URL}get-all`,
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

   const listUsers = data?.map((user) => ( 
      <div key={user.id}>
         {user.roleId !== "" ? ( 
            <>
            <div className="name">
               {user.firstname ? user.firstname : "Prénom"} {user.lastname ? user.lastname : "Nom"}
            </div>
            <div className="mail">
               {user.email ? user.email : "Email"}
            </div>
            <div className="age">
               {user.age ? user.age : "Age"}
            </div>
            <div className="gender">
               {user.gender ? user.gender : "Genre"}
            </div>
            <div className="createdAt">
               {user.createdAt ? user.createdAt : "Créer le : ??"}
            </div>
            <div className="updatedAt">
               {user.updatedAt ? user.updatedAt : "Modifier le : ??"}
            </div>
            <div className="role">
               Role : {user.roleId ? user.roleId : "Role : "}
            </div>
            </>            
            ) : <></>
         }
      </div>
   ))

   return (
      <>
         {listUsers}
      </>
   )
}

const InfoContainer = styled.div``

export default AdminPanel