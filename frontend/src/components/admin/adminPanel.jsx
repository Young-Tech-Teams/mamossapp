import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { API_USER_URL } from '../../utils/APIRoutes';
import EditUser from './edit-user';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AdminPanel = () => {
   const location = useLocation();
   const url = location.pathname.split("/")
   const id_user = url[2]
   const navigate = useNavigate();

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
      <tr key={user.id} className="d-flex">
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
               <td>
                  <Link to={`/edit-user/${user.id}`}>Gérer</Link>
               </td>
            </>            
            ) : <></>
         }
      </tr>
   ))

   return (
      <>
         <h2>Liste des utilisateurs</h2>
         <tbody>
         <table className="d-grid width-sm gap-2 text-center" >
            <tr className="d-flex">
               <th>Prénom</th>
               <th>Nom</th>
               <th>Email</th>
               <th>Âge</th>
               <th>Genre</th>
               <th>Rôle</th>
               <th>Action</th>
            </tr>
            <tr>
               {listUsers}
            </tr>
            </table>

         </tbody>
      </>
   )
}

const InfoContainer = styled.div``

export default AdminPanel