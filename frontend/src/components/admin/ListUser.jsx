import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { API_USER_URL } from '../../utils/APIRoutes';
import EditUser from './edit-user';
import { Link } from 'react-router-dom';

const ListAllUsers = () => {

   const token = JSON.parse(localStorage.getItem("token"));
   const [data, setData] = useState([]);
   const [role, setRole] = useState([]);

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

   const fetchAllRoles = () => {
      const config = {
         method: 'get',
         url: `${API_USER_URL}roles`,
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
         console.log("Did i get the roles?");
         setRole(response.data);
      })
      .catch((err) => {
         console.log(err);
      })
   }

   useEffect(() => {
      fetchAllRoles();
      // eslint-disable-next-line
   }, []);

   const listUsers = data?.map((user) => ( 
      <tr key={user.id} className="list d-grid mb-2">
         {user.roleId !== "" ? ( 
            <>
               <td className="name">
                  {user.firstname ? user.firstname : "Prénom"} 
               </td>
               <td className="lastname">
                  {user.lastname ? user.lastname : "Nom"}
               </td>
               <td className="mail">
                  {user.email ? user.email : "Email"}
               </td>
               <td className="age">
                  {user.age ? user.age : "Age"}
               </td>
               <td className="gender">
                  {user.gender ? user.gender : "Genre"}
               </td>
               <td className="role">
                  {user.roleId ? user.roleId : "0"} - {user.role.name ? user.role.name : " ?? "}                  
               </td>
               <td className="edit">
                  <Link to={`/edit-user/${user.id}`} className="btn-edit">Gérer</Link>
               </td>
            </>            
            ) : <></>
         }
      </tr>
   ))

   return (
      <>
         <tbody>
         <h2 className="mb-2" style={{textAlign: 'center'}}>Liste des utilisateurs</h2>
         <table className="text-center" >
            <thead className="headers d-flex">
               <th>Prénom</th>
               <th>Nom</th>
               <th>Email</th>
               <th>Âge</th>
               <th>Genre</th>
               <th>Rôle</th>
               <th>Action</th>
            </thead>
               {listUsers}
            </table>

         </tbody>
      </>
   )
}

const InfoContainer = styled.div``

export default ListAllUsers