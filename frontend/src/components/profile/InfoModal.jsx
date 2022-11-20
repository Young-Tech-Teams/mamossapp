import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { API_USER_URL } from '../../utils/APIRoutes';
import FormData from "form-data";

const InfoModal = ({ setShowModal }) => {

  const token = JSON.parse(localStorage.getItem("token"));
  
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

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
         console.log("It worked!");
         setFirstname(response.data.firstname);
         setLastname(response.data.lastname);
         setEmail(response.data.email);
         setAge(response.data.age);
         setGender(response.data.gender);
      })
      .catch((err) => {
         console.log(err);
      })
   }
      
    useEffect(() => {
      fetchCurrentUserInfo();
    }, []);

    const onChangeFirstname = (e) => {
      const firstname = e.target.value;
      setFirstname(firstname);
    };
    const onChangeLastname = (e) => {
      const  lastname = e.target.value;
      setLastname(lastname);
    };
    const onChangeEmail = (e) => {
      const  email = e.target.value;
      setEmail(email);
    };
    const onChangeAge = (e) => {
      const  age = e.target.value;
      setAge(age);
    };
    const onChangeGender = (e) => {
      const gender = e.target.value;
      setGender(gender);
    }

    const onSubmit = (e) => {
      e.preventDefault();
      let data = new FormData();
      data.append("firstname", firstname);
      data.append("lastname", lastname);
      data.append("email", email);
      data.append("age", age);
      data.append("gender", gender);

      const config = {
        method: 'put',
        url: `${API_USER_URL}update`,
        headers: localStorage.getItem("token") ? {
          "Access-Control-Allow-Origin": "*",
          "x-access-token": token,
        } : {
          "Access-Control-Allow-Origin": "*",
        },
        data: data,
      };
      axios(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
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
      <Form onSubmit={onSubmit}>
          <div>
          <label htmlFor="firstname">Prénom</label>
          <hr />
          <Input 
            type="text"
            className="form-control"
            placeholder="Entrez votre prénom"
            name="firstname"
            value={firstname ? firstname : ""}
            onChange={onChangeFirstname}
            />
          </div>
          <div>
          <label htmlFor="lastname">Nom</label>
          <hr />
          <Input 
            type="text"
            className="form-control"
            placeholder="Entrez votre nom"
            name="lastname"
            value={lastname ? lastname : ""}
            onChange={onChangeLastname}
            />
          </div>
          <div>
          <label htmlFor="email">Email</label>
          <hr />
          <Input 
            type="email"
            className="form-control"
            placeholder="Entrez votre adresse mail"
            name="email"
            value={email ? email : ""}
            onChange={onChangeEmail}
          />
          </div>
          <div>
          <label htmlFor="age">Age</label>
          <hr />
          <Input  
            type="text"
            className="form-control"
            placeholder="Entrez votre age"
            name="age"
            value={age ? age : ""}
            onChange={onChangeAge}
            />
          </div>
          <div>
          <label htmlFor="gender">Genre</label>
          <hr />
          <Input 
            type="text"
            className="form-control"
            placeholder="Entrez votre genre"
            name="gender"
            value={gender ? gender : ""}
            onChange={onChangeGender}
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