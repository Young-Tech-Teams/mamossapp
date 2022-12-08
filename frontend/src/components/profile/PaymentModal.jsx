import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { API_PAYMENT_URL } from '../../utils/APIRoutes';

const PaymentModal = ({ setShowPaymentModal }) => {

  const token = JSON.parse(localStorage.getItem("token"));
  const [data, setData] = useState({
   lastname: "",
   firstname: "",
   card_number: "",
   card_exp_date: "",
   card_crypto: "",
 });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
 }

   const fetchCurrentUserInfo = () => {
      const config = {
        method: 'get',
        url: `${API_PAYMENT_URL}list/6`,
        headers: localStorage.getItem("token") ? {
         "Access-Control-Allow-Origin": ["https://localhost:3000", "https://www.app.mamossa.com"],
          "x-access-token": token,
        } : {
         "Access-Control-Allow-Origin": ["https://localhost:3000", "https://www.app.mamossa.com"],
        }
      }
  
      axios.defaults.withCredentials = true;
  
      axios(config)
      .then((response) => {
         console.log(response);
         setData({ 
            "lastname": response.data.lastname,
            "firstname": response.data.firstname,
            "card_number": response.data.card_number,
            "card_exp_date": response.data.card_exp_date,
            "card_crypto": response.data.card_crypto,z
          });
      })
      .catch((err) => {
         console.log(err);
      })
   }
      
    useEffect(() => {
      fetchCurrentUserInfo();
      // eslint-disable-next-line
    }, []);

    const onSubmit = (e) => {
      e.preventDefault();
      const config = {
        method: 'put',
        url: `${API_USER_URL}update/:id`,
        headers: {
          'x-access-token': token,          
        },
        data: data,
      };
      axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
         console.log(response.data.message);
      })
      .catch(err => {
        console.log(err);
      })
    }

  return (
    <Modal id="addy-modal" className="addy-modal">
      <FormContainer>
      <button className="btn btn-close" onClick={() => setShowPaymentModal(false)}>Fermer</button>
      <Form onSubmit={onSubmit} id="form">
          <div>
            <label htmlFor="lastname">Nom</label>
            <hr />
            <Input 
               type="text"
               value={data.lastname ? data.lastname : ""}
               className="form-control"
               placeholder="Entrez le nom du titulaire de la carte"
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
               placeholder="Entrez le prénom du titulaire de la carte"
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
               placeholder="Entrez les numéros de la carte"
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
               placeholder="Entrez la date d'expidation de la carte"
               name="card_exp_date"
               onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="card_crypto">Numéro secret</label>
            <hr />
            <Input 
               type="number"
               value={data.card_crypto ? data.card_crypto : ""}
               className="form-control"
               placeholder="Entrez le numéro secret de la carte"
               name="card_crypto"
               onChange={handleChange}
            />
          </div>
          <button>Sauvegarder</button>
        </Form>
      </FormContainer>
    </Modal>
  )
}

const Modal = styled.div``
const FormContainer = styled.div``
const Form = styled.form``
const Input = styled.input``

export default PaymentModal