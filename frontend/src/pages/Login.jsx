import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import styled from 'styled-components';
import AuthService from "../utils/auth.service";
import validator from "validator";

const Login = () => {
   const navigate = useNavigate();
   const [values, setValues] = useState({
      email: "",
      password: "",
   });

   const toastOptions = {
      position: "bottom-right",
      autoClose: 4000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
   };

   useEffect(() => {
      if (localStorage.getItem("token")) {
        navigate("/")
      }
   }, []);

   const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (handleValidation()) {
         const { email, password } = values;
         const { data } = AuthService.login(email, password).then(
            (response) => {
               localStorage.setItem("token", JSON.stringify(response.data.accessToken));
               setTimeout(() => {
                  navigate("/")
               }, 500)
               if (data.status === false) {
                  toast.error(data.msg, toastOptions);
               }
               if (data.status === true) {
                  localStorage.setItem("token", JSON.stringify(data.user));
                  navigate("/");
               }
            },
         );
      }
   };

   const handleValidation = () => {
      const { email, password } = values;
      
      if (email === "" ) {
         toast.error(
         "Veuillez entrer votre adresse email", 
         toastOptions 
         );
         return false;
      } else if (!validator.isEmail(email)) {
            toast.error(
            "Veuillez entrer une adresse email valide", 
            toastOptions
            );
            return false
         } else if (password === "") {
               toast.error(
               "Veuillez entrer votre mot de passe", 
               toastOptions
               ); 
               return false;
            } else if (password.length < 8) {
                  toast.error(
                  "Le mot de passe doit contenir au moins 8 caractères", 
                  toastOptions 
                  );
                  return false;
               } else if (password.length > 24) {
                  toast.error(
                  "Le mot de passe ne doit pas dépasser 24 caractères", 
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
                     <BrandName>Se connecter</BrandName>
                  </Brand>
                  <Input 
                     type="text" 
                     placeholder="Email" 
                     name="email" 
                     autoComplete="on" 
                     onChange={(e) => handleChange(e)}
                     />
                  <Input 
                     type="password" 
                     placeholder="Mot de passe" 
                     name="password" 
                     onChange={(e) => handleChange(e)}
                     />
                  <Button type="submit">Valider</Button>
                  <Account className="account">
                     <Span>
                        Pas de compte ? 
                        <Space></Space>
                        <Link to="/inscription">Inscrivez-vous</Link>
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