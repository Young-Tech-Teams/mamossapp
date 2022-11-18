import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { API_USER_URL } from '../../utils/APIRoutes';

const InfoModal = ({ setShowModal }) => {

  const token = JSON.parse(localStorage.getItem("token"));
  
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

   const fetchCurrentUserInfo = () => {
      var config = {
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
      setFirstname(e.target.value);
    };
    const onChangeLastname = (e) => {
      setLastname(e.target.value);
    };
    const onChangeEmail = (e) => {
      setEmail(e.target.value);
    };
    const onChangeAge = (e) => {
      setAge(e.target.value);
    };
    const onChangeGender = (e) => {
      setGender(e.target.value);
    }

   // var config = {
   //    method: 'put',
   //    url: `${API_BASE_URL}/update`,
   //    headers: localStorage.getItem("token") ? {
   //       "Access-Control-Allow-Origin": "*",
   //       "x-access-token": token,
   //    } : {
   //       "Access-Control-Allow-Origin": "*"
   //    }
   // }

   // axios.defaults.withCredetials = true;

   // axios(config)
   // .then((response) => {
   //    setValues
   // })

   const form = 
   <>
        <Form>
          <label htmlFor="firstname">Prénom</label>
          <hr />
          <Input 
            type="text"
            className="form-control"
            placeholder="Prénom"
            name="firstname"
            value={firstname}
            onChange={onChangeFirstname}
          />
          <hr />
          <label htmlFor="lastname">Nom</label>
          <hr />
          <Input 
            type="text"
            className="form-control"
            placeholder="Nom"
            name="lastname"
            value={lastname}
            onChange={onChangeLastname}
          />
          <hr />
          <label htmlFor="email">Email</label>
          <hr />
          <Input 
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            value={`${email ? email : "Email"}`}
            onChange={onChangeEmail}
          />
          <hr />
          <label htmlFor="age">Age</label>
          <hr />
          <Input  
            type="text"
            className="form-control"
            placeholder="Age"
            name="age"
            value={age}
            onChange={onChangeAge}
          />
          <hr />
          <label htmlFor="gender">Genre</label>
          <hr />
          <Input 
            type="text"
            className="form-control"
            placeholder="Genre"
            name="gender"
            value={gender}
            onChange={onChangeGender}
          />
        </Form>
   </>

  return (
    <Modal id="info-modal" className="info-modal">
      <FormContainer>
        {form}
      </FormContainer>
    </Modal>
  )
}

const Modal = styled.div``
const FormContainer = styled.div``
const Form = styled.form``
const Input = styled.input``

export default InfoModal