import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { API_USER_URL } from '../../utils/APIRoutes';
import { useLocation, useNavigate } from 'react-router-dom';

const EditUser = () => {
   const location = useLocation();
   const url = location.pathname.split("/");
   const userId = url[2];

   const token = JSON.parse(localStorage.getItem("token"));
   const [data, setData] = useState([]);
 
   const handleChange = (e) => {
     setData({ ...data, [e.target.name]: e.target.value });
  }

   const fetchUser = () => {
      const config = {
         method: 'get',
         url: `${API_USER_URL}infos/${userId}`,
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
        url: `${API_USER_URL}update/${userId}`,
        headers: {
          'x-access-token': token,          
        },
        data: data,
      };
      axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
         console.log(response.data.message);
        window.location.href = "/mon-compte"
      })
      .catch(err => {
        console.log(err);
      })
    }

    const deleteUser = () => {
      const config = {
         method: 'delete',
         url: `${API_USER_URL}delete/${userId}`,
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
         window.location.href = "/mon-compte"
      })
      .catch((err) => {
         console.log(err);
      })
   }

   const onDelete = (e) => {
      e.preventDefault();
      alert(`Do you want to delete the user ${data.firstname} from the database ?`);
      deleteUser();
   }


   return (
      <>
         <section id="profile">
            <div className="container d-grid gap-1">
               <h1>Modifier les informations</h1>
               <button onClick={onDelete}>Supprimer définitivement</button>
               <FormContainer>
                  <Form onSubmit={onSubmit} id="form">
                     <div>
                        <label htmlFor="firstname">Prénom</label>
                        <hr />
                        <Input 
                        type="text"
                        value={data.firstname ? data.firstname : ""}
                        className="form-control"
                        placeholder="Entrez le prénom"
                        name="firstname"
                        onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="lastname">Nom</label>
                        <hr />
                        <Input 
                        type="text"
                        value={data.lastname ? data.lastname : ""}
                        className="form-control"
                        placeholder="Entrez le nom"
                        name="lastname"
                        onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="email">Email</label>
                        <hr />
                        <Input 
                        type="text"
                        value={data.email ? data.email : ""}
                        className="form-control"
                        placeholder="Entrez l'email"
                        name="email"
                        onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="age">Âge</label>
                        <hr />
                        <Input 
                        type="text"
                        value={data.age ? data.age : ""}
                        className="form-control"
                        placeholder="Entrez l'âge"
                        name="age"
                        onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="gender">Genre</label> <small>(Femme, Homme, Autre)</small>
                        <hr />
                        <Input 
                        type="text"
                        value={data.gender ? data.gender : ""}
                        className="form-control"
                        placeholder="Entrez le genre"
                        name="gender"
                        onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="age">Rôle</label> <small>(1 = Admin, 2 = Client, 3 = Livreur)</small>
                        <hr />
                        <Input 
                        type="text"
                        value={data.roleId ? data.roleId : ""}
                        className="form-control"
                        placeholder="Choisissez le rôle"
                        name="roleId"
                        onClick={() => {alert("Vous allez changer le rôle")}}
                        onChange={handleChange}
                        />
                     </div>
                      <button onClick={() => {alert("Êtes-vous sûr de vouloir sauvegarder?")}}>Sauvegarder</button>
                  </Form>
               </FormContainer>
            </div>
         </section>
      </>
   )

}

const FormContainer = styled.div``
const Form = styled.form``
const Input = styled.input``

export default EditUser;