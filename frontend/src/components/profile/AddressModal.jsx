import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { API_USER_URL } from '../../utils/APIRoutes';

const AddressModal = ({ setShowModal }) => {

  const token = JSON.parse(localStorage.getItem("token"));
  const [data, setData] = useState({
      name: "",
      street: "",
      street_num: "",
      floor: "",
      door: "",
      building: "",
      code: "",
      zip_code: "",
      city: "",
      country: ""
 });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
 }

   const fetchCurrentUserInfo = () => {
      const config = {
        method: 'get',
        url: `${API_USER_URL}list/:id`,
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
            "name": response.data.name,
            "street": response.data.street,
            "street_num": response.data.street_num,
            "floor": response.data.floor,
            "door": response.data.door,
            "building": response.data.building,
            "code": response.data.code,
            "zip_code": response.data.zip_code,
            "city": response.data.city,
            "country": response.data.country
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
      <button className="btn btn-close" onClick={() => setShowModal(false)}>Fermer</button>
      <Form onSubmit={onSubmit} id="form">
          <div>
            <label htmlFor="name">Nom d'adresse</label>
            <hr />
            <Input 
               type="text"
               value={data.name ? data.name : ""}
               className="form-control"
               placeholder="Entrez votre prénom"
               name="name"
               onChange={handleChange}
               />
          </div>
          <div>
            <label htmlFor="street_nume">Numéro de rue</label>
            <hr />
            <Input  
               type="number"
               value={data.street_num ? data.street_num : ""}
               className="form-control"
               placeholder="Entrez votre age"
               name="street_num"
               onChange={handleChange}
               />
          </div>
          <div>
            <label htmlFor="street">Numéro de rue</label>
            <hr />
            <Input 
               type="text"
               value={data.street_num ? data.street_num : ""}
               className="form-control"
               placeholder="Entrez votre nom"
               name="street"
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
               placeholder="Entrez votre adresse mail"
               name="building"
               onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="door">Numéro de porte</label>
            <hr />
            <Input 
               type="number"
               value={data.door ? data.door : ""}
               className="form-control"
               placeholder="Entrez votre genre"
               name="door"
               onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="floor">Numéro d'étage</label>
            <hr />
            <Input 
               type="number"
               value={data.floor ? data.floor : ""}
               className="form-control"
               placeholder="Entrez votre genre"
               name="floor"
               onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="zip_code">Code</label>
            <hr />
            <Input 
               type="number"
               value={data.zip_code ? data.zip_code : ""}
               className="form-control"
               placeholder="Entrez votre genre"
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
               placeholder="Entrez votre genre"
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
               placeholder="Entrez votre genre"
               name="country"
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

export default AddressModal