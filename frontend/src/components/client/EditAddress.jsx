import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { API_ADDRESS_URL } from '../../utils/APIRoutes';
import { useLocation, useNavigate } from 'react-router-dom';

const EditAddy = () => {
   const location = useLocation();
   const url = location.pathname.split("/");
   const id = url[2];

   const token = JSON.parse(localStorage.getItem("token"));
   const [data, setData] = useState([]);
 
   const handleChange = (e) => {
     setData({ ...data, [e.target.name]: e.target.value });
  }

   const fetchAddress = () => {
      const config = {
         method: 'get',
         url: `${API_ADDRESS_URL}list/${id}`,
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
      fetchAddress();
      // eslint-disable-next-line
    }, []);


  const onSubmit = (e) => {
      e.preventDefault();
      const config = {
         method: 'update',
         url: `${API_ADDRESS_URL}update/${id}`,
         headers: localStorage.getItem("token") ? {
            "Access-Control-Allow-Origin": "*",
            "x-access-token": token,
         } : {
            "Access-Control-Allow-Origin": "*",
         },
        data: data,
      }
      axios.defaults.withCredentials = true;

      axios(config)
      .then((response) => {
         console.log(response);
         console.log("WE GOT IT!");
         setData(response.data);
         window.location.href = "/mon-compte"
      })
      .catch((err) => {
         console.log(err);
      })
   }

   const deleteAddress = () => {
      const config = {
         method: 'delete',
         url: `${API_ADDRESS_URL}delete/${id}`,
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

   return (
      <>
         <section id="profile">
            <div  id="create-addy" className="container form-group d-grid gap-1">
               <h1 className="title">Enregistrer une adresse</h1>
               <button onClick={deleteAddress} className="btn-edit">Supprimer</button>
                  <Form onSubmit={onSubmit} id="addy-form" >
                     <div>
                        <label htmlFor="name" className="form-group-label">Nom d'adresse</label>
                        <hr />
                        <Input 
                        type="text"
                        value={data.name ? data.name : ""}
                        className="form-control"
                        placeholder="Entrez le nom d'adresse"
                        name="name"
                        onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="street">Nom de rue</label>
                        <hr />
                        <Input 
                        type="text"
                        value={data.street ? data.street : ""}
                        className="form-control"
                        placeholder="Entrez le nom de rue"
                        name="street"
                        onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="street_num">Numéro de rue</label>
                        <hr />
                        <Input 
                        type="number"
                        value={data.street_num ? data.street_num : ""}
                        className="form-control"
                        placeholder="Entrez le numéro de rue"
                        name="street_num"
                        onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="building">Bâtiment</label>
                        <hr />
                        <Input 
                        type="text"
                        value={data.building ? data.building : ""}
                        className="form-control"
                        placeholder="Entrez le bâtiment"
                        name="building"
                        onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="floor">Étage</label>
                        <hr />
                        <Input 
                        type="number"
                        value={data.floor ? data.floor : ""}
                        className="form-control"
                        placeholder="Entrez l'étage"
                        name="floor"
                        onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="door">Porte</label>
                        <hr />
                        <Input 
                        type="number"
                        value={data.door ? data.door : ""}
                        className="form-control"
                        placeholder="Entrez le numéro de porte"
                        name="door"
                        onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="code">Code</label>
                        <hr />
                        <Input 
                        type="number"
                        value={data.code ? data.code : ""}
                        className="form-control"
                        placeholder="Entrez le code de résidence"
                        name="code"
                        onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="zip_code">ZIP Code</label>
                        <hr />
                        <Input 
                        type="text"
                        value={data.zip_code ? data.zip_code : ""}
                        className="form-control"
                        placeholder="Entrez le code zip"
                        name="zip_code"
                        onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="city">Ville</label>
                        <hr />
                        <Input 
                        type="text"
                        value={data.city ? data.city : ""}
                        className="form-control"
                        placeholder="Entrez la ville"
                        name="city"
                        onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="country">Pays</label>
                        <hr />
                        <Input 
                        type="text"
                        value={data.country ? data.country : ""}
                        className="form-control"
                        placeholder="Entrez le pays"
                        name="country"
                        onChange={handleChange}
                        />
                     </div>
                      <button className="btn btn-primary mt-1 text-center">Sauvegarder</button>
                  </Form>
            </div>
         </section>
      </>
   )

}

const Form = styled.form``
const Input = styled.input``

export default EditAddy;