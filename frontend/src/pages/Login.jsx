import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import styled from 'styled-components';
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';

const Login = () => {
   const navigate = useNavigate();
   const [values, setValues] = useState({
      email: "",
      password: "",
   });

   const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
   };

   useEffect(() => {
      if (localStorage.getItem("mamossa-user")) {
        navigate("/")
      }
   }, []);

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (handleValidation()) {
         const { email, password } = values;
         const { data } = await axios.post(loginRoute, {
            email,
            password, 
         });
         if (data.status === false) {
            toast.error(data.msg, toastOptions);
         }
         if (data.status === true) {
            localStorage.setItem('mamossa-user', JSON.stringify(data.user));
            navigate("/");
         }
      }
   };

   const handleValidation = () => {
      const { email, password } = values;
      if (password === "") {
         toast.error(
            "The password is required", 
            toastOptions
        ); 
         return false;
      } else if (email.length === "" ) {
         toast.error(
            "The email is required", 
            toastOptions 
        );
         return false;
      }
      return true;
   };

   const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
   }

   return (
      <>
         <LoginSection id="login-section">
            <FormContainer className="form container">
               <Form onSubmit={(e) => handleSubmit(e)}>
                  <Brand className="brand">
                     <BrandName>Mamossa</BrandName>
                  </Brand>
                  <Input 
                     type="text" 
                     placeholder="Email" 
                     name="email" 
                     autoComplete="off" 
                     onChange={(e) => handleChange(e)}
                     min="3"
                     />
                  <Input 
                     type="password" 
                     placeholder="Password" 
                     name="password" 
                     onChange={(e) => handleChange(e)}
                     />
                  <Button type="submit">Log In</Button>
                  <Account className="account">
                     <Span>
                        Don't have an account ? 
                        <Space></Space>
                        <Link to="/register"> Register</Link>
                     </Span>
                  </Account>
               </Form>
            </FormContainer>
            <ToastContainer />
         </LoginSection>
      </>
  )
}

const LoginSection = styled.section``
const FormContainer = styled.div``
const Form = styled.form``
const Brand = styled.div``
const BrandName = styled.h1``
const Input = styled.input``
const Button = styled.button``
const Account = styled.div``
const Span = styled.span``
const Space = styled.br``

export default Login