import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { API_USER_URL } from '../../utils/APIRoutes';

const AdminPanel = () => {
   
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
         setRole(response.data.role);
      })
      .catch((err) => {
         console.log(err);
      })
   }

   useEffect(() => {
   fetchAllUsers();
   // eslint-disable-next-line
   }, []);


   const handleChange = (e) => {
      setRole({ ...data.role, [e.target.name]: e.target.value });
   }

   const onSubmit = (e) => {
      e.preventDefault();
      const config = {
        method: 'put',
        url: `${API_USER_URL}update`,
        headers: {
          'x-access-token': token,          
        },
        data: data.role,
      };
      axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
         console.log(response.data.message);
         console.log("did it work?");
        // window.location.href = "/mon-compte"
      })
      .catch(err => {
        console.log(err);
      })
    }

   const listUsers = data?.map((user) => ( 
      <div key={user.id} className="d-flex gap-1">
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
               <div className="role">
                  Role : {user.role.name ? user.role.name : " ?? "}
                  {role?.map((roles) => (
                     <option value={roles.id} key={roles.id}>{roles.name}</option>
                  ))}
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