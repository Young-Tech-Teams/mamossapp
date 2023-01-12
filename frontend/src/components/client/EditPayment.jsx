import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { API_PAYMENT_URL } from '../../utils/APIRoutes';
import { useLocation, useNavigate } from 'react-router-dom';

const DeletePayment = () => {
   const location = useLocation();
   const url = location.pathname.split("/");
   const id = url[2];

   const token = JSON.parse(localStorage.getItem("token"));
   const [data, setData] = useState("");
 
   const handleChange = (e) => {
     setData({ ...data, [e.target.name]: e.target.value });
  }

  const fetchPayment = () => {
   const config = {
      method: 'get',
      url: `${API_PAYMENT_URL}list/${id}`,
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
   fetchPayment();
   // eslint-disable-next-line
 }, []);

   const onSubmit = (e) => {
      e.preventDefault();
      const config = {
         method: 'update',
         url: `${API_PAYMENT_URL}update/${id}`,
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

   const deletePayment = () => {
      const config = {
         method: 'delete',
         url: `${API_PAYMENT_URL}delete/${id}`,
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
            <div  id="create-payment" className="container form-group d-grid gap-1">
               <h1 className="title">Enregistrer une adresse</h1>
               <button onClick={deletePayment} className="btn-edit">Supprimer</button>
                  <Form onSubmit={onSubmit} id="payment-form" >
                     <div>
                        <label htmlFor="lastname" className="form-group-label">Nom</label>
                        <hr />
                        <Input 
                        type="text"
                        value={data.lastname ? data.lastname : ""}
                        className="form-control"
                        placeholder="Entrez votre nom"
                        name="lastname"
                        onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="firstname">Prénom</label>
                        <hr />
                        <Input 
                        type="text"
                        value={data.firstname ? data.firstname : ""}
                        className="form-control"
                        placeholder="Entrez votre prénom"
                        name="firstname"
                        onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="card_number">Numéro de carte</label>
                        <hr />
                        <Input 
                        type="number"
                        value={data.card_number ? data.card_number : ""}
                        className="form-control"
                        placeholder="Entrez le numéro de votre carte"
                        name="card_number"
                        onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="card_exp_date">Date d'expiration</label>
                        <hr />
                        <Input 
                        type="text"
                        value={data.card_exp_date ? data.card_exp_date : ""}
                        className="form-control"
                        placeholder="Entrez la date d'expiration de votre carte"
                        name="card_exp_date"
                        onChange={handleChange}
                        />
                     </div>
                     <div>
                        <label htmlFor="card_crypto">Cryptogramme</label>
                        <hr />
                        <Input 
                        type="number"
                        value={data.card_crypto ? data.card_crypto : ""}
                        className="form-control"
                        placeholder="Entrez le cryptogramme à l'arrière de votre carte"
                        name="card_crypto"
                        onChange={handleChange}
                        />
                     </div>
                      <button className="btn btn-primary mt-1 text-center">Créer l'adresse</button>
                  </Form>
            </div>
         </section>
      </>
   )

}

const Form = styled.form``
const Input = styled.input``

export default DeletePayment;