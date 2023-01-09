import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_USER_URL } from '../../utils/APIRoutes';

const EditUser = () => {
   const token = JSON.parse(localStorage.getItem("token"));
   const [data, setData] = useState([]);
 
   const handleChange = (e) => {
     setData({ ...data, [e.target.name]: e.target.value });
  }
 

   const fetchUser = () => {
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
      fetchUser();
      // eslint-disable-next-line
    }, []);

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
      })
      .catch(err => {
        console.log(err);
      })
    }



   return (
      <>
         <section id="profile">

         <div className="container d-grid gap-1">

            <h1>Modifier les informations</h1>

            <form action="" onSubmit={onSubmit} method="POST" className="d-grid gap-2">
               <input type="text" name="firstname" value={data.firstname} placeholder="Entrer le prénom"/>
               <input type="text" name="lastname" placeholder="Entrer le nom"/>
               <input type="email" name="email" placeholder="Entrer l'email" />
               <input type="submit" value="Enregister" />
            </form>
         </div>
         </section>
      </>
   )

}

export default EditUser;