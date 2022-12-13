import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { API_USER_URL } from '../../utils/APIRoutes';

const InfoModal = ({ setShowInfoModal }) => {

  const token = JSON.parse(localStorage.getItem("token"));
  
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    age: "",
    gender: ""
 });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
 }

   const fetchCurrentUserInfo = () => {
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
         setData({ 
            "firstname": response.data.firstname,
            "lastname": response.data.lastname,
            "email": response.data.email,
            "gender": response.data.gender,
            "age": response.data.age
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
        url: `${API_USER_URL}update`,
        headers: {
          'x-access-token': token,          
        },
        data: data,
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

  return (
    <Modal id="info-modal" className="info-modal">
      <FormContainer>
      <button className="btn btn-close" onClick={() => setShowInfoModal(false)}>Fermer</button>
      <Form onSubmit={onSubmit} id="form">
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
          <label htmlFor="lastname">Nom</label>
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
          <label htmlFor="email">Email</label>
          <hr />
          <Input 
            type="email"
            value={data.email ? data.email : ""}
            className="form-control"
            placeholder="Entrez votre adresse mail"
            name="email"
            onChange={handleChange}
          />
          </div>
          <div>
          <label htmlFor="age">Age</label>
          <hr />
          <Input  
            type="number"
            value={data.age ? data.age : ""}
            className="form-control"
            placeholder="Entrez votre age"
            name="age"
            onChange={handleChange}
            />
          </div>
          <div>
          <label htmlFor="gender">Genre</label>
          <hr />
          <Input 
            type="text"
            value={data.gender ? data.gender : ""}
            className="form-control"
            placeholder="Entrez votre genre"
            name="gender"
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

export default InfoModal