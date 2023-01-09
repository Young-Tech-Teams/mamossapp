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

   const deleteUser = () => {
      const config = {
         method: 'delete',
         url: `${API_USER_URL}delete`,
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
         setData(response.data);
      })
      .catch((err) => {
         console.log(err);
      })
   }

   const listUsers = data?.map((user) => ( 
      <div key={user.id} className="d-flex gap-1">
         {user.roleId !== "" ? ( 
            <>
            <table className="gap-2 text-center" >
               <tr>
                  <th width="104rem">Prénom</th>
                  <th width="104rem">Nom</th>
                  <th width="104rem">Email</th>
                  <th width="104rem">Âge</th>
                  <th width="104rem">Genre</th>
                  <th width="104rem">Rôle</th>
                  <th width="104rem">Action</th>
               </tr>
               <tr>
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
                     <select>
                        <option hidden disabled selected value>{user.roleId ? user.roleId : "0"} - {user.role.name ? user.role.name : " ?? "}</option>
                        {role?.map((roles) => (
                           <option key={roles.id} value={roles.id}>{roles.name}</option>
                        ))}
                     </select>
                  </td>
                  <td>
                     <Link to={`/edit-user/${user.id}`}>Edit</Link>
                  </td>
               </tr>
         </table>
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